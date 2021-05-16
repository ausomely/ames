# NASA's Patent Portfolio: Categories & Centers

## Description:
This repository contains the development of a web application designed to display charts of the number of NASA api patents based on category and center. 
<br></br>
Please Note: The web application has not been deployed and can only run via local machine (http://localhost:3000). 

<div align="center">
    <img src="./assets/Ames-main.gif">
</div>

## Setup: 
The following environments and technologies were used: 
1. Nodejs
2. JavaScript (node-fetch, chart.js, express), HTML, CSS (Bootstrap)
3. Visual Studio Code (IDE), WSL 2 (Ubuntu 20.04.2 LTS)
4. node v14.16.0
5. npm (7.11.1)


Clone this repository to the desired workspace path. 
Install the neccessary dependencies via npm: 
```
$ npm install
```
To start the server-side interface use the command:
```
$ npm start
```
If an 'Error: listen EADDRINUSE: address already in use :3000' occurs, simply kill all node processes before running 'npm start'. To do this use the command: 
```
$ killall -9 node
```
Run the command 'npm start' again after all node processes are stopped.

This will run the script 'nodemon server.js' which will begin the nodejs server. To restart the server via command line at any time, simply type 'rs' followed by the enter key in the terminal. 
Navigate to http://localhost:3000 to view the web application.

## Project Development and Design Choices
Disclaimer: Nodejs is a completely new environment to me and my skills in JavaScript are purely academic so the learning curve to set up the server took some time for me to understand and review what was needed. 

### Server Side (server.js)
To handle GET HTTP requests I used the node-fetch package that is similar to the client-side windows.fetch API. I used this fetch method to retrieve the NASA Patent Portfolio data. From this fetch call I reformated the data into key value pairs where keys are: category, center and the values are: count respectively. I used serparate arrays to store all of the known categories and centers by traversing through the data set at the indexes that I needed. Then I removed duplicate categories/centers to form unique ordered sets that would give me all of the categories and centers in the data set. Next, I used the arrays that stored all dupicates and counted the occurences of each to get the respective count of every category and center in the data set. Finally, I stored this array of objects into ***metrics*** with the desired format { category: '', count: ''} or { center: '', count: '' }. I then use express's routing and routed this response to '/fetch_results'. 

### Client Side 
I then retrieved this response that was routed to '/fetch_results' and parsed this data such that the data can be used to render the bar and pie charts using chart.js. From the response at '/fetch_results' I used separate arrays to store all of the category names, patent counts of each category, colors to be used to distinguish each category, center names, and patent counts of each center. I chose to choose a color pallete for the pie chart because there are only a small amount of centers where as I used a random color generator for the colors for the bar chart because there are a larger number of category elements. Seting a timeout on the execution of rendering the charts is a design choice for the overall animations for the web app. In addition I chose to use asynchronous and await behaviors on the fetch methods and rendering of charts to make sure parts of the code would be guaranteed to execute and return a promise. This organized the flow of my app. 


## Limitations






<!-- I believe this is an appropriate approach in this use case though this approach can be limiting and problems can arise when the data base of api's increases -- more so, new centers come about.  -->








