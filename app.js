import express from "express"
import dotenv from "dotenv"

const app = express();

dotenv.config();


const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send('ok!');
})


app.listen(port, (req, res) => {
    console.log(`Server Aktif! http://127.0.0.1:${port}`);
})