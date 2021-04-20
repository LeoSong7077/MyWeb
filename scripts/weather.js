//지금 일단 안하고 나중에 Node로 구현할것

// 브라우저에서 자바스크립트를 쓴다면 Fetch라는 내장 모듈이 있지만 
//Node.js에서 가장 많이 HTTP 네트워크 라이브러리는 단연 Request.js입니다.

//ERROR: 클라이언트에서 사용하기 때문에 require 사용 불가능
//"node에서는 모듈을 불러오기 위해 require을 사용한다."
// const request = require('request');
// const cheerio = require('cheerio');

// let currentTemp = ""; //현재 온도
// let currentDesc = ""; //현재 날씨
// let sensibleTemp = ""; //현재 체감온도
// let highestTemp = ""; //오늘 최고온도
// let lowestTemp = ""; //오늘 최저온도
// let todayTemps = []; //오늘 온도
//let weekly_temps = [];

const url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EB%B6%80%EC%B2%9C+%EC%83%81%EB%8F%99+%EB%82%A0%EC%94%A8';

// request(url, function (error, response, body) {
//     const $ = cheerio.load(body); //어떤 형식으로 저장인지? 함수 객체?
//     currentTemp = $('.today_area .main_info .info_temperature .todaytemp').text(); 
//     currentDesc = $('.today_area .main_info .info_list li:nth-child(1)').text();
//     console.log($('.today_area .main_info .info_list li:nth-child(1)').text());
//     sensibleTemp = $('.today_area .main_info .info_list li:nth-child(2) span.sensible .num').text(); 
//     highestTemp = $('.today_area .main_info .info_list li:nth-child(2) span.min').text(); 
//     lowestTemp = $('.today_area .main_info .info_list li:nth-child(2) span.max').text(); 
//     for(let i = 1; i <= 8; i++) { 
//         todayTemps.push($('.today_area .table_info .weather_condition ul.list_area li:nth-child(' + i + ') .weather_item span:nth-child(1)').text());
//     }
// });

// fetch(url)
//     .then(res => {
//         console.log(res);
//         return res.json();
//     })
//     .then(data => {
//         console.log(data);
//     })

// function getCurrentTemp() {
//     return currentTemp;
// }
// function getCurrentDesc() {
//     return currentDesc;
// }
// function getSensibleTemp() {
//     return sensibleTemp;
// }
// function getHighestTemp() {
//     return highestTemp
// }
// function getLowestTemp() {
//     return lowestTemp
// }
// function getTodayTemps() {
//     return todayTemps
// }