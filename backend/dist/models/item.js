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
exports.createItem = exports.getItemsByOrderId = void 0;
const db_1 = __importDefault(require("../db"));
const getItemsByOrderId = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield db_1.default.query('SELECT * FROM items WHERE order_id = $1', [
        orderId,
    ]);
    return res.rows;
});
exports.getItemsByOrderId = getItemsByOrderId;
const createItem = (orderId, item_name, item_price) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield db_1.default.query('INSERT INTO items (order_id, item_name, item_price) VALUES ($1, $2, $3) RETURNING *', [orderId, item_name, item_price]);
    return res.rows[0];
});
exports.createItem = createItem;
