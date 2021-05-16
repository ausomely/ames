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
2. JavaScript (node-fetch, chart.js, express), HTML, CSS, Bootstrap
3. Visual Studio Code (IDE), WSL 2 (Ubuntu 20.04.2 LTS)
4. node v14.16.0
5. npm 7.11.1


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

### Server Side (server.js)
To initiate a GET HTTP request I used the node-fetch package that is similar to the client-side windows.fetch API. I used the fetch GET method to retrieve the NASA Patent Portfolio data. From this fetch call I reformated the data into key value pairs where keys are: category, center and the values are: count for both keys. I used serparate arrays to store all of the known categories and centers by traversing through the data set at the indexes that I needed. Then I removed duplicate categories/centers to form unique ordered sets that would give me all of the categories and centers in the data set. Next, I used the arrays that stored all dupicates and counted the occurences of each to get the respective count of every category and center in the data set. Finally, I stored this array of objects into ***metrics*** with the desired format
```
    [
     { category: '', count: ''},
     ...
     { center: '', count: '' }
    ]
```
I then use express's routing and routed this response to '/fetch_results'. 

### Client Side (script.js)
I then retrieved this response that was routed to '/fetch_results' and parsed this data such that the data can be used to render the bar and pie charts using chart.js. From the response at '/fetch_results' I used separate arrays to store all of the category names, patent counts of each category, colors to be used to distinguish each category, center names, and patent counts of each center. I chose to choose a color pallete, found in the array ***pie_colors***, for the pie chart because there are only a small amount of centers where as I used a random color generator for the rgb colors for the bar chart because there are a larger number of category elements. 

Setting a timeout on the execution of rendering the charts is a design choice for the overall animations for the web app. In addition I chose to use asynchronous and await behaviors on the fetch methods, rendering of charts, and parsing data to make sure parts of the code would be guaranteed to execute and return a promise. This organized the flow of my app. 

### User Interface
The user interface of the web app integrated HTML, chart.js, Bootstrap, and light CSS styling. Upon loading the home page of the app, the user can appreciate basic animations with intentional animation delays to make the app feel more responsive and inviting. The user can mouse over each colored bar of the bar chart or slice of the pie chart to view the exact information/metric of the respective category or center. I chose to leave the bar chart as a static chart with no way of filtering out specific categories because I felt that this approach was already clear of displaying the information. I chose to allow the user to filter out the centers on the pie chart to more clearly help the user depict the scale of how many patents where created per center.      


## Limitations
Disclaimer: Nodejs is a completely new environment I am currently learning and my skills in JavaScript are purely academic. The learning curve to set up the nodejs server took some time to understand and review what was needed. 

Expending most of my time continuing to learn Nodejs and new libraries, I realized that my approach and code is naive. I used a lot of separate arrays to store elements and iterated over many of them via for loops and built in forEach functionality. I could have optimized the way I reformated the Patent Portfolio data by using different data structures such as a dictionary or map objects to organize and manipulate ***metrics***. 

As explained in the Client Side Section, I chose to use a color pallete for the pie chart to represent the centers because there is a small amount of centers in the data set. This approach can break the code if there are new centers to be added to the data set because the ***pie_colors*** array is of finite and small size. In addition, the design choice to randomly generate the colors of each category in the bar chart can lead to inconsistencies of deployment and can impact the usability on a user to user basis. The use case for the bar chart colors is effective because the number of colors generated will correspond to the number of categories because of the way I am pushing these colors for each category as seen in the ***parseDataForCharts()*** function. However, in future implementations I would have created a more static color grading across the app to make the app more consistent. This design choice was to distinguish the elements from one another such that both charts can also be distinguishable from one another. I did not intend to make the colors distracting for the user.








