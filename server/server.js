const express = require('express');
const cors = require('cors');
const connectDb = require('./config/database');

const app = express();

// connect database
connectDb();

// apply middlewares
app.use(cors());
app.use(express.json({ extended: false }));

// routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/workplace', require('./routes/workplaceRoutes'));
app.use('/api/collection', require('./routes/collectionRoutes'));
app.use('/api/block', require('./routes/blockRoutes'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});