// // d742abe7cba20652ccf7b4fa10eb06d8
// // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//d742abe7cba20652ccf7b4fa10eb06d8
//a3a78044822f1e1384c192dd80115d56
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var ifConnected = window.navigator.onLine;
//  if (ifConnected) {
//      alert('Connected');
//  } else {
//      alert('Connect to Internate');
//  }
const weatherApi = {
  key: "d742abe7cba20652ccf7b4fa10eb06d8",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
};
var recognition = new webkitSpeechRecognition();

const searchInputBox = document.getElementById("input-box");
const temp = document.getElementById("temp");
const minmax = document.getElementById("min-max");
const city = document.getElementById("city");
const country = document.getElementById("country");
const weatherType = document.getElementById("weatherType");
const weatherStatus = document.getElementById("weather-status");
const sunriseText = document.getElementById("sunrise");
const sunsetText = document.getElementById("sunset");

//***************************************** */
recognition.onresult = function (event) {
  console.log(event);
  const transcript = event.results[0][0].transcript;
  document.getElementById("input-box").value = transcript;
  document.getElementById("city").value = transcript;
  console.log(transcript);
  read(transcript);
};

function record() {
  recognition.start();
}
recognition.onend = function () {
  console.log("Speech recognition service disconnected");
  getWeatherReport(searchInputBox.value);
};

function read(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
//Event listener function on keypress

searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    getWeatherReport(searchInputBox.value);
    console.log(searchInputBox.value);
  }
});

//get weather report

function getWeatherReport(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInputBox.value}&units=metric&appid=d742abe7cba20652ccf7b4fa10eb06d8`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

//show weather report
function showWeatherReport(weather) {
  console.log(weather);

  if (weather.cod == 404) {
    console.log("not found");
    city.innerText = `Location not found`;
    //  weatherStatus.innerText = ``;  => wrong
    temp.innerHTML = ``;
    minmax.innerHTML = ``;
    weatherType.innerHTML = ``;
    read(`Location not found`);
  } else {
    if (weather.sys.country == undefined) {
      city.innerText = `${weather.name}`;
    } else {
      city.innerText = `${weather.name}, ${weather.sys.country}`;
    }
    var sunrise = `${weather.sys.sunrise}`;
    var sunset = `${weather.sys.sunset}`;
    var sunriseTime = new Date(sunrise*1000);
    var sunsetTime = new Date(sunset*1000);

    temp.innerHTML = `${weather.main.temp}&deg;C`;
    minmax.innerHTML = `${weather.main.temp_min}&deg;C (min) / ${weather.main.temp_max}&deg;C (max)`;
    weatherType.innerHTML = `${weather.weather[0].main}`;
    sunriseText.innerHTML= "Sunrise:&nbsp &nbsp"+ sunriseTime.toString().substring(16,24)+" (IST)";
    sunsetText.innerHTML= "Sunset: &nbsp&nbsp    "+sunsetTime.toString().substring(16,24)+" (IST)";
    document.querySelector(".accordion-item").style="display:block";
  }
  // read(`${weather.name}`);
  read(`temperature at ${weather.name} is ${weather.main.temp} degree Celcius`);

  //background image

  if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('rainy.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('cloud.jpg')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('haze.jpg')";
  } else if (weatherType.textContent == "Fog") {
    document.body.style.backgroundImage = "url('haze.jpg')";
  } else if (weatherType.textContent == "Smoke") {
    document.body.style.backgroundImage = "url('haze.jpg')";
  } else if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('clear.jpg')";
  }
  var sunrise = `${weather.sys.sunrise}`;
  var sunset = `${weather.sys.sunset}`;
  var sunriseTime = new Date(sunrise*1000);
  var sunsetTime = new Date(sunset*1000);

  console.log(sunriseTime.toString().substring(16,24));
  console.log(sunsetTime.toString().substring(16,24));
 
 // console.log(date);
}

// blink
var blink = document.getElementById("blink");

setInterval(
  () => (blink.style.opacity = blink.style.opacity == 0 ? 1 : 0),
  500
);
