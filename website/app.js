/* Global Variables */
const unit = '&units=imperial';
const id = '&APPID=';
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
let API_KEY = '';

// Create a new date instance dynamically with JS
const date = new Date()
const hour = date.getHours()
const day = date.getDate()
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const today = `${day} ${months[date.getMonth()]}, ${days[date.getDay()]}`


const temperature = document.querySelector('.weather-box .temp');
const description = document.querySelector('.weather-box .desc');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');
const feels = document.querySelector('.feelings-container .feelings-display');

// Fetch API_KEY from server.js 
fetch('/getkey')
  .then(response => response.text())
  .then(key => {
    secretKey = key
    API_KEY = `${id}${secretKey}${unit}`
});

function actionSubmit(e) {
    event.preventDefault();

    const zipcode = document.getElementById("zip-code").value;
    const feelings = document.getElementById("feelings-area").value;

    getWeatherInfo(baseURL, zipCode, API_KEY)
    .then((data) => {
        console.log(data)
        postWeatherInfo('/post', {
        date: today,
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        content: feelings
        }).then((newData) => {
        temperature.innerHTML = `Temp is: ` + Math.round(newData.temp) + `\u00B0C`;
        description.innerHTML = `Desc is: ` + newData.description;
        feels.innerHTML = 'Today you are feeling: ' + newData.content;
        });
    });
}


const getWeatherInfo = async (baseUrl, zipCode, apiKey) => {
const res = await fetch(baseUrl + zipCode + apiKey)
try {
    const data = await res.json()
    return data
} catch(error) {
    console.log("error",error)
    throw error;
}
}

const postWeatherInfo = async (url='', data={}) => {
const response = await fetch(url, {
    method:'POST',
    credentials:'same-origin',
    headers:{
        'content-type':'application/json'
    },
    body: JSON.stringify(data)
}) 
try {
    const newData = await response.json()
    console.log(newData)
    return newData
} catch(error) {
    console.log("error",error)
}
}