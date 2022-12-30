import {Entity, PrimaryColumn} from "typeorm";

@Entity()
export class BusinessConfig {

    @PrimaryColumn()
    overtimeHourlyRate: number;

    @PrimaryColumn()
    maxNumOfOvertimeHours: number;

    @PrimaryColumn()
    VATRate: number;

}
