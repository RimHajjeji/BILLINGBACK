const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Load environment variables from config.env
dotenv.config({ path: './Config/config.env' });

// Import routes
const UserRoute = require('./Routes/UserRoute');
const DevisRoute = require('./Routes/DevisRoute');
const AdminRoute = require('./Routes/AdminRoute');
const MaterialRoute = require('./Routes/MaterialRoute');
const ClientRoute = require('./Routes/ClientRoute');
const ServiceRoute = require('./Routes/ServiceRoute');
const CompanyRoute = require('./Routes/CompanyRoute');
const InvoiceRoute = require('./Routes/InvoiceRoute');
const AuthRegister = require('./Routes/AuthRout/RegisterRoute');
const AuthLogin = require('./Routes/AuthRout/LoginRoute');

// Connect to the database
const connectDB = require('./Config/db');
connectDB();

// Express app
const app = express();

// Middleware
app.use(cookieParser());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // Adjust this as needed
}));

// Define routes
app.use('/user', UserRoute);
app.use('/admin', AdminRoute);
app.use('/client', ClientRoute);
app.use('/material', MaterialRoute);
app.use('/service', ServiceRoute);
app.use('/company', CompanyRoute);
app.use('/invoice', InvoiceRoute);
app.use('/devis', DevisRoute);
app.use('/registre', AuthRegister);
app.use('/login', AuthLogin);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
