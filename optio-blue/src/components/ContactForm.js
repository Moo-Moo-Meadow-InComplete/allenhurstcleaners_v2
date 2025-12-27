// Dependencies
import React, { useState } from 'react';

// MUI Components
import { Typography, TextField, Button, Box } from '@mui/material';

// Utils
import { logEvent } from '../utils/Ganalytics';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:allenhurstcleaners@gmail.com?subject=${encodeURIComponent(`Website Contact Form Submission from ${name}`)}&body=${encodeURIComponent(message)}`;
        logEvent('ContactForm', 'Submit', `Name: ${name}, Message: ${message.length} characters`);

        // Clear the form fields
        setName('');
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