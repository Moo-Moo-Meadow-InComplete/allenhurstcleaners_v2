import { render, screen } from '@testing-library/react';
import PlacesAutocomplete from './PlacesAutocomplete';

// Mock the Google Maps API loader
jest.mock('@react-google-maps/api', () => ({
    useJsApiLoader: jest.fn(() => ({
        isLoaded: false,
        loadError: null,
    })),
    Autocomplete: ({ children }) => <div>{children}</div>,
}));

// Mock Google Analytics
jest.mock('../utils/Ganalytics', () => ({
    logEvent: jest.fn(),
}));

describe('PlacesAutocomplete', () => {
    test('renders loading state when API is not loaded', () => {
        const mockOnChange = jest.fn();
        render(
            <PlacesAutocomplete
                label="Address"
                value=""
                onChange={mockOnChange}
            />
        );
        
        const input = screen.getByLabelText(/Address/i);
        expect(input).toBeInTheDocument();
        expect(input).toBeDisabled();
    });

    test('renders with custom label', () => {
        const mockOnChange = jest.fn();
        render(
            <PlacesAutocomplete
                label="Custom Address Label"
                value=""
                onChange={mockOnChange}
            />
        );
        
        expect(screen.getByLabelText(/Custom Address Label/i)).toBeInTheDocument();
    });

    test('displays error message when API fails to load', () => {
        const { useJsApiLoader } = require('@react-google-maps/api');
        useJsApiLoader.mockReturnValue({
            isLoaded: false,
            loadError: new Error('API Load Error'),
        });

        const mockOnChange = jest.fn();
        render(
            <PlacesAutocomplete
                label="Address"
                value=""
                onChange={mockOnChange}
            />
        );
        
        expect(screen.getByText(/Error loading address autocomplete/i)).toBeInTheDocument();
    });
});
