/* Global Variables */
const unit = '&units=imperial';
const id = '&APPID=';
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
let API_KEY = '';

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
const datefield = document.querySelector('.weather-box .date');

const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const feelingsContainer = document.querySelector('.feelings-container');

// Fetch API_KEY from server.js 
fetch('/getkey')
  .then(response => response.text())
  .then(key => {
    secretKey = key
    API_KEY = `${id}${secretKey}${unit}`
});

document.getElementById('submitInfo').addEventListener('click',actionSubmit);

function actionSubmit() {

    const zipCode = document.getElementById("zip-code").value;
    const feelings = document.getElementById("feelings").value;

    getWeatherInfo(baseURL, zipCode, API_KEY)
    .then((data) => {
        console.log(data)
        postWeatherInfo('/post', {
        date: today,
        temp: data.main.temp,
        description: data.weather[0].description,
        humidityVal: data.main.humidity,
        windVal: data.wind.speed,
        content: feelings
        }).then((resData) => {
            temperature.innerHTML = `Temperature is: ` + Math.round(resData.temp) + `\u00B0C`;
            description.innerHTML = `Description : ` + resData.description;
            datefield.innerHTML = `Today's Date ` + resData.date;
            humidity.innerHTML = data.main.humidity + '%';
            wind.innerHTML = Math.ceil(data.wind.speed) + ' mph';
            feels.innerHTML = 'Today you are feeling: ' + resData.content;

            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            feelingsContainer.classList.add('fadeIn');
        });
    });
}


const getWeatherInfo = async (baseURL, zipCode, API_KEY) => {
    const res = await fetch(baseURL + zipCode + API_KEY);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error",error);
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
    });
    try {
        const resData = await response.json();
        console.log(resData);
        return resData;
    } catch(error) {
        console.log("error",error);
    }
}