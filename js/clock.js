const clockContainer = document.querySelector(".js-clock");//js-clock이라는 이름의 js파일을 찾아준다.
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
     
}

function init() {
    getTime();
    setInterval(getTime,1000);//getTime함수를 100ms(1초)마다 호출..
}

init();