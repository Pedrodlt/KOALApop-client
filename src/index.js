import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProviderWrapper } from './contexts/theme.context';
import { AuthProviderWrapper } from './contexts/auth.context';
import { MessageProviderWrapper } from './contexts/toast.context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <ThemeProviderWrapper>
        <MessageProviderWrapper>
          <Router>
            <App />
          </Router>
        </MessageProviderWrapper>
      </ThemeProviderWrapper>
    </AuthProviderWrapper>
  </React.StrictMode>
);

