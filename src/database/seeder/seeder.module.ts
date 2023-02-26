import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { SeederService } from './seeder.service';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [],
    providers: [
        SeederService
    ]
})
export class SeederModule { }
