import axios from "axios";

export default {
    searchPlaces: function(data) {
        return axios.post("/api/places/", data);
    },
    saveStore: function(data) {
        return axios.post("/api/stores/add", data);
    },
    getUserStores: function(id) {
        return axios.get("/api/stores/user/" + id);
    }
}