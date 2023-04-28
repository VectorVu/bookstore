const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const userRouter=require('./routers/user.js');
const bookRouter=require('./routers/book.js');

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.get("/",(req,res)=>{
  res.send("Hello Kha, this is your server");
})

app.use('/user',userRouter);
app.use('/book',bookRouter);

console.log(process.env.DB_CONNECTION);
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,}).catch(err=>console.log(err));
app.listen(3000);