
import { useButton } from '../context/useButton';
import {  AiOutlineHistory, AiOutlineSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import {TfiMapAlt} from "react-icons/tfi";


import {LiaCarSideSolid} from "react-icons/lia";



const Sidebar = () => {
  const { selectedOption, handleOptionClick } = useButton();

  const options = [
    { name: 'Mapa', icon: <TfiMapAlt  size={21}/>, id: 'map' },
     { name: 'Vehiculos', icon: <LiaCarSideSolid  size={21}/>, id: 'vehiculos'},
    { name: 'Historial', icon: <AiOutlineHistory size={21} />, id: 'history' },
    { name: 'Configuración', icon: <AiOutlineSetting size={21}/>, id: 'settings' },
    { name: 'Atras', icon: <BiArrowBack size={23}/>, id: 'logout'}
  ];

  return (
    <>
    
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => handleOptionClick(option.name)}
          className={`p-5 cursor-pointer ${selectedOption === option.name ? 'bg-gray-600' : ''}`}
        >
          {option.icon}
        </div>
      ))}
    
    </>
     
   
    
    
  );
};

export default Sidebar;