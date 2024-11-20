import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppContextProvider from './context/AppContextProvider';
import { BrowserRouter} from 'react-router-dom';
import { FeedProvider } from './context/feedContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <FeedProvider>
        <App />
      </FeedProvider>
    </AppContextProvider>
  </BrowserRouter>
);