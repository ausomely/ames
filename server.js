const https = require('https');
const express = require('express');
const fetch = require('node-fetch');
const port = 3000;

const router = express.Router();

// app.use(express.json());

/* GET Home Page */
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


let category_collection = []; 
let center_collection = [];
let categories = [];
let centers = []; 

fetch('https://technology-api.ndc.nasa.gov/api/patent')
    // Convert this response to JSON, treating it as a JSON, then print it out
    .then(res => res.json())
    .then(res => {

        for (let i = 0; i < res.results.length; i++) {
            categories.push(res.results[i][5]);
            centers.push(res.results[i][9]);
        }
        
        // Counters per portfolio category will be stored in catergory_collection
        let unique_sorted_categories = [... new Set(categories)].sort(); 
        unique_sorted_categories.forEach(element => {
            category_collection.push({
                category : element,
                count: categories.filter(word => word === element).length
            });
        });

        console.log(category_collection);

        // Counters per center will be stored in centers_collection
        let unique_sorted_centers = [... new Set(centers)].sort(); 
        unique_sorted_centers.forEach(element => {
            center_collection.push({
                center : element,
                count: centers.filter(word => word === element).length
            });
        });

        console.log(center_collection);

        // Convert metrics into JSON Format
        // let categories_json = JSON.stringify(category_collection);
        // let centers_json = JSON.stringify(center_collection);

    })
    .catch(error => console.error(error));

// app.post('/metrics', req, res => {
//     console.log(req);
// }); 

router.listen(port, () => {
    console.log('The app is listening on port: ' + port);
});