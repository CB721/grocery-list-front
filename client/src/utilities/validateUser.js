import axios from "axios";


export default {
    // if nothing is passed for the auth token, check localStorage
    status: (auth, IP, remember = false) => {
        return new Promise((resolve, reject) => {

            if (!auth) {
                reject(false);
            } else {
                // check if auth token is a valid length
                if (auth && auth.length > 60) {
                    axios.get(`/api/users/verify/${auth}/${IP}`)
                        .then(res => {
                            // if user has said to remember them, no need to check the time difference
                            if (remember) {
                                resolve(res.data);
                            } else {
                                // check time difference returned from db
                                // should look like "-00:54:41"
                                // grab second element from spliting the string and convert to a number
                                const timeDifference = parseInt(res.data.time_difference.split(":")[1]);
                                // check if it has been more than 30 minutes
                                if (timeDifference <= 30) {
                                    resolve(res.data);
                                } else {
                                    reject(false);
                                }
                            }
                        })
                        // if there is an error from the db, the user token does not match
                        .catch(() => {
                            // remove what is store in local storate
                            localStorage.removeItem("token");
                            reject(false);
                        });
                } else {
                    reject(false);
                }
            }
        });
    }
}



