const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const app=express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const connectToDb=require('./db/db');
connectToDb();
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
const mapRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.send('Welcome to the API');
  });

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/rides',rideRoutes);

const port=process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));