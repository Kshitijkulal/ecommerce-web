import mongoose from 'mongoose'; 
import Colors from 'colors';
const connectDB = async () =>{
    try {
        const connec = await mongoose.connect(process.env.MongoDB_URL);
        console.log(`Connected to MongoDB DataBase ${connec.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
};
export default connectDB;
