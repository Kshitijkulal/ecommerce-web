import express from 'express';
import colors from 'colors';
import env from 'dotenv';
import body from 'body-Parser';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routs/authRoute.js'
import bodyParser from 'body-Parser';
import cors from "cors";
// config env
env.config();

const app = express();
const port = process.env.port || 8080;
const hostName = `localhost`;
app.use(bodyParser.json());
// routes

app.use(`/api/v1/auth`,authRoutes);

//  middlewares

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    allowedHeaders:"X-Requested-With, content-type",
}));
app.use(morgan('dev'));
app.use(express.json());

// dataBaseConfig
connectDB();
app.get(`/`,(req,res)=>{
    res.send("<h1>Welcome to ecommerce app<h1>");
});
app.listen(port,()=>{
    console.log(`server is working successfully in ${process.env.DEV_MODE} at http://${hostName}:${port}`.bgCyan.white);
}); 