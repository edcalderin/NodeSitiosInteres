"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SitesController_1 = __importDefault(require("../controllers/SitesController"));
const validator_1 = require("../validator");
const router = express_1.Router();
const sitesControllers = new SitesController_1.default();
router.route('/')
    .get(sitesControllers.getSites.bind(sitesControllers))
    .post(validator_1.checkSiteBody(), sitesControllers.createSite.bind(sitesControllers))
    .put(validator_1.checkSiteBody(), sitesControllers.updateSite.bind(sitesControllers));
router.route('/:id')
    .get(sitesControllers.getSiteById)
    .delete(sitesControllers.deleteSite);
exports.default = router;
