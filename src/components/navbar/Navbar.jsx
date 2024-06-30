/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { BiMessageAlt } from "react-icons/bi";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import myImage from "./logo.png";
import usuario from "./usuario.png";
import Chat from "./Chat";
import Notification from "./Notification";
import UserProfile from "./UserProfile";
import { useButton } from "../context/useButton";

const NavButton = ( {customFunc, icon, color, doctColor, className} ) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    className={className}
  >
    <span
      style={{ background: doctColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-5 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const {
    setActiveMenu,
    handClick,
    isClick,
    setScreenSize,
    screenSize,
    currentColor,
    handleActiveMenu,
  } = useButton();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 850) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  
  return (
    <div className="flex h-13 justify-between py-1 md:mx-6 md:mr-6 relative  ">
      <div className="flex justify-between gap-7 relative">
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu size={19}/>}
          className="relative text-xl rounded-full p-3 px-0 hover:bg-light-gray"
          
        />
        <div className="flex">
          <img src={myImage} alt="logo" className="h-7 w-5.5 my-1.5 mx-1.5" />
          <span className="my-1.5 mx-0 text-lg font-medium">TechGuard</span>
        </div>
      </div>
      <div className="flex h-11 ">
        <NavButton
          title="Chat"
          customFunc={() => handClick("chat")}
          color={currentColor}
          icon={<BiMessageAlt size={21}/>}
          doctColor="rgb(34 197 94)"
          className="relative text-xl rounded-full p-3  hover:bg-light-gray"
        />
        <NavButton
          title="Notificaciones"
          customFunc={() => handClick("noti")}
          color={currentColor}
          icon={<RiNotification3Line size={21}/>}
          doctColor="rgb(34 197 94)"
          className="relative text-xl rounded-full p-3  hover:bg-light-gray"
        />

        <div
          className="flex items-center gap-2  cursor-pointer p-1 hover:bg-light-gray rounded-lg  "
          onClick={() => handClick("perfil")}
        >
          <img src={usuario} alt="avatar" className="rounded-full w-7 h-7" />
          <p>
            <span className="text-gray-400 text-14">Name</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>

        {isClick.chat && <Chat />}
        {isClick.noti && <Notification />}
        {isClick.perfil && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
