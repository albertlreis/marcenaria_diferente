import React, { useState, useEffect } from 'react';
import api from '../api';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Função para buscar as transações importadas
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transaction/show');
                setTransactions(response.data);
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Lista de Transações Importadas</h2>
            <table className="ui celled table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Produto</th>
                    <th>Valor</th>
                    {/* Adicione mais colunas conforme necessário */}
                </tr>
                </thead>
                <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.product}</td>
                        <td>{transaction.value}</td>
                        {/* Adicione mais colunas conforme necessário */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
