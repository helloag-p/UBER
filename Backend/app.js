const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const app=express();

const connectToDb=require('./db/db');
connectToDb();
const userRoutes=require('./routes/user.routes');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });
app.get('/',(req,res)=>{
    res.send('Welcome to the API');
  });

app.use('/users',userRoutes);
const port=process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));