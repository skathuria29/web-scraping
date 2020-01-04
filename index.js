const axios = require('axios');
const webScrapper = require('./scrapingScript');
const Event = require('./database/model');

const url = "http://indiarunning.com/marathon-calendar.html";

axios.get(url)
    .then(res => {
        const data = webScrapper.scrapeData(res.data);
        Event.bulkUpsertEvents(data, (err, res) => {
            if(err) {
                console.log(err);
            }
            console.log(res);
        });
    })
    .catch(err => {
        console.log(err);
    })