import express, { type Request, type Response } from 'express';
import { createApp } from '../dist/create-app';

const server = express();
let ready: Promise<void> | null = null;

export default async function handler(req: Request, res: Response) {
  if (!ready) {
    ready = createApp(server)
      .then((app) => app.init())
      .then(() => undefined);
  }
  await ready;
  server(req, res);
}
