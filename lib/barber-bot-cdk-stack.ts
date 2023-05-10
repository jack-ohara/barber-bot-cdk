import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DockerImageFunction, DockerImageCode } from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";

export class BarberBotCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const screenshotBucket = new s3.Bucket(this, "barber-bot-screenshots", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const barberBotLambda = new DockerImageFunction(this, "barber-bot-lambda", {
      code: DockerImageCode.fromImageAsset("./src/lambda/barber-bot"),
      timeout: cdk.Duration.seconds(90),
      memorySize: 1024,
      environment: {
        SCREENSHOT_BUCKET_NAME: screenshotBucket.bucketName,
      },
    });

    screenshotBucket.grantWrite(barberBotLambda);
  }
}
