import React from "react";
import {Marker, Popup} from 'react-leaflet'

const PointersRender = (props) => {
//   if (props) console.log(props);

  const pins = props.pinpoints.map((point) => {
    //   console.log(point)
    return (
      <div key={point._id} id={point._id}>
        <Marker position={[point.Latitude, point.Longitude]}>
          <Popup>
            
          </Popup>
        </Marker>
      </div>
    );
  });

  return (
  <div>
      {pins}
  </div>
  )
};

export default PointersRender;
