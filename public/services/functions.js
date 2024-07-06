const precipitationDescriptions = ['shower rain', 'rain', 'snow', 'mist'];
const cloudDescriptions = ['broken clouds', 'overcast clouds'];
const sunnyDescription = ['few clouds', 'clear sky', 'scattered clouds'];

//Change the backgorund image depending on the weather Description.
export const changeBackgroundImage = (description) => {
    const body = document.querySelector('body');
    const isNight = document.querySelector('#status');

    let imgUrl = '';
    if (precipitationDescriptions.includes(description)) {
        imgUrl = './img/rain.jpg';
    } else if (cloudDescriptions.includes(description)) {
        imgUrl = './img/alotcloud.jpg';
    } else if (sunnyDescription.includes(description)) {
        imgUrl = './img/sunny.jpg';
    } else {
        imgUrl = './img/sunny.jpg';
    }

    if (isNight == 'Night') {
        body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgUrl})`;
    } else {
        body.style.backgroundImage = `url(${imgUrl})`;
    }
};

//Show users' dateTime information.
export function updateDateTime() {
    const now = new Date();

    // Formatting the date as '21-July-2023'
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    document.getElementById('month').textContent = formattedDate;

    // Formatting the day and time as 'Friday, 12:44pm'
    const weekday = now.toLocaleString('default', { weekday: 'long' });
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const hour12 = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    const formattedTime = `${weekday}, ${hour12}:${minutes}${ampm}`;
    document.getElementById('day-time').textContent = formattedTime;

    // Determining the day/night status
    const status = hours >= 6 && hours < 18 ? 'Day' : 'Night';
    document.getElementById('status').textContent = status;
}