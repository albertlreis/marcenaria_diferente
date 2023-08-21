import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './styles/App.css';
import UploadForm from './components/UploadForm';
import TransactionList from './components/TransactionList';
import Login from './components/LoginForm';
import api from './api';
import Register from "./components/RegisterForm";

function App() {
    const [transactionsUpdated, setTransactionsUpdated] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await api.get('/auth/check-auth');
                setIsAuthenticated(response.status === 200);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuthentication();
    }, []);

    const handleTransactionsUpdated = () => {
        setTransactionsUpdated(transactionsUpdated + 1);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/login" exact render={() => <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" exact component={Register} /> {/* Rota de Registro */}
                    <Route path="/" exact>
                        {isAuthenticated ? (
                            <div>
                                <UploadForm onTransactionsUpdated={handleTransactionsUpdated} onLogout={handleLogout} />
                                <TransactionList transactionsUpdated={transactionsUpdated} />
                            </div>
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
