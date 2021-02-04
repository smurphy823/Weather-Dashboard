$(document).ready(function(){
    $("#5day").hide()
    $("#searchBtn").on("click", function(){
        var cityName = $("#searchBox").val()
        console.log(cityName)
        todaysWeather(cityName)
        fiveDayWeather(cityName)
        uvIndex(cityName)
    })

    var apiKey = "2aa28018e3a875b3d5f502628a4b6ed7&units=imperial" 

    function todaysWeather(cityName){
        $.ajax({
            type:"GET", 
            url:"https://api.openweathermap.org/data/2.5/weather?q="+ cityName+"&appid="+apiKey
        }).then(function(data){
            console.log(data)
            var cityName = $("<h2>").text(`${data.name} ${new Date().toLocaleDateString()}`)
            var temp = $("<p>").text(`Temp: ${data.main.temp}`)
            var humid = $("<p>").text(`Humidity: ${data.main.humidity}`)
            var icon = $("<img>").attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png")
            var wind = $("<p>").text(`Wind speed: ${data.wind.speed}`)
            cityName.append(icon)
            $("#today").append(cityName, temp, humid, wind)
        })


    }
    function fiveDayWeather(cityName){
        $.ajax({
            type:"GET", 
            url:"https://api.openweathermap.org/data/2.5/forecast?q="+ cityName+"&appid="+apiKey
        }).then(function(data){
            console.log(data)
            let returnList = data.list
            console.table(returnList)
            var fiveDayArray = []
            for (i = 0; i < returnList.length; (i += 8)) {
                fiveDayArray.push(returnList[i]);
              }
              console.table(fiveDayArray)
              for (i = 0; i < fiveDayArray.length; i++) {
                let boxInc = (i+1)
                var boxData = `<p>${fiveDayArray[i].dt_txt.split(" ")[0]}</p>
                <strong><p>Temp: ${fiveDayArray[i].main.temp}</p></strong>
                <img src="http://openweathermap.org/img/w/${fiveDayArray[i].weather[0].icon}.png">
                <p>Humidity: ${fiveDayArray[i].main.humidity}</p>` 
                
                $("#day"+boxInc).html(boxData)
              } 
                 $("#5day").show()
        })
    }

        var cityName = $("#searchBox").val()
        var searchCities = localStorage.getItem("cities");
           if (searchCities === null) {
            searchCities = [];
          } else {
            searchCities = JSON.parse(searchCities);
          }
        searchCities.push(cityName);
        var cityNames = JSON.stringify(searchCities);
        localStorage.setItem("cities", cityNames)
        console.log(cityNames)


        
        function uvIndex(lat){
            function uvIndex(lon){
            $.ajax({
                type:"GET",
                url:"https://api.openweathermap.org/data/2.5/onecall?lat="+  cityName + lat+"&lon="+lon+"&appid="+apiKey    
            }).then(function(data){
                console.log(data)
                var lat = $("<p>").text(`Lat: ${data.coord.lat}`)   
                var lon = $("<p>").text(`Lon: ${data.coord.lon}`)  
                $("#uvIndex").append(lat, lon)
            })
        } 
    }
   
})


    