import React from 'react';
import FiltersViewComponent from "./components/FiltersViewComponent";
import './App.css';
import ToastNotification from "./components/ToastNotification";

const App: React.FC = () => {
  return (
    <div className="App">
      <ToastNotification />
      <FiltersViewComponent />
    </div>
  );
};

export default App;