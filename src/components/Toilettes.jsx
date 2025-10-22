import React, { useState, useEffect } from 'react';

/**
 * Composant `Toilettes`
 *
 * Ce composant récupère et affiche les données de la dernière toilette depuis une API externe.
 * Il trie les données par la date la plus récente et affiche les informations liées à l'occupation et à l'état de la toilette.
 *
 * @component
 * @example
 * return (
 *   <Toilettes />
 * )
 */
const Toilettes = () => {
    /**
     * État pour stocker la dernière donnée des toilettes récupérée depuis l'API.
     * @type {Object|null}
     */
    const [data, setData] = useState(null);

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
     * URL de l'API où les données des toilettes sont récupérées.
     * @type {string}
     */
    const apiUrl = import.meta.env.VITE_API_URL;

    /**
     * Fonction pour récupérer les données des toilettes depuis l'API.
     * Cette fonction est appelée au montage du composant.
     *
     * @async
     * @function fetchData
     * @returns {Promise<void>}
     */
    useEffect(() => {
        /**
         * Fonction asynchrone qui récupère et trie les données des toilettes par date.
         * Elle met à jour l'état avec la dernière donnée d'occupation et de batterie.
         *
         * @returns {Promise<void>}
         */
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/toilettes`);

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }

                const result = await response.json();

                // Vérifier si les données sont bien formatées
                if (result && Array.isArray(result.data)) {
                    const sortedData = result.data.sort((a, b) => new Date(b.received_at) - new Date(a.received_at));
                    setData(sortedData[0]); // Mettre à jour l'état avec la dernière donnée
                } else {
                    throw new Error("Les données de toilettes sont mal formatées");
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
    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">Erreur: {error}</div>;

    return (
        <div className="container">
            <h2>Données de la dernière toilette :</h2>
            {data ? (
                <div className="card">
                    <p className="label">Device ID:</p>
                    <p className="value">{data.device_id}</p>
                    <p className="label">Batterie:</p>
                    <p className="value">{data.battery}%</p>
                    <p className="label">Occupation:</p>
                    <p className="value">{data.occupancy}</p>
                    <p className="label">Received At:</p>
                    <p className="value">{new Date(data.received_at).toLocaleString()}</p>
                </div>
            ) : (
                <p className="no-data">Aucune donnée disponible</p>
            )}
        </div>
    );
};

export default Toilettes;
