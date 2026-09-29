import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client'; // Измененный импорт
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext(null);

const container = document.getElementById('root');
const root = createRoot(container); // Создаем корень

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
  }}>
    <App />
  </Context.Provider>
);