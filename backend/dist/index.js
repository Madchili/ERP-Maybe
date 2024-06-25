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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./models/user");
const order_1 = require("./models/order");
const item_1 = require("./models/item");
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// const corsOptions = {
//   origin: ['https://erp-maybe.vercel.app', 'https://erp-maybeoneday-6dfo.onrender.com', 'http://localhost:3000', 'http://localhost:3000/', 'https://erp-maybe.vercel.app/'],
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MARK: User Routes
app.get('/api/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send('Invalid user ID');
    }
    const user = yield (0, user_1.getUserById)(id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send('User not found');
    }
}));
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_1.getAllUsers)();
    res.json(users);
}));
app.post('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const newUser = yield (0, user_1.createUser)(username, password, email);
        const users = yield (0, user_1.getAllUsers)();
        res.status(201).json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Username already exists') {
                res.status(409).send('Username already exists');
            }
            else {
                res.status(500).send('Internal Server Error');
            }
        }
        else {
            res.status(500).send('Unknown Error');
        }
    }
}));
app.delete('/api/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send('Invalid user ID');
    }
    const user = yield (0, user_1.getUserById)(id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    yield db_1.default.query('DELETE FROM items WHERE order_id IN (SELECT id FROM orders WHERE user_id = $1)', [id]);
    yield db_1.default.query('DELETE FROM orders WHERE user_id = $1', [id]);
    yield db_1.default.query('DELETE FROM users WHERE id = $1', [id]);
    const users = yield (0, user_1.getAllUsers)();
    res.json(users);
}));
// MARK: Order Routes
app.get('/api/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, order_1.getAllOrders)();
    res.json(orders);
}));
app.post('/api/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body;
    const progress_status = 1;
    const total_amount = 0;
    const newOrder = yield (0, order_1.createOrder)(user_id, total_amount, progress_status);
    const orders = yield (0, order_1.getAllOrders)();
    res.status(201).json(orders);
}));
// MARK: Item Routes
app.get('/api/orders/:orderId/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.orderId, 10);
    if (isNaN(orderId)) {
        return res.status(400).send('Invalid order ID');
    }
    const items = yield (0, item_1.getItemsByOrderId)(orderId);
    res.json(items);
}));
app.post('/api/orders/:orderId/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.orderId, 10);
    if (isNaN(orderId)) {
        return res.status(400).send('Invalid order ID');
    }
    const orderCheck = yield db_1.default.query('SELECT id FROM orders WHERE id = $1', [orderId]);
    if (orderCheck.rowCount === 0) {
        return res.status(400).send('Order does not exist');
    }
    const { item_name, item_price } = req.body;
    const newItem = yield (0, item_1.createItem)(orderId, item_name, item_price);
    const items = yield (0, item_1.getItemsByOrderId)(orderId);
    res.status(201).json(items);
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
