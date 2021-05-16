"use strict";

// Pie chart colors 
const pie_colors = [
    "rgb(0, 18, 25)",
    "rgb(0, 95, 115)",
    "rgb(10, 147, 150)",
    "rgb(148, 210, 189)",
    "rgb(233, 216, 166)",
    "rgb(238, 155, 0)",
    "rgb(202, 103, 2)",
    "rgb(187, 62, 3)",
    "rgb(174, 32, 18)",
    "rgb(155, 34, 38)"
];

/**
 * Renders charts using chart.js
 *
 */
setTimeout(async function renderCharts() {
    const chart_data = await parseDataforCharts();
    const barCtx = document.getElementById('myBarChart');
    const pieCtx = document.getElementById('myPieChart');

    // Bar Chart
    let delayed;
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
        },
        options: {
            animation: {
                onComplete: () => {
                  delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' 
                        && !delayed) {
                        delay = context.dataIndex * 100 + context.datasetIndex 
                            * 100;
                    }
                    return delay;
                },
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    stacked: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'The Number of Patents Per Category',
                    padding: 20,
                    font: {
                        family: 'Source Serif Pro',
                        size: 25,
                        weight: '500'
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });

    // Pie Chart
    const myPieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: chart_data.center_labels,
            datasets: [{
                label: 'Patents Created at This Center',
                data: chart_data.num_patents_per_center,
                backgroundColor: pie_colors,
                hoverOffset: 10
            }]
        },
        options: {
            animation: {
                duration: 1500
            },
            plugins: {
                title: {
                    display: true,
                    text: 'The Number of Patents Per NASA Center',
                    padding: 20,
                    font: {
                        family: 'Source Serif Pro',
                        size: 25,
                        weight: '500'
                    }
                },
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15
                    }
                }
            },
            layout: {
                padding: {
                    left: 20,
                }
            }
        }
    });
}, 300);

/**
 * Parses data for charts via pulling data from /fetch_results
 * @returns { Object } object of arrays
 */
async function parseDataforCharts() {
    const results = await fetch('/fetch_results');
    const data = await results.text();
    const objArr = JSON.parse(data);

    const catagory_lables = [];
    const num_patents_per_category = [];
    const center_labels = [];
    const num_patents_per_center = [];
    const colors_for_bar = [];

    // Parse data based on key
    objArr.forEach(element => {
        // Push category, count into respective arrays
        if (element.hasOwnProperty('category')) {
            catagory_lables.push(element.category);
            num_patents_per_category.push(element.count);
            colors_for_bar.push(generateRandomColors());
        } else { // Push center, count into respective arrays
            center_labels.push(element.center);
            num_patents_per_center.push(element.count);
        }
    });
    return { catagory_lables, num_patents_per_category, colors_for_bar,
        center_labels, num_patents_per_center };
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
