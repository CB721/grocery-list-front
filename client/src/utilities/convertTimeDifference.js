module.exports = {
    convertTimeDiff: function(timeDiff) {
        // remove negative from string
        const time = timeDiff.substr(1);
        // save hours, minutes and seconds to variables and convert to numbers
        const hours = parseInt(time.split(":")[0]);
        const minutes = parseInt(time.split(":")[1]);
        const seconds = parseInt(time.split(":")[2]);
        // string to reference for return to JSX
        let timeStr = "";
        // if it has been more than an hour, only display hours
        if (minutes > 59 || hours >= 1) {
            // if it has been more than a day, only display days
            if (hours < 24) {
                timeStr = `${hours} hours ago`;
                // if it isn't more than a day, only display singular days
            } else if (hours >= 24 && hours < 48) {
                timeStr = `1 day ago`;
            } else {
                timeStr = `${Math.floor(hours / 24)} days ago`;
            }
        // if it has been less than a minute, only display seconds
        } else if (minutes < 1 && seconds > 0) {
            timeStr = `${seconds} seconds ago`;
        // otherwise, just display minutes
        } else {
            timeStr = `${minutes} minutes ago`;
        }
        return timeStr;
    }
}