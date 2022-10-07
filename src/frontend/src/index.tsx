import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const serverUrl = process.env.REACT_APP_SERVER_URL;

if (!serverUrl) {
    throw new Error('Server url is not provided')
}

root.render(
  <React.StrictMode>
    <App serverUrl={serverUrl}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
