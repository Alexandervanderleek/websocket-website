const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const configureMiddleware = (app) => {
   app.use(express.json());
   
   app.use(cors());


   app.use(cookieParser());

   app.use(mongoSanitize());

   app.use(xssClean());

   app.use(
    expressRateLimit({
        windowMs: 10 * 60 * 100,
        max: 100
    })
   )

   app.use(hpp())
};

module.exports = configureMiddleware;