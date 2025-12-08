"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerController = __importStar(require("../controllers/customerController"));
const petsController = __importStar(require("../controllers/petsController"));
const planetsController = __importStar(require("../controllers/planetsController"));
const logisticsController = __importStar(require("../controllers/logisticsController"));
const ordersController = __importStar(require("../controllers/ordersController"));
const speciesManagerController = __importStar(require("../controllers/speciesManagerController"));
const router = express_1.default.Router();
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
exports.default = router;
