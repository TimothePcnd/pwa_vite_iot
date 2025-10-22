import React, { useState, useEffect } from 'react';

/**
 * Composant `Sondes`
 *
 * Ce composant récupère et affiche les données des sondes depuis une API externe.
 * Il regroupe les données par `device_id`, les trie par la date la plus récente,
 * et affiche les dernières données pour chaque capteur.
 *
 * @component
 * @example
 * return (
 *   <Sondes />
 * )
 */
const Sondes = () => {
    /**
     * État pour stocker les données des sondes récupérées depuis l'API.
     * @type {Array<Object>}
     */
    const [data, setData] = useState([]);

    /**
     * État pour gérer le statut de chargement de l'application.
     * @type {boolean}
     */
    const [loading, setLoading] = useState(true);

    /**
     * État pour gérer les erreurs survenues lors de la récupération des données.
     * @type {string|null}
     */
    const [error, setError] = useState(null);

    /**
     * URL de l'API où les données des sondes sont récupérées.
     * @type {string}
     */
    const apiUrl = import.meta.env.VITE_API_URL;

    /**
     * Fonction pour récupérer les données des sondes depuis l'API.
     * Cette fonction est appelée au montage du composant.
     *
     * @async
     * @function fetchData
     * @returns {Promise<void>}
     */
    useEffect(() => {
        /**
         * Fonction asynchrone qui récupère et traite les données de l'API.
         * Elle regroupe les données par `device_id` et affiche la dernière donnée pour chaque capteur.
         *
         * @returns {Promise<void>}
         */
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/sondes`);

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }

                const result = await response.json();

                // Vérifier si les données sont au bon format
                if (result && Array.isArray(result.data)) {
                    // Regrouper les données par `device_id`
                    const groupedData = result.data.reduce((acc, curr) => {
                        const deviceId = curr.device_id;
                        if (!acc[deviceId]) {
                            acc[deviceId] = [];
                        }
                        acc[deviceId].push(curr);
                        return acc;
                    }, {});

                    // Trier les données par date et récupérer la dernière entrée
                    const latestData = Object.values(groupedData).map(group => {
                        const sortedGroup = group.sort((a, b) => new Date(b.received_at) - new Date(a.received_at));
                        return sortedGroup[0]; // Dernière donnée pour chaque `device_id`
                    });

                    setData(latestData);
                } else {
                    throw new Error("Les données de sondes sont mal formatées");
                }

                setLoading(false);
            } catch (err) {
                console.error("Erreur : ", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    /**
     * Affichage conditionnel en fonction de l'état de l'application.
     * Si l'application est en cours de chargement ou qu'une erreur survient,
     * le rendu s'adapte en conséquence.
     *
     * @returns {JSX.Element}
     */
    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="container">
            <h2>Données des sondes :</h2>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="card">
                        <p className="label">Device ID:</p>
                        <p className="value">{item.device_id}</p>
                        <p className="label">Haut:</p>
                        <p className="value">{item.haut} m</p>
                        <p className="label">Volt:</p>
                        <p className="value">{item.volt} V</p>
                        <p className="label">Received At:</p>
                        <p className="value">{new Date(item.received_at).toLocaleString()}</p>
                        <p className="label">Inserted At:</p>
                        <p className="value">{new Date(item.inserted_at).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p className="no-data">Aucune donnée disponible</p>
            )}
        </div>
    );
};

export default Sondes;
