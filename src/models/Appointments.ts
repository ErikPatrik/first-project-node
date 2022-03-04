import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from './User';

// Entity significa que vou dizer que é uma tabela do banco de dados
// Decorator, classe é um parâmetro que estamos passando pra entidade
// indicamos que o model abaixo que quando ele for salvo, vai ser salvo na tabela Appointments
// Não precisamos mais do constructor, pois usamos métodos específicos do typeorm
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // usa varchar, prestador de serviço
    provider_id: string;

    // relacionamento entre agendamento e usuário
    // muitos agendamentos para um usuário
    // função que chama qual model deve usar
    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' }) // qual a coluna identifica qual é o prestador deste agendamento
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
