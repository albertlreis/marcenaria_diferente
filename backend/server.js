import express from 'express';
import uploadRoutes from './routes/uploadRoutes.js';
import cors from 'cors';

const app = express();

// Configurar o CORS para permitir a origem do front-end
const corsOptions = {
    origin: 'http://localhost:3000', // Ajuste a URL do seu front-end
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 8000;

// Rotas
app.use('/api', uploadRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
