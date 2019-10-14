"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_client_1 = __importDefault(require("../controllers/firebase_client"));
const express_1 = require("express");
const router = express_1.Router();
const Firebase_client = new firebase_client_1.default();
router.post('/', Firebase_client.signIn);
exports.default = router;
