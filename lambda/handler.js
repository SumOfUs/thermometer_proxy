'use strict';

const request = require('request');
const qs = require('query-string');

const fetchDonationData = () => {
  const host = process.env.API_HOST;

  return new Promise(resolve => {
    request(
        `${host}/api/donations/total`,
        { start: '2019-11-01', end: '2019-11-30' }, ( err, resp, body ) => {
          resolve(body);
        }
    )
  })
};

module.exports.get = async (event) => {
  const { label, currency } = event.queryStringParameters;

  const data = await fetchDonationData();
  const donations_data = JSON.parse(data).data;

  const textColour = '30394f';
  const labelColour = '30394f';
  const topRight = 'Goal';

  const options = {
    contributed: donations_data.total_donations[currency],
    top_left: label,
    top_right: topRight,
    goal: donations_data.eoy_goals[currency],
    barcolour: '00c0cf',
    transbg: true,
    textcolour: textColour,
    labelcolour: labelColour,
    currency: currency,
    showperc: false,
    showcontributions: false,
    showdate: false,
    halfsize: true,
  };

  let url = `https://thermometer.forwardaction.uk/?${qs.stringify(options)}`

  return {
    statusCode: 302,
    headers: {
      Location: url
    }
  }
};
