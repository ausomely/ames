"use strict";

renderCharts();

/**
 * Renders bar chart using chart.js
 * 
 */
async function renderCharts() {
    const chart_data = await parseDataforCharts();
    const barCtx = document.getElementById('myBarChart');
    const pieCtx = document.getElementById('myPieChart');

    // Bar Chart
    const myBarChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: chart_data.catagory_lables,
            datasets: [{
                label: 'Number of Patents',
                data: chart_data.num_patents_per_category,
                backgroundColor: chart_data.colors_for_bar,
                borderColor: chart_data.colors_for_bar,
                borderWidth: 1
            }]
        }
    });
    
    // Pie Chart
    const myPieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: chart_data.center_labels,
            datasets: [{
                label: 'Pie Chart', 
                data: chart_data.num_patents_per_center,
                backgroundColor: chart_data.colors_for_pie,
                hoverOffset: 4 
            }]
        }
    });
};

/**
 * Parses data for charts via pulling data from /fetch_results
 * @returns { Object } object of arrays
 */ 
async function parseDataforCharts() {
    const results = await fetch('/fetch_results');
    const data = await results.text();
    const objArr = JSON.parse(data);
    // console.log(objArr);
    const catagory_lables = [];
    const num_patents_per_category = [];
    const center_labels = [];
    const num_patents_per_center = [];
    const colors_for_bar = [];
    const colors_for_pie = [];
    objArr.forEach(element => {
        if (element.hasOwnProperty('category')) {
            catagory_lables.push(element.category);
            num_patents_per_category.push(element.count);
            colors_for_bar.push(generateRandomColors());
            
            // console.log(element.category, element.count);
        } else {
            center_labels.push(element.center);
            num_patents_per_center.push(element.count);
            colors_for_pie.push(generateRandomColors());
        }
    });
    return { catagory_lables, num_patents_per_category, colors_for_bar, 
        center_labels, num_patents_per_center, colors_for_pie };
};


/**
 * Randomly generates rgb string
 * @returns {string} string of rgb 
 */

function generateRandomColors() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};
