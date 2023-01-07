import {Entity, PrimaryColumn} from "typeorm";

@Entity()
export class BusinessConfig {

    @PrimaryColumn()
    overtime_hourly_rate: number;

    @PrimaryColumn()
    max_num_of_overtime_hours: number;

    @PrimaryColumn()
    vat_rate: number;

}
