import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import _ from "lodash"
import WorldMap from "./map.js"

//mapbox public access token - in their docs here:
//https://docs.mapbox.com/help/glossary/access-token/
const TOKEN = "pk.eyJ1Ijoic3RlcGhlbi1tYXJzaGFsbCIsImEiOiJjanB2aWxlNWMwMHV3NDJrajNqN3Jueml4In0.s4SlplYZB-deWizN2jBF8g"

class App extends Component {
  constructor() {
    super();
    this.state = {
     
    };
  }

  render() {
    return (
      <div>
       <WorldMap/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
