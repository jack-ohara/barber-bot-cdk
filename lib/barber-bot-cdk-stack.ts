import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as nodeJsLambda from "aws-cdk-lib/aws-lambda-nodejs";
import { LayerVersion, Runtime as lambdaRuntime } from "aws-cdk-lib/aws-lambda";

export class BarberBotCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pingBarberSiteLambda = new nodeJsLambda.NodejsFunction(
      this,
      "barber-bot-lambda",
      {
        runtime: lambdaRuntime.NODEJS_18_X,
        entry: "./src/lambda/barber-bot-handler.ts",
        functionName: "barber-bot",
        bundling: {
          sourceMap: true,
          externalModules: ["aws-sdk", "aws-chrome-lambda-layer"],
        },
        layers: [
          LayerVersion.fromLayerVersionArn(
            this,
            "AwsChromeLambdaLayer",
            "arn:aws:lambda:eu-west-1:534699847887:layer:AwsChromeLambdaLayer:3"
          ),
        ],
      }
    );
  }
}
