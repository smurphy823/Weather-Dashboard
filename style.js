$(document).ready(function(){
    $("#searchBtn").on("click", function(){
        var inputBox = $("#searchBox").val()
        console.log(inputBox)
        todaysWeather(inputBox)
    })

    var apiKey = "2aa28018e3a875b3d5f502628a4b6ed7&units=imperial" 

    function todaysWeather(inputBox){
        $.ajax({
            type:"GET", 
            url:"https://api.openweathermap.org/data/2.5/weather?q="+ inputBox+"&appid="+apiKey
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
})
