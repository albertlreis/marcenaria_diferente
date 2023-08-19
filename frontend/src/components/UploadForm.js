import React, { useState } from 'react';
import api from '../api';

const UploadForm = ({ onTransactionsUpdated }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await api.post('/upload', formData);

                if (response.status === 200) {
                    setMessage('Arquivo enviado com sucesso!');
                    onTransactionsUpdated(); // Atualiza a lista de transações
                } else {
                    setMessage(`Erro: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Erro ao fazer o upload:', error);
                setMessage('Ocorreu um erro ao fazer o upload do arquivo.');
            }
        } else {
            setMessage('Selecione um arquivo para fazer o upload.');
        }
    };

    return (
        <div>
            <h1>Upload de Arquivo</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Enviar</button>
            <div>{message}</div>
        </div>
    );
};

export default UploadForm;
