# S3 Bucket Image Upload - Serverless Framework Node Express API on AWS

This template demonstrates how to develop and deploy a simple Node Express API service running on AWS Lambda using the traditional Serverless Framework.

## Test the App
The app is running on the following url: 
```console 
https://ge3pngo0h6.execute-api.eu-west-2.amazonaws.com/prod/api/v1
```

There are two endpoints created in this work:
* Health Checker endpoint:

  - GET ```https://ge3pngo0h6.execute-api.eu-west-2.amazonaws.com/prod/api/v1```
  This will return the endpoint status ('down' or 'OK')

  - Image upload endpoint:
  This is the main endpoint for this work, where the image is uploaded to S3 bucket.

    POST ```https://ge3pngo0h6.execute-api.eu-west-2.amazonaws.com/prod/api/v1/save```
    It takes the image url in the body of the request, e.g.:
    ```console 
    {
      image: 'https://images.unsplash.com/photo-1676535157847-132b0b10898f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
    ```


## Running the App Locally

* First step is to install the packages:
```console 
npm install
```

* Next is to start it:
```console 
npm start
```

* Finally you can making request:
GET ```http://localhost:4000/dev/api/v1``` to return the app status
POST ```http://localhost:4000/dev/api/v1/save```
```console 
{
  image: 'https://images.unsplash.com/photo-1676535157847-132b0b10898f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
}
```
This will post to S3 bucket

## Unit Tests
You can run the unit test with the command:
```console 
npm test
```
