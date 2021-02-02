$(document).ready(function(){
    $("#5day").hide()
    $("#searchBtn").on("click", function(){
        var cityName = $("#searchBox").val()
        console.log(cityName)
        todaysWeather(cityName)
        fiveDayWeather(cityName)
    })

    var apiKey = "2aa28018e3a875b3d5f502628a4b6ed7&units=imperial" 

    function todaysWeather(cityName){
        $.ajax({
            type:"GET", 
            url:"https://api.openweathermap.org/data/2.5/weather?q="+ cityName+"&appid="+apiKey
        }).then(function(data){
            console.log(data)
            var cityName = $("<h2>").text(`${data.name} ${new Date().toLocaleDateString()}`)
            var temp = $("<p>").text(`temp: ${data.main.temp}`)
            var humid = $("<p>").text(`humidity: ${data.main.humidity}`)
            var icon = $("<img>").attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png")
            var wind = $("<p>").text(`wind speed: ${data.wind.speed}`)
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
                <p>Temp: ${fiveDayArray[i].main.temp}</p>
                <img src="http://openweathermap.org/img/w/${fiveDayArray[i].weather[0].icon}.png">
                <p>Humidity: ${fiveDayArray[i].main.humidity}</p>
                
                
                
                ` 

                $("#day"+boxInc).html(boxData)
              } 
                 $("#5day").show()

           // $("#5day").append(cityName, temp, humid, wind)
        })
    }


})

