/* eslint-disable react/prop-types */
import { MagicMotion } from "react-magic-motion";
import { useButton } from "../context/useButton";
const Drivers = ({i, isOpen2, setIsOpen2}) => {
  
  const { selectedUser } = useButton();
  return (
    <>
    <MagicMotion
        transition={{ type: "spring", stiffness: 180, damping: 20, mass: 1.1 }}
        >
      
      <button
            onClick={() => setIsOpen2(!isOpen2)}
            className="   text-gray-600 float-right font-semibold flex items-center text-base pr-1 mb-0 mt-2  "
          >
             <svg
              key="exclude"
              style={{
                transform: `rotate(${isOpen2 ? 180 : 0}deg)`,
                transition: "320ms ease-in-out",
               
              }}
              width="12"
              height="12"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 10L15.6714 21L27.5 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
      
     <div>
    {isOpen2 && [selectedUser[i]].map((containerNumber, index) => (

         
      <ul key={index} className="font-light text-xs mt-6">
        <li >
          Coordenadas: <span className="float-right text-gray-600" >{containerNumber.coordenadas}</span>
        </li>
        <li >
          Area: <span className="float-right text-gray-600" >{containerNumber.coordenadas}</span>
        </li>
        <li  >
          Velocidad: <span className="float-right text-gray-600" >{containerNumber.distancia}</span>
        </li>
        <li  >
          Distancia Recorrida: <span className="float-right text-gray-600">{containerNumber.distancia}</span>
        </li>
       
        <li  >
          Nivel de Batería: <span className="float-right text-gray-600">{containerNumber.bateria}</span>
        </li>
        <li  >
          Ultimo Dato: <span className="float-right text-gray-600">{containerNumber.fecha}</span>
        </li>
      </ul>
    
    ))
      }
      </div>
    </MagicMotion>
    </>
  );
};

export default Drivers;
