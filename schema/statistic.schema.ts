import {IsDate, IsEnum} from "class-validator";

class StatisticQuery {

    @IsDate()
    from_date: Date;

    @IsDate()
    to_date: Date;

    @IsEnum(['day', 'week', 'month', 'year'])
    time_unit: string;

}
