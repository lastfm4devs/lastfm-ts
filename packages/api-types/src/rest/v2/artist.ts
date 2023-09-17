import type { Entity, StringBoolean } from '../common';
import type { Image } from './image';
import type { TrackWiki } from './track';

export interface Artist extends Entity {
  /**
   * The biography of the artist
   */
  bio: ArtistBio;
  /**
   * An array of images associated with the artist
   */
  image: Image[];
  /**
   * The name of the artist
   */
  name: string;
  /**
   * Whether the artist is currently on tour
   */
  ontour: StringBoolean;
  /**
   * An array of similar artists
   */
  similar: Artist[];
  /**
   * Artist statistics
   */
  stats: ArtistStats;
  /**
   * Information about the artist's streamability
   */
  streamable: StringBoolean;
  /**
   * An array of tags associated with the artist
   */
  tags: unknown[];
  /**
   * The URL to the artist's Last.fm page
   */
  url: string;
}

export type ArtistBasicInfo = Pick<Artist, 'mbid' | 'name' | 'url'>;

export interface ArtistStats {
  /**
   * The amount of listeners the artist has
   */
  listeners: string;
  /**
   * The amount of times the artist has been played
   */
  playcount: string;
}

export interface ArtistBio extends TrackWiki {
  /**
   * This is not documented in the Last.fm API docs, but it is returned in the response.
   */
  links: {
    link: ArtistBioLink;
  };
}

/**
 * This is not documented in the Last.fm API docs, but it is returned in the response.
 */
export interface ArtistBioLink {
  '#text': string;
  href: string;
  rel: string;
}
