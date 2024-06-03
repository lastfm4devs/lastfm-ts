import type { APIEntity } from '../common';
import type { APIImage } from './image';
import type { APIPartialTrack, APITrack } from './track';

/**
 * Represents a Last.fm album
 */
export interface APIAlbum extends APIEntity {
  /**
   * The artist of the album
   */
  artist: string;
  /**
   * An array of images associated with the album
   */
  image: APIImage[];
  /**
   * The number of listeners of the album
   */
  listeners: string;
  /**
   * The name of the album
   */
  name: string;
  /**
   * The number of plays the album has
   */
  playcount: string;
  /**
   * The release date of the album
   *
   * @example 6 Apr 1999, 00:00
   */
  releasedate: string;
  /**
   * An array of tags associated with the album
   */
  toptags: unknown;
  /**
   * An array of tracks on the album
   */
  tracks: {
    track: (APITrack | APIPartialTrack)[];
  };
  /**
   * The URL to the album's Last.fm page
   */
  url: string;
}

/**
 * Represents a track with partial information. Generally used when the album is returned from a search or from a track's `getInfo` method.
 */
export type APIPartialAlbum = Pick<APIAlbum, 'artist' | 'image' | 'url'> & {
  /**
   * The name of the album
   */
  title?: string;
  /**
   * The name of the album
   */
  name?: string;
};
