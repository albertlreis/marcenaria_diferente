import express from 'express';

const app = express();

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
