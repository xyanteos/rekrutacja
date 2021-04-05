import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import socketio from "socket.io-client";
import axios from "axios";
import PointersRender from "./pointers/PointersRender";
import PointerList from "./pointers/PointerList";

class App extends React.Component {
  state = {
    pinpointList: [],
    isVisible: [],
    searchText: "",
    socket: new socketio("ws://localhost:5000/"),
  };

  componentDidMount = () => {
    //initialize first data fetch
    this.getInfo();
    //initialise websocket event sniffer
    this.state.socket.on("event", (data) => {
      // console.log(data)
      this.setState({ pinpointList: data });
    });
  };

  getInfo = () => {
    axios
      .get("http://localhost:5000/pinPoints")
      .then((res) => {
        // console.log(res)
        let visiblityCheck = [];
        res.data.forEach(() => {
          visiblityCheck.push(true);
        });
        //resetting the visiblity array in state
        this.setState({ isVisible: visiblityCheck });
        //setting the pinpoints array in state
        this.setState({ pinpointList: res.data });
        // console.log(this.state.pinpointList, this.state.isVisible)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //it's reversing the current hidden status
  reverseHiddenStatus = () => {
    
    let currentlyVisible = this.state.isVisible;
    for (let i = 0; i < currentlyVisible.length; i++) {
      currentlyVisible[i] = !currentlyVisible[i];
      document.getElementById(`checkbox${i + 1}`).checked
        ? (document.getElementById(`checkbox${i + 1}`).checked = false)
        : (document.getElementById(`checkbox${i + 1}`).checked = true);
    }
    this.setState({ isVisible: currentlyVisible });
    // console.log(currentlyVisible)
  };
  //used to hide/show selected items
  disableCheck = async (id) => {
    // console.log(document.getElementById(`checkbox${id}`).checked)
    document.getElementById(`checkbox${id}`).checked
      ? (document.getElementById(`checkbox${id}`).checked = false)
      : (document.getElementById(`checkbox${id}`).checked = true);
    //change the value isVisible in the respective element
    let temporalList = this.state.isVisible;
    temporalList[id - 1]
      ? (temporalList[id - 1] = false)
      : (temporalList[id - 1] = true);
    this.setState({ isVisible: temporalList });
    // console.log(this.state.isVisible)
  };


  handleChange =(e) =>{
    this.setState({searchText: e.target.value})
  }

  render() {
    return (
      <div className="body">
        <div className="searchBoxContainer">
          <input type="text" className="searchBox" value={this.state.searchText} placeholder="Search for an individual" onChange={(event)=>this.handleChange(event)}/>
          <button onClick={()=>{this.setState({searchText:""})}}>Clear</button>
        </div>
        <div className="App">

          <div className="List">
            <div className="pinPointHeader">
              <div>ID</div>
              <div>Coords</div>
              <div className="here" onClick={()=>{
                this.setState({searchText:""})
                this.state.searchText==="" ? this.reverseHiddenStatus() : console.log(`the search field needs to be empty`)
              }}>
                Hidden
                <br />
                (reverse)
              </div>
            </div>
            <PointerList
              pinpoints={this.state.pinpointList}
              disableCheck={this.disableCheck}
              searchValue= {this.state.searchText}
            />
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
            <PointersRender
              pinpoints={this.state.pinpointList}
              visiblityCheck={this.state.isVisible}
            />
          </MapContainer>
        </div>
      </div>
    );
  }
}

export default App;
