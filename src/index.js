const AWS = require('aws-sdk');


exports.listTasks = async () => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    const params = {
        TableName: "TasksTable"
    };
    
    let responseBody = "";
    let statusCode = 0;
    
    try{
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 200;
    }
    catch(error){
        responseBody = `Unable to get Data ${error}`;
        statusCode = 403;
    }
    
    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Access-Control-Allow-Headers": "X-Requested-With,content-type",
            "Access-Control-Allow-Credentials": true
        },
        body: responseBody,
    };
    
    return response;
}