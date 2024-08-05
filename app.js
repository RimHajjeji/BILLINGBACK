const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const cors = require('cors');
dotenv.config({ path: './Config/config.env' })
//import rout
const UserRoute = require('./Routes/UserRoute');
const AdminRoute = require('./Routes/AdminRoute')
const MaterialRoute = require('./Routes/MaterialRoute');
const ClientRoute = require('./Routes/ClientRoute')
const ServiceRoute = require('./Routes/ServiceRoute')
const CompanyRoute = require('./Routes/CompanyRoute')
const InvoiceRoute = require('./Routes/InvoiceRoute')
const AuthRegister = require('./Routes/AuthRout/RegisterRoute')
const AuthLogin = require('./Routes/AuthRout/LoginRoute')


// express app
const app = express();
app.use(cookieParser())
//config body_parser
app.use(bodyParser.json({
    extended: true
}))
///add cors for apis 
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

//connect to db 
const connectDB = require('./Config/db')
//load config db
connectDB();
app.listen(3001);



app.use('/user', UserRoute);
app.use('/admin', AdminRoute);
app.use('/client', ClientRoute);
app.use('/material', MaterialRoute);
app.use('/service', ServiceRoute);
app.use('/company', CompanyRoute);
app.use('/invoice', InvoiceRoute);
app.use('/registre', AuthRegister);
app.use('/login', AuthLogin);



