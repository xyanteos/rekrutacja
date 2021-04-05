const express = require('express')
const app = express()
const cors = require('cors')


//defiining data format
app.use(express.json())
//CORS policy
app.use(cors())

//declaring pinpoints and making a coroutine for change simulation





//the initial GET route
app.get('/pinPoints', (req, res)=>{
    res.send(`pinpoints sent`)
})
//defining port
const port = process.env.PORT || 5000

//defining http for socket.io middleware
const http = require('http').createServer(app)
//defining socket.io
const io = require('socket.io')(http,{
    cors:{
        origin: "*"
    }
})

//hosting server
http.listen(port, ()=>{
    console.log(`server is up and listening on ${port}`)
})

//webSockets listening for connections
io.on('connection',()=>{
    console.log(`connection has been made`)
})

