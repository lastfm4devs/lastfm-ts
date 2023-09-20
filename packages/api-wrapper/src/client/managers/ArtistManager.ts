import type { APIGetArtistInfo, APIGetSimilarArtist, APISearchArtist } from '@lastfm-ts/api-types';
import { PartialArtist } from '../../structures';
import { Artist } from '../../structures/Artist';
import type { Client } from '../Client';

/**
 * Options for the artist get request
 */
interface ArtistGetOptions {
  /**
   * Whether to autocorrect the query
   */
  autocorrect?: boolean;
  /**
   * Whether to search for the artist if it is not found
   */
  searchIfNotFound?: boolean;
}

/**
 * Options for the artist similar request
 */
interface ArtistSimilarOptions {
  /**
   * Whether to autocorrect the query
   */
  autocorrect?: boolean;
  /**
   * The limit of results to return
   */
  limit?: number;
}

/**
 * Options for the artist search request
 */
interface ArtistSearchOptions {
  /**
   * The limit of results to return
   */
  limit?: number;
  /**
   * The page of results to return
   */
  page?: number;
}

export class ArtistManager {
  public constructor(public client: Client) {}

  /**
   * Get a artist by its name
   *
   * @param artist - The artist name
   * @param options - Additional options for the request
   * @returns The artist object, or a partial artist if the artist is not found but the searchIfNotFound option is true
   * @example
   * ```ts
   * const artist = await client.artists.get('DROELOE');
   * console.log(`${artist.name} has ${artist.stats.listeners} listeners`); // DROELOE has 123456 listeners
   * ```
   */
  public async get(
    artist: string,
    options: ArtistGetOptions & { searchIfNotFound: true },
  ): Promise<Artist | PartialArtist>;
  public async get(artist: string,options?: ArtistGetOptions): Promise<Artist>;
  public async get(artist: string, options: ArtistGetOptions = {}) {
    try {
      const res = await this.client.rest.request<APIGetArtistInfo>('GET', 'artist.getinfo', {
        artist,
        autocorrect: options.autocorrect ? 1 : 0,
      });

      return new Artist(res.artist);
    } catch (error: any) {
      if (error.message !== 'Artist not found') throw error;

      if (!options.searchIfNotFound) throw new Error('No results found');

      const search = await this.search(`${artist}`);
      if (search.length === 0) throw new Error('No results found');

      return search[0];
    }
  }

  /**
   * Get similar artists to an artist
   *
   * @param artist - The artist name
   * @returns An array of artists
   * @example
   * ```ts
   * const artists = await client.artists.getSimilar('Gunna');
   * console.log(artists.map(artist => artist.name)); // [ 'Lil Baby', 'Young Thug', 'Lil Uzi Vert', ... ]
   * ```
   */
  public async getSimilar(artist: string, options: ArtistSimilarOptions = {}) {
    const res = await this.client.rest.request<APIGetSimilarArtist>('GET', 'artist.getsimilar', {
      artist,
      autocorrect: options.autocorrect ? 1 : 0,
      limit: options.limit ?? 30,
    });

    return res.similarartists.artist.map(artist => new PartialArtist(artist));
  }

  /**
   * Search for an artist
   *
   * @param artist - The artist name
   * @returns An array of partial artists
   * @example
   * ```ts
   * const artists = await client.artists.search('droeloe');
   * console.log(artists.map(artist => artist.name)); // [ 'DROELOE' ... ]
   * ```
   * @example
   * ```ts
   * const artists = await client.artists.search('droeloe');
   * console.log(artists[0].name); // DROELOE
   * ```
   */
  public async search(artist: string, options: ArtistSearchOptions = {}) {
    const res = await this.client.rest.request<APISearchArtist>('GET', 'artist.search', {
      artist,
      limit: options.limit ?? 30,
      page: options.page ?? 1,
    });

    return res.results.artistmatches.artist.map(artist => new PartialArtist(artist));
  }
}
