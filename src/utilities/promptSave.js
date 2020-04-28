const moment = require("moment");

module.exports = {
    isSavedToHome: () => {
        // if the user has already installed the pwa
        if (navigator.standalone || (window.matchMedia('(display-mode: standalone)').matches) || document.referrer.includes('android-app://')) {
            return false;
        }
        // check for safari
        // chrome doesn't have an way of determining if the device is mobile or desktop
        const ua = window.navigator.userAgent;
        const webkit = !!ua.match(/WebKit/i);
        const isIPad = !!ua.match(/iPad/i);
        const isIPhone = !!ua.match(/iPhone/i)
        const isIOS = isIPad || isIPhone;
        const isSafari = isIOS && webkit && !ua.match(/CriOS/i);
        // check if the user has been prompted previously
        let isSaved = localStorage.getItem("saveToHome");
        if (!isSaved && isSafari) {
            // if they they havent, we return true so that they will now be prompted
            return true;
        } else if (isSafari) {
            isSaved = moment(isSaved);
            const today = moment().toDate();
            const days = moment(today).diff(isSaved, "days");
            // if it has been less than 30 days since they were last prompted, don't prompt them again
            if (days < 60) {
                return false;
            } else {
                return true;
            }
        }
    }
}