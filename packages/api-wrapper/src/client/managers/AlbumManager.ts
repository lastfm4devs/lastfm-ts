import type { APISearchAlbum } from '@lastfm-ts/api-types';
import { PartialAlbum } from '../../structures';
import type { Client } from '../Client';

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
