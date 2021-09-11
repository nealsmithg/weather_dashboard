var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=wilmington&limit=1&appid=ce2aa6f67e317ff5f10deb7b9c6358f1";



var lat;
var long;

    fetch(cityUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    lat = data[0].lat;
                    long = data[0].lon;
                        var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ long +"&appid=ce2aa6f67e317ff5f10deb7b9c6358f1"
                    fetch(weatherUrl)
                            .then(function (response) {
                                if (response.ok) {
                                    response.json().then(function (data) {
                                       
                                    console.log(data);
                                    });
                                } 
                            })

                });
            } 
        })



    