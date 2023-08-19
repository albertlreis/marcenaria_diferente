import express from 'express';
import uploadRoutes from './routes/uploadRoutes.js'; // Caminho para suas rotas

const app = express();

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 8000;

// Rotas
app.use('/api', uploadRoutes); // Use um prefixo de rota, como '/api', para suas rotas

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
