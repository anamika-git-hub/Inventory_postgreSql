import express from 'express';
import  path from 'path';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import cors from 'cors';
import inventoryRoutes from './routes/InventoryRoutes'
import createProductsTable from './data/createProductsTable';
import { globalErrorHandler } from './middlewares/errorHandler';

dotenv.config();
const app = express();
app.use(cors());

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", inventoryRoutes);

app.use(globalErrorHandler);

createProductsTable();

const PORT = process.env.PORT || 8000;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})