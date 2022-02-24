const iconElement = document.querySelector(".weather-icon")
const iconLocation = document.querySelector(".location-icon")
const temElement = document.querySelector(".temprature-value p")
const descElement = document.querySelector(".temprature-description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")



var input = document.getElementById("search")
let city =""
let latitude=0.0
let longitude=0.0

input.addEventListener("keyup",function(event){

    if(event.keyCode===13){
        event.preventDefault();

        city=input.value
        getSearchweather(city)
        console.log(city);
    }
})

const weather ={}

weather.temprature={
    unit:"celsius"
}

const KELVIN =273

const key="c6ea8acb639c1f5b4f2de450769176cc"

if("geolocation"in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError)
}else{
    notificationElement.style.display="black"
    notificationElement.innerHTML="<p> browser doesn't support geolocation </p> "
}

function setPosition(position){
    latitude=position.coords.latitude
    longitude= position.coords.longitude
    
    getWeather(latitude,longitude)
}


iconLocation.addEventListener("click",function(event){
    console.log('hey');
    getWeather(latitude,longitude)
})


function showError(error){
    notificationElement.style.display="block"
    notificationElement.innerHTML=`<p>${error.message}</p>`
}

function getSearchweather(city){
    let api=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

    fetch(api)
    .then(function(response){
        let data =response.json()
        return data
    })
    .then(function(data){
        weather.temprature.value=Math.floor(data.main.temp -KELVIN)
        weather.description=data.weather[0].description
        weather.iconId=data.weather[0].icon
        weather.city=data.name
        weather.country=data.sys.country
    })
    .then(function(){
        displayWeather()
    })
}
console.log(weather);
// عندنا خيارين اما تكتب اسم المدينه وتحصل ع الطقس واما تضغط ع اللوكيشن ويحدد موقع وبعدها يحدد المدينه 
//للحصول ع الطقس نحتاج نستخدم خطوط الطول وخطوط العرض
function getWeather(latitude,logitude){
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api)
    .then(function(response){
        let data =response.json()
        return data
    })
    .then(function(data){
        weather.temprature.value=Math.floor(data.main.temp -KELVIN)
        weather.description=data.weather[0].description
        weather.iconId=data.weather[0].icon
        weather.city=data.name
        weather.country=data.sys.country
    })

    .then(function(){
        displayWeather()
    })
}

function displayWeather(){
    console.log("iconId ::"+weather.iconId);
    console.log(weather.description);
    console.log(weather);
    // iconElement.innerHTML=`<img scr="icons/${weather.iconId}.png"/>`
    document.getElementById('im').src=`icons/${weather.iconId}.png`
    temElement.innerHTML=`${weather.temprature.value}*<span>C</span>`
    descElement.innerHTML=weather.description
    locationElement.innerHTML=`${weather.city},${weather.city}`
}