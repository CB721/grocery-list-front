import axios from "axios";

export default {
    searchPlaces: function(data) {
        return axios.post("/api/places/", data);
    }
}