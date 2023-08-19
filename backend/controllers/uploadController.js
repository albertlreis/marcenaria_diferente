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

    return lines; // Retorna as linhas processadas
};

export default { processUploadedFile };
