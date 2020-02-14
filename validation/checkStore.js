module.exports = function checkStore({id, address, name}) {
    return new Promise(function(resolve, reject) {
        if (id.length < 1) {
            return reject(Error("No store id provided."));
        }
        else if (address.length < 1) {
            return reject(Error("No store address provided"));
        }
        else if (name.length < 1) {
            return reject(Error("No store name provided"));
        }
        else {
            return resolve(true);
        }
    });
}