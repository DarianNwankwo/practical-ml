import React from 'react';
import Header from "./Header";
import Description from "./Description";
import CanvasView from "./CanvasView";
import Footer from "./Footer";
import './App.css';


function App() {
  return (
    <section>
      <Header id="header" />
      <Description id="description" />
      <CanvasView id="canvas-view" />
      <Footer id="footer" />
    </section>
  );
}


export default App;
