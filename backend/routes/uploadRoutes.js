import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import uploadController from '../controllers/uploadController.js';

const router = express.Router();

// Verifica se a pasta uploads existe e a cria se necessário
const uploadsFolderPath = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsFolderPath)) {
    fs.mkdirSync(uploadsFolderPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const uploadedFile = req.file;
        const lines = await uploadController.processUploadedFile(uploadedFile);

        res.status(200).json({ message: 'Arquivo recebido, salvo e parseado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar o arquivo.' });
    }
});

export default router;
