function ejecutar() {
	obtenerDatosDelClima()
	
}
let $ubicacion = document.getElementById('contenedor--ubicacion')
let $temperatura = document.getElementById('temperatura')
let $humedad = document.getElementById('humedad')
let $viento = document.getElementById('viento')
function obtenerDatosDelClima() {
		navigator.geolocation.getCurrentPosition(function (posicion) {
			
			const lat = posicion.coords.latitude
			const long = posicion.coords.longitude
			const apiKeys = `0f33dec0e61a1af9be54fa2448dd2085`
			let api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKeys}`
			
				fetch(api)
				.then(function (respuesta) {
					console.log(respuesta)
					if (respuesta.ok) return respuesta.json()
						return Promise.reject(respuesta)
				})
				.then(function (data) {
						const {temp,humidity} = data.main
						const {speed} = data.wind
						const {country} = data.sys
						establecerUbicacion(country,data.name)
						establecerTemperatura(convertirCentigrados(temp))
						establecerHumedad(humidity)
						establecerViento(convertirKilometros(speed))
						
				})
				.catch(function (respuesta) {
					console.log(respuesta.statusText)
				})
				
		},error)

}
function error(error) {
	if (error.code == 1) {
		return document.body.innerHTML = `Debes permitir al sitio acceder a tu ubicacion `
	}
	
}

function convertirCentigrados(temp) {
	const C = 273.15
	return 	Math.floor(temp-273.15)
}
function convertirKilometros(speed) {
	return speed * 1.60934
}
function establecerUbicacion(country,name) {
	let cadena = country.replace('E','e')
	 $ubicacion.innerHTML = `${cadena}, ${name}`
}
function establecerTemperatura(temp) {
	$temperatura.innerHTML = `${temp} c`
}
function establecerHumedad(humidity) {
	$humedad.innerHTML = `${humidity}, Humedad`
}
function establecerViento(viento) {
	$viento.innerHTML = `${viento.toFixed(2)} km, Velocidad del viento`
}
ejecutar()

setInterval(function () {
	ejecutar()
},60000)

	

