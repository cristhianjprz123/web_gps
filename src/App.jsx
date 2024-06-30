import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useButton } from "./components/context/useButton";
import Container from "./container";
import Sidebar from "./components/Sidebar/sidebar";

const App = () => {
  const { activeMenu } = useButton();

  return (
    <>
      <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
        <Navbar />
      </div>
      <div className="flex">
        {activeMenu ? (
          <div className="flex flex-col items-center w-1/10 min-h-screen bg-gray-900 text-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0">
            <Sidebar />
          </div>
        )}

        <Container />
      </div>
    </>
  );
};

export default App;
