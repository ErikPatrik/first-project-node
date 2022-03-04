import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

// essa provider vai fazer uma alteração no banco
export default class AlterProviderFieldToProviderId1646180963400
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            })
        );

        // Criar chave estrangeira
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'], // id do usuário
                referencedTableName: 'users',
                onDelete: 'SET NULL', // RESTRITECT, SET NULL, CASCADE
                onUpdate: 'CASCADE', // Caso o ID seja alterado, reflete nos relacionamentos
            })
            // RESTRICT: não deixa o usuário ser deletado
            // SET NULL: deixar o provider_id como nulo no agendamento
            // CASCADE: se o usuário for deletado, deleta todos os agendamentos
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            })
        );
    }
}
