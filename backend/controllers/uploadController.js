import fs from 'fs';
import path from 'path';

const processUploadedFile = async (uploadedFile) => {
    if (!uploadedFile) {
        throw new Error('Nenhum arquivo foi enviado.');
    }

    if (path.extname(uploadedFile.originalname) !== '.txt') {
        throw new Error('O arquivo deve ser um arquivo de texto (.txt).');
    }

    const data = fs.readFileSync(uploadedFile.path, 'utf-8');
    const lines = data.split('\n');

    const transactions = lines.map(line => {
        if (line.trim() === '') {
            return null; // Pula linhas em branco
        }

        return {
            type: line.substring(0, 1),
            date: new Date(line.substring(1, 26)),
            product: line.substring(26, 56).trim(),
            value: parseInt(line.substring(56, 66)),
            seller: line.substring(66, 86).trim()
        };
    }).filter(transaction => transaction !== null); // Filtra linhas nulas

    return transactions; // Retorna as linhas processadas
};

export default { processUploadedFile };
