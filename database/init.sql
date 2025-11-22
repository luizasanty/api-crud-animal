-- Arquivo: projeto-csm/database/init.sql

-- 1. Criação do Banco de Dados
-- Este comando cria o banco de dados se ele ainda não existir.
CREATE DATABASE IF NOT EXISTS csm_cadastro_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Seleciona o Banco de Dados para que as próximas instruções sejam executadas nele
USE csm_cadastro_db;

-- 2. Criação da Tabela Animal
-- Cria a tabela 'animal' com os campos necessários.
CREATE TABLE IF NOT EXISTS animal (
    -- ID único gerado automaticamente, usado como chave primária
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Código do Lacre (obrigatório e único, como um identificador)
    codigo_lacre VARCHAR(50) NOT NULL UNIQUE,
    
    -- Nome do animal (obrigatório)
    nome_animal VARCHAR(100) NOT NULL,
    
    -- Código de Registro (opcional, mas deve ser único se preenchido)
    codigo_registro VARCHAR(50) UNIQUE,
    
    -- Registros dos pais (podem ser nulos/vazios)
    codigo_registro_pai VARCHAR(50) NULL,
    codigo_registro_mae VARCHAR(50) NULL,
    
    -- Peso Inicial (aceita números decimais, com até 10 dígitos no total e 2 após a vírgula)
    peso_inicial DECIMAL(10, 2) NOT NULL,
    
    -- Data de Nascimento
    data_nascimento DATE NOT NULL,
    
    -- Data de cadastro (registra quando a linha foi inserida)
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Comando de Verificação (Opcional, mas útil para o professor)
SELECT * FROM animal;