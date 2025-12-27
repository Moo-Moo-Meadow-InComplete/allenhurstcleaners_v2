// Dependencies
import ReactGA from 'react-ga4';

// Guard process for browser runtime
const env = (typeof process !== 'undefined' && process.env) ? process.env : {};

export const initGA = () => {
    const googleTagId = env.REACT_APP_GOOGLE_TAG_ID || '';
    if (!googleTagId) {
        // No ID: skip GA init to avoid runtime errors
        return;
    }
    ReactGA.initialize(googleTagId);
};

export const logPageView = () => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

export const logEvent = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
    });
};

export const logTiming = (category, variable, value, label) => {
    ReactGA.event({
        category: category,
        action: variable,
        value: value,
        label: label,
    });
};

// Assign object to a variable before exporting as module default
const Ganalytics = {
    initGA,
    logPageView,
    logEvent,
    logTiming,
};

export default Ganalytics;