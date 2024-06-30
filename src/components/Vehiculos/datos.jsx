/* eslint-disable react/prop-types */
import { useMap} from "react-leaflet";
import { useState } from "react";

import ReactLeafletDriftMarker  from "react-leaflet-drift-marker";

const HandleMarkerClick = ({ icon, coords,  coordenada}) => {
  const Map = useMap();
  const [zoomLevel, setZoomLevel] = useState(17);
 
  const handleClick = () => {
    const newZoomLevel = zoomLevel - 4;
    if (Map.getZoom() === zoomLevel) {
      setZoomLevel(newZoomLevel);
      Map.flyTo(coords, newZoomLevel);
      setZoomLevel(17);
     } else {
      setZoomLevel(17);
       Map.flyTo(coords, 17);
     }
   
        

  }; 

  return (
    <>
      <ReactLeafletDriftMarker
      key={coordenada}
        position={coords}
        duration={500}
        eventHandlers={{ click: handleClick }}
        icon={icon}
        
       />
       

      
    </>
  );
};
export default HandleMarkerClick;