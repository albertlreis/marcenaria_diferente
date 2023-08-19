import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

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

router.post('/upload', upload.single('file'), (req, res) => {
    const uploadedFile = req.file;

    if (!uploadedFile) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
    }

    if (path.extname(uploadedFile.originalname) !== '.txt') {
        return res.status(400).json({ error: 'O arquivo deve ser um arquivo de texto (.txt).' });
    }

    res.status(200).json({ message: 'Arquivo recebido e salvo com sucesso.' });
});

export default router;
