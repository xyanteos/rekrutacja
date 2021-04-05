

const PointerList = (props) => {
  const returner = props.pinpoints.map((point) => {
      //if the search field is empty just look for every option, otherwise search for those with the phrase in id field
    if(props.searchValue!=="")
    {
        if(point._id.toString().includes(props.searchValue))
        return(
            <div className="pinPoint" id={`pinPoint${point._id}`} key={point._id} onClick={()=>{props.disableCheck(point._id)}}>
            <div className="pinPointInteriors" >
              <div>
                {point._id}
              </div>
              <div>
                {`Lon: ${Math.floor(point.Longitude*100)/100}, Lat: ${Math.floor(point.Latitude*100)/100}`}
              </div>
              <div>
                <input type="checkbox" id={`checkbox${point._id}`}/>
              </div>
            </div>
          </div>
        )
        return <></>
    }
    return (
          <div className="pinPoint" id={`pinPoint${point._id}`} key={point._id} onClick={()=>{props.disableCheck(point._id)}}>
            <div className="pinPointInteriors" >
              <div>
                {point._id}
              </div>
              <div>
                {`Lon: ${Math.floor(point.Longitude*100)/100}, Lat: ${Math.floor(point.Latitude*100)/100}`}
              </div>
              <div>
                <input type="checkbox" id={`checkbox${point._id}`}/>
              </div>
            </div>
          </div>
    )
  })
  return (
    <div>
    {returner}
    </div>
    )
};

export default PointerList;
