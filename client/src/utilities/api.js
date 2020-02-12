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
    },
    deleteUserStore: function(id) {
        return axios.delete("/api/stores/user/delete/" + id);
    },
    getUserList: function(id) {
        return axios.get("/api/lists/user/" + id);
    },
    addItem: function(data) {
        return axios.post("/api/lists/add", data);
    }
}