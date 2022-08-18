exports.getDate = getDate;

function getDate(){
    var today = new Date();
    var day = "";
    var weekDays = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["January", "February","March","April","May","June","July","August","September","October","November","December"];
    var day = weekDays[today.getDay()] + ", " + months[today.getMonth()] + " " + today.getDate();
    return day;
}
