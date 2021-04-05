import react from "react";

const PointerList = (props) => {
  const returner = props.pinpoints.map((point) => {
    return (
      
          <div className="pinPoint" id={`pinPoint${point._id}`} key={point._id} onClick={()=>{props.disableCheck(point._id)}}>
            <div className="pinPointInteriors" >
              <div>
                {point._id}
              </div>
              <div>
                {`${Math.floor(point.Longitude*100)/100}, ${Math.floor(point.Latitude*100)/100}`}
              </div>
              <div>
                <input type="checkbox" id={`checkbox${point._id}`}/>
              </div>
            </div>
          </div>

    );
  });
  return (
    <div>
    {returner}
    </div>
    )
};

export default PointerList;
