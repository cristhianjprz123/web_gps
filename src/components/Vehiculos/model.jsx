/* eslint-disable react/prop-types */

import { Icon } from "@iconify/react";
import polygonIcon from "@iconify/icons-healthicons/polygon";
import Drivers from "./drivers";
import { useState } from "react";
import { useButton } from "../context/useButton";
import alert32Regular from "@iconify/icons-fluent/alert-32-regular";
import Area from "./area";

import { useEffect } from "react";
import mapMarker from "@iconify/icons-vaadin/map-marker";

const Model = ({ index, placa, distancia, imag, imag2, id, color }) => {
  const {
    activeTab,
    zoomClick,
    paint,
    setIsOpenMap,
    isOpenMap,
    setSelectedGPS,
    setEdit,
    edit,
    enviarDatosdb,
    eliminarPoligono,
    isButtonDisabled,
    setIsButtonDisabled,
    setDraggingMap,
    lastPolygon,
    setLastPolygon
  } = useButton();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  // En tu componente Model
  useEffect(() => {
    setIsOpen(false);
    setIsOpen2(false);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "Tab1") {
      setIsOpenMap(false);
    }
  }, [activeTab, setIsOpenMap]);

  return (
    <article
      className={` ${
        isOpen2 || isOpen ? "h-auto" : "h-20"
      } bg-white p-3 mb-4 border rounded-sm  `}
    >
      <div className="flex justify-between items-center mb-0">
        <div className="flex items-center text-base">
          {activeTab === "Tab1" && (
            <img src={imag2} alt="imagen" width={24} className="p-0 pb-1" />
          )}
          {activeTab === "Tab2" && (
            <Icon
              icon={polygonIcon}
              color={color}
              width="26"
              height="26"
              className="mr-1"
            />
          )}
          <p className="pt-1 px-1 text-gray-600   ">{placa}</p>
        </div>
        <div className="flex items-center text-sm font-light text-gray-700 ">
          <p className="mr-2 pt-1">{distancia} 100 km/h</p>
          {activeTab === "Tab1" && (
            <>
              <Icon
                icon={alert32Regular}
                width="16"
                height="16"
                className="mr-1"
              />
              <img src={imag} alt="imagen" className="mt-0 mr-1" width={14} />
            </>
          )}

          {activeTab === "Tab2" && (
            <>
              {" "}
              <Icon
                icon={mapMarker}
                color={id === paint ? "blue" : "gray"}
                width="14"
                height="14"
                className="mr-1"
                onClick={() => zoomClick(id)}
              />
              <img src={imag2} alt="imagen" width={17} className="mr-1" />
            </>
          )}
        </div>
      </div>
      {activeTab === "Tab2" && (
        <>
          <Area
            paint={paint}
            id={id}
            i={index}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsOpenMap={setIsOpenMap}
            isOpenMap={isOpenMap}
            setSelectedGPS={setSelectedGPS}
            setEdit={setEdit}
            edit={edit}
            eliminarPoligono={eliminarPoligono}
            enviarDatosdb={enviarDatosdb}
            isButtonDisabled={isButtonDisabled}
            setIsButtonDisabled={setIsButtonDisabled}
            setDraggingMap={setDraggingMap}
            setLastPolygon={setLastPolygon}
            lastPolygon={lastPolygon}
          />
        </>
      )}
      {activeTab === "Tab1" && (
        <>
          <Drivers i={index} isOpen2={isOpen2} setIsOpen2={setIsOpen2} />
        </>
      )}
    </article>
  );
};

export default Model;
