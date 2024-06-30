import { useState, useEffect } from "react";
import { socket } from "../context/socket";


const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor");
    });

    socket.on("data", (data) => {
      const parsedata = JSON.parse(data);
      setData(parsedata);
      console.log("Datos recibidos:", parsedata);
    });

    return () => {
      socket.off("data");
    };
  }, []);

  return data;
};

export default useData;