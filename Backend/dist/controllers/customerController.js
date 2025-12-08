"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomerById = exports.getAllCustomers = void 0;
const getDb = () => require('../../models');
// Get all customers
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield getDb().Customer.findAll();
        res.json(customers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting customers', error });
    }
});
exports.getAllCustomers = getAllCustomers;
// Get one customer by ID
const getCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield getDb().Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting customer', error });
    }
});
exports.getCustomerById = getCustomerById;
// Create new customer
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, contactNo } = req.body;
        const customer = yield getDb().Customer.create({
            name,
            email,
            contactNo
        });
        res.status(201).json(customer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating customer', error });
    }
});
exports.createCustomer = createCustomer;
// Update customer
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, contactNo } = req.body;
        const customer = yield getDb().Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        yield customer.update({ name, email, contactNo });
        res.json(customer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating customer', error });
    }
});
exports.updateCustomer = updateCustomer;
// Delete customer
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield getDb().Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        yield customer.destroy();
        res.json({ message: 'Customer deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error });
    }
});
exports.deleteCustomer = deleteCustomer;
