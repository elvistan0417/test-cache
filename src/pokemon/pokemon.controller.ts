import {
    CacheInterceptor,
    Controller,
    Get,
    Param,
    UseInterceptors,
    CacheTTL,
    CacheKey
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly service: PokemonService) { }

    // @UseInterceptors(CacheInterceptor) // allow to inject cache manager
    @CacheKey('custom-key') // to set custom key
    @CacheTTL(30) // set expiration time in seconds
    @Get('/:id')
    async getPokemon(@Param('id') id: number): Promise<string> {
        return await this.service.getPokemon(+id);
    }
}
