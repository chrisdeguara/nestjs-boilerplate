import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class ScheduledTasksService { 
    @Cron('0 * * * * *')
    handleCron0Seconds() {
        console.log(`handleCron0Seconds running... at ${moment().format('DD/MM/YYYY HH:mm:ss')}`);
    }

    @Cron('30 * * * * *')
    handleCron30Seconds() {
        console.log(`handleCron30Seconds running... at ${moment().format('DD/MM/YYYY HH:mm:ss')}`);
    }
}