
$(document).ready(function(){
    $("#5day").hide()
    $("#searchBtn").on("click", function(){
        var cityName = $("#searchBox").val()
        console.log(cityName)
        todaysWeather(cityName)
        fiveDayWeather(cityName)
        uvIndex(cityName)
    })
    var history = JSON.parse(localStorage.getItem("saveCity")) || []

    if(history.length > 0) {
        todaysWeather(history[history.length - 1])
    }

    for(var i = 0; i < history.length; i++){
        button(history[i])
    }
    var apiKey = "2aa28018e3a875b3d5f502628a4b6ed7&units=imperial" 
    $("#history").on("click", "li", function(){
        todaysWeather($(this).text())
    })

    function button(city){
        var li = $("<li>").addClass("list-group-item").text(city)
        $("#history").append(li)
    }

    function todaysWeather(cityName){
        $.ajax({
            type:"GET", 
            url:"https://api.openweathermap.org/data/2.5/weather?q="+ cityName+"&appid="+apiKey
        }).then(function(data){
            console.log(data)
            if(history.indexOf(data.name)=== -1){
                history.push(data.name)
                console.log(data.name)
                localStorage.setItem("saveCity", JSON.stringify(history))
                button(data.name)
            }
            $("#today").empty()
            var cityName = $("<h2>").text(`${data.name} ${new Date().toLocaleDateString()}`)
            var temp = $("<p>").text(`Temp: ${data.main.temp}`)
            var humid = $("<p>").text(`Humidity: ${data.main.humidity}`)
            var icon = $("<img>").attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png")
            var wind = $("<p>").text(`Wind speed: ${data.wind.speed}`)
            cityName.append(icon)
            $("#today").append(cityName, temp, humid, wind)
            var lat = data.coord.lat
            var lon = data.coord.lon
            uvIndex(lat,lon)
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
        
        
        function uvIndex(lat, lon){
            $.ajax({
                type:"GET",
                url:"https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat="+lat+ "&lon="+lon
            }).then(function(data){
                console.log(data)
                var uvValue = data.value
                var pTag = $("<p>")
                pTag.append("UV Index: ", uvValue)
                $("#today").append(pTag)
            })
        
    }
   
})


    