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
                    // // get any currently saved stores from local storage
                    // let currentStores = localStorage.getItem("currentStores");
                    // // if there are any stores saved and the current store isn't already saved, parse out stores to array
                    // if (currentStores && currentStores.indexOf(dbStore) === -1) {
                    //     currentStores = JSON.parse(currentStores);
                    //     // push new store into current stores
                    //     currentStores.push(`${dbStore}_store`);
                    //     // save new stores to local storage
                    //     localStorage.setItem("currentStores", currentStores);
                    // } else {
                    //     // create new stores list
                    //     localStorage.setItem("currentStores", JSON.stringify([`${dbStore}_store`]));
                    // }
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
                    // close the db
                    db.close();
                    resolve(allData);
                    // send to bulk list items route
                }
            }
        })
    }
}