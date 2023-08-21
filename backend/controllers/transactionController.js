import Transaction from '../models/Transaction.js';
import TransactionType from "../models/TransactionType.js";

export const getAllTransactions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const totalCount = await Transaction.count();
        const totalPages = Math.ceil(totalCount / pageSize);

        const transactions = await Transaction.findAll({
            include: [
                {
                    model: TransactionType,
                    attributes: ['description'],
                }
            ],
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });

        res.json({
            data: transactions,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).json({error: 'Erro ao buscar transações.'});
    }
};
