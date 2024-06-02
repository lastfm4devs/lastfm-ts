import type { APIEntity, StringBoolean } from '../common';
import type { APIImage } from './image';
import type { APITrackWiki } from './track';

/**
 * Represents a Last.fm artist
 */
export interface APIArtist extends APIEntity {
  /**
   * The biography of the artist
   */
  bio: APIArtistBio;
  /**
   * An array of images associated with the artist
   */
  image: APIImage[];
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
  similar: {
    artist: APIArtistBasicInfo[];
  };
  /**
   * Artist statistics
   */
  stats: APIArtistStats;
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

export type APIArtistBasicInfo = Pick<APIArtist, 'image' | 'mbid' | 'name' | 'url'> | Pick<APIArtist, 'mbid' | 'name' | 'url'>;

export type APIPartialArtist = APIArtistBasicInfo & {
  /**
   * An array of images associated with the artist
   */
  image: APIImage[];
  /**
   * The amount of listeners the artist has
   */
  listeners: string;
  /**
   * Information about the artist's streamability
   */
  streamable: StringBoolean;
};

/**
 * Statistics about an artist
 */
export interface APIArtistStats {
  /**
   * The amount of listeners the artist has
   */
  listeners: string;
  /**
   * The amount of times the artist has been played
   */
  playcount: string;
}

/**
 * The biography of an artist
 */
export interface APIArtistBio extends APITrackWiki {
  /**
   * This is not documented in the Last.fm API docs, but it is returned in the response.
   */
  links: {
    link: APIArtistBioLink;
  };
}

/**
 * This is not documented in the Last.fm API docs, but it is returned in the response.
 */
export interface APIArtistBioLink {
  '#text': string;
  /**
   * Link to the wiki
   */
  href: string;
  rel: string;
}
