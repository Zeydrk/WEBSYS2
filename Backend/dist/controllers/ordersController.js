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
exports.deleteOrder = exports.updateOrderStatus = exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const getDb = () => require('../../models');
// Get all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield getDb().Orders.findAll({
            include: [
                {
                    model: getDb().Customer,
                    as: 'customer'
                },
                {
                    model: getDb().Logistics,
                    as: 'logisticsProvider'
                },
                {
                    model: getDb().Pets,
                    as: 'items'
                }
            ]
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting orders', error });
    }
});
exports.getAllOrders = getAllOrders;
// Get one order by ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield getDb().Orders.findByPk(req.params.id, {
            include: [
                {
                    model: getDb().Customer,
                    as: 'customer'
                },
                {
                    model: getDb().Logistics,
                    as: 'logisticsProvider'
                },
                {
                    model: getDb().Pets,
                    as: 'items'
                }
            ]
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting order', error });
    }
});
exports.getOrderById = getOrderById;
// Create new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, logisticsId, deliveryPlanet, items } = req.body;
        // Validate input
        if (!customerId || !logisticsId || !deliveryPlanet) {
            return res.status(400).json({ message: 'Missing required fields: customerId, logisticsId, deliveryPlanet' });
        }
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items array is required and must not be empty' });
        }
        // Validate customer exists
        const customer = yield getDb().Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: `Customer ${customerId} not found` });
        }
        // Fetch logistics provider once (outside the loop)
        const logistics = yield getDb().Logistics.findByPk(logisticsId);
        if (!logistics) {
            return res.status(404).json({ message: `Logistics provider ${logisticsId} not found` });
        }
        // Calculate total cost
        let totalCost = 0;
        const orderItems = [];
        for (const item of items) {
            // Validate item structure
            if (!item.petId || !item.quantity || item.quantity <= 0) {
                return res.status(400).json({ message: 'Each item must have petId and quantity > 0' });
            }
            const pet = yield getDb().Pets.findByPk(item.petId);
            if (!pet) {
                return res.status(404).json({ message: `Pet ${item.petId} not found` });
            }
            // Check stock
            if (pet.stockQty < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${pet.name}. Available: ${pet.stockQty}`
                });
            }
            const transportCost = parseFloat(pet.basePrice) * parseFloat(logistics.delivery_rate);
            const itemTotal = (parseFloat(pet.basePrice) + transportCost) * item.quantity;
            totalCost += itemTotal;
            orderItems.push({
                petId: item.petId,
                quantity: item.quantity,
                speciesBaseCost: parseFloat(pet.basePrice),
                transportCostApplied: transportCost,
                finalItemCost: itemTotal
            });
        }
        // Calculate estimated delivery (example: 5 days from now)
        const estimatedDelivery = new Date();
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
        // Create order
        const order = yield getDb().Orders.create({
            customerId,
            logisticsId,
            orderDate: new Date(),
            status: 'Pending',
            totalCost,
            deliveryPlanet,
            estimatedDeliveryDate: estimatedDelivery
        });
        // Create order items and update stock
        for (const item of orderItems) {
            yield getDb().Order_Pets.create(Object.assign({ orderId: order.orderId }, item));
            const pet = yield getDb().Pets.findByPk(item.petId);
            yield pet.update({
                stockQty: pet.stockQty - item.quantity
            });
        }
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});
exports.createOrder = createOrder;
// Update order status
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const order = yield getDb().Orders.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        yield order.update({ status });
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
});
exports.updateOrderStatus = updateOrderStatus;
// Delete order
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield getDb().Orders.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        yield order.destroy();
        res.json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
});
exports.deleteOrder = deleteOrder;
