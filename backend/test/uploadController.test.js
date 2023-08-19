import fs from 'fs';
import path from 'path';
import UploadController from '../controllers/uploadController';
import Transaction from '../models/Transaction';

jest.mock('fs'); // Mockando o módulo fs

// Mock para Transaction.sync e Transaction.create
jest.mock('../models/Transaction');

describe('Upload Controller', () => {
    test('should process uploaded file correctly', async () => {
        const readFileSyncMock = jest.spyOn(fs, 'readFileSync');
        const mockedData = '...'; // Dados simulados do arquivo
        readFileSyncMock.mockReturnValue(mockedData);

        const uploadedFile = {
            originalname: 'test-file.txt',
            path: path.resolve(__dirname, 'uploads', 'test-file.txt') // Caminho absoluto do arquivo
        };

        console.log("uploadedFile:::::::: ", uploadedFile)

        const data = '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS\n';
        fs.readFileSync.mockReturnValue(data);

        const processedTransactions = await UploadController.processUploadedFile(uploadedFile);

        expect(processedTransactions).toHaveLength(1);
        expect(Transaction.sync).toHaveBeenCalled();
        expect(Transaction.create).toHaveBeenCalled();
    });

    test('should throw an error if no file is uploaded', async () => {
        await expect(UploadController.processUploadedFile(null)).rejects.toThrow('Nenhum arquivo foi enviado.');
    });

    test('should throw an error if uploaded file is not a .txt file', async () => {
        const uploadedFile = {
            originalname: 'test-file.png',
            path: 'path/to/test-file.png'
        };

        await expect(UploadController.processUploadedFile(uploadedFile)).rejects.toThrow('O arquivo deve ser um arquivo de texto (.txt).');
    });

    test('should handle file upload', async () => {
        const req = { file: { path: 'path/to/test-file.txt' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        await UploadController.handleUpload(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Arquivo processado com sucesso',
            transactions: expect.any(Array)
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should handle file upload error', async () => {
        const req = { file: { path: 'path/to/test-file.txt' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        mocked(UploadController.processUploadedFile).mockRejectedValue(new Error('Erro ao processar o arquivo'));

        await UploadController.handleUpload(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ocorreu um erro ao processar o arquivo' });
        expect(next).not.toHaveBeenCalled();
    });

    // Adicione mais casos de teste conforme necessário
});
