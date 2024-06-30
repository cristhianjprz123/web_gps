import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {ButtonProvider} from './components/context/provider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
    <DndProvider backend={HTML5Backend}>
    
    <ButtonProvider>
    <React.StrictMode>
        <App/>
        </React.StrictMode>
    </ButtonProvider>
    
    </DndProvider>
      
  
);