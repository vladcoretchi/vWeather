import * as functions from "firebase-functions";

export const heartbeat = functions.https.onRequest((request, response) => {
  response.set('Cache-Control', 'no-store');
  response.send({
    timestamp: Date.now(),
    //firebaseConfig: JSON.parse(process.env.FIREBASE_CONFIG || '{}'),
    projectID: process.env.GCLOUD_PROJECT
  });
});