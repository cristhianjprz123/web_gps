import { useEffect } from "react";
import { createContext, useState } from "react";

import L from "leaflet";
import axios from "axios";

import useData from "../hook/db";

const ButtonContext = createContext();

const initialState = {
  chat: false,
  noti: false,
  perfil: false,
};

// eslint-disable-next-line react/prop-types
export const ButtonProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClick, setIsClick] = useState(initialState);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [activeTab, setActiveTab] = useState(null);
  const handClick = (click) =>
    setIsClick({ ...initialState, [click]: !isClick[click] });

  const [zoomLocation, setZoomLocation] = useState([-8.113436, -79.029644]);
  const [zoom, setZoom] = useState(12);
  const [lastPolygon, setLastPolygon] = useState(null);
  const [activado, setActivado] = useState(false);
  const [center, setcenter] = useState([-8.113436, -79.029644]);
  const [paint, setPaint] = useState(false);
  const [poligonoCoords, setPoligonoCoords] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [position, setPosition] = useState([]);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [theposicion, setThePosicion] = useState([]) ;
    const [arrayId, setArrayId] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedGPS, setSelectedGPS] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [edit , setEdit] = useState(false)
  const [draggingMap, setDraggingMap] = useState({
    rectangle: false,
    circle: true,
    circlemarker: false,
    marker: false,
    polyline: false,
    polygon: true,
    edit: false,
  });

  const [selectedOption, setSelectedOption] = useState('Mapa');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const data = useData();

  const handleActiveMenu = () => {
    setActiveMenu((prevActiveMenu) => !prevActiveMenu);
    window.dispatchEvent(new Event("resize"));
  };

  useEffect(() => {
    if (data.length > 0) {
      const newIds = data.map((container) => container.id);

      const newPositions = data.map((container) => {
        const [pos1, pos2, time] = container.coords;

        return {
          id: container.id,
          coord: [pos1, pos2],
          timestap: time,
          state: container.state,
          color: container.color,
          coords: container.coord,
          imag: L.icon({
            iconUrl: `https://api.iconify.design/mdi/car.svg?color=%23${container.imag}&width=14&height=14`,
            iconSize: container.polygons.image.iconSize,
            iconAnchor: [
              container.polygons.image.iconSize[0] / 2,
              container.polygons.image.iconSize[1] / 2,
            ],
          }),
          zoom: container.zoom,
          key: container.detalles.key,
        };
      });

      const newDetails = data.map((container) => {
        const [, , time] = container.coords;

        return {
          id: container.id,
          placa: container.placa,
          color: container.color,
          name: container.detalles.name,
          description: container.detalles.description,
          imag2: container.state,
          imag: `https://api.iconify.design/vaadin/map-marker.svg?color=blue&width=14&height=14`,
          avatarProps: container.detalles.avatarProps,
          coordenadas: container.detalles.coordenadas,
         
          distancia: container.detalles.distancia,
          bateria: container.detalles.bateria,
          fecha: time,
        };
      });
      const newAreas = data.map((container) => {
        const [pos1, pos2, time] = container.coords;
        return {
          id: container.id,
          placa: container.placa,
          coord: [pos1, pos2],
          imag: container.state,
          imag2: `https://api.iconify.design/mdi/car.svg?color=%23${container.imag}`,
          area: container.Areas.area,
          tiempo: container.Areas.tiempo,
          distancia: container.detalles.distancia,
          coordenadas: container.detalles.coordenadas,
          coorden: container.coord,
          fecha: time,
        };
      });

      setSelectedUser(newDetails);
      setSelectedArea(newAreas);
      setThePosicion(newPositions.filter((polygon) => parseInt(polygon.id[4]) - 1 === selectedGPS));

      setArrayId(newIds.findIndex((id) => parseInt(id[4])-1 === selectedGPS));
      
      setPosition(newPositions);
      console.log(newIds.findIndex((id) => parseInt(id[4])-1 === selectedGPS));
      console.log("tamano del array:", data);
      
    } else {
      console.log("No hay datos");
    }
  }, [data, selectedGPS]);

  // const editarDatos = (container) => {
  //   setstatezoom(false);
  //   setActivado(container.id);
  //   eliminarPoligono(container.id);
  //   // handleEditarDatosClick()
  //   // handlePolygon()
  // };
  const enviarDatosALaAPI = (container) => {
    setIsButtonDisabled(true);
    setActivado(false);
    enviarDatosdb(container.id);
    //  handleContainerClick(container.id)
    setDraggingMap((prevState) => {
      return {
        ...prevState,
        circle: true,
        polygon: true,
        edit: true,
      };
    });
  };

 
  const zoomClick = (tab) => {
    if (activeTab === "Tab2") {
    setZoomLocation(
      selectedArea.filter((polygon) => polygon.id=== tab)[0]
        .coord
    );
    setZoom(position[0].zoom);
    setPaint(tab)
  }

}



  const handleOnDeleted = () => {
    setDraggingMap((prevState) => {
      return {
        ...prevState,
        circle: true,
        polygon: true,
        edit: true,
      };
    });
  };
  const handleOnCreated = (e) => {
    const latlngs = e.layer.getLatLngs();
    setLastPolygon(e.layer);
    setPoligonoCoords(latlngs);
    setIsButtonDisabled(false);

    console.log("Coordenadas del polígono:", latlngs);
    setDraggingMap({
      rectangle: false,
      circle: false,
      circlemarker: false,
      marker: false,
      polyline: false,
      polygon: false,
    });
    theposicion[0].coords = latlngs
  };

  const eliminarPoligono = async (id) => {
    try {
      const response = await axios.delete(`http://techguard.cloud/gps/${id}`);
      if (response.status === 200) {
        console.log("Datos eliminados con éxito:", response.data);
      } else {
        console.log("Error al eliminar los datos");
      }
    } catch (error) {
      console.error("Error al eliminar los datos:", error);
    }
  };

  const enviarDatosdb = async (id) => {
    // Obtener las coordenadas del polígono

    const gruposDeCoordenadas = poligonoCoords[0].map((coordenada) => {
      if (coordenada.lat && coordenada.lng) {
        return [Number(coordenada.lat), Number(coordenada.lng)];
      }
      return null;
    });

    // Usar Axios para enviar la solicitud POST

    try {
      const response = await axios.post(`http://techguard.cloud/gps/${id}`, {
        gruposDeCoordenadas,
      });
      if (response.status === 200) {
        console.log("Datos enviados con éxito:", response.data);
      } else {
        console.log("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <ButtonContext.Provider
      value={{
        lastPolygon,
        setLastPolygon,
        paint ,
        zoomLocation,
        zoomClick,
        handleActiveMenu,
        isOpenMap,
        setIsOpenMap,
        eliminarPoligono,
        handleOptionClick,
        selectedOption,
        arrayId ,
        setEdit ,
        activeTab,
        setActiveTab,
        enviarDatosALaAPI,
        position,
        edit,
        zoom,
        setDraggingMap,
        setZoom,
        setSelectedUser,
        enviarDatosdb  ,
        poligonoCoords,
        isButtonDisabled,
        handleOnCreated,
        activado,
        draggingMap,
        handleOnDeleted,
        setSelectedGPS  ,
        // handleContainerClick,
        // containerList,
        selectedUser,
        selectedArea,
        theposicion,
        center,
        screenSize,
        setScreenSize,
        activeMenu,
        setActiveMenu,
        handClick,
        isClick,
        currentColor,
        setCurrentColor,
        setIsButtonDisabled
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
};

export default ButtonContext;
