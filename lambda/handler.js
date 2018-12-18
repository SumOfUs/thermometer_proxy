'use strict';

const request = require('request');
const qs = require('query-string');

const fetchDonationData = (pageId, currency) => {
  const host = process.env.API_HOST;

  return new Promise(resolve => {
    request(
      `${host}/api/pages/${pageId}/total_donations?currency=${currency}`,
      {json: true}, ( err, resp, body ) => {
        resolve(body);
      }
    )
  })
};

module.exports.get = async (event) => {
  const { page_id, label, currency } = event.queryStringParameters;

  const data = await fetchDonationData(page_id, currency);
  // Construct total amount from cents into full amounts:
  const total_donations = (parseFloat(data.total_donations, 10) + parseFloat(data.offset, 10)) / 100;
  const goal = parseFloat(data.fundraising_goal, 10) / 100;

  const textColour = '30394f';
  const labelColour = '30394f';
  const topRight = 'Goal';

  const options = {
    contributed: total_donations,
    top_left: label,
    top_right: topRight,
    goal: goal,
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
