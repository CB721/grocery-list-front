import axios from "axios";

export default {
    searchPlaces: function (data, config) {
        return axios.post("/api/places/", data, config);
    },
    saveStore: function (data, config) {
        return axios.post("/api/stores/add", data, config);
    },
    getUserStores: function (id) {
        return axios.get("/api/stores/user/" + id);
    },
    deleteUserStore: function (id, config) {
        return axios.delete("/api/stores/user/delete/" + id, config);
    },
    getUserList: function (id) {
        return axios.get("/api/lists/user/" + id);
    },
    addItem: function (data, config) {
        return axios.post("/api/lists/add", data, config);
    },
    updateItem: function (id, data, config) {
        return axios.put("/api/lists/user/item/" + id, data, config);
    },
    getListByID: function (id, userID) {
        return axios.get(`/api/lists/user/full/single/${id}/${userID}`);
    },
    getListsByUserID: function (data, config) {
        return axios.post("/api/lists/user/full/all", data, config);
    },
    updateList: function (data, config) {
        return axios.put("/api/lists/user/info/update", data, config);
    },
    addPreviousListToCurrent: function (data, config) {
        return axios.post("/api/lists/user/previous", data, config);
    },
    removeItem: function (id, config) {
        return axios.delete("/api/lists/user/item/remove/" + id, config);
    },
    getStoreCount: function () {
        return axios.get("/api/stores/count");
    },
    deleteList: function (id, userID, config) {
        return axios.delete(`/api/lists/user/full/single/${id}/${userID}/start/end`, config);
    },
    createUser: function (data, config) {
        return axios.post("/api/users/create", data, config);
    },
    userLogin: function (data, config) {
        return axios.post("/api/users/login", data, config);
    },
    validateUser: function (token, ip) {
        return axios.get(`/api/users/verify/${token}/${ip}`);
    },
    getIP: function () {
        return axios.get("https://api.ipify.org");
    },
    getNotificationsByUser: function (id) {
        return axios.get("/api/notifications/" + id);
    },
    deleteNotificationByID: function (id, config) {
        return axios.delete("/api/notifications/single/" + id, config);
    },
    updateNotificationByID: function (id, config) {
        return axios.put("/api/notifications/single/" + id, config);
    },
    getConnectionsByID: function (id) {
        return axios.get("/api/connections/" + id);
    },
    updateConnection: function (id, config) {
        return axios.put("/api/connections/" + id, config);
    },
    removeConnection: function (id, config) {
        return axios.delete("/api/connections/" + id, config);
    },
    createConnection: function (data, config) {
        return axios.post("/api/connections/new", data, config);
    },
    updateUser: function (id, data, config) {
        return axios.put("/api/users/update/" + id, data, config);
    },
    checkEmailExists: function (email) {
        return axios.get("/api/users/update/" + email);
    },
    createNotification: function (data, config) {
        return axios.post("/api/notifications/create", data, config);
    },
    getSentLists: function (user_id, other_user_id) {
        return axios.get(`/api/lists/multiple/${user_id}/${other_user_id}`);
    },
    cancelConnectionRequest: function (id, config) {
        return axios.delete("/api/connections/cancel/" + id, config);
    },
    passwordReset: function(data, config) {
        return axios.post("/api/resets/requests", data, config);
    }
}