const axios = require("axios");
const today = new Date();
const seconds = today.getSeconds().toString();
const ms = today.getMilliseconds().toString();
const UTCms = today.getUTCMilliseconds().toString();
const secondStr = ms + UTCms + seconds;
let sessionToken = today.toISOString();
// create unique session token based on current date for places api
sessionToken =
    parseInt(secondStr) +
    parseInt(sessionToken.split("-")[0] + sessionToken.split(":")[2]) +
    parseInt(sessionToken.split("-")[1] + sessionToken.split(":")[1]) +
    seconds +
    UTCms;

module.exports = {
    getUserPlace: function (req, res) {
        const search = req.body.search;

        // place autocomplete
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${process.env.PLACES}&types=establishment&sessiontoken=${sessionToken}`)
            .then(response => {
                const places = response.data.predictions;
                const results = [];
                places.forEach(place => {
                    place.types.forEach(type => {
                        // check for costco
                        const costco = type === "store" && place.structured_formatting.main_text === "Costco Wholesale";
                        const samsClub = type === "storage" && place.structured_formatting.main_text === "Sam's Club Distribution Center";
                        if (type === "supermarket" || type === "grocery_or_supermarket" || costco || samsClub) {
                            results.push(place);
                        }
                    });
                });
                res.status(200).json(results);
            })
            .catch(err => console.log(err));
    }
}