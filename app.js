import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import main from "./routes/main.js"
import photos from "./routes/photos.js"
import users from "./routes/users.js"
import cookieParser from "cookie-parser"
import {checkUser} from "./middlewares/authMiddleware.js"
import {v2 as cloudinary} from "cloudinary";
import fileUpload from "express-fileupload";
import methodOverride from "method-override";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


const app = express();

//database connection
mongoose.connect(`mongodb://127.0.0.1/photopage`);

app.use(express.static('public'));
app.use(express.json()); //json parser
app.use(express.urlencoded({extended:true})) //form body parser
app.set('view engine', 'ejs'); //template engine
app.use(cookieParser()) //cookie-parser
app.use(fileUpload({useTempFiles: true})) //express-fileupload
app.use(methodOverride('_method', { methods: ['POST','GET']})); //method override

const port = process.env.PORT;

app.use('*', checkUser);
app.use('/', main);
app.use('/photos', photos);
app.use('/users', users);


app.listen(port, (req, res) => {
    console.log(`Server Aktif! http://127.0.0.1:${port}`);
})