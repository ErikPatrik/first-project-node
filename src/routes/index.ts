import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouters from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouters);

//routes.get('/', (request, response) => {
//    return response.json({ message: 'Olá gente' });
//});

export default routes;
