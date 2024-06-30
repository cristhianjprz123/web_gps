/* eslint-disable react/prop-types */
import { useState , useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { useButton } from "../context/useButton";
import { Icon } from '@iconify/react';
import resultsIcon from '@iconify/icons-foundation/results';
import carOff from '@iconify/icons-mdi/car-off';
import carClock from '@iconify/icons-mdi/car-clock';
import carConnected from '@iconify/icons-mdi/car-connected';
import Model from "./model";
import { TfiPinAlt } from "react-icons/tfi";
import {
  AiOutlineSetting,
 
  
} from "react-icons/ai";

const Vehiculos = ({ id, left, top, hideSourceOnDrag }) => {
  const [actived2, setActived2] = useState(false);
  const [actived3, setActived3] = useState("Tab1");
  
  const { selectedArea, selectedUser, activeTab, setActiveTab, setZoom} = useButton();
 
  useEffect(() => {
    setActiveTab("Tab1");
  }, [setActiveTab]);
  
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.MOVIL,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  // Configura el estilo personalizado para mantener la opacidad en 1 mientras se arrastra
  const cardStyles = {
    opacity: isDragging ? 1 : 1, // Mantén la opacidad en 1 mientras se arrastra
    zIndex: 2,
    left,
    top,
  };

  const handleClick = (tab) => {
    setActiveTab(tab);
    setZoom(12)

    };
  const handleShowMore = (tab) => {
    setActived3(tab);
    }

    

  return (
    
    <div
      className="w-96 h-4/6 media  bg-color2  border rounded relative z-2 "
      ref={actived2 ? drag : null}
      style={cardStyles}
    >
      <nav className=" flex flex-wrap h-12 mb-1  text-sm border-b bg-white">
        <label
          className={`flex-1 text-center ${
            activeTab === "Tab1" ? " border-b-2 border-green-500" : ""
          }`}
        >
          <input
            type="radio"
            name="radio"
            onClick={() => handleClick("Tab1")}
            className="hidden"
          />
          <span className="name flex cursor-pointer items-center justify-center rounded-sm py-3 px-4 font-medium transition-all duration-150 ease-in-out">
            VEHICULOS
          </span>
        </label>
        <label
          className={`flex-1 text-center ${
            activeTab === "Tab3" ? " border-b-2 border-green-500" : ""
          }`}
        >
          <input
            type="radio"
            name="radio"
            onClick={() => handleClick("Tab3")}
            className="hidden"
          />
          <span className="name flex cursor-pointer items-center justify-center rounded-sm py-3 px-4 font-medium transition-all duration-150 ease-in-out">
            CONDUCTORES
          </span>
        </label>
        <label
          className={`flex-1 text-center ${
            activeTab === "Tab2" ? " border-b-2 border-green-500" : ""
          }`}
        >
          <input
            type="radio"
            name="radio"
            onClick={() => handleClick("Tab2")}
            className="hidden"
          />
          <span className="name flex cursor-pointer items-center justify-center rounded-sm py-3 px-4 font-medium transition-all duration-150 ease-in-out">
            AREAS
          </span>
        </label>
      </nav>
      <header className="flex justify-between items-center mb-1 p-2">
        <input
          type="text"
          placeholder="Buscar..."
          className="border p-1 rounded w-9/12"
        />
        <div className="flex flex-row ">
          <TfiPinAlt
            className={`text-xl ${actived2 ?  "text-green-500 ": "text-black"} `}
            onClick={() => setActived2(!actived2)}
          />
          <AiOutlineSetting className="text-xl mx-2" />
        </div>
      </header>
      <nav className="relative flex flex-wrap h-12 mb-2  text-lg border-y">
        <label
          className={`flex-1 text-center ${
            actived3 === "Tab1"
              ? "bg-gray-100 border-b-2 border-green-500"
              : ""
          }`}
        >
          <input
            type="radio"
            name="radio"
            onClick={() => handleShowMore ("Tab1")}
            className="hidden"
          />
          <span className="name flex cursor-pointer items-center justify-center rounded-sm py-3 px-4 font-semibold transition-all duration-150 ease-in-out">
          <Icon icon={resultsIcon} color="blue" width="20" height="20" />
          </span>
        </label>
        <label
          className={`flex-1 text-center ${
            actived3 === "Tab2"
              ? "bg-gray-100 border-b-2 border-green-500"
              : ""
          }`}
        >
          <input
            type="radio"
            name="radio"
            onClick={() => handleShowMore ("Tab2")}
            className="hidden"
          />
          <span className="name flex cursor-pointer items-center justify-center rounded-sm py-3 px-4 font-semibold transition-all duration-150 ease-in-out">
          <Icon icon={carConnected } color="#16ae5f" width="20" height="20" />
          </span>
        </label>
        <label
          className={`flex-1 text-center ${
            actived3 === "Tab3"
              ? "bg-gray-100 border-b-2 border-green-500"
              : ""
          }`}
        >
          <input
            type="radio"
            name="radio"
            onClick={() => handleShowMore ("Tab3")}
            className="hidden"
          />
          <span className="name flex cursor-pointer items-center justify-center rounded-sm py-3 px-4 font-semibold transition-all duration-150 ease-in-out">
          <Icon icon={carClock } color="#e79f00" width="20" height="20" />
          </span>
        </label>
        <label
          className={`flex-1 text-center ${
            actived3 === "Tab4"
              ? "bg-gray-100 border-b-2 border-green-500"
              : ""
          }`}
        >
          <input
            type="radio"
            name="radio"
            onClick={() => handleShowMore ("Tab4")}
            className="hidden"
          />
          <span className="name flex cursor-pointer items-center justify-center rounded-sm py-3 px-4 font-semibold transition-all duration-150 ease-in-out">
          <Icon icon={carOff} color="gray" width="20" height="20" />
          </span>
        </label>
      </nav>
      
      <main className="p-2 overflow-auto max-h-[750px] pb-0 "    >
  {(activeTab === "Tab2" ? selectedUser : selectedArea).map((value,index) => (
    <Model
      id={value.id}
      color={value.color}
      imag2={value.imag2}
      key={index}
      index={index}
      imag={value.imag}
      placa={value.placa}
      distancia={value.distancia}
      
    />
  ))}
</main>
    </div>
  );
};

export default Vehiculos;
