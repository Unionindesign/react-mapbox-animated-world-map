import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import WorldMap from "./map.js"
import FilterIcon from "@material-ui/icons/TouchApp";


class App extends Component {
  constructor() {
    super();
    this.state = {
     cities: [
              {"city":"New York","population": 8175133, "state":"New York","latitude":40.6643,"longitude":-73.9385},
              {"city":"Los Angeles","population":3792621,"state":"California","latitude":34.0194,"longitude":-118.4108},
              {"city":"Chicago","population":2695598,"state":"Illinois","latitude":41.8376,"longitude":-87.6818},
              {"city":"Houston","population":2100263,"state":"Texas","latitude":29.7805,"longitude":-95.3863},
              {"city":"Phoenix","population":1445632,"state":"Arizona","latitude":33.5722,"longitude":-112.0880},
              {"city":"Philadelphia","population":1526006,"state":"Pennsylvania","latitude":40.0094,"longitude":-75.1333},
              {"city":"San Antonio","population":1327407,"state":"Texas","latitude":29.4724,"longitude":-98.5251},
              {"city":"San Diego","population":1307402,"state":"California","latitude":32.8153,"longitude":-117.1350},
              {"city":"Dallas","population":1197816,"state":"Texas","latitude":32.7757,"longitude":-96.7967},
              {"city":"San Jose","population":945942,"state":"California","latitude":37.2969,"longitude":-121.8193},
              {"city":"Austin","population":790390,"state":"Texas","latitude":30.3072,"longitude":-97.7560},
              {"city":"Jacksonville","population":821784,"state":"Florida","latitude":30.3370,"longitude":-81.6613},
              {"city":"San Francisco","population":805235,"state":"California","latitude":37.7751,"longitude":-122.4193},
              {"city":"Columbus","population":787033,"state":"Ohio","latitude":39.9848,"longitude":-82.9850},
              {"city":"Indianapolis","population":820445,"state":"Indiana","latitude":39.7767,"longitude":-86.1459},
              {"city":"Fort Worth","population":741206,"state":"Texas","latitude":32.7795,"longitude":-97.3463},
              {"city":"Charlotte","population":731424,"state":"North Carolina","latitude":35.2087,"longitude":-80.8307},
              {"city":"Seattle","population":608660,"state":"Washington","latitude":47.6205,"longitude":-122.3509},
              {"city":"Denver","population":600158,"state":"Colorado","latitude":39.7618,"longitude":-104.8806},
              {"city":"El Paso","population":649121,"state":"Texas","latitude":31.8484,"longitude":-106.4270}
     ],
     loading: false,
     onTheMap: [],
     pop500kto750k: [],
     pop750kto1M: [],
     pop1MandUp: []

    };
  }
componentDidMount(){
   //initially, load the entire data set
  // this.setState({onTheMap: this.state.cities})
  //function that breaks up the data set into smaller chunks
  this.dataFilter()
}
componentDidUpdate(){
  console.log("========\n Container Updated \n========\n");
  console.log("Check for updates to state for smaller data sets. \nNumber of cities 500k - 750k: " + this.state.pop500kto750k.length + "\nNumber of cities 750k - 1M: " + this.state.pop500kto750k.length + "\nNumber of cities over 1M: "+ this.state.pop1MandUp.length)
}
dataFilter(){
  const pop500kto750k = this.state.cities.filter(city => {
    return city.population > 500000 && city.population < 750000
  })
  console.log("500k to 750k: ", pop500kto750k);

  const pop750kto1M = this.state.cities.filter(city => {
    return city.population > 750000 && city.population < 1000000
  })
  console.log("750k to 1M: ", pop750kto1M);

  const pop1MandUp = this.state.cities.filter(city => {
    return city.population > 1000000
  })
  console.log("More than 1M: ", pop1MandUp);
  
  this.setState({
    onTheMap: this.state.cities,
    pop500kto750k: pop500kto750k,
    pop750kto1M: pop750kto1M,
    pop1MandUp: pop1MandUp,
  });
}
handleAllCitiesSelect = () => {
  this.setState({onTheMap: this.state.cities})
}
handleDataSelect500k = () => {
  this.setState({onTheMap: this.state.pop500kto750k})
}  
handleDataSelect750k = () => {
  this.setState({onTheMap: this.state.pop750kto1M})
}
handleDataSelect1M = () => {
  this.setState({onTheMap: this.state.pop1MandUp})
}
render() {
    return (
      <div>
      <div className="onTopOfMap">
          <h4><FilterIcon/> Data Filters: </h4>
          <h5> select cities based<br/> on population:</h5>
          <ul className="dataSelectorList">
             <li>
              <input
                type="radio"
                value="all"
                name="dataSelector"
                onChange={this.handleAllCitiesSelect}
              />
              all (default)
            </li>
            <li>
              <input
                type="radio"
                value="500"
                name="dataSelector"
                onChange={this.handleDataSelect500k}
              />
              500k - 750k
            </li>
            <li>
              <input
                type="radio"
                value="750"
                name="dataSelector"
                onChange={this.handleDataSelect750k}
              />
              750k - 1M
            </li>
            <li>
              <input
                type="radio"
                value="1M"
                name="dataSelector"
                onChange={this.handleDataSelect1M}
              />
             1M or more
            </li>
        </ul>
       </div> 
      <div className="mapboxContainer">
       <WorldMap onTheMap={this.state.onTheMap}/>
        <div className="belowMap">
          <h4>Here is an example of animated Map Markers using mapbox, react, and GSAP. The data is from a <a href="https://uber.github.io/react-map-gl/#/Examples/markers-popups">Mapbox Demo</a> and is available <a href="https://github.com/uber/react-map-gl/blob/master/examples/data/cities.json">HERE</a>. I've made a few edits to make the data more manageable and speed up rendering.
          </h4>
        </div>
       </div>
      </div>
     // </div>
    );
  }
}

render(<App />, document.getElementById('root'));
