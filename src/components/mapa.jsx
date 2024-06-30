import { useState, useEffect } from "react";
import L from "leaflet";
import React from "react";

import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  ZoomControl,
  Polygon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import "./Vehiculos/style.css";
import { useButton } from "./context/useButton";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import ZoomToLocation from "./Vehiculos/zoomlocation";
import HandleMarkerClick from "./Vehiculos/datos";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const Mapa = () => {
  const {
    activeMenu,
    isOpenMap,
    arrayId,
    position,
    zoom,
    zoomLocation,
    handleMapCreated,
    center,
    handleOnCreated,
    handleOnDeleted,
   
    theposicion,
    edit,
    draggingMap,
  } = useButton();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeMenu]);

  return (
    <div
      className=" absolute"
      style={{
        width: activeMenu ? windowWidth * 0.964 : windowWidth,
        height: windowHeight,
      }}
    >
      <div className="w-full h-full z-1 absolute">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          whenCreated={handleMapCreated}
          zoomControl={false}
          className=" h-full  w-full "
        >
          <ZoomControl position="topright" />

         
              <FeatureGroup >
             
                { edit === arrayId && (
                  <>
                  <EditControl
                    position="topright"
                    onDeleted={handleOnDeleted}
                    onCreated={handleOnCreated}
                    draw={draggingMap}
                    key={arrayId}
                  /> 
                  </>
                )
                }
              </FeatureGroup>
           

           

          {theposicion.map((container, index) => (
            <React.Fragment key={index}>
              {isOpenMap && (
                <>
                  <ReactLeafletDriftMarker
                    position={container.coord}
                    icon={container.imag}
                    duration={500}
                  />
                  <Polygon
                    positions={container.coords}
                    color={container.color}
                    key={container.id}
                    containerNumber={container.id}
                    pathOptions={{ weight: 0.5 }}
                  />
                </>
              )}
            </React.Fragment>
          ))}

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
          />
          <ZoomToLocation zoomLocation={zoomLocation} zoom={zoom} />

          {!isOpenMap && (
            <>
              {position.map((coordenada, index) => (
                <React.Fragment key={index}>
                  <HandleMarkerClick
                    icon={coordenada.imag}
                    coords={coordenada.coord}
                    key={coordenada.key}
                    coordenada={coordenada.id}
                  />
                  <Polygon
                    positions={coordenada.coords}
                    color={coordenada.color}
                    fillOpacity={0.1}
                    pathOptions={{ weight: 0.5 }}
                  />
                </React.Fragment>
              ))}
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Mapa;
