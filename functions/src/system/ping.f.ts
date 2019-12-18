import * as functions from "firebase-functions";

export const ping = functions.https.onRequest((request, response) => {
  response.set('Cache-Control', 'no-store');
  response.send("pong");
});