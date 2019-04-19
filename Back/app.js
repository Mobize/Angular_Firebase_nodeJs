"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
var UsersController = require('./users/UsersController');
app.use('/users', UsersController);

module.exports = app;