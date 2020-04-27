import axios from "axios";
const url = "https://g-list-api.herokuapp.com";
// const url = "http://localhost:3001";

export default {
    searchPlaces: function (data, config) {
        return axios.post(`${url}/api/places/`, data, config, { withCredentials: true });
    },
    saveStore: function (data, config) {
        return axios.post(`${url}/api/stores/add`, data, config, { withCredentials: true });
    },
    getUserStores: function (id) {
        return axios.get(`${url}/api/stores/user/` + id, { withCredentials: true });
    },
    deleteUserStore: function (id, config) {
        return axios.delete(`${url}/api/stores/user/delete/` + id, config, { withCredentials: true });
    },
    getUserList: function (id) {
        return axios.get(`${url}/api/lists/user/` + id, { withCredentials: true });
    },
    addItem: function (data, config) {
        return axios.post(`${url}/api/lists/add`, data, config, { withCredentials: true });
    },
    updateItem: function (id, data) {
        return axios.put(`${url}/api/lists/user/item/` + id, data, { withCredentials: true });
    },
    getListByID: function (id, userID) {
        return axios.get(`${url}/api/lists/user/full/single/${id}/${userID}`, { withCredentials: true });
    },
    getListsByUserID: function (data, config) {
        return axios.post(`${url}/api/lists/user/full/all`, data, config, { withCredentials: true });
    },
    updateList: function (data) {
        return axios.put(`${url}/api/lists/user/info/update`, data, { withCredentials: true });
    },
    addPreviousListToCurrent: function (data, config) {
        return axios.post(`${url}/api/lists/user/previous`, data, config, { withCredentials: true });
    },
    removeItem: function (id, config) {
        return axios.delete(`${url}/api/lists/user/item/remove/` + id, config, { withCredentials: true });
    },
    getStoreCount: function () {
        return axios.get(`${url}/api/stores/count`, { withCredentials: true });
    },
    deleteList: function (id, userID, config) {
        return axios.delete(`${url}/api/lists/user/full/single/${id}/${userID}/start/end`, config, { withCredentials: true });
    },
    createUser: function (data, config) {
        return axios.post(`${url}/api/users/create`, data, config, { withCredentials: true });
    },
    userLogin: function (data, config) {
        return axios.post(`${url}/api/users/login`, data, config, { withCredentials: true });
    },
    validateUser: function (token, ip) {
        return axios.get(`${url}/api/users/verify/${token}/${ip}`, { withCredentials: true });
    },
    getIP: function () {
        return axios.get("https://api.ipify.org");
    },
    getNotificationsByUser: function (id) {
        return axios.get(`${url}/api/notifications/` + id, { withCredentials: true });
    },
    deleteNotificationByID: function (id, config) {
        return axios.delete(`${url}/api/notifications/single/` + id, config, { withCredentials: true });
    },
    updateNotificationByID: function (id) {
        return axios.put(`${url}/api/notifications/single/` + id, { withCredentials: true });
    },
    getConnectionsByID: function (id) {
        return axios.get(`${url}/api/connections/` + id, { withCredentials: true });
    },
    updateConnection: function (id, data) {
        return axios.put(`${url}/api/connections/` + id, data, { withCredentials: true });
    },
    removeConnection: function (id, config) {
        return axios.delete(`${url}/api/connections/` + id, config, { withCredentials: true });
    },
    createConnection: function (data, config) {
        return axios.post(`${url}/api/connections/new`, data, config, { withCredentials: true });
    },
    updateUser: function (id, data) {
        return axios.put(`${url}/api/users/update/` + id, data, { withCredentials: true });
    },
    checkEmailExists: function (email) {
        return axios.get(`${url}/api/users/update/` + email, { withCredentials: true });
    },
    createNotification: function (data, config) {
        return axios.post(`${url}/api/notifications/create`, data, config, { withCredentials: true });
    },
    getSentLists: function (user_id, other_user_id) {
        return axios.get(`${url}/api/lists/multiple/${user_id}/${other_user_id}`, { withCredentials: true });
    },
    cancelConnectionRequest: function (id, config) {
        return axios.delete(`${url}/api/connections/cancel/` + id, config, { withCredentials: true });
    },
    passwordReset: function (data, config) {
        return axios.post(`${url}/api/resets/requests`, data, config, { withCredentials: true });
    },
    updatePasswordReset: function (data, config) {
        return axios.post(`${url}/api/resets/new/update`, data, config, { withCredentials: true });
    },
    textReset: function (data, config) {
        return axios.post(`${url}/api/texts/request`, data, config, { withCredentials: true });
    },
    updatePasswordTextReset: function (data, config) {
        return axios.post(`${url}/api/texts/validate`, data, config, { withCredentials: true })
    },
    logout: function() {
        return axios.get(`${url}/api/users/logout`);
    }
}