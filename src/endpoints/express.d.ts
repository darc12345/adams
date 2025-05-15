import { SessionData } from 'express-session';

declare module 'express-serve-static-core' {
  interface Request {
    session: SessionData & {
      user?: string;
      // Add any other custom session properties you need
    };
  }
}