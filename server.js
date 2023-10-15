import express from 'express';
import colors from 'colors';
import env from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import cors from "cors";

// config env
env.config();

// dataBaseConfig
connectDB();

const app = express();
const port = process.env.port || 8080;
const hostName = `localhost`;
// routes

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(`/api/v1/auth`,authRoutes);
app.use(`/api/v1/category`,categoryRoute);
app.use(`/api/v1/product`,productRoute);

//  middlewares


app.get(`/`,(req,res)=>{   
    res.send("<h1>Welcome to ecommerce app<h1>");
});
app.listen(port,()=>{
    console.log(`server is working successfully in ${process.env.DEV_MODE} at http://${hostName}:${port}`.bgCyan.white);
}); 

export default app;