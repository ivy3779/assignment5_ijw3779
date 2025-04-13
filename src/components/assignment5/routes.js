import React from "react";

function Routes(props){
    const {projection, routes, selectedAirlineID} = props;
    // TODO: 
    // return the routes of the selected airline; 
    // If the selectedAirlineID is null (i.e., no airline is selected), return <g></g>.
    if (selectedAirlineID == null) {
        //console.log("No airline selected, returning empty group.");
        return <g></g>;
    }
    const airlineRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);
    console.log("Airline routes: ", airlineRoutes);
    const routesPath = airlineRoutes.map((route, index) => {
        //const start = projection([route.StartLon, route.StartLat]);
        //const end = projection([route.EndLon, route.EndLat]);
        const start = projection([+route.SourceLongitude, +route.SourceLatitude]);
        const end = projection([+route.DestLongitude, +route.DestLatitude]);
        return (
            <path key={index} d={`M${start[0]},${start[1]} L${end[0]},${end[1]}`} 
                stroke="red" strokeWidth="1" fill="none" />
        );
    });
    
    return <g>{routesPath}</g>;
}

export { Routes };