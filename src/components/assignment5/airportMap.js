import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes'
import { count } from "d3";


function AirportMap(props){
    const {width, height, countries, airports, routes, selectedAirlineID} = props;
    //TODO: 
    // 1.Define a projection which is geoMercator; 
    // set .scale(97), and .translate([width/2, height/2+20]); 
    // 2. Define a path generator using geoPath();
    // 3. Plot the world map; remember to use countries.features.map(); (Note: stroke is "#ccc", and color is "#eee");
    // 4. Plot the airports; remember to use routes.map(); (Note: radius is 1; color is "#2a5599"); 

    //let projection;//TODO: define a projection of Mercator.
    const projection = geoMercator()
        .scale(97)
        .translate([width/2, height/2+20]);
    const path = geoPath().projection(projection);

    const countriesPath = countries.features.map((d, i) => {
        return <path key={i} d={path(d)} stroke="#ccc" fill="#eee" />
    });
    const airportsPath = airports.map((d, i) => {
        const [x, y] = projection([+d.Longitude, +d.Latitude]);
        return <circle key={i} cx={x} cy={y} r={1} fill="#2a5599" />;
    });

    return <g transform={`translate(0, 0)`}>
        {countriesPath}
        {airportsPath}
        <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID}/>
    </g>

    //return <g>
        
       // <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID}/>
    //</g>


}

export { AirportMap }