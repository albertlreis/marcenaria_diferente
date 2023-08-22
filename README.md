# Projeto Marcenaria Diferente

Este projeto é uma aplicação web que possibilita o upload de arquivos de transações de produtos vendidos por criadores e afiliados. Utiliza Node.js para o backend, React para o frontend, PostgreSQL para o banco de dados e Docker para facilitar o ambiente de desenvolvimento.

>This is a challenge by Coodesh

## Requisitos

- Docker: [Instruções de instalação](https://docs.docker.com/get-docker/)
- Node.js: [Instruções de instalação](https://nodejs.org/)
- npm (Node Package Manager): Geralmente é instalado junto com o Node.js.

## Clonar o Repositório

```bash
git clone https://github.com/albertlreis/marcenaria_diferente.git
cd marcenaria_diferente
```

## Configuração

### Backend

1. Navegue para a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na pasta `backend` com as configurações do banco de dados:

```plaintext
DB_HOST=db
DB_PORT=5432
DB_NAME=marcenaria
DB_USER=marcenaria_user
DB_PASSWORD=senha_secreta
```

4. Execute as migrações do banco de dados:

```bash
npx sequelize-cli db:migrate
```

### Frontend

5. Navegue para a pasta do frontend:

```bash
cd ../frontend
```

6. Instale as dependências:

```bash
npm install
```

## Executando a Aplicação

7. Na pasta raiz do projeto (`marcenaria_diferente`), execute o Docker Compose para criar e iniciar os contêineres:

```bash
docker-compose build
docker-compose up
```
>Esse processo pode ser demorado dependendo da capacidade de processamento do computador/servidor

8. Isso iniciará três containers: um para o backend, outro para o frontend e um terceiro para o banco de dados PostgreSQL. 

9. Acesse a aplicação no seu navegador em `http://localhost:3000`.

10. Na página inicial, clique no link "Registrar" para criar uma conta. 

11. Após o registro, você será redirecionado para a página de login. Faça o login com suas credenciais recém-criadas. 

12. Agora você está logado e pode enviar arquivos de transações e listar as transações.

13. Você deve utilizar o arquivo [sales.txt](https://lab.coodesh.com/albertlreis/fullstack-afiliados/-/blob/main/sales.txt) para fazer o teste da aplicação.

## Parando a Aplicação

14. Pressione `Ctrl+C` no terminal onde você executou o `docker-compose up`.

15. Para remover os contêineres e redes do Docker Compose:

```bash
docker-compose down
```

## Notas

- Certifique-se de que as portas 3000 (frontend), 5000 (backend) e 5432 (PostgreSQL) não estejam em uso por outros processos.

- As configurações de ambiente e segredos são armazenados nos arquivos `.env` (backend) e `.env.local` (frontend) e **não devem ser versionados**.

- Este README é um guia básico. Consulte a documentação oficial do Docker e das ferramentas utilizadas para mais detalhes.

```