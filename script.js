let weatherBtn = document.querySelector(".weatherBtn")
let searchBtn = document.querySelector(".searchBtn")
let inputContainer = document.querySelector(".inputContainer")
let resultcontainer = document.querySelector(".resultcontainer")


searchBtn.addEventListener("click",()=>{
    searchBtn.classList.add("bg")
    weatherBtn.classList.remove("bg")
    inputContainer.style.display = "flex"
    resultcontainer.style.display = "none"
})

weatherBtn.addEventListener("click",()=>{
    searchBtn.classList.remove("bg")
    weatherBtn.classList.add("bg")
    inputContainer.style.display = "none"
    resultcontainer.style.display = "flex"
    document.querySelector(".diserror").style.display = "none"
    // console.log("weather btn colled")
})


// Fetching the data from API 


const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '763c810bdfmshb9f4669b80c3925p18d818jsn3db5be365864',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

let loading_img = document.querySelector(".load-img")
let diserror = document.querySelector(".diserror")

async function fetchData(cityname){
    
    loading_img.style.display = "block"
    

    console.log("yes coming")

    try{
        let response = await  fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityname, options)

        let data = await response.json()
        return data;
    }
    catch(error){
        document.querySelector(".diserror").innerHTML = "An error accured"
        document.querySelector(".diserror").style.color = "red";
        console.log(error)
    }
    
}

function showResult(promiseData){
    
    promiseData.then((data)=>{
        loading_img.style.display = "none"
        console.log(data)


        if(data.error){
            diserror.style.display = "block"
            diserror.innerHTML = "Please enter the correct city name"
        }
        else{
            document.querySelector(".temprature").innerHTML = data.temp;

            document.querySelector(".windresult").innerHTML = data.
            wind_speed + " km/h";
    
            document.querySelector(".humidityresult").innerHTML = data.humidity + " %"
    
            document.querySelector(".cloudresult").innerHTML = data.cloud_pct + " %"
    
    
            inputContainer.style.display = "none"
            resultcontainer.style.display = "flex"
            searchBtn.classList.remove("bg")
            weatherBtn.classList.add("bg")
        }
        
        
    })
}

let searchWeather = document.querySelector(".searchWeather")

searchWeather.addEventListener("click",(e)=>{
    e.preventDefault();

    let cityName = document.querySelector(".userinput").value
    console.log(cityName)

    if(cityName === ""){
        diserror.innerHTML = "Please enter the valid city name"
    }
    else{
        diserror.style.display = "none"

        let Promisedata = fetchData(cityName);

        document.querySelector(".cityname").innerHTML = cityName.toUpperCase();

        showResult(Promisedata);
       
    }
})



document.addEventListener("DOMContentLoaded", function() {
    let city = "delhi"
    let Promisedata = fetchData(city);
    
    showResult(Promisedata);
});
