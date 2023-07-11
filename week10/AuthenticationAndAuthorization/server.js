require('./config/config')
const userRouter = require('./routes/route')
const recordRouter = require('./routes/recordRouter')
PORT = process.env.PORT || 2345
const express = require('express');

const app = express();
app.use(express.json());
app.use('/api', userRouter)
app.use('/api', recordRouter)

app.get('/', (req, res)=>{
    res.send('User Authentication And Authorization')
})

app.listen(PORT, ()=>{
    console.log(`Successfully listening on Port: ${PORT}`);
})

