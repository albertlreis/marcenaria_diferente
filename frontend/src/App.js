import React, { useState } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import TransactionList from "./components/TransactionList";

function App() {
    const [transactionsUpdated, setTransactionsUpdated] = useState(0);

    const handleTransactionsUpdated = () => {
        setTransactionsUpdated(transactionsUpdated + 1);
    };

    return (
        <div className="App">
            <UploadForm onTransactionsUpdated={handleTransactionsUpdated} />
            <TransactionList transactionsUpdated={transactionsUpdated} />
        </div>
    );
}

export default App;
