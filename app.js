import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import main from "./routes/main.js"
import photos from "./routes/photos.js"
import users from "./routes/users.js"

dotenv.config();
const app = express();

//database connection
mongoose.connect(`mongodb://127.0.0.1/photopage`);

app.use(express.static('public'));
app.use(express.json()); //json parser
app.use(express.urlencoded({extended:true})) //form body parser
app.set('view engine', 'ejs');

const port = process.env.PORT;

app.use('/', main);
app.use('/photos', photos);
app.use('/users', users);


app.listen(port, (req, res) => {
    console.log(`Server Aktif! http://127.0.0.1:${port}`);
})