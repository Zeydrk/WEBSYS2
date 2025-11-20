/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_Pets', {
      orderSpeciesId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      // Foreign Key to Orders
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'orderId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // Foreign Key to Pets
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
      speciesBaseCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      transportCostApplied: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      finalItemCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
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

    // Optional unique constraint on the combination of Order and Pet
    await queryInterface.addConstraint('Order_Pets', {
        fields: ['orderId', 'petId'],
        type: 'unique',
        name: 'unique_order_pet_item'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_Pets');
  }
};