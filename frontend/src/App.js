import React from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import TransactionList from "./components/TransactionList";

function App() {
    return (
        <div className="App">
            <UploadForm/>
            <TransactionList/>
        </div>
    );
}

export default App;
