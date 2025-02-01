import { Module, OnModuleInit } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'mongoose';
import { PeopleModule } from './people/people.module';
import { FilmsModule } from './films/films.module';
import { PlanetsModule } from './planets/planets.module';
import { SpeciesModule } from './species/species.module';
import { RelationsModule } from './relations/relations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://star-wars-db:admin123@cluster0.tofqzz9.mongodb.net/star-wars'), // armar var de entorno
    PeopleModule, FilmsModule, PlanetsModule, SpeciesModule, RelationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.once('open', () => {
      console.log('Conexión a MongoDB exitosa!');
    });
  }
}