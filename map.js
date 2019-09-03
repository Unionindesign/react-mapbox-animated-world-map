import React, { Component } from 'react';
import MapGL, { Marker } from "react-map-gl";
import { render } from 'react-dom';
import './style.css';
//import _ from "lodash"

//mapbox public access token - in their docs here:
//https://docs.mapbox.com/help/glossary/access-token/
const TOKEN = "pk.eyJ1Ijoic3RlcGhlbi1tYXJzaGFsbCIsImEiOiJjanB2aWxlNWMwMHV3NDJrajNqN3Jueml4In0.s4SlplYZB-deWizN2jBF8g"

class WorldMap extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
				width: window.innerWidth,
				height: window.innerHeight * 0.8,
				latitude: 30,
				longitude: 1,
				zoom: 1.5,
				pitch: 0
			},
    };
    //timeline instance
    this.tl = null;
  }
  //Mapbox viewport for resize, zoom pan etc
	_onViewportChange = viewport => {
    this.setState({ viewport });
		//TODO timeline restarts on viewport change with zoom, panning...
		//viewport function always run on initial load, this.tl will be null
		// if (_.isNull(this.tl)) {
		// 	console.log("tl is null on viewport change");
		// 	this.setState({ viewport });
		// } else {
		// 	//if there's a valid timeline instance, pause and resume it
		// 	console.log("tl is valid on viewport change, pause and resume");
		// 	this.tl.pause().resume();
		// 	this.setState({ viewport });
		// }
	};

  render() {
    return (
      <div>
       <MapGL
					mapboxApiAccessToken={TOKEN}
					{...this.state.viewport}
					viewport={this.state.viewport}
					mapStyle="mapbox://styles/mapbox/dark-v9"
					onViewportChange={this._onViewportChange}/>
      </div>
    );
  }
}

export default WorldMap
