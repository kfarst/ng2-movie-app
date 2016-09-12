declare module 'http-proxy-middleware' {

  import { RequestHandler } from 'express';

  interface IOptions {
    target: string,
    changeOrigin: boolean
  }

  function proxy(url: string, options?: IOptions): RequestHandler;

  module proxy {}

  export = proxy;
}
