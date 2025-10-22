// src/App.jsx

import React from 'react';
import Sondes from './components/Sondes';
import Toilettes from "./components/Toilettes.jsx"; // Importation du composant Sondes
import './App.css';

const App = () => {
    return (
        <div>
            <h1>Tableau des capteurs</h1>
            <div><Sondes /></div>
            <div><Toilettes /></div>
        </div>
    );
};

export default App;
