/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      orderId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
    
      customerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'customerId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
    
      logisticsId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Logistics',
          key: 'logisticsId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      totalCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      deliveryPlanet: {
        type: Sequelize.STRING
      },
      estimatedDeliveryDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Orders');
  }
};