import { Box, Button, TextInput, Text, Heading } from "@ignite-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { BoxValidate, Container } from "./style";

export default function ValidatePrices() {

    interface Products {
        code: number;
        name: string;
        cost_price: number;
        sales_price: number;
        new_price: number;
        qty: number;
        pack_id: number | null;
        product_id: number | null;
        pack_price: number | null;

    }

    const [products, setProducts] = useState<Products[]>([])
    const router = useRouter()


    function handleReadCsv() {
        axios.get("http://localhost:3002/valited")
            .then((response) => {

                setProducts(response.data)

            })
    }

    async function handleUpdateNewPrice(new_price: number, code: number) {

        event?.preventDefault();
        await axios.post("http://localhost:3002/update", {
            code: code,
            new_price: new_price
        })
            .then((response) => { alert(`Produto de codigo ${code} foi atualizado no banco`) })

        const ProductsWithoutNewPrices = products?.filter(product => {
            return product.code !== code
        })

        setProducts(ProductsWithoutNewPrices)





    }

    function finishValidete() {
        if (products.length > 0) {
            alert('Ainda há produtos a serem validados! Por Favor verifique-os')
        } else {
            router.push('/')
        }
    }

    useEffect(() => {
        handleReadCsv()
    }, [])
   

    return (

        <Container>
            <Heading>Validar os preços do Reajuste</Heading>
            <BoxValidate>
                <Button onClick={finishValidete}>Finalizar</Button>
            </BoxValidate>


            {products?.map((product) => {

                return (

                    <BoxValidate key={product.code} as='form' onSubmit={() => handleUpdateNewPrice(product.new_price, product.code)}>

                        <Text>Codigo:</Text>
                        <TextInput
                            type='number'
                            value={product.code}
                            disabled
                        />

                        <Text>Produto:</Text>
                        <TextInput
                            placeholder='Nome do Produto'
                            defaultValue={product.name}
                            disabled
                        />
                        <Text>Preço atual:</Text>
                        <TextInput
                            prefix='R$'
                            type='number'
                            value={product.sales_price}
                            disabled
                        />
                        <Text>Preço de custo:</Text>
                        <TextInput
                            prefix='R$'
                            type='number'
                            defaultValue={product.cost_price}
                            disabled
                        />
                        <Text>Quantidade:</Text>
                        <TextInput
                            defaultValue={product.qty}
                            disabled
                        />

                        {
                            product.new_price > product.cost_price && product.new_price > (product.sales_price * 10 / 100)
                                ? <>
                                    <Text>Valor do Reajuste:</Text>
                                    <TextInput
                                        prefix='R$'
                                        value={(product.new_price).toFixed(2)}
                                        disabled
                                    />

                                    <div>
                                        <Button type='submit'>Validar</Button>
                                      
                                    </div>

                                </>
                                : <>

                                    <Button disabled type='submit'>Atualizar</Button>
                                    <span>O valor do reajuste é menor do que o preço de custo ou maior do que 10% do valor atual</span>
                                </>
                        }




                    </BoxValidate >
                )
            })
            }
        </Container>
    )
}