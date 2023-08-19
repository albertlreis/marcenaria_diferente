import React, {useState, useEffect} from 'react';
import { format } from 'date-fns';
import api from '../api';
import ReactPaginate from 'react-paginate';
import '../TransactionList.css';

const TransactionList = ({ transactionsUpdated }) => {
    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = async (page) => {
        try {
            const response = await api.get(`/transaction/show?page=${page.selected + 1}`);
            setTransactions(response.data.data);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
        }
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transaction/show');
                setTransactions(response.data.data);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransactions();
    }, [transactionsUpdated]);

    return (
        <div>
            <h2 className="ui header">Lista de Transações Importadas</h2>
            {transactions.length > 0 ? (
                <table className="ui celled table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Valor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss')}</td>
                            <td>{transaction.product}</td>
                            <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.value)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Não há transações para exibir.</p>
            )}
            <ReactPaginate
                previousLabel={'Anterior'}
                nextLabel={'Próxima'}
                pageCount={totalPages}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                previousLinkClassName={'prev'}
                nextLinkClassName={'next'}
            />
        </div>
    );
};

export default TransactionList;
