import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";


export function BarChart (props) {
    const {offsetX, offsetY, data, height, width, selectedAirlineID, setSelectedAirlineID} = props;
    // Task 1: TODO
    // 1. find the maximum of the Count attribute in the data
    // 2. define the xScale and yScale
    // 3. return the bars; (Remember to use data.map());
    // 4. return <XAxis/> and <YAxis/>
    const maxCount = max(data, d => d.Count);
    const xScale = scaleLinear()
        .domain([0, 2500])
        .range([0, width]);
    const yScale = scaleBand()
        .domain(data.map(d => d.AirlineName))
        .range([0, height])
        .padding(0.2);
    //const bars = data.map(d => {
        //return <rect key={d.AirlineID} x={0} y={yScale(d.AirlineName)} width={xScale(d.Count)} height={yScale.bandwidth()} fill= "#2a5599" stroke="black" />
    //});
    //return <g transform={`translate(${offsetX}, ${offsetY})`}>
        //{bars}
        //<XAxis xScale={xScale} width={width} height={height} />
        //<YAxis yScale={yScale} height={height} offsetX={offsetX} />
    //</g>
    
    // Task 3. TODO
    // 1. define an arrow function color; it takes a data item, d, as input. 
    // If d.AirlineID is equal to the selectedAirlineID, it returns "#992a5b"; 
    // otherwiese, it returns "#2a5599".
    // 2. define a function onMouseOver; it takes a data item, d, as input,
    // and sets the selectedAirlineID be the d.AirlineID    
    // 3. define a function onMouseOut; it has no argument, and sets the selectedAirlineID be null.
    // 4. adding properties, onMouseOver and onMouseOut, to the <rect> tags.
    // Note: the function of the onMouseOver properties should be an arrow function 
    // that wraps the onMouseOver you defined since it takes d as input.
    
    function color(d) {
        return d.AirlineID === selectedAirlineID ? "#992a5b" : "#2a5599";
    }
    //const color = (d) => {
       // return d.AirlineID === selectedAirlineID ? "#992a5b" : "#2a5599";
    //};
    function onMouseOver(d) {
        //function setSelectedAirlineID(d) {
            //return d.AirlineID;
        //}
        // console.log("mouse over", d.AirlineID);
        setSelectedAirlineID(d.AirlineID); 
    }
    //const onMouseOver = (d) => {
        // setSelectedAirlineID(d.AirlineID);
    //};
    function onMouseOut() {
        //function setSelectedAirlineID(){return null;};
        setSelectedAirlineID(null);
        // console.log("mouse out");
    }
    //const onMouseOut = () => {
        //setSelectedAirlineID(null);
    //};
    const bars = data.map(d => {
        return <rect key={d.AirlineID} x={0} y={yScale(d.AirlineName)} width={xScale(d.Count)} height={yScale.bandwidth()} fill={color(d)} stroke="black" onMouseOver={() => onMouseOver(d)} onMouseOut={onMouseOut} />
    });
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        {bars}
        <XAxis xScale={xScale} width={width} height={height} />
        <YAxis yScale={yScale} height={height} offsetX={offsetX} />
    </g>
    
    
    //return <g transform={`translate(${offsetX}, ${offsetY})`}>
    
        
    //</g>
}