'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transactionTypes = [
      {
        id: 1,
        description: 'Venda produtor',
        nature: 'Entrada',
        signal: '+'
      },
      {
        id: 2,
        description: 'Venda afiliado',
        nature: 'Entrada',
        signal: '+'
      },
      {
        id: 3,
        description: 'Comissão paga',
        nature: 'Saída',
        signal: '-'
      },
      {
        id: 4,
        description: 'Comissão recebida',
        nature: 'Entrada',
        signal: '+'
      }
    ];

    await queryInterface.bulkInsert('transaction_types', transactionTypes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transaction_types', null, {});
  }
};
