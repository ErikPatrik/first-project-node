import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

const app = express();

// Aplicação entenda o formato json nas requisições
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('Server started! Port: 3333!');
});
