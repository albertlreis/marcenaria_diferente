import React, { useState } from 'react';

const FileUpload = () => {
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
                const response = await fetch('http://localhost:8000/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage('Arquivo enviado com sucesso!');
                } else {
                    setMessage(`Erro: ${data.error}`);
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

export default FileUpload;
