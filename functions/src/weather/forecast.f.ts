import * as functions from "firebase-functions";
import * as https from "https";

export const forecast = functions.https.onRequest((request, response) => {
	response.set('Cache-Control', 'public, max-age=300, s-maxage=1800');

	const units = request.query.units || 'metric';
	const city = request.query.city;

	if (city === undefined || city === null || city === '') {
		response.set('Cache-Control', 'no-store');
		response.status(400).end();
		return;
	}
	
	const forecastRequest = https.get(`https://api.openweathermap.org/data/2.5/forecast` +
		`?q=${city}` +
		`&units=${units}` +
		`&appId=${functions.config().openweathermap.appid}`, (forecastResponse) => {
			forecastResponse.on('data', (data) => {
				response.send(data);
			});
		});
		forecastRequest.on('error', (error) => {
		response.set('Cache-Control', 'no-store');
		response.status(500).end();
	});
});