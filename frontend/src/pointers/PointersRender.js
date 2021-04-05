import React from "react";
import {Marker, Popup} from 'react-leaflet'

const PointersRender = (props) => {
    //if (props) console.log(props);
    // console.log(props.visiblityCheck?.[0])

  const pins = props.pinpoints.map((point) => {
    //   console.log(point)
    if(props.visiblityCheck?.[point._id-1])
    return (
      <div key={point._id} id={point._id}>
        <Marker position={[point.Latitude, point.Longitude]}>
          <Popup>
            {`_id: ${point._id}`}
          </Popup>
        </Marker>
      </div>
    );
  })

  return (
  <div>
      {pins}
  </div>
  )
};

export default PointersRender;
