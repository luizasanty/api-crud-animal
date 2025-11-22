// projeto-csm/backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// --- Importação Corrigida: O Knex é uma função de fábrica ---
const knex = require('knex'); 

require('dotenv').config(); // Carrega as variáveis de ambiente

const app = express();
const port = 3000;

// Configuração do Middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Configuração do Knex usando dotenv ---
const db = knex({ // Usamos a variável 'db' para as consultas
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    }
});

// =======================================================
// ROTA 1: CONSULTA (GET /api/animais) - READ
// =======================================================
app.get('/api/animais', async (req, res) => {
    try {
        const animais = await db('animal').select('*'); 
        res.status(200).json(animais);
    } catch (error) {
        console.error('Erro ao listar animais:', error);
        res.status(500).json({ message: 'Erro ao consultar o banco de dados.' });
    }
});

// =======================================================
// ROTA 2: INCLUSÃO (POST /api/animais) - CREATE
// =======================================================
app.post('/api/animais', async (req, res) => {
    const animalData = req.body;

    try {
        const [insertId] = await db('animal').insert(animalData);
        
        res.status(201).json({ 
            message: 'Animal cadastrado com sucesso!', 
            id: insertId
        });
    } catch (error) {
        console.error('ERRO CRÍTICO DE CADASTRO:', error.message);
        res.status(500).json({ 
            message: 'Erro ao cadastrar animal.', 
            error: error.message
        });
    }
});

// =======================================================
// ROTA 3: ALTERAÇÃO (PUT /api/animais/:id) - UPDATE
// =======================================================
app.put('/api/animais/:id', async (req, res) => {
    const animalId = req.params.id;
    const animalData = req.body;

    try {
        const rowsAffected = await db('animal').where('id', animalId).update(animalData);

        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Animal não encontrado para alteração.' });
        }

        res.status(200).json({ 
            message: 'Animal alterado com sucesso!', 
            id: animalId
        });
    } catch (error) {
        console.error('ERRO CRÍTICO DE ALTERAÇÃO:', error.message);
        res.status(500).json({ message: 'Erro ao alterar registro no banco de dados.' });
    }
});


// =======================================================
// ROTA 4: EXCLUSÃO (DELETE /api/animais/:id) - DELETE
// =======================================================
app.delete('/api/animais/:id', async (req, res) => {
    const animalId = req.params.id;

    try {
        const rowsAffected = await db('animal').where('id', animalId).del();

        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Animal não encontrado para exclusão.' });
        }

        res.status(200).json({ message: 'Animal excluído com sucesso!', id: animalId });

    } catch (error) {
        console.error('ERRO CRÍTICO DE EXCLUSÃO:', error.message);
        res.status(500).json({ message: 'Erro ao excluir animal no banco de dados.' });
    }
});


// =======================================================
// INICIALIZAÇÃO DO SERVIDOR (DEVE SER A ÚLTIMA COISA DO ARQUIVO)
// =======================================================
app.listen(port, () => {
    console.log(`Servidor Node.js rodando em http://localhost:${port}`);
});