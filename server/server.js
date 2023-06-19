import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import DefaultData from './default.js';
import Router from './routes/route.js';

const path = require('path');

const app=express();


dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', Router);

app.use(express.static(path.join(__dirname,"../petproject/build")));

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"../petproject/build/index.html"));
});

const PORT= process.env.PORT || 8000;

const USERNAME= process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;


const URL=  process.env.MONGODB_URI || `mongodb://${USERNAME}:${PASSWORD}@ac-2yol1ta-shard-00-00.fzwvsgs.mongodb.net:27017,ac-2yol1ta-shard-00-01.fzwvsgs.mongodb.net:27017,ac-2yol1ta-shard-00-02.fzwvsgs.mongodb.net:27017/PROJECT0?ssl=true&replicaSet=atlas-b2odxl-shard-0&authSource=admin&retryWrites=true&w=majority`;
   

Connection(URL);

app.listen(PORT, ()=> console.log(`Server is running successfully on PORT ${PORT} `));   

DefaultData();
