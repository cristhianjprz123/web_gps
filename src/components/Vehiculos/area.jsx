/* eslint-disable react/prop-types */

import { MagicMotion } from "react-magic-motion";
import { useButton } from "../context/useButton";
import "./style.css";
const Area = ({
  setLastPolygon,
  lastPolygon ,
  setDraggingMap,
  setIsButtonDisabled,
  enviarDatosdb,
  eliminarPoligono,
  edit,
  setEdit,
  paint,
  id,
  i,
  isOpen,
  setIsOpen,
  setIsOpenMap,
  isOpenMap,
  setSelectedGPS,
  isButtonDisabled  ,
}) => {
  const { selectedArea } = useButton();

  return (
    <>
      <MagicMotion
        transition={{ type: "spring", stiffness: 180, damping: 20, mass: 1.1 }}
      >
        <button
          onClick={() => {
            if (paint === id) {
              setIsOpenMap(!isOpenMap);
              setSelectedGPS(i);
              setIsOpen(!isOpen);
            }
          }}
          className="   text-gray-600 float-right font-semibold flex items-center text-base pr-1 mb-0 mt-2  "
          disabled={edit === i }
        >
          <svg
            key="exclude"
            style={{
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
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
          {isOpen &&
            [selectedArea[i]].map((container, index) => (
              <div key={index} className="font-light text-xs mt-6">
                <ul>
                  <li>
                    Area:{" "}
                    <span className="float-right text-gray-600">
                      {container.area}
                    </span>
                  </li>
                  <li>
                    Coordenadas:{" "}
                    <span className="float-right text-gray-600">
                      {container.coordenadas}
                    </span>
                  </li>
                  <li>
                    Tiempo en actividad:{" "}
                    <span className="float-right text-gray-600">
                      {container.tiempo}
                    </span>
                  </li>
                  <li>
                    Último Dato :{" "}
                    <span className="float-right text-gray-600">
                      {container.fecha}{" "}
                    </span>
                  </li>
                </ul>
                <div className="flex justify-end mt-2">
                  <button className="send-button mr-2"
                    onClick={() => { enviarDatosdb(id) 
                      setIsButtonDisabled( !isButtonDisabled )
                      setEdit(false)
                      setDraggingMap({
                        rectangle: false,
                        circle: true,
                        circlemarker: false,
                        marker: false,
                        polyline: false,
                        polygon: true,
                        edit: false,
                      });
                      if (lastPolygon) {
                        lastPolygon.remove();
                        setLastPolygon(null);
                      }
                    
                    }}
                  disabled={ paint != id || isButtonDisabled }
                  >
                    <svg
                      className="send-svgIcon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="none"
                      />
                      <path
                        fill="blue"
                        d="M12 2a1 1 0 0 1 .894.553l9 18a1 1 0 0 1-1.11 1.423L12 20.024l-8.783 1.952a1 1 0 0 1-1.111-1.423l9-18A1 1 0 0 1 12 2zm1 16.198l6.166 1.37L13 7.236v10.962zM11 7.236L4.834 19.568L11 18.198V7.236z"
                      />
                    </svg>
                  </button>
                  <button
                    className="edit-button mr-2"
                    disabled={ container.coorden.length > 0 || paint != id }
                    onClick={() => {
                      setEdit(i);
                      
                    }}
                  >
                    <svg className="edit-svgIcon" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => eliminarPoligono(id)}
                    disabled={ paint != id }
                  >
                    <svg className="delete-svgIcon" viewBox="0 0 448 512">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </MagicMotion>
    </>
  );
};

export default Area;
