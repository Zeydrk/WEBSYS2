import express from 'express';
import * as customerController from '../controllers/customerController';
import * as petsController from '../controllers/petsController';
import * as planetsController from '../controllers/planetsController';
import * as logisticsController from '../controllers/logisticsController';
import * as ordersController from '../controllers/ordersController';
import * as speciesManagerController from '../controllers/speciesManagerController';

const router = express.Router();

// Customer routes
router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.post('/customers', customerController.createCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);

// Pets routes
router.get('/pets', petsController.getAllPets);
router.get('/pets/:id', petsController.getPetById);
router.post('/pets', petsController.createPet);
router.put('/pets/:id', petsController.updatePet);
router.delete('/pets/:id', petsController.deletePet);
router.patch('/pets/:id/stock', petsController.updateStock);

// Planets routes
router.get('/planets', planetsController.getAllPlanets);
router.get('/planets/:id', planetsController.getPlanetById);
router.post('/planets', planetsController.createPlanet);
router.put('/planets/:id', planetsController.updatePlanet);
router.delete('/planets/:id', planetsController.deletePlanet);

// Logistics routes
router.get('/logistics', logisticsController.getAllLogistics);
router.get('/logistics/:id', logisticsController.getLogisticsById);
router.post('/logistics', logisticsController.createLogistics);
router.put('/logistics/:id', logisticsController.updateLogistics);
router.delete('/logistics/:id', logisticsController.deleteLogistics);

// Orders routes
router.get('/orders', ordersController.getAllOrders);
router.get('/orders/:id', ordersController.getOrderById);
router.post('/orders', ordersController.createOrder);
router.patch('/orders/:id/status', ordersController.updateOrderStatus);
router.delete('/orders/:id', ordersController.deleteOrder);

// Species Manager routes
router.get('/managers', speciesManagerController.getAllManagers);
router.get('/managers/:id', speciesManagerController.getManagerById);
router.post('/managers', speciesManagerController.createManager);
router.put('/managers/:id', speciesManagerController.updateManager);
router.delete('/managers/:id', speciesManagerController.deleteManager);

export default router;