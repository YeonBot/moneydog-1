const cheerio = require('cheerio');
const commonParser = require('../commonParser');
const moment = require('moment');

const getSubject = (response) => {
  const subject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response)).payload.headers[18];
  return subject;
};

const getNetflixInfo = (response) => {
  const jsonObject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response));
  const dom = commonParser.convertHtml(commonParser.base64ToUtf8(jsonObject.payload.parts[1].body.data));
  const $ = cheerio.load(dom);
  service = {};
  service.email = $('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(8) > td > table > tbody > tr:nth-child(2) > td').text();
  service.name = convertNameReg($('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(2) > td').text());
  service.price = convertPriceReg($('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(2) > td').text());
  // service.date = convertDateReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(5)').text());
  service.renewal = convertRenewalReg($('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(1) > td').text().trim());
  // service.periodMonth = calPeriod(service.renewal, service.date);
  console.log(`service : ${JSON.stringify(service)}`);
  return service;
};

const convertNameReg = (data) => {
  const regex = /[가-힣]{3,4}/;
  return regex.exec(data)[0];
};

const convertPriceReg = (data) => {
  const priceRegex = /[0-9]{2},[0-9]{3}/;
  return parseInt(priceRegex.exec(data)[0].replace(',', ''));
};

const convertRenewalReg = (data) => {
  console.log(data);
  const yearRegex = /[0-9]{4}/;
  const monthRegex = /\s[0-9]{2}/g;
  const monthAndDay = data.match(monthRegex).map((day) => day.replace(' ', ''));
  const fullDay = `${yearRegex.exec(data)[0]}${monthAndDay[0]}${monthAndDay[1]}`;
  return moment(fullDay).format('YYYY-MM-DD');
}

const fs = require('fs');
const response = fs.readFileSync('./netflix_membership_signup.json');
console.log(getNetflixInfo(response));
