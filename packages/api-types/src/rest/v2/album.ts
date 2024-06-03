import type { APIAlbum, APIPartialAlbum } from '../../payloads';

/**
 * Represents a response from the `album.getinfo` method
 */
export interface APIGetAlbumInfo {
  album: APIAlbum;
}

/**
 * Represents a response from the `album.search` method
 */
export interface APISearchAlbum {
  results: {
    albummatches: {
      album: APIPartialAlbum[];
    };
    'opensearch:itemsPerPage': string;
    'opensearch:startIndex': string;
    'opensearch:totalResults': string;
  };
}