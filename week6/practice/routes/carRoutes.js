const { newCar } = require("../controllers/carShopController");
const express = require("express");

const routes = express.Router();

routes.post("/create", newCar);

module.exports = routes;
