#  Projeto CSM - CRUD de Cadastro de Animais (Node.js, Knex e MySQL)

Este projeto implementa um sistema CRUD (Create, Read, Update, Delete) completo para o cadastro de animais, utilizando uma arquitetura simples de Backend (Node.js) e Frontend (HTML/CSS/JS).

---

##  Tecnologias Utilizadas

* **Backend:** Node.js, Express.js
* **Banco de Dados:** MySQL (Driver Knex)
* **ORM/Query Builder:** Knex.js
* **Front-end:** HTML, Bootstrap 5, JavaScript (Fetch API)

---

##  1. Configuração do Banco de Dados (MySQL)

Para iniciar o projeto, é necessário ter um servidor MySQL rodando.

### A. Criar o Banco de Dados

Crie um novo banco de dados chamado `csm_cadastro_db`.

### B. Criar a Tabela `animal`

Execute o seguinte comando SQL para criar a tabela, garantindo que o `codigo_lacre` e `codigo_registro` sejam UNIQUE:

```sql
CREATE TABLE animal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_lacre VARCHAR(50) NOT NULL UNIQUE,
    nome_animal VARCHAR(100),
    codigo_registro VARCHAR(50) NOT NULL UNIQUE,
    codigo_registro_pai VARCHAR(50),
    codigo_registro_mae VARCHAR(50),
    peso_inicial DECIMAL(10, 2),
    data_nascimento DATE
);
(Pode inserir alguns dados de teste nesta tabela, se necessário, para validar a função READ.)

 2. Configuração do Backend (Node.js)
A. Instalar Dependências
Abra o terminal e navegue até a pasta do backend:

cd backend

Instale todas as dependências do Node.js:


npm install

B. Arquivo de Configuração (.env)
O projeto utiliza o arquivo .env para gerenciar as credenciais do banco de dados (este arquivo não está no GitHub por questões de segurança).

Crie um novo arquivo chamado .env dentro da pasta /backend/.

Substitua os valores de conexão pelas suas credenciais MySQL:

# Exemplo de configuração
DB_CLIENT=mysql
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=SUA_SENHA_AQUI
DB_DATABASE=csm_cadastro_db
DB_PORT=3306
C. Iniciar o Servidor
No terminal (ainda dentro da pasta /backend), inicie o servidor Node.js:

npm start
O servidor deve iniciar na porta 3000.

 3. Acessar o Frontend
O Frontend é baseado em HTML puro e não requer um servidor para ser visualizado (apenas o backend ativo).

Navegue até a pasta /frontend/.

Abra o arquivo index.html diretamente no seu navegador.

O sistema estará funcional, permitindo a Consulta (READ), Cadastro (CREATE), Alteração (UPDATE) e Exclusão (DELETE) de registros na tabela animal.
