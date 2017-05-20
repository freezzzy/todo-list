import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import logger from 'morgan';
import dotenv from 'dotenv';

import index from './routes/index';
import tasks from './routes/tasks';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (app.get('env') === 'production') {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}

app.use('/', index);
app.use('/api', tasks);

app.listen(port, () => {
  global.console.log(`Server is up and running on port ${port}`);
});
