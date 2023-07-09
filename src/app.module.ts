import { CacheModule, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), PokemonModule],
  // controllers: [PokemonController],
  // providers: [AppService, PokemonService],
})
export class AppModule {}
