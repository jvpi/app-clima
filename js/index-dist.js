function ejecutar(){obtenerDatosDelClima()}let $ubicacion=document.getElementById("contenedor--ubicacion"),$temperatura=document.getElementById("temperatura"),$humedad=document.getElementById("humedad"),$viento=document.getElementById("viento");function obtenerDatosDelClima(){navigator.geolocation.getCurrentPosition((function(e){const t=e.coords.latitude,n=e.coords.longitude;fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=0f33dec0e61a1af9be54fa2448dd2085`).then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){const{temp:t,humidity:n}=e.main,{speed:o}=e.wind,{country:r}=e.sys;establecerUbicacion(r,e.name),establecerTemperatura(convertirCentigrados(t)),establecerHumedad(n),establecerViento(convertirKilometros(o)),console.log(t,n,o)})).catch((function(e){}))}))}function convertirCentigrados(e){return Math.floor(e-273.15)}function convertirKilometros(e){return 1.60934*e}function establecerUbicacion(e,t){let n=e.replace("E","e");$ubicacion.innerHTML=`${n}, ${t}`}function establecerTemperatura(e){$temperatura.innerHTML=e+" c"}function establecerHumedad(e){$humedad.innerHTML=e+", Humedad"}function establecerViento(e){$viento.innerHTML=e.toFixed(2)+" km"}ejecutar(),setInterval((function(){ejecutar()}),6e4);