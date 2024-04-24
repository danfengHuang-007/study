// Encapsulating query functions
function searchWeather(city){
    hmAxios({
        url:'http://hmajax.itheima.net/api/weather',
        params: {
            city
        }
    }).then(res => {
        // rendering page
        const wData = res.data
        // console.log(wData)
        // city name
        document.querySelector('.area').innerText = wData.area
        const dateStr = `
        <span class="date">${wData.date}</span>
        <span class="calendar">农历&nbsp;
            <span class="dateLunar">${wData.dateLunar}</span>
        </span>
        `
        document.querySelector('.title').innerHTML = dateStr

        // current temperarure
        const curStr = `
        <div class="tem-box">
                <span class="temp">
                    <span class="temperature">${wData.temperature}</span>
                    <span>°</span>
                </span>
            </div>
            <div class="climate-box">
                <div class="air">
                    <span class="psPm25">${wData.psPm25}</span>
                    <span class="psPm25Level">${wData.psPm25Level}</span>
                </div>
                <ul class="weather-list">
                    <li>
                        <img src="${wData.weatherImg}" alt="" class="weatherImg">
                        <span class="weather">${wData.weather}</span>
                    </li>
                    <li class="windDirection">${wData.windDirection}</li>
                    <li class="windPower">${wData.windPower}</li>
                </ul>
            </div>
        `
        document.querySelector('.weather-box').innerHTML = curStr

        // today's weather
        const {todayWeather} = wData
        const tStr = `
            <div class="range-box">
                    <span>今天:</span>
                    <span class="range">
                        <span class="weather">${todayWeather.weather}</span>
                        <span class="temNight">${todayWeather.temNight}</span>
                        <span>-</span>
                        <span class="temDay">${todayWeather.temDay}</span>
                        <span>℃</span>
                    </span>
                </div>
                <ul class="sun-list">
                    <li>
                        <span>紫外线</span>
                        <span class="ultraviolet">${todayWeather.ultraviolet}</span>
                    </li>
                    <li>
                        <span>湿度</span>
                        <span class="humidity">${todayWeather.humidity}</span>%
                    </li>
                    <li>
                        <span>日出</span>
                        <span class="sunsetTime">${todayWeather.sunsetTime}</span>
                    </li>
                </ul>
        `
        document.querySelector('.today-weather').innerHTML = tStr

        // week weather forecast
     const weekStr =   wData.dayForecast.map(v => {
            return `
            <li class="item">
                <div class="date-box">
                    <span class="dateFormat">${v.dateFormat}</span>
                    <span class="date">${v.date}</span>
                </div>
                <img src="${v.weatherImg}" alt="" class="weatherImg">
                <span class="weather">${v.weather}</span>
                <div class="temp">
                    <span class="temNight">${v.temNight}</span>
                    <span class="temDay">${v.temDay}</span>
                    <span>℃</span>
                </div>
                <div class="wind">
                    <span class="windDirection">${v.windDirection}</span>
                    <span class="windPower">${v.windPower}</span>
                </div>
            </li>
            `
        }).join('')
        document.querySelector('.week-wrap').innerHTML = weekStr

    })
}
searchWeather('110100')
const func = _.debounce(function(){
    // search city
    hmAxios({
        url:'http://hmajax.itheima.net/api/weather/city',
        params: {
            city: this.value
        }
    }).then(res => {
        // render the city to page
        console.log(res.data)
        const str = res.data.map(v => {
            return ` <li class="city-item" data-code="${v.code}">${v.name}</li>`
        }).join('')
        document.querySelector('.search-list').innerHTML = str

    })
}, 1000)
// Registering for input events
document.querySelector('.search-city').addEventListener('input', func)

// Binding click events
document.querySelector('.search-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('city-item')){
        const {code} = e.target.dataset
        searchWeather(code)
    }
})