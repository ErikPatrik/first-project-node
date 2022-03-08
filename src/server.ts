import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

// Aplicação entenda o formato json nas requisições
app.use(express.json());
// toda a rota que começa com o prefixo files, o que vir depois vou usar
// de forma estática, ou seja, vai mostrar o arquivo físico
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Aqui criamos o middleware pra tratar os erros das rotas
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        // aqui verificamos se é um erro que originado pela aplicação
        // ou seja, um erro que eu conheço
        // devolvemos o erro de forma amigável para o front-end
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        console.log(err);

        // se é um erro que não conheço, retornamos algo mais genérico
        // erro na aplicação que não esperávamos
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
);

app.listen(3333, () => {
    console.log('Server started! Port: 3333!');
});
