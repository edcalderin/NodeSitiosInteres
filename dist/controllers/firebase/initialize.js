"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("firebase"));
exports.firebase = firebase_1.default;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.admin = firebase_admin_1.default;
const firebase_config_1 = require("./firebase-config");
firebase_1.default.initializeApp(firebase_config_1.config);
firebase_admin_1.default.initializeApp(firebase_config_1.config);
