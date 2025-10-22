

import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'; // Si tu utilises un fichier CSS pour le style
import Sondes from './components/Sondes';
import App from "./App.jsx"; // Importation du composant Sondes

// Rendre l'application React dans l'élément avec l'id 'app'
ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        {/* Ici, tu peux afficher directement le composant Sondes */}
        <App />
    </React.StrictMode>
);
