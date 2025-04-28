import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//components
import AbUs from './components/aboutUs.jsx'
import Dtls from './components/info.jsx'
import Card from './components/card.jsx'
import Card2 from './components/card2.jsx'
import Nav from './components/nav.jsx'
import Footer from './components/footer.jsx'

function App() {
  return (
    <div className="app">
  <Nav />
  <main className="main-content">


    <AbUs/>
    
  
  </main>
  <Footer />
</div>
  );
}

export default App
