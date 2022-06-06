const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message');
const forecast = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    message.textContent = "Loading...";

    const url = 'http://localhost:3000/weather?address=' + search.value

    fetch(url).then((res) => {
    res.json().then((data) => {
        if(data.error) {
            message.textContent = data.error
            forecast.textContent = ""
        } else { 
            message.textContent = data.locationName;
            forecast.textContent = data.forecast;
        }
    })
})
})