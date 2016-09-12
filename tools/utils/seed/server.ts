import * as express from 'express';
import * as fallback from 'express-history-api-fallback';
import * as openResource from 'open';
import { resolve } from 'path';
import * as serveStatic from 'serve-static';

import * as codeChangeTool from './code_change_tools';
import Config from '../../config';

import * as proxy from 'http-proxy-middleware';

/**
 * Serves the Single Page Application. More specifically, calls the `listen` method, which itself launches BrowserSync.
 */
export function serveSPA() {
  codeChangeTool.listen();
}

/**
 * This utility method is used to notify that a file change has happened and subsequently calls the `changed` method,
 * which itself initiates a BrowserSync reload.
 * @param {any} e - The file that has changed.
 */
export function notifyLiveReload(e:any) {
  let fileName = e.path;
  codeChangeTool.changed(fileName);
}

/**
 * Starts a new `express` server, serving the static documentation files.
 */
export function serveDocs() {
  let server = express();

  server.use(
    Config.APP_BASE,
    serveStatic(resolve(process.cwd(), Config.DOCS_DEST))
  );

  server.use(proxy('/api', {
    target: 'https://api.themoviedb.org/3/movie/',
    changeOrigin: true
  }));

  server.listen(Config.DOCS_PORT, () =>
    openResource('http://localhost:' + Config.DOCS_PORT + Config.APP_BASE)
  );
}

/**
 * Starts a new `express` server, serving the static unit test code coverage report.
 */
export function serveCoverage() {
  let server = express();
  let compression = require('compression');
      server.use(compression());

  server.use(
    Config.APP_BASE,
    serveStatic(resolve(process.cwd(), 'coverage'))
  );

  server.use(proxy('/api', {
    target: 'https://api.themoviedb.org/3/movie/',
    changeOrigin: true
  }));

  server.listen(Config.COVERAGE_PORT, () =>
    openResource('http://localhost:' + Config.COVERAGE_PORT + Config.APP_BASE)
  );
}

/**
 * Starts a new `express` server, serving the built files from `dist/prod`.
 */
export function serveProd() {
  let root = resolve(process.cwd(), Config.PROD_DEST);
  let server = express();
  let compression = require('compression');
      server.use(compression());

  server.use(Config.APP_BASE, serveStatic(root));

  server.use(fallback('index.html', { root }));

  server.use(proxy('/api', {
    target: 'https://api.themoviedb.org/3/movie/',
    changeOrigin: true
  }));

  server.listen(Config.PORT, () =>
    openResource('http://localhost:' + Config.PORT + Config.APP_BASE)
  );
};
