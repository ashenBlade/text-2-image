import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import BackendEncryptorService from "./services/backendEncryptorService";
import EmptyEncryptorService from "./services/emptyEncryptorService";
import EncryptService from "./domain/encryptService";
import EmptyDecryptService from "./services/emptyDecryptService";
import BackendDecryptService from "./services/backendDecryptService";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


function getEncryptor() {
    if (process.env.REACT_APP_USE_STUBS) {
        return new EmptyEncryptorService();
    } else {
        const serverUrl = process.env.REACT_APP_SERVER_URL;

        if (!serverUrl) {
            throw new Error('Server url is not provided')
        }
        return new BackendEncryptorService(serverUrl);
    }
}

function getDecryptor() {
    if (process.env.REACT_APP_USE_STUBS) {
        return new EmptyDecryptService();
    } else {
        const serverUrl = process.env.REACT_APP_SERVER_URL;

        if (!serverUrl) {
            throw new Error('Server url is not provided')
        }
        return new BackendDecryptService(serverUrl);
    }
}

const encryptor = getEncryptor();
const decryptor = getDecryptor();


root.render(
  <React.StrictMode>
    <App encryptor={encryptor}
         decryptor={decryptor}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
