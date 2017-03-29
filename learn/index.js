var uuid = require('node-uuid');
var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context){
    var params;

    console.log(new Date().toISOString());
   
   if(event.table=="PhoneInfo"){
     params={
            "TableName":"PhoneInfo",
            "FilterExpression": "email = :val",
            "ExpressionAttributeValues": {":val": event.payload.email},
            "ReturnConsumedCapacity": "TOTAL"
        };


        
    docClient.scan(params,function(err,data){
        if(err){
            console.log(err+'err');
        }else{
            console.log(data.Items.length);
            if(data.Items.length<=0){
                params= {
                    TableName:event.table,
                    Item:{
                        "_id":uuid.v4(),
                        "datetime":(new Date().toISOString()),
                        "uuid":uuid.v4(),
                        "type":event.payload.type,
                        "email":event.payload.email,
                        "token":uuid.v4(),
                        "password":event.payload.password
                    }
                 };

                 docClient.put(params,function(err,data){
                    if(err){
                        context.done(null, JSON.stringify(err, null, 2));
                    }else{
                        context.done(null, params.Item);
                    }
                });
            }else{
                context.done(null, data.Items[0]);
            }
        }
    });
   }else if(event.table=="DeviceInfo"){
        params={
            "TableName":"DeviceInfo",
            "FilterExpression": "mac = :val",
            "ExpressionAttributeValues": {":val": event.payload.mac},
            "ReturnConsumedCapacity": "TOTAL"
        };

        docClient.scan(params,function(err,data){
             if(err){
                console.log(err+'err');
             }else{
                 if(data.Items.length<=0){
                    params= {
                        TableName:event.table,
                        Item:{
                            "_id":uuid.v4(),
                            "datetime":(new Date().toISOString()),
                            "uuid":uuid.v4(),
                            "type":event.payload.type,
                            "number":event.payload.number,
                            "mac":event.payload.mac,
                            "token":uuid.v4(),
                            "subscription":event.payload.mac+event.payload.type
                        }
                     };
                    docClient.put(params,function(err,data){
                        if(err){
                            context.done(null, JSON.stringify(err, null, 2));
                        }else{
                            context.done(null, params.Item);
                        }
                     });
                 }else{
                    context.done(null, data.Items[0]);
                 }
             }
        });
   }else if(event.table=="Binding"){
       params={
            "TableName":"Binding",
            "FilterExpression": "email = :val",
            "ExpressionAttributeValues": {":val": event.payload.email},
            "ReturnConsumedCapacity": "TOTAL"
        };
        if(event.type=="add"){
            
            var q_user={
                'key':{
                    'email':event.payload.email
                },
                'TableName':'PhoneInfo',
                'AttributesToGet':[
                    '_id',
                    'datetime',
                    'email',
                    'password',
                    'token',
                    'token',
                    'uuid'
                ],
                'ConsistentRead': true,
                'ReturnConsumedCapacity': 'TOTAL'
            };
            console.log('Email:'+event.payload.email+"  Type:"+event.type);

            docClient.get(q_user,function(err,data){
                if(err){
                    console.log(err,err.stack);
                }else if(data){
                    console.log('Data:'+data);
                }else {
                    console.log("not data ... ");
                }
            });
        }else if(event.type=="delete"){
            
        }else if(event.type=="query"){
            docClient.scan(params,function(err,data){
                if(err){
                    context.done(null,JSON.stringify(err,null,2));
                }else{
                    context.done(null,data.Items)
                }
            });
        }
        console.log('Type:'+event.type+'   mac:'+event.payload.mac+'  email:'+event.payload.email+'   DeviceType:'+event.payload.type);
   }else if(event.table=="Query"){
       params={
            "TableName":"DeviceInfo",
            "FilterExpression": "mac = :val",
            "ExpressionAttributeValues": {":val": event.payload.mac},
            "ReturnConsumedCapacity": "TOTAL"
        };
            
       docClient.scan(params,function(err,data){
        if(err){
            context.done(null, JSON.stringify(err, null, 2));
        }else{
            data.Items.forEach(function(item){
               context.done(null, item);
            });
        }
    });
   }
};