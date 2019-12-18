import * as functions from "firebase-functions";
import * as https from "https";

export const weather = functions.https.onRequest((request, response) => {
	response.set('Cache-Control', 'public, max-age=300, s-maxage=1800');

	const units = request.query.units || 'metric';
	const city = request.query.city;

	if (city === undefined || city === null || city === '') {
		response.set('Cache-Control', 'no-store');
		response.status(400).end();
		return;
	}
	
	const weatherRequest = https.get(`https://api.openweathermap.org/data/2.5/weather` +
		`?q=${city}` +
		`&units=${units}` +
		`&appId=${functions.config().openweathermap.appid}`, (weatherResponse) => {
			weatherResponse.on('data', (data) => {
				response.send(data);
			});
		});
	weatherRequest.on('error', (error) => {
		response.set('Cache-Control', 'no-store');
		response.status(500).send(error);
	});
});