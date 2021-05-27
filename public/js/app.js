const weatherForm = document.querySelector('form')
const myLocationButton = document.querySelector('#my_location')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

myLocationButton.addEventListener('click', (event) => {

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // navigator.geolocation.getCurrentPosition is in build google console method.
    navigator.geolocation.getCurrentPosition((position) => {
        fetch(`/weather?latitude=${position.coords.latitude}&longtitude=${position.coords.longitude}`).then((response) => {
            response.json().then((data) => {
                messageOne.textContent = 'Your current location'
                messageTwo.textContent = data.forecast
            })
        })
    })
})