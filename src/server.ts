import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

// Aplicação entenda o formato json nas requisições
app.use(express.json());

// toda a rota que começa com o prefixo files, o que vir depois vou usar
// de forma estática, ou seja, vai mostrar o arquivo físico
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.listen(3333, () => {
    console.log('Server started! Port: 3333!');
});
