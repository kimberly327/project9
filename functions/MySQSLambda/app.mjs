
import { SFNClient, SendTaskSuccessCommand} from "@aws-sdk/client-sfn";
const stepfunctions = new SFNClient();

export const lambdaHandler = async (event, context, callback) => {

    for(const record of event.Records){

        const messageBody = JSON.parse(record.body);
        const taskToken = messageBody.TaskToken;

        const params = {
            output: "\"Task completed with success.\"",
            taskToken: taskToken
        };
        console.log(taskToken);
        console.log("Calling Step Function to complete task with params ${JSON.stringify(params)}");

        const command = new SendTaskSuccessCommand(params);
        const response = await stepfunctions.send(command);

    }

    callback(null); 
};
