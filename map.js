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
    //ref to map markers
    this.MapMarkers=[]
    this.state = {
      viewport: {
				width: window.innerWidth,
				height: window.innerHeight * 0.8,
				latitude: 37.785164,
				longitude: -100,
				zoom: 1,
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
  componentDidMount(){
    //console.log("Props Check: ", this.props.cities)
  }
  	markersizer = pop => {
      //let pop = pop.replace(/,/g, '')
		if (pop < 600000) {
			return 2;
		} else if (pop >= 600000 && pop <= 750000) {
			return 3;
		} else if (pop >= 750000 && pop <= 1000000) {
			return 4;
		} else if (pop >= 2000000 && pop <= 3500000) {
			return 5;
		} else if (pop >= 3500000 && pop <= 5000000) {
			return 6;
		} else if (pop >= 5000000 && pop <= 65000000) {
			return 7;
    } else if (pop >= 80000000) {
      return 8;
    }

	};

  render() {
    return (
      <div>
       <MapGL
					mapboxApiAccessToken={TOKEN}
					{...this.state.viewport}
					viewport={this.state.viewport}
					mapStyle="mapbox://styles/mapbox/dark-v9"
					onViewportChange={this._onViewportChange}>
            {this.props.cities.map((city, i) => (
						<Marker
							key={i}
							latitude={city.latitude}
							longitude={city.longitude}
							offsetLeft={-20}
							offsetTop={-10}>
							<svg>
									<circle
										cx={12}
										cy={12}
                    //manipulating string data to show larger radius marker based on population
										r={this.markersizer(parseInt(city.population)*1000)}
										ref={e => (this.MapMarkers[i] = e)}
										style={{
											fill: "red",
											stroke: "#FFF",
											strokeWidth: 2
										}}
									/>
								</svg>
						</Marker>
					))}
          </MapGL>
      </div>
    );
  }
}

export default WorldMap
