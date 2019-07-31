window.addEventListener('load' , () =>{
   let long,lat;
   let temperaturedescription = document.querySelector('.temperature-description');
   let temperaturedegree = document.querySelector('.temperature-degree');
   let timezone = document.querySelector('.location h1');
   let degree = document.querySelector(".degree-section span");
   let temperatureSection = document.querySelector(".degree-section");
   
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position =>{
           long = position.coords.longitude;
           lat = position.coords.latitude;
           const proxy = 'https://cors-anywhere.herokuapp.com/';
           const api = `${proxy}https://api.darksky.net/forecast/be97c79243fcdb5b9e21c29527affc00/${lat},${long}`;
           fetch(api).then(res => res.json())
                        .then(data => {
                            
                            const { temperature , summary , icon } = data.currently;  //destructuring from currently object that we got from data !!
                            //setting data into DOM
                            temperaturedegree.textContent = temperature;
                            temperaturedescription.textContent = summary;
                            timezone.innerHTML = data.timezone;
                            //setting icon
                            setIcon(icon , document.querySelector('#icon'));

                            
                            let celcius = (temperature - 32) *(5 / 9);
                            temperatureSection.addEventListener('click' , () => {
                                if(degree.textContent === "F"){
                                    degree.textContent = "C";
                                    temperaturedegree.textContent = Math.floor(celcius);
                                }else{
                                    degree.textContent = "F";
                                    temperaturedegree.textContent = temperature;
                                }
                            });
                            
                        }).catch(err => console.log(err));
                        
                        
        });       
   }else{
       h1.textContent = "please enable your location";
   }

   function setIcon(icon , iconID){
       const skycons = new Skycons({"color":"white"});
       const newIcon = icon.replace(/-/g , "_").toUpperCase();
       skycons.play();
       return skycons.set(iconID , Skycons[newIcon]);
   }
});