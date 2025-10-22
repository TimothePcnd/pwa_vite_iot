import React, { useState, useEffect } from 'react';

const Sondes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL; // URL de l'API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/sondes`);

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }

                const result = await response.json();

                // Vérifier si `data` existe et est un tableau
                if (result && Array.isArray(result.data)) {
                    // Regrouper les données par device_id
                    const groupedData = result.data.reduce((acc, curr) => {
                        const deviceId = curr.device_id;
                        if (!acc[deviceId]) {
                            acc[deviceId] = [];
                        }
                        acc[deviceId].push(curr);
                        return acc;
                    }, {});

                    // Pour chaque groupe de device_id, trier par date et récupérer la dernière donnée
                    const latestData = Object.values(groupedData).map(group => {
                        const sortedGroup = group.sort((a, b) => new Date(b.received_at) - new Date(a.received_at));
                        return sortedGroup[0]; // Dernière donnée pour chaque device_id
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
