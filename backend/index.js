const express = require('express')
const app = express()
const cors = require('cors')


//defiining data format
app.use(express.json())
//CORS policy
app.use(cors())


//the initial GET route
app.get('/pinPoints', (req, res)=>{
    // res.send(`pinpoints sent`)
    res.send(pointsList)
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


//declaring pinpoints and making a coroutine for change simulation
let numberOfPinpoints = 10
let startingLat = 54.35185288232724
let startingLng = 18.646370587871548
let pointsList = []

const createPoints = () =>{
    for(let i=1; i<=numberOfPinpoints; i++){
        pointsList.push({"_id":i,"Latitude":startingLat+Math.floor(Math.random()*1000)/100000-Math.floor(Math.random()*1000)/100000, "Longitude": startingLng+Math.floor(Math.random()*1000)/100000-Math.floor(Math.random()*1000)/100000})
    }
}
createPoints()

//making the points artificial; updates 
updatePoints = async() =>{
    await pointsList.forEach(element => {
        element.Latitude += Math.floor(Math.random()*1000)/100000-Math.floor(Math.random()*1000)/100000
        element.Longitude += Math.floor(Math.random()*1000)/100000-Math.floor(Math.random()*1000)/100000
    });
}







//hosting server
http.listen(port, ()=>{
    console.log(`server is up and listening on ${port}`)
})

//webSockets listening for connections
io.on('connection',()=>{
    console.log(`a client connected`)
})

setInterval(() => {
    updatePoints()
    io.emit('event', pointsList)
}, 3000);
