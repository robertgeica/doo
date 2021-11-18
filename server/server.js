const express = require('express');
const cors = require('cors');

const app = express();

// connect database

// apply middlewares

// routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});