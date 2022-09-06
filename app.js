import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();
const app = express();

//database connection
mongoose.connect(`mongodb://127.0.0.1/photopage`);

app.use(express.static('public'));
app.set('view engine', 'ejs');



const port = process.env.PORT;


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(port, (req, res) => {
    console.log(`Server Aktif! http://127.0.0.1:${port}`);
})