"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 4000,
    SECRET: process.env.SECRET,
};
exports.default = config;
