import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import socket from 'socket.io-client'
import axios from 'axios'


class App extends React.Component {
  state={
    pinpointList : [],
    socket : socket('ws://localhost:5000/')
  }

  componentDidMount = () =>{
    this.getInfo()
  }

  getInfo = () =>{
    axios.get('http://localhost:5000/pinPoints')
    .then(res =>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">

        <div className="pinPointList">
          <div className="pinPoint">
            <div>
              ID
            </div>
            <div>
              Coords
            </div>
            <div>
              Hidden
            </div>
          </div>
          
        </div>

        <MapContainer
          center={[54.35185288232724, 18.646370587871548]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[54.35185288232724, 18.646370587871548]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default App;
