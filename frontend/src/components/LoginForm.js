import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import api from '../api';
import {Link, useHistory} from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
                history.push('/'); // Redireciona para a página protegida
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setMessage('Credenciais inválidas.');
        }
    };

    return (
        <div className="login-container">
            <h1>Faça login</h1>
            <Form>
                <Form.Field>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Senha</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Field>
                <Button primary onClick={handleLogin}>Login</Button>
                <p>Não tem uma conta? <Link to="/register">Registre-se aqui</Link></p>
            </Form>
            {message && <Message>{message}</Message>}
        </div>
    );
};

export default Login;
