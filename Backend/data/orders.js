const ids = require('./ids');

module.exports = [
  {
    orderId: ids.ORDER_1,
    customerId: ids.CUSTOMER_ZAPP,
    logisticsId: ids.LOGISTICS_GALACTIC_EXPRESS,
    orderDate: new Date('2025-10-01T10:00:00Z'),
    status: 'Delivered',
    totalCost: 1550.00,
    deliveryPlanet: 'Mars',
    estimatedDeliveryDate: new Date('2025-10-15T10:00:00Z'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: ids.ORDER_2,
    customerId: ids.CUSTOMER_LEIA,
    logisticsId: ids.LOGISTICS_KESSEL_RUN_COURIERS,
    orderDate: new Date('2025-11-05T09:30:00Z'),
    status: 'Processing',
    totalCost: 550.00,
    deliveryPlanet: 'Earth',
    estimatedDeliveryDate: new Date('2025-11-20T10:00:00Z'),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];