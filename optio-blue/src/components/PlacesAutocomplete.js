// Dependencies
import React, { useRef, useCallback, useEffect } from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

// MUI Components
import { TextField, CircularProgress } from '@mui/material';

// Utils
import { logEvent } from '../utils/Ganalytics';

// Libraries to be loaded with the Google Maps API
const libraries = ['places'];

const PlacesAutocomplete = ({ 
    label = 'Address',
    value,
    onChange,
    required = false,
    fullWidth = true,
    margin = 'normal',
    placeholder = 'Enter an address',
    ...textFieldProps
}) => {
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);

    // Load Google Maps API
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const onLoad = useCallback((autocomplete) => {
        autocompleteRef.current = autocomplete;
        logEvent('PlacesAutocomplete', 'Load', 'Autocomplete loaded');
    }, []);

    const onPlaceChanged = useCallback(() => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            
            if (place && place.formatted_address) {
                onChange(place.formatted_address);
                logEvent('PlacesAutocomplete', 'Place Selected', `Address: ${place.formatted_address}`);
            } else if (place && place.name) {
                onChange(place.name);
                logEvent('PlacesAutocomplete', 'Place Selected', `Name: ${place.name}`);
            }
        }
    }, [onChange]);

    // Set up autocomplete options to support international locations
    useEffect(() => {
        if (autocompleteRef.current) {
            // No country restrictions - allows suggestions from anywhere in the world
            // including Türkiye (Turkey) and all other countries
            autocompleteRef.current.setOptions({
                fields: ['formatted_address', 'name', 'geometry', 'place_id', 'address_components'],
                types: ['address', 'establishment'], // Support both addresses and business establishments
            });
        }
    }, [isLoaded]);

    if (loadError) {
        return (
            <TextField
                fullWidth={fullWidth}
                label={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                margin={margin}
                required={required}
                placeholder={placeholder}
                error
                helperText="Error loading address autocomplete. Please enter address manually."
                {...textFieldProps}
            />
        );
    }

    if (!isLoaded) {
        return (
            <TextField
                fullWidth={fullWidth}
                label={label}
                value={value}
                margin={margin}
                required={required}
                placeholder={placeholder}
                disabled
                InputProps={{
                    endAdornment: <CircularProgress size={20} />,
                }}
                {...textFieldProps}
            />
        );
    }

    return (
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
        >
            <TextField
                fullWidth={fullWidth}
                label={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                margin={margin}
                required={required}
                placeholder={placeholder}
                inputRef={inputRef}
                {...textFieldProps}
            />
        </Autocomplete>
    );
};

export default PlacesAutocomplete;
