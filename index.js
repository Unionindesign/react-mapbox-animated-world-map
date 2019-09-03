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
     cities: []
    };
  }
  componentDidMount(){
    this.getWorldCitiiesData()
  }
  getWorldCitiiesData(){
    		this.setState({ loadingData: true }, () => {
			const Papa = require("papaparse");
      const dataFilePath = "https://github.com/Unionindesign/react-mapbox-animated-world-map/blob/master/worldcities.csv"
				return new Promise(resolve => {
				Papa.parse(dataFilePath, {
					download: true,
          /delimiter: ",",
					header: false, //Don't use column names from 1st row in csv! These are assigned when creating Keys for JSON below!
					skipEmptyLines: true,
					complete: result => {
							console.log(
							"--------\n" +
								"raw data: " +
							
								"\n--------" + JSON.stringify(result)
						);
            resolve(result)
						let mapData = result.data.map(city => {
							return {
								id: city[11],
                city: city[0],
                lat: city[2],
                lng: city.lng

							};
              
						});
					console.log("Map Data: ", mapData)
						this.setState({cities: mapData})
          }
				});
			});
		});
	}

  render() {
    return (
      <div>
       <WorldMap cities={this.state.cities}/>
       <div className="belowMap">
       <p>map data provided by <a href="https://simplemaps.com/data/us-cities"> simplemaps.com</a></p>
       </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
