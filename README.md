## Acesso Online
Para acessar o projeto online acesse o link:
```bash
https://tech-test-shopper.vercel.app/
```
## 1. Configurar localmente

Clone o projeto

```bash
  git clone https://github.com/Pedro-Martes/Teste_shopper
```

Entre no diretório raiz do projeto

```bash
  cd Teste_shopper
```

Instale as dependências

```bash
  npm install
```

Entre no diretório "server" do projeto:

```bash
  cd Teste_shopper/server
```

Instale as dependências:
```bash
  npm install
```
## 2. Configurar a conexão com o Banco de dados MYSQL(8.0)
Entre no diretório:
```bash
cd /Teste_shopper/server/src/
```
Dentro do arquivo index, edite a conexão com o banco:
```bash
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'databaseName'
})
```
## 3. Iniciando localmente

Iniciando o banco:
```bash
cd /Teste_shopper/server
npm run dev
```

Iniciando o projeto:
```bash
cd /Teste_shopper
npm run dev
```
