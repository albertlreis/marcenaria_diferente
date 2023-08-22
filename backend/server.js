import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './auth/authRoutes.js';
import transactionRoutes from "./routes/transactionRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

// Configurar o CORS para permitir a origem do front-end
const corsOptions = {
    origin: '*', // Permitir qualuqer origem
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 5000;

// Rotas
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/transaction', transactionRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
