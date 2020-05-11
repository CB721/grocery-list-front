const API = require("./api");
// import API from "./api";

module.exports = {
    // return if the application is online or not
    isOnline: () => {
        return navigator.onLine;
    },
    saveToIndexedDB: (data, dbStore, kPath) => {
        return new Promise((resolve, reject) => {
            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDb;
            // if indexedDB isn't support, reject so the front end can tell the user that the feature is unavailable
            if (!window.indexedDB) {
                reject(false);
            }
            // open database
            let request = window.indexedDB.open("g-list_db", 1),
                db,
                tx,
                store,
                index;
            request.onblocked = function (event) {
                // If some other tab is loaded with the database, then it needs to be closed
                // before we can proceed.
                reject("Please close all other tabs with this site open!");
            };
            // assign the structure of the data
            request.onupgradeneeded = function (event) {
                // assign the database
                let db = request.result,
                    // set up object store with and outincrementing key
                    // store name will be the store passed in with _store
                    store = db.createObjectStore(`${dbStore}_store`, { autoIncrement: true }),
                    // set up an index
                    // index name will be the store passed in with _index
                    // key path will be the keypath passed in
                    index = store.createIndex(`${dbStore}_index`, kPath, { unique: false });
            }
            request.onerror = function (event) {
                // reject error code if available, false if not
                reject(event.target.errorCode || false);
            }
            request.onsuccess = function (event) {
                // assign the database
                db = request.result;
                // define the transaction
                tx = db.transaction(`${dbStore}_store`, "readwrite");
                // reference the store
                store = tx.objectStore(`${dbStore}_store`);
                // reference the index
                index = store.index(`${dbStore}_index`);

                // if an error is caused
                db.onerror = function (event) {
                    // reject error code if available, false if not
                    reject(event.target.errorCode || false);
                }
                // put data in the db
                store.add(data);
                // close the transaction
                tx.oncomplete = function () {
                    // close the db
                    db.close();
                    resolve();
                }
            }
        })
    },
    bulkSend: () => {
        return new Promise((resolve, reject) => {
            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDb;
            // if indexedDB isn't support, reject so the front end can tell the user that the feature is unavailable
            if (!window.indexedDB) {
                reject(false);
            }
            // open database
            let request = window.indexedDB.open("g-list_db", 1),
                db,
                tx,
                store
            request.onerror = function (event) {
                // reject error code if available, false if not
                reject(event.target.errorCode || false);
            }
            request.onsuccess = function (event) {
                db = request.result;
                // define the transaction
                tx = db.transaction("list_items_store", "readwrite");
                // if an error is caused
                db.onerror = function (event) {
                    // reject error code if available, false if not
                    reject(event.target.errorCode || false);
                }
                let allData = [];
                store = tx.objectStore("list_items_store");
                // retrieve the data
                let getAll = store.getAll();
                getAll.onerror = function (event) {
                    reject(event.target.errorCode);
                    return;
                }
                getAll.onsuccess = function () {
                    // add data to all data array
                    allData = [...getAll.result];
                }
                tx.oncomplete = function () {
                    // if there are any items in the store
                    if (allData.length) {
                        // send to bulk list items route
                        API.default.bulkItems({ items: allData })
                            .then(res => {
                                if (res.data.affectedRows > 0) {
                                    // close the db
                                    db.close();
                                    resolve("Data saved to db");
                                } else {
                                    reject("No items added to db");
                                }
                            })
                            .catch(err => reject(err));
                    } else {
                        reject("No items in indexeddb");
                    }
                }
            }
        });
    },
    clearStore: (dbStore) => {
        return new Promise((resolve, reject) => {
            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDb;
            // if indexedDB isn't support, reject so the front end can tell the user that the feature is unavailable
            if (!window.indexedDB) {
                reject(false);
            }
            // open database
            let request = window.indexedDB.open("g-list_db", 1),
                db,
                tx,
                store
            request.onerror = function (event) {
                // reject error code if available, false if not
                reject(event.target.errorCode || false);
            }
            request.onsuccess = function (event) {
                db = request.result;
                // define the transaction
                tx = db.transaction(`${dbStore}`, "readwrite");
                // if an error is caused
                db.onerror = function (event) {
                    // reject error code if available, false if not
                    reject(event.target.errorCode || false);
                }
                store = tx.objectStore(`${dbStore}`);
                // clear all data from the store
                store.clear();
                resolve();
            }
        });
    }
}