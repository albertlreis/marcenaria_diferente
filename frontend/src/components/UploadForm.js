import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import api from '../api';
import '../styles/UploadForm.css';

const UploadForm = ({ onTransactionsUpdated, onLogout  }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                setLoading(true);
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
            } finally {
                setLoading(false)
            }
        } else {
            setMessage('Selecione um arquivo para fazer o upload.');
        }
    };

    const handleLogout = () => {
        onLogout(); // Chama a função de logout passada como prop
    };

    return (
        <div className="upload-form-container">
            <h1 className="upload-form-title">Upload de Arquivo</h1>
            <Form loading={loading}>
                <Form.Field>
                    <label>Selecione um arquivo</label>
                    <input type="file" onChange={handleFileChange} />
                </Form.Field>
                <Button primary onClick={handleUpload}>
                    Enviar
                </Button>
                <Button secondary onClick={handleLogout}>Logout</Button>
            </Form>
            {message && <Message>{message}</Message>}
        </div>
    );
};

export default UploadForm;
