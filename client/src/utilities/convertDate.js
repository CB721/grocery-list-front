module.exports = function convertDate(data) {
    // date will be formatted as 2020-01-28
    const dataArr = data.split("-");
    const month = dataArr[1];
    const year = dataArr[0];
    const day = dataArr[2];
    let newDate = "";
    switch (month) {
        case "01":
            newDate += "January";
            break;
        case "02":
            newDate += "February";
            break;
        case "03":
            newDate += "March";
            break;
        case "04":
            newDate += "April";
            break;
        case "05":
            newDate += "May";
            break;
        case "06":
            newDate += "June";
            break;
        case "07":
            newDate += "July";
            break;
        case "08":
            newDate += "August";
            break;
        case "09":
            newDate += "September";
            break;
        case "10":
            newDate += "October";
            break;
        case "11":
            newDate += "November";
            break;
        case "12":
            newDate += "December";
            break;
        default:
            return;
    }
    newDate += ` ${day}, ${year}`;
    console.log(newDate);
    return newDate;
}