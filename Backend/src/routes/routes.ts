import express from 'express';
import * as customerController from '../controllers/customerController';
import * as petsController from '../controllers/petsController';
import * as planetsController from '../controllers/planetsController';
import * as logisticsController from '../controllers/logisticsController';
import * as ordersController from '../controllers/ordersController';
import * as speciesManagerController from '../controllers/speciesManagerController';
import * as accountsController from '../controllers/accountsController';
import * as cartController from '../controllers/cartController';
import * as authController from '../controllers/authController';
import petImageUpload from '../middleware/upload';
import authenticate from '../middleware/authMiddleware';

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
router.post('/pets/:id/image', petImageUpload.single('image'), petsController.uploadPetImage);

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

// Accounts routes
router.get('/accounts', authenticate, accountsController.getAllAccounts);
router.get('/accounts/:id', authenticate, accountsController.getAccountById);
router.post('/accounts', authenticate, accountsController.createAccount);
router.put('/accounts/:id', authenticate, accountsController.updateAccount);
router.delete('/accounts/:id', authenticate, accountsController.deleteAccount);

// Cart routes
router.get('/carts', authenticate, cartController.getAllCarts);
router.get('/carts/:id', authenticate, cartController.getCartById);
router.post('/carts', authenticate, cartController.createCart);
router.post('/carts/:id/items', authenticate, cartController.addItemToCart);
router.patch('/carts/:cartId/items/:itemId', authenticate, cartController.updateCartItemQuantity);
router.delete('/carts/:cartId/items/:itemId', authenticate, cartController.removeItemFromCart);
router.patch('/carts/:id/status', authenticate, cartController.updateCartStatus);

// Auth routes
router.post('/auth/login', authController.login);
router.get('/auth/me', authenticate, authController.me);

export default router;