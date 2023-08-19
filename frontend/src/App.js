import React, {useState} from 'react';
import '../src/styles/App.css';
import UploadForm from './components/UploadForm';
import TransactionList from "./components/TransactionList";

function App() {
    const [transactionsUpdated, setTransactionsUpdated] = useState(0);

    const handleTransactionsUpdated = () => {
        setTransactionsUpdated(transactionsUpdated + 1);
    };

    return (
        <div className="App">
            <div className="container">
                <div className="form-container bordered">
                    <UploadForm onTransactionsUpdated={handleTransactionsUpdated}/>
                </div>
                <div className="table-container">
                    <TransactionList transactionsUpdated={transactionsUpdated}/>
                </div>
            </div>
        </div>
    );
}

export default App;
