import { Handler, Context, APIGatewayEvent, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from '@codegenie/serverless-express';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let cachedServer: Handler;

async function bootstrap(): Promise<Handler> {
  if (!cachedServer) {
    const expressApp = express();

    // Add body parsing middleware to handle JSON and URL-encoded bodies
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: true }));

    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.enableCors(); // Enable CORS if needed
    await nestApp.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  console.log('Received event:', event); // Log the event to check if POST is received
  const server = await bootstrap();
  return server(event, context, callback);
};
