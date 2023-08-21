import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import api from '../api';
import {Link, useHistory} from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setMessage('Preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem.');
            return;
        }

        try {
            // Verificar se o email já está cadastrado
            const response = await api.get(`/auth/check-email?email=${email}`);
            if (response.status === 200 && response.data.exists) {
                setMessage('Este email já está cadastrado. Tente fazer login.');
                return;
            }

            // Registrar o usuário
            const registerResponse = await api.post('/auth/register', { name, email, password });
            if (registerResponse.status === 200) {
                setMessage('Registro bem-sucedido! Redirecionando para a página de login...');
                setTimeout(() => {
                    history.push('/login'); // Redireciona para a página de login após registro
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao fazer registro:', error);
            setMessage('Erro ao registrar. Verifique os campos e tente novamente.');
        }
    };

    return (
        <div className="login-container">
            <h1>Registrar uma nova conta</h1>
            <Form>
                <Form.Field>
                    <label>Nome</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Senha</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Confirmar Senha</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Field>
                <Button primary onClick={handleRegister}>Registrar</Button>
            </Form>
            {message && <Message>{message}</Message>}
            <p>Já tem uma conta? <Link to="/login">Faça login aqui</Link></p>
        </div>
    );
};

export default Register;
