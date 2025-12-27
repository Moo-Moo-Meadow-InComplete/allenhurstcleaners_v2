// Dependencies
import React, { useState, useRef, useEffect } from 'react';

// Components
import GmapEmbeded from './GmapEmbeded';
import GmapEmbededToolBar from './GmapEmbededToolBar';

// Utils
import { logEvent } from '../../utils/Ganalytics';

const FreeGmap = () => {
    const env = (typeof process !== 'undefined' && process.env) ? process.env : {};
    const hasApiKey = Boolean(env.REACT_APP_GOOGLE_MAPS_API_KEY);
    const mapRef = useRef(null);
    const [mode, setMode] = useState('directions');
    const [mapType, setMapType] = useState('roadmap');
    const [searchQuery, setSearchQuery] = useState('Allenhurst Cleaners');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const toggleMapType = () => {
        setMapType((prevType) => (prevType === 'roadmap' ? 'satellite' : 'roadmap'));
        logEvent('Contact', 'Toggle Map Type', mapType === 'roadmap' ? 'Satellite' : 'Roadmap');
    };

    // Get user's geolocation coordinates and set as origin for directions map (embeded) on page load
    useEffect(() => {
        if (window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const trimmedLatitude = String(latitude).trim();
                    const trimmedLongitude = String(longitude).trim();
                    setOrigin(`${trimmedLatitude},${trimmedLongitude}`);
                    if (mapRef.current) {
                        mapRef.current.setCenter({ lat: parseFloat(trimmedLatitude), lng: parseFloat(trimmedLongitude) });
                    }
                    logEvent('Contact', 'Geolocation Success', `Lat: ${trimmedLatitude}, Lng: ${trimmedLongitude}`);
                },
                (err) => {
                    console.error('Geolocation error:', err);
                    logEvent('Contact', 'Geolocation Error', err.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    if (!hasApiKey) {
        return (
            <div style={{ padding: '16px', textAlign: 'center' }}>
                <strong>Google Maps is temporarily disabled.</strong>
                <div>Provide REACT_APP_GOOGLE_MAPS_API_KEY to re-enable.</div>
            </div>
        );
    }

    return (
        <>
            {/* Embeded Google Maps */}
        <GmapEmbeded
                mode={mode}
                mapType={mapType}
                searchQuery={searchQuery}
                origin={origin}
                destination={destination}
                height={450}
            />
            {/* Tool bar controls */}
            <GmapEmbededToolBar
                setMode={setMode}
                mapType={mapType}
                toggleMapType={toggleMapType}
                setSearchQuery={setSearchQuery}
                setOrigin={setOrigin}
                setDestination={setDestination}
                mode={mode}
            />
        </>
    );
};

export default FreeGmap;