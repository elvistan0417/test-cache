import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { Cache } from 'cache-manager'

@Injectable()
export class PokemonService {
    constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheService: Cache,) { }

    async getPokemon(id: number): Promise<string> {
        // check if data is in cache:
        const cachedData = await this.cacheService.get<{ name: string }>(
            id.toString(),
        );
        console.log({cachedData})
        if (cachedData) {
            console.log(`Getting data from cache!`);
            return `${cachedData.name}`;
        }
        // try {
        console.log("Get from api")
        const { data } = await this.httpService.axiosRef.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`, {
            headers: {
                'Accept-Encoding': 'application/json'
            }
        }
        );
        await this.cacheService.set(id.toString(), data);
        // } catch (e) {
        //     console.log(e)
        // }

        return data.name
    }
}
