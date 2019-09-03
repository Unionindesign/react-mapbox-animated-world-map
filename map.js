import React, { Component } from 'react';
import MapGL, { Marker } from "react-map-gl";
import { render } from 'react-dom';
import './style.css';
import { TimelineMax, TweenMax, Power3 } from "gsap";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ReverseIcon from "@material-ui/icons/FastRewind";
import RestartIcon from "@material-ui/icons/SkipPrevious";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import _ from "lodash"

//mapbox public access token - in their docs here:
//https://docs.mapbox.com/help/glossary/access-token/
const TOKEN = "pk.eyJ1Ijoic3RlcGhlbi1tYXJzaGFsbCIsImEiOiJjanB2aWxlNWMwMHV3NDJrajNqN3Jueml4In0.s4SlplYZB-deWizN2jBF8g"

const sliderStyle = {
	width: "85%",
	margin: "1% 5% 0% 5%",
	position: "absolute",
};

class WorldMap extends Component {
  constructor() {
    super();
    //ref to map markers && popups
    this.MapMarkers=[]
    this.markerPopups=[]
    this.state = {
      viewport: {
				width: window.innerWidth,
				height: window.innerHeight * 0.8,
				latitude: 37.785164,
				longitude: -100,
				zoom: 1,
				pitch: 0
			},
      sliderValue: 0
    };
    //timeline instance
    this.tl = null;
    // timeline callback
		this.updateSlider = this.updateSlider.bind(this);
		//whale animation for large bookings
		//this.theWhale = this.theWhale.bind(this);

		// slider callbacks
		this.onSliderChange = this.onSliderChange.bind(this);
		this.onAfterChange = this.onAfterChange.bind(this);
  }
 
  componentDidMount(){
    //console.log("Props Check: ", this.props.cities)
    //animations won't work when called in didMount
    //this.animateMapMarkers()
    console.log("========\n Mounted \n========\n")
    
  }
  componentDidUpdate(){
    console.log("========\n Updated \n========\n")
    this.animateMapMarkers()
    console.log("Progress on update: ", this.tl.progress())
  }
  animateMapMarkers(){
    this.tl = new TimelineMax({
      //Creates infinte loop as timeline is undefined?
			//onUpdate: this.updateSlider,
      //adding scope or params not helping
			// onUpdateParams: ["{self}"],
			// onUpdateScope: this,
			repeat: -1,
			paused: true
		});
		// let numBookings = this.props.onTheMap.length;
		let duration = 5;
		this.tl
			.staggerFromTo(
				this.MapMarkers,
				0.5,
				{ autoAlpha: 0, scale: 3 },
				{ autoAlpha: 1, scale: 1 },
				duration,
				duration
			)
			.staggerFromTo(
				this.markerPopups,
				1,
				{ autoAlpha: 0, scale: 0 },
				{ autoAlpha: 0.7, scale: 1, ease: Power3.easeInOut, rotation: 360 },
				duration,
				duration
			)
			.staggerTo(
				this.markerPopups,
				1,
				{
					autoAlpha: 0,
					delay: 3,
					scale: 0,
					ease: Power3.easeInOut,
					rotation: -360
				},
				duration,
				duration,
				this.onCompleteAll
			)
			.staggerTo(
				this.MapMarkers,
				2,
				{ scale: 1 },
				duration,
				this.onCompleteAll
			)
			.play();
	};
  onCompleteAll() {
		console.log("Animation complete");
  };
  //slider callbacks
	onSliderChange(value) {
		this.tl.progress(value / this.props.cities.length);
	}
	onAfterChange(value) {
		console.log("Slider value: ", value);
		this.setState({ sliderValue: value });
		this.tl.play();
	}
	onCompleteAll() {
		console.log("Animation complete");
	}
	updateSlider() {
		if (_.isUndefined(this.tl)) {
			return null;
			console.log("Timeline Undefined");
			setTimeout(this.updateSlider.bind(this), 0.5);
		} else if (_.isNull(this.tl)) {
			return null;
			console.log("Timeline is null");
			setTimeout(this.updateSlider.bind(this), 0.5);
		} else {
		this.setState({
			//...this.state.sliderValue,
			sliderValue: Math.round(this.tl.progress() * this.props.cities.length)
		});
		}
	}
   //Mapbox viewport for resize, zoom pan etc
	_onViewportChange = viewport => {
   // this.setState({ viewport });
		//TODO timeline restarts on viewport change with zoom, panning...
		//viewport function always run on initial load, this.tl will be null
		if (_.isNull(this.tl)) {
			console.log("tl is null on viewport change");
			this.setState({ viewport });
		} else {
			//if there's a valid timeline instance, pause and resume it
			console.log("tl is valid on viewport change, pause and resume");
      //Does not work to pause and resume timeline when user interacts with map?
			this.tl.pause().resume();
			this.setState({ viewport });
		}
	};
  
  	markersizer = pop => {
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
      <div className="mapContainer">
       <MapGL
					mapboxApiAccessToken={TOKEN}
					{...this.state.viewport}
					//viewport={this.state.viewport}
					mapStyle="mapbox://styles/mapbox/dark-v9"
					onViewportChange={this._onViewportChange}>
            {this.props.cities.map((city, i) => (
						<Marker
							key={i}
							latitude={city.latitude}
							longitude={city.longitude}
							offsetLeft={-20}
							offsetTop={-10}>
              <div className="markerContainer">
              <div className="markerPopup" ref={e => (this.markerPopups[i] = e)}>
                <h4 className="markerHeader">{city.city}</h4>
                <hr />
                <p>Population: {city.population}</p>
              

              </div>
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
                </div>
						</Marker>
					))}
          </MapGL>
          <Slider
            className="slider"
            style={sliderStyle}
            min={0}
            max={this.props.cities.length}
            value={this.state.sliderValue}
            onChange={this.onSliderChange}
            onBeforeChange={() => this.tl.pause()}
            onAfterChange={this.onAfterChange}
          />
         
          <div className="mapControls">
           
          	<Tooltip
						placement="top"
						title={<span style={{ fontSize: "14px" }}>Play</span>}>
						<Fab
							color="inherit"
							size="small"
							aria-label="add"
							onClick={() => this.tl.play()}>
							<PlayIcon /> 
						</Fab>
					</Tooltip>
					<Tooltip
						placement="top"
						title={<span style={{ fontSize: "14px" }}>Pause</span>}>
						<Fab
							color="inherit"
							size="small"
							aria-label="add"
							onClick={() => this.tl.pause()}>
							<PauseIcon />
						</Fab>
					</Tooltip>
					<Tooltip
						placement="top"
						title={<span style={{ fontSize: "14px" }}>Reverse</span>}>
						<Fab
							color="inherit"
							size="small"
							aria-label="add"
							onClick={() => this.tl.reverse()}>
							<ReverseIcon />
						</Fab>
					</Tooltip>
					<Tooltip
						placement="top"
						title={<span style={{ fontSize: "14px" }}>Restart</span>}>
						<Fab
							color="inherit"
							size="small"
							aria-label="add"
							onClick={() => this.tl.restart()}>
							<RestartIcon />
						</Fab>
					</Tooltip>
          </div>
      </div>
    );
  }
}

export default WorldMap
