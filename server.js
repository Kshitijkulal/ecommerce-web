import express from 'express';
import colors from 'colors';
import env from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js'
import bodyParser from 'body-Parser';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import cors from "cors";
// config env
env.config();

const app = express();
const port = process.env.port || 8080;
const hostName = `localhost`;
app.use(bodyParser.json());
// routes

app.use(`/api/v1/auth`,authRoutes);
app.use(`/api/v1/category`,categoryRoute);
app.use(`/api/v1/product`,productRoute);

//  middlewares

app.use(cors({
        origin: 'https://localhost:3000', // Replace with the origin of your client app
        credentials: true,
        optionSuccessStatus: 200,
        allowedHeaders: 'Content-Type, Authorization', // Add the required headers
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

export default app;