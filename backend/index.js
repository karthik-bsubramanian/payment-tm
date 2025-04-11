const rootRouter = require('./routes/index');
// import rootRouter from './routes/index'; 
const cors = require('cors');
const express = require("express");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());//body-parser

app.use('/api/v1',rootRouter);

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`example server running on ${PORT}`);
});

