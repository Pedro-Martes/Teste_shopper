import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import csvParser from 'csv-parser';
import { useState } from 'react';




const app = express()

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'shopperproducts'
})

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.post('/upload', (req, res)=> {
    if(!req.files){
        return console.log('Nunhum arquivo enviado')
    }

    const file = req.files.csvFile;
    const filePath = path.join(__dirname, '../../files/product_prices.csv')

    file.mv(filePath, (err: string) => {
        if (err) {
            console.log('Erro ao salvar arquivo: ' + err);
        }

      
        res.send('Arquivo enviado com sucesso.');
    });
});

app.get("/get", (req, res)=> {
    const SQL = 'SELECT * FROM products'
    db.query(SQL, (err, result) => {err ? console.log(err) : res.send(result)})
})

app.get("/valited", (req, res) => {
    interface NewPrices {
        product_code: number;
        new_price: number;
    }

    const filePath = '../files/product_prices.csv';
    const newPrices: NewPrices[] = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            newPrices.push(row);
        })
        .on('end', () => {

            interface Products {
                code: number;
                name: string;
                cost_price: number;
                sales_price: number;
                new_price: number | null;
                qty: number;
                pack_id: number | null;
                product_id: number | null;
                pack_price: number | null;

            }


            const Products: Products[] = [];

            const queryPromises = newPrices.map((Price) => {
                if(!Price.new_price){
                    return alert(`O valor do preço de reajuste do prduto ${Price.product_code} está vazio!`)
                }
                return new Promise<void>((resolve, reject) => {
                    const Querry = `
                    SELECT 
                    P.code,
                    P.name,
                    P.cost_price,
                    P.sales_price,
                    ${Price.new_price} as new_price,
                   IFNULL( k.qty, 1) qty,
                   (SELECT pack_id
                   from packs 
                   where product_id = P.code
                   ) as pack_id ,
                  K.product_id,
                    (
                    SELECT  sales_price
                    FROM products
                    WHERE code = k.pack_id
                    ) as pack_price
                  FROM products P
                  LEFT JOIN packs K ON K.pack_id = P.code 
                  WHERE P.code = ${Price.product_code}
                  GROUP BY P.CODE, P.name, P.cost_price, P.sales_price, new_price, qty, pack_id, K.product_id, pack_price;`;
                    db.query(Querry, (err, results) => {
                        if (err) {
                            console.log(err);

                        } else {
                            Products.push(...results);
                            resolve();
                        }
                    });
                });
            });

            Promise.all(queryPromises)
                .then(() => {
                    res.send(Products);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send("Erro ao consultar o banco de dados");
                });
        });
});

app.post("/update", (req, res) => {
    const { code, new_price } = req.body

    const querry1 = `SELECT P.SALES_PRICE
    INTO @sales_price 
    FROM PRODUCTS P
    JOIN PACKS K ON K.PRODUCT_ID = P.CODE
    WHERE P.CODE = (
        SELECT PRODUCT_ID
        FROM PACKS
        WHERE PRODUCT_ID NOT IN (${code})
        AND PACK_ID = (SELECT PACK_ID FROM PACKS WHERE PRODUCT_ID = ${code})
    );`

    const querry2 = `UPDATE PRODUCTS SET SALES_PRICE  = ${new_price} WHERE CODE = ${code};`

    const querry3 = `
  
     UPDATE PRODUCTS P 
     JOIN PACKS K ON K.PACK_ID = P.CODE
     SET SALES_PRICE = (${new_price}+ IFNULL(@sales_price, 0) )* IFNULL(K.QTY, 1)
     WHERE K.PRODUCT_ID = ${code} /*ID DO PRODUTO*/;
    `
    const querry4 = `SET @sales_price = null;`

    db.query(querry1, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            db.query(querry2, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    db.query(querry3, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            db.query(querry4, (err, result) => { err ? console.log(err) : res.send(result) })
                        }
                    })
                }

            });
        }
    });
})




app.listen(3002, () => { console.log('servidor on'); });
