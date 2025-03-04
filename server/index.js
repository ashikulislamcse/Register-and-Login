import express from 'express'
import cors from 'cors'
import connectDB from './Database/Db.js';
import dotenv from 'dotenv'
import router from './Routes/userRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Api is running Successfully..")
});

app.use('/api/auth', router)

connectDB()
const PORT = process.env.PORT || 3001
app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port: ${PORT}`)
});