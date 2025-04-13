import * as d3 from "d3";
import BarChart from "./BarChart";
import { drawScatterPlot } from "./drawScatterPlot";

export let drawBarChart = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {

    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    //2. Add a mouseover event to the bar
    //3. The mouseover event should also highlight the corresponding points in the scatter plot
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot
    //5. You can refer to the code in the drawScatterPlot function

    barChatLayer.selectAll('.bar') //select all the rect elements with the class 'bar'
    .data(data) //bind the data to the rect elements
    .enter() //create placeholder for each data point
    .append('rect') //append a rect element for each data point
    .attr('class', d=>`bar ${d.station.replace(/[^a-zA-Z]/g, "")}`) //set the class names of the rect element to 'bar' and the station name
    .attr('x', d => xScale(d.station))
    .attr('y', d => yScale(d.start))
    .attr('width', xScale.bandwidth())
    .attr('height', d => barChartHeight - yScale(d.start))
    .style("fill", 'steelblue')
    .style("stroke", "black")
    .style("stroke-width", 2)
    .on("mouseover", (event, d) => {
        d3.select(event.target)
            .style("fill", "red");
    })
    .on('mouseout',(event, d)=>{
        d3.select(event.target)
            .style("fill", "steelblue");
    })

    //Task 8: Connect the bar chart with the scatter plot
    //Hint:
    //1. Add a mouseover event to the bar
    //2. The mouseover event should also highlight the corresponding points in the scatter plot
    .on("mouseover", (event, d) => {
        d3.select(event.target)
            .style("fill", "red");
        let className = d.station.replace(/[^a-zA-Z]/g, "");
       
        // Highlight corresponding scatter plot points
        d3.selectAll(`.point.${className}`)
            .attr("r", 10)
            .style("fill", "red")
            .raise();
       
        // add a rect element to isolate the selected bar out of the bar chart
        d3.select("scatterPlotLayer").append("rect")
            .attr("width", barChartWidth)
            .attr("height", barChartHeight)
            .style("fill", "yellow")
            .style("opacity", 0.5);
    })
    .on('mouseout',(event, d)=>{
        d3.select(event.target)
            .style("fill", "steelblue");
        d3.selectAll('.point')
            .filter((p) => p.station === d.station)
            .attr("r", 5)
            .style("fill", "steelblue");
    })

  }
