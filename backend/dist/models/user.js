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
exports.getAllUsers = exports.createUser = exports.getUserByUsername = exports.getUserById = void 0;
const db_1 = __importDefault(require("../db"));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield db_1.default.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0] || null;
});
exports.getUserById = getUserById;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield db_1.default.query('SELECT * FROM users WHERE username = $1', [
        username,
    ]);
    return res.rows[0] || null;
});
exports.getUserByUsername = getUserByUsername;
const createUser = (username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield getUserByUsername(username);
    if (existingUser) {
        throw new Error('Username already exists');
    }
    const res = yield db_1.default.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, password, email]);
    return res.rows[0];
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield db_1.default.query('SELECT * FROM users');
    return res.rows;
});
exports.getAllUsers = getAllUsers;
