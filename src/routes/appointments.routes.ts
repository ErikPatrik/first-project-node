import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// importação do middleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// aplica o middleware em todas as rotas
appointmentsRouter.use(ensureAuthenticated);

// Caso eu quisesse somente em uma rota: appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        date: parseDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
