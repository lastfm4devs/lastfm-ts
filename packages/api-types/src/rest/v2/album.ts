import type { Entity } from '../common';
import type { Image } from './image';
import type { Track } from './track';

export interface Album extends Entity {
  /**
   * The artist of the album
   */
  artist: string;
  /**
   * An array of images associated with the album
   */
  image: Image[];
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
    track: Track[];
  };
  /**
   * The URL to the album's Last.fm page
   */
  url: string;
}
