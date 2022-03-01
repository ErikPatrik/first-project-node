import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Entity significa que vou dizer que é uma tabela do banco de dados
// Decorator, classe é um parâmetro que estamos passando pra entidade
// indicamos que o model abaixo que quando ele for salvo, vai ser salvo na tabela Appointments
// Não precisamos mais do constructor, pois usamos métodos específicos do typeorm
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // usa varchar
    provider: string;

    @Column('timestamp with time zone')
    date: Date;
}

export default Appointment;
