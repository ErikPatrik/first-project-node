import Appointment from '../models/Appointments';
import { EntityRepository, Repository } from 'typeorm';

// Entidade passando o model
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    // parâmetro de uma tipagem
    // async em função voce transforma dela em uma promisse
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: {
                date: date,
            },
        });

        return findAppointment || null; // retorna nulo caso não encontre
    }
}

export default AppointmentsRepository;
