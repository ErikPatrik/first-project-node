import { createConnection } from 'typeorm';

// função que busca em todo o projeto o arquivo ormconfig.json,
// onde le os dados e faz a conexão com o banco de dados
createConnection();
