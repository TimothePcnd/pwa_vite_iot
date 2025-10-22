import React, { useState, useEffect } from 'react';

const Toilettes = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL; // URL de l'API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/toilettes`);

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }

                const result = await response.json();


                if (result && Array.isArray(result.data)) {
                    const sortedData = result.data.sort((a, b) => new Date(b.received_at) - new Date(a.received_at));
                    setData(sortedData[0]); // Mettre à jour l'état avec la dernière donnée de toilette
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
