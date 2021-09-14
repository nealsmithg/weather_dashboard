var city;
var holdCity = [];
var lat;
var long;
var container = $("#info");
var oldSearch = $("#old_search");

$("#search").click(function(){
    city = $("#search_city").val();
    getLocation();
    holdCity[holdCity.length] = city;
    localStorage.setItem("holdCity", JSON.stringify(holdCity));
});

$("#old_search").click(function(event){
    city = event.target.value;
    getLocation();
});

function getLocation(){
    cityHold = city.split(' ').join('+')
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityHold +"&limit=1&appid=ce2aa6f67e317ff5f10deb7b9c6358f1";
    fetch(cityUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    oldSearch.append("<button value='" + city + "'  class='btn btn-primary'>" + city + "</button>");
                    lat = data[0].lat;
                    long = data[0].lon;
                    getWeather(lat, long)
                });
            } ;
        });
};

function getWeather(lat, long){
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ long +"&exclude=minutely,hourly,alerts&units=imperial&appid=ce2aa6f67e317ff5f10deb7b9c6358f1"
        fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    creatForcast(data);
                });
            };
        });
};

function creatForcast(data){
    container.empty();
    todayForcast(data);
    weekForcast(data);
};

function todayForcast(data){
    var today = $("<div class='col-12' id='today'>");
    var todayHeader = $("<h2 id='todayhead'>");
    var todayTemp = $("<h4>");
    var todayWind = $("<h4>");
    var todayHumid = $("<h4>");
    var todayUV = $("<h4>");
    todayHeader.text(city+ " (" + moment().format("l") + ")");
    todayHeader.append("<img src='http://openweathermap.org/img/wn/"+ data.current.weather[0].icon+"@2x.png'>")
    todayTemp.text("Temp: "+ data.current.temp);
    todayWind.text("Wind: "+ data.current.wind_speed);
    todayHumid.text("Humidity: "+ data.current.humidity);
    todayUV.text("UV index:" + data.current.uvi);
    today.append(todayHeader);  
    today.append(todayTemp);
    today.append(todayWind);
    today.append(todayHumid);
    today.append(todayUV);
    container.append(today);
};

function weekForcast(data){
    var week = $("<div class='d-flex flex-row justify-content-around col-12' id='week'>");
    var weekHeader = $("<h2 id='weekhead'>");
    week.append(weekHeader)
    for (var i=0; i<5; i++){
        var day = $("<div class='col-2 day'>");
        day.append("<h3 class='day_date'>" + moment().format("l"));
        day.append("<img src='http://openweathermap.org/img/wn/"+ data.daily[i].weather[0].icon+"@2x.png'>");
        day.append("<h4>Temp: " + data.daily[i].temp.day);
        day.append("<h4>Wind: " + data.daily[i].wind_speed);
        day.append("<h4>Humidity: " + data.daily[i].humidity);
        week.append(day);
    };
    container.append(week);
};

function init(){
    if(JSON.parse(localStorage.getItem("holdCity") !== null)){
    holdCity = JSON.parse(localStorage.getItem("holdCity"));
    };
    for (var i=0; i<holdCity.length; i++){
        oldSearch.append("<button value='" + holdCity[i] + "' class='btn btn-primary'>" + holdCity[i] + "</button>");
    }
}

init();