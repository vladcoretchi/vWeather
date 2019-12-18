/*
--------------------------------------------------
--- set environment variables ---
firebase functions:config:set openweathermap.appid="XXX"
--------------------------------------------------
*/

export { ssr } from "./ssr.f"

export { heartbeat } from "./system/heartbeat.f";
export { ping } from "./system/ping.f";

// blocked on Spark tier
// export { weather } from "./weather/weather.f";
// export { forecast } from "./weather/forecast.f";