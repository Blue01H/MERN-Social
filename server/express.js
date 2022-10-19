const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom'
import MainRouter from './../client/MainRouter';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from './../client/theme';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import path from 'path'
import devBundle from './devBundle' //Commented when building for production

const CURRENT_WORKING_DIR = process.cwd()
const app = express();

devBundle.compile(app); //Commented when building for production

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', postRoutes);

app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets()
  const context = {}
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
          <StaticRouter location={req.url} context={context}>
            <ThemeProvider theme={theme}>
              <MainRouter />
            </ThemeProvider>
          </StaticRouter>
        )
    )
    if (context.url) {
      return res.redirect(303, context.url)
    }
    const css = sheets.toString()
    res.status(200).send(Template({
      markup: markup,
      css: css
    }))
})

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;