var city;
var lat;
var long;

$("#search").click(function(){
    city = $("#search_city").val();
    getLocation();
})

function getLocation(){
    city = city.split(' ').join('+')
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=1&appid=ce2aa6f67e317ff5f10deb7b9c6358f1";
    fetch(cityUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
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
    var container = $("#info")
    var today = $("<div class='col-12' id='today'>");
    var todayHeader = $("<h2 id='todayhead'>");
    var todayTemp = $("<h3>");
    var todayWind = $("<h3>");
    var todayHumid = $("<h3>");
    var todayUV = $("<h3>");
    todayHeader.text(city+" ("+moment().format("l")+")");
    todayHeader.append("<img src='http://openweathermap.org/img/wn/"+ data.current.weather[0].icon+"@2x.png'>")
    todayTemp.text("Temp: "+ data.current.temp);
    todayWind.text("wind: "+ data.current.wind_speed);
    todayHumid.text("Humidity: "+ data.current.humidity);
    todayUV.text("UV index:" + data.current.uvi);
    today.append(todayHeader);  
    today.append(todayTemp);
    today.append(todayWind);
    today.append(todayHumid);
    today.append(todayUV);
    container.append(today);
};


    

    


 
