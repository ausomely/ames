// const https = require('https');
const express = require('express');
const fetch = require('node-fetch');
const PORT = 3000;
const app = express();
const router = express.Router();

app.use(express.static('public'));
app.use('/', router);

app.listen(PORT, () => {
    console.log('The app is listening on port: ' + PORT);
});

/* GET Home Page */
router.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});



router.get('/fetch_results', async (req, res) => {
    let category_collection = []; 
    let center_collection = [];
    let categories = [];
    let centers = [];
    console.log('/fetch_results endpoint called');
    const url = 'https://technology-api.ndc.nasa.gov/api/patent';
    const options = {
        'method': 'GET'
    }; 

    const response = await fetch(url, options)
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
    

        // console.log(category_collection);

        // Counters per center will be stored in centers_collection
        let unique_sorted_centers = [... new Set(centers)].sort(); 
        unique_sorted_centers.forEach(element => {
            center_collection.push({
                center : element,
                count: centers.filter(word => word === element).length
            });
        });

        // console.log(center_collection);

        // Convert metrics into JSON and return it
        const metrics = category_collection.concat(center_collection);
        // console.log(metrics);
        return metrics;

    })
    .catch(error => console.error(error));
    console.log('RESPONSE: ', response);
    //send response back as json
    res.send(response); 
});


module.exports = router;