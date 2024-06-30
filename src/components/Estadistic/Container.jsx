import { Resizable } from 're-resizable';
import { useDrag } from "react-dnd";
import { useState } from "react";
import { ImPushpin } from "react-icons/im";
import { ItemTypes } from "../ItemTypes";
import "./styles.css";

const Containerstadistic = ({ id, left, top, hideSourceOnDrag }) => {
  const [actived2, setActived2] = useState(false);
 

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.ESTADISTIC,
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
    position: "absolute",
    left,
    top,
    
  };

 const styles = {
  opacity: isDragging ? 1 : 1, // Mantén la opacidad en 1 mientras se arrastra
 };
 

  return (
    <Resizable
     style={cardStyles}
      defaultSize={{
        width: 1800,
        height: 600
      }}
      data-testid="estadisctic"
     
      className='estadistic'
    >
      <article  ref={actived2 ? drag : null}  style={styles} className='estadistic' >
        <header className="header">
          <h2 className="title">ESTADISTICAS</h2>
          <div className="InputContainerEstadistic">
            <input
              type="text"
              name="text"
              className="input"
              id="input"
              placeholder="Search"
            />
            <label htmlFor="input" className="labelforsearch">
              <svg viewBox="0 0 512 512" className="card-search-icon">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
              </svg>
            </label>
          </div>
          <ImPushpin
            className="icono"
            style={{ color: "white", fontSize: "1.5rem", position: "absolute", right: "0.8rem", top: "0.9rem" }}
            onClick={() => setActived2(!actived2)}
          />
        </header>
      </article>
    </Resizable>
  );
};

export default Containerstadistic;
