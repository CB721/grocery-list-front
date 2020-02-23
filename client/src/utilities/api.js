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
    },
    updateItem: function(id, data) {
        return axios.put("/api/lists/user/item/" + id, data);
    },
    getListByID: function(id, userID) {
        return axios.get(`/api/lists/user/full/single/${id}/${userID}`);
    },
    getListsByUserID: function(data) {
        return axios.post("/api/lists/user/full/all", data);
    },
    updateList: function(data) {
        return axios.put("/api/lists/user/info/update", data);
    },
    addPreviousListToCurrent: function(data) {
        return axios.post("/api/lists/user/previous", data);
    },
    removeItem: function(id) {
        return axios.delete("/api/lists/user/item/remove/" + id);
    },
    getStoreCount: function() {
        return axios.get("/api/stores/count");
    },
    deleteList: function(id, userID) {
        return axios.delete(`/api/lists/user/full/single/${id}/${userID}/start/end`);
    },
    createUser: function(data) {
        return axios.post("/api/users/create", data);
    },
    userLogin: function(data) {
        return axios.post("/api/users/login", data);
    },
    validateUser: function(token, ip) {
        return axios.get(`/api/users/verify/${token}/${ip}`);
    },
    getIP: function() {
        return axios.get("https://api.ipify.org");
    },
    getNotificationsByUser: function(id) {
        return axios.get("/api/notifications/" + id);
    }
}