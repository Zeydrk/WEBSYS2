/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cart_Items', {
      cartItemId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      cartId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Carts',
          key: 'cartId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      petId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Pets',
          key: 'petId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cart_Items');
  }
};