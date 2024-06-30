/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useMap } from "react-leaflet";
function ZoomToLocation({zoomLocation, zoom }) {
    const map = useMap();
  
    useEffect(() => {
      if (zoomLocation) {
        map.flyTo(zoomLocation, zoom);
      }
    }, [zoomLocation,zoom, map]);
  
    return null;
  }

  export default ZoomToLocation;