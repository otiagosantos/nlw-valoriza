import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddPassword1650786562942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "password",
                type: "varchar",
                isNullable: false
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("uses", "password");
    }

}
