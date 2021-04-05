import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import socketio from 'socket.io-client'
import axios from 'axios'
import PointersRender from "./pointers/PointersRender";


class App extends React.Component {
  state={
    pinpointList : [],
    isVisible : [],
    socket : new socketio('ws://localhost:5000/')
  }
  
  componentDidMount = () =>{
    //initialize first data fetch
    this.getInfo()
    //initialise websocket event sniffer
    this.state.socket.on('event',(data)=>{
      // console.log(data)
      this.setState({pinpointList:data})
    })
  }

  

  getInfo = () =>{
    axios.get('http://localhost:5000/pinPoints')
    .then(res =>{
      // console.log(res)
      let visiblityCheck = []
      res.data.forEach(element => {
        visiblityCheck.push(true)
      });
      //resetting the visiblity array in state
      this.setState({isVisible: visiblityCheck})
      //setting the pinpoints array in state
      this.setState({pinpointList: res.data})
      // console.log(this.state.pinpointList, this.state.isVisible)
    }).catch(err=>{
      console.log(err)
    })
  }

  disableCheck = (id) =>{
    // console.log(document.getElementById(`checkbox${id}`).checked)
    document.getElementById(`checkbox${id}`).checked ? document.getElementById(`checkbox${id}`).checked = false : document.getElementById(`checkbox${id}`).checked = true
    //change the value isVisible in the respective element
    let temporalList = this.state.isVisible
    temporalList[id-1] ? temporalList[id-1]= false : temporalList[id-1] = true;
    this.setState({isVisible: temporalList})
    // console.log(this.state.isVisible) 
    
  }

  render() {

    return (
      <div className="App">

        <div className="pinPointList">
          <div className="pinPointHeader">
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

          <div className="pinPoint" id="pinPoint1" onClick={()=>{this.disableCheck(1)}}>
            <div className="pinPointInteriors">
              <div>
                1
              </div>
              <div>
                123.213 , 3321.321
              </div>
              <div>
                <input type="checkbox" id="checkbox1"/>
              </div>
            </div>
          </div>


        </div>

        <MapContainer
          center={[54.35185288232724, 18.646370587871548]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> Used by: Maciej Nowacki'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            <PointersRender pinpoints = {this.state.pinpointList} visiblityCheck={this.state.isVisible}/>
        </MapContainer>
      </div>
    );
  }
}

export default App;
