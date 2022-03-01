import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1646096062294
    implements MigrationInterface
{
    // o que queremos fazer no banco de dados de novo
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                ],
            })
        );
    }

    // se der algum problema e preciso voltar, método para desfazer o que foi feito no método up
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }
}
