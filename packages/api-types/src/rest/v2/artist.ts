import type { APIArtist } from '../../payloads';

/**
 * Represents a response from the `artist.getinfo` method
 */
export interface APIGetArtistInfo {
  artist: APIArtist;
}
