# thermometer_proxy

This is a service running on AWS Lambda and API Gateway to construct progress thermometers for SumOfUs's end of year fundraising.
It fetches EOY fundraising progress data from Champaign and displays it in a thermometer using an image construction service
written by ForwardAction.

In order to run this, you'll need to set up Serverless. If you don't specify `api_host`, it will fall back to the Champaign
staging environment for data.

You'll need to pass `label` and `currency` in the request to the service for localization.
