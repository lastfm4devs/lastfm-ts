import type { APIAlbum } from '../../payloads';

/**
 * Represents a response from the `album.getinfo` method
 */
export interface APIGetAlbumInfo {
  album: APIAlbum;
}
