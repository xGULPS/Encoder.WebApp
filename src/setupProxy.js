﻿const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "api"
];

module.exports = function (app) {
    
    app.use('/api',
        createProxyMiddleware({
            target: 'https://localhost:5001',

            changeOrigin: true,
        }));
};
