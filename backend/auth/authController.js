import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../models/User.js";

const SECRET_KEY = 'marcenaria';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword)

        const user = await User.create({
            username: name,
            email,
            password: hashedPassword,
        });

        res.status(200).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

export const logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

export const checkAuth = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Pega o token do cabeçalho da requisição

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        jwt.verify(token, 'marcenaria'); // Verifica o token com a chave secreta
        res.status(200).json({ message: 'Usuário autenticado.' });
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        res.status(401).json({ message: 'Token inválido.' });
    }
}

export const checkEmail = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({
            where: { email }
        });

        if (user) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao verificar email.' });
    }
};