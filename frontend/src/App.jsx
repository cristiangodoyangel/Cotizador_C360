import React from 'react';
import Layout from './components/Layout';
import CotizadorDND from './components/CotizadorDND';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Layout>
        <div className="content-wrapper">
        <CotizadorDND />
        </div>
      </Layout>
    </div>
  );
}

export default App;
