# PlacesAutocomplete Component

## Overview

The `PlacesAutocomplete` component provides Google Places API autocomplete functionality for address input fields. It supports international address suggestions, including locations in Turkey (Türkiye) and all other countries worldwide.

## Features

- **International Support**: No country restrictions - works globally
- **Smart Fallback**: Gracefully handles API loading errors with manual input fallback
- **Loading States**: Shows loading indicator while Google Maps API is loading
- **Customizable**: Accepts all Material-UI TextField props for styling
- **Analytics Integration**: Logs user interactions for tracking

## Usage

```javascript
import PlacesAutocomplete from './PlacesAutocomplete';

function MyForm() {
    const [address, setAddress] = useState('');

    return (
        <PlacesAutocomplete
            label="Address"
            value={address}
            onChange={setAddress}
            placeholder="Enter your address"
            helperText="Start typing to see address suggestions"
        />
    );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | `'Address'` | Label text for the input field |
| `value` | string | - | Current input value (controlled component) |
| `onChange` | function | - | Callback when value changes `(value: string) => void` |
| `required` | boolean | `false` | Whether the field is required |
| `fullWidth` | boolean | `true` | Whether the field takes full width |
| `margin` | string | `'normal'` | Material-UI margin prop |
| `placeholder` | string | `'Enter an address'` | Placeholder text |
| `...textFieldProps` | object | - | Any additional Material-UI TextField props |

## Implementation Details

### Google Maps API Configuration

The component uses the following Google Maps API settings:

- **Library**: `places`
- **Fields**: `formatted_address`, `name`, `geometry`, `place_id`, `address_components`
- **Types**: `address`, `establishment`
- **Countries**: No restrictions (worldwide support)

### Error Handling

If the Google Maps API fails to load:
- The component displays an error message
- Falls back to a standard text input
- Users can still enter addresses manually

### Loading States

1. **Initial Load**: Shows disabled input with loading spinner
2. **Loaded**: Shows fully functional autocomplete
3. **Error**: Shows standard input with error message

## Example Use Cases

### Basic Address Input
```javascript
<PlacesAutocomplete
    label="Delivery Address"
    value={deliveryAddress}
    onChange={setDeliveryAddress}
/>
```

### Required Field
```javascript
<PlacesAutocomplete
    label="Pickup Address"
    value={pickupAddress}
    onChange={setPickupAddress}
    required
    helperText="Required for pickup service"
/>
```

### Custom Styling
```javascript
<PlacesAutocomplete
    label="Address"
    value={address}
    onChange={setAddress}
    variant="outlined"
    size="small"
    sx={{ mb: 2 }}
/>
```

## International Address Support

The component is specifically designed to support addresses from all countries, including:

- Turkey (Türkiye): Full support for Turkish addresses and place names
- United States: Complete US address format support
- Europe: All European countries supported
- Asia, Africa, South America, etc.: Global coverage

## Analytics

The component logs the following events to Google Analytics:

- `PlacesAutocomplete/Load`: When the autocomplete component loads
- `PlacesAutocomplete/Place Selected`: When user selects an address from suggestions

## Requirements

- React 18.x
- @react-google-maps/api 2.19.3+
- @mui/material 6.x
- Google Maps API key with Places API enabled

## Browser Support

Works in all modern browsers that support:
- Google Maps JavaScript API
- ES6+ JavaScript features
- Material-UI v6
