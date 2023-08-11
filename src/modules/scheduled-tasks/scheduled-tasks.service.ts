import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class ScheduledTasksService { 

    private readonly logger = new Logger(ScheduledTasksService.name);

    @Cron('0 * * * * *')
    handleCron0Seconds() {
        this.logger.log(`handleCron0Seconds running... at ${moment().format('DD/MM/YYYY HH:mm:ss')}`);
    }

    @Cron('30 * * * * *')
    handleCron30Seconds() {
        this.logger.log(`handleCron30Seconds running... at ${moment().format('DD/MM/YYYY HH:mm:ss')}`);
    }
}