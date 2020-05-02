module.exports = {
    // return if the application is online or not
    isOnline: () => {
        return navigator.onLine;
    },
    saveToIndexedDB: (data, dbStore, kPath) => {
        return new Promise((resolve, reject) => {
            console.log("attempting save to indexeddb");
            console.log(data, dbStore);
            console.log("----------------------");
            console.log("----------------------");
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
                db.onerror = function(event) {
                    // reject error code if available, false if not
                    reject(event.target.errorCode || false);
                }
                // put data in the db
                store.put(data);
                // close the transaction
                tx.oncomplete = function() {
                    // close the db
                    db.close();
                    resolve();
                }
            }
        })
    },
    bulkSend: () => {

    }
}