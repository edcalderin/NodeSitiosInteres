"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../controllers/index"));
const router = express_1.Router();
const sitesControllers = new index_1.default();
router.route('/')
    .get(sitesControllers.getSites)
    .post(sitesControllers.createSite)
    .put(sitesControllers.updateSite)
    .delete(sitesControllers.deleteSite);
router.get('/:id', sitesControllers.getSite);
exports.default = router;
