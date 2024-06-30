import { useState, useCallback } from "react";
import "./App.css";
import Vehiculos from "./components/Vehiculos/vehiculos";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./components/ItemTypes";
import update from "immutability-helper";
import Mapa from "./components/mapa";
import { useButton } from "./components/context/useButton";

const Container = () => {
  const [movilPosition, setmMovilposition] = useState({ top: 0, left: 0 });
  const [mapaPosition, setMapaPosition] = useState({ top: 50, left: 50 });
  const [estadisticPosition, setEstadisticPosition] = useState({
    top: 860,
    left: 20,
  });
  const hideSourceOnDrag = false;
  const { selectedOption } = useButton();

  const moveItem = useCallback(
    (itemType, left, top) => {
      if (itemType === "card-1") {
        setmMovilposition(
          update(movilPosition, {
            $merge: { left, top },
          })
        );
      } else if (itemType === "card-2") {
        setMapaPosition(
          update(mapaPosition, {
            $merge: { left, top },
          })
        );
      } else if (itemType === "card-3") {
        setEstadisticPosition(
          update(estadisticPosition, {
            $merge: { left, top },
          })
        );
      }
    },
    [movilPosition, mapaPosition, estadisticPosition]
  );

  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.MOVIL, ItemTypes.MAPA, ItemTypes.ESTADISTIC],
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveItem(item.id, left, top);
      return undefined;
    },
  }));

  return (
    <>
      <div ref={drop} className="w-full h-full relative">
        <Mapa />

        {selectedOption === "Vehiculos" && (
          <Vehiculos
            id="card-1"
            left={movilPosition.left}
            top={movilPosition.top}
            hideSourceOnDrag={hideSourceOnDrag}
          ></Vehiculos>
        )}

        {/* <Containerstadistic
      id="card-3"
      left={estadisticPosition.left}
      top={estadisticPosition.top}
      hideSourceOnDrag={hideSourceOnDrag}>
      </Containerstadistic>
       */}
      </div>
    </>
  );
};

export default Container;
