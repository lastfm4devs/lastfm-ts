import type { APIGetAlbumInfo, APISearchAlbum } from '@lastfm-ts/api-types';
import { Album, PartialAlbum } from '../../structures';
import type { Client } from '../Client';

/**
 * Options for the album get request
 */
interface AlbumGetOptions {
  /**
   * Whether to autocorrect the query
   */
  autoCorrect?: boolean;
  /**
   * Whether to search for the album if it is not found
   */
  searchIfNotFound?: boolean;
}

/**
 * Options for the album search request
 */
interface AlbumSearchOptions {
  /**
   * The limit of results to return
   */
  limit?: number;
  /**
   * The page of results to return
   */
  page?: number;
}

export class AlbumManager {
  public constructor(public client: Client) {
    //
  }

  /**
   * Gets an album by its artist and name
   *
   * @param artist - The artist name
   * @param album - The album name
   * @param options - Additional options for the request
   * @returns The album object, or a partial album if the album is not found but the searchIfNotFound option is true
   * @example
   * ```ts
   * const artist = await client.albums.get('DROELOE', 'A Moment In Time');
   * console.log(`${artist.name} has ${artist.stats.listeners} listeners`); // DROELOE has 123456 listeners
   * ```
   */
  public async get(artist: string, album: string, options: AlbumGetOptions & { searchIfNotFound: true }): Promise<Album | PartialAlbum>;
  public async get(artist: string, album: string, options?: AlbumGetOptions): Promise<Album>;
  public async get(artist: string, album: string, options: AlbumGetOptions = {}) {
    try {
      const res = await this.client.rest.request<APIGetAlbumInfo>('GET', 'album.getinfo', {
        artist,
        album,
        autocorrect: options.autoCorrect ? 1 : 0
      });

      return new Album(res.album);
    } catch (error) {
      if (error instanceof Error && error.message !== 'Album not found') throw error;

      if (!options.searchIfNotFound) throw new Error('No results found');

      const search = await this.search(`${artist} ${album}`);
      if (search.length === 0) throw new Error('No results found');

      return search[0];
    }
  }

  /**
   * Search for an album
   *
   * @param album - The album name
   * @returns An array of partial albums
   * @example
   * ```ts
   * const albums = await client.albums.search('heroes & villains');
   * console.log(albums.map(album => album.artist)); // [ 'Metro Boomin' ... ]
   * ```
   */
  public async search(album: string, options: AlbumSearchOptions = {}) {
    const res = await this.client.rest.request<APISearchAlbum>('GET', 'album.search', {
      album,
      limit: options.limit ?? 30,
      page: options.page ?? 1
    });

    return res.results.albummatches.album.map((album) => new PartialAlbum(album));
  }
}
