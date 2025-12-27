import React from 'react';

const GmapEmbeded = ({ mode, mapType, searchQuery, origin, destination, width, height }) => {
    const env = (typeof process !== 'undefined' && process.env) ? process.env : {};
    const apiKey = env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    const defaultOrigin = 'current+location';
    const defaultDestination = 'Allenhurst+Cleaners';
    const cardinalDirection = '110';
    const coordinates = '40.23369598388672,-74.00714111328125';

    let src;
    switch (mode) {
        case 'place':
            src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${defaultDestination}&maptype=${mapType}`;
            break;
        case 'directions':
            src = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin || defaultOrigin}&destination=${destination || defaultDestination}&maptype=${mapType}`;
            break;
        case 'view':
            src = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${coordinates}&zoom=18&maptype=satellite`;
            break;
        case 'streetview':
            src = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${coordinates}&heading=${cardinalDirection}&pitch=0&fov=90`;
            break;
        case 'search':
            src = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${searchQuery}&maptype=${mapType}`;
            break;
        default:
            src = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin || defaultOrigin}&destination=${destination || defaultDestination}&maptype=${mapType}`;
            break;
    }

    return (
        <iframe
            width={width || '100%'}
            height={height}
            title='Google Maps Embedded API Map'
            src={src}
            frameBorder="0"
            allowFullScreen
        >
        </iframe>
    );
};

export default GmapEmbeded;