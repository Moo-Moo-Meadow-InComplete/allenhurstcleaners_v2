// Dependencies
import React, { useState } from 'react';

// MUI Components
import { Typography, TextField, Button, Box } from '@mui/material';

// Components
import PlacesAutocomplete from './PlacesAutocomplete';

// Utils
import { logEvent } from '../utils/Ganalytics';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailBody = `Address: ${address}\n\n${message}`;
        const mailtoLink = `mailto:allenhurstcleaners@gmail.com?subject=Website Contact Form Submission from ${name}&body=${encodeURIComponent(emailBody)}`;
        logEvent('ContactForm', 'Submit', `Name: ${name}, Address: ${address ? 'provided' : 'not provided'}, Message: ${message.length} characters`);

        // Clear the form fields
        setName('');
        setAddress('');
        setMessage('');

        // Delay navigation to allow state updates to take effect
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 100);
    };

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Send Us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    margin="normal"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <PlacesAutocomplete
                    label="Address (optional)"
                    value={address}
                    onChange={setAddress}
                    placeholder="Enter your pickup/delivery address"
                    helperText="Enter an address for pickup or delivery services (supports international addresses)"
                />
                <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    margin="normal"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Send Message
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default ContactForm;