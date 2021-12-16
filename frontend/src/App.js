import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import "react-svg-map/lib/index.css";
import GovComponent from "./component/govComponent/govComponent";
import OngComponent from "./component/ong-component/ong-component";


function ReactStandardAffichage() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}


export default function App() {
    return (
        <div>
            <BrowserRouter>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav">
                        <Link to="/home" className="nav-item nav-link">Home</Link>
                        <Link to="/gov" className="nav-item nav-link">Government</Link>
                        <Link to="/ong" className="nav-item nav-link">ONG</Link>
                    </div>
                </nav>
                <Routes>
                    <Route
                        path="/"
                       render={() => {
                           return (
                               <Navigate to="/home" />
                           )
                       }
                    }/>
                    <Route exact path="gov" element={<GovComponent/>}/>
                    <Route exact path="ong" element={<OngComponent/>}/>
                    <Route exact path="home" element={<ReactStandardAffichage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
