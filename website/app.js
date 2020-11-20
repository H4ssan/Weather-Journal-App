/* Global Variables */
    let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const apiKey = '&appid=44be7a9e1ad9f23dacdd0361564013e0';

    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

    document.getElementById('generate').addEventListener('click', performEvent);

    function performEvent(evt){
        //retrive the user input
        const newCity = document.getElementById('city').value;
        const userResponse = document.getElementById('feelings').value;

        if(newCity.length == 0){
            alert("Please enter valid city");
            return
        }else if(userResponse.length == 0){
            alert("Please enter your feelings");
            return
        }
        
        getCity(baseURL, newCity, apiKey)

        .then(function(data){
            //add data to POST request
            postCity('/addData', {date: newDate, temperature: data.weather[0].main, userResponse:userResponse})

            updateInterface();
        })
    } 

    //GET Request
    const getCity = async (baseURL, city, apiKey)=>{
        //set variable to hold fetch calls return
        const res = await fetch(baseURL + city + apiKey)
        try{
            //retrieve data in json format
            const data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error("error"));
        }
        
    }

    //POST Request
    const postCity = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        try{
            const newData = await response.json();
            console.log(newData);
            return newData;
        }catch(error){
            console.log(error("error"));
        }
    }

    //update UI
    const updateInterface = async () => {
        const request = await fetch ('/data')

        try{
            const allData = await request.json()
            console.log(allData);
            document.getElementById('date').innerHTML = "Date: " + newDate;
            document.getElementById('temp').innerHTML = "Current Forecast: " + allData[allData.length-1].temperature;
            document.getElementById('content').innerHTML = "User Feelings: " + allData[allData.length-1].userResponse;
        } catch(error) {
            console.log(error("error"));
        }
    }


