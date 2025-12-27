// Dependencies
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

// Styles
import './assets/styles/App.css';

// MUI Components
import { CssBaseline, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';
import SidePanel from './components/SidePanel';
import CookieConsent from 'react-cookie-consent';

// Contexts
import { SidePanelProvider } from './contexts/SidePanelContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

// Utils
import { logPageView, logEvent } from './utils/Ganalytics';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    <>
      <CssBaseline />
      <SidePanelProvider>
        <ThemedAppContent />
      </SidePanelProvider>
    </>
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        {/*  
          basename='/allenhurstcleaners_v2/' is used to set the base URL for all locations.
          This is needed for GitHub Pages deployment.
          Must be removed for Netlify deployment.
        */}
        <AppContent />
      </Router>
    </ThemeContextProvider>
  );
}

function ThemedAppContent() {
  const theme = useTheme();
  const handleCookieAccept = () => {
    logEvent('Cookie', 'Accept', 'cookie-consent');
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    }}>
      <Header />
      <SidePanel />
      <Container maxWidth="xl" sx={{
        flexGrow: 1,
      }}>
        <Routes />
      </Container>
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="接受"
        declineButtonText="拒絕"
        enableDeclineButton
        cookieName="cookie_consent"
        style={{ background: '#2b2b2b' }}
        buttonStyle={{ color: '#fff', background: '#1976d2', fontSize: '14px', borderRadius: '4px' }}
        declineButtonStyle={{ color: '#2b2b2b', background: '#e0e0e0', fontSize: '14px', borderRadius: '4px' }}
        expires={180}
        onAccept={handleCookieAccept}
      >
        我們使用 cookie 改善體驗與分析使用情況。按「接受」即表示同意。
      </CookieConsent>
    </Box>
  );
}

export default App;