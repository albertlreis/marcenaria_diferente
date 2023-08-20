import express from 'express';
import uploadRoutes from './routes/uploadRoutes.js';
import cors from 'cors';
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

// Configurar o CORS para permitir a origem do front-end
const corsOptions = {
    origin: 'http://localhost:3000', // Ajuste a URL do seu front-end
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 5000;

// Rotas
app.use('/upload', uploadRoutes);
app.use('/transaction', transactionRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
