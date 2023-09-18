import type { Entity } from '../common';
import type { Album } from './album';
import type { ArtistBasicInfo } from './artist';
import type { Image } from './image';

export interface Track extends Entity {
  /**
   * The album the track appears on
   */
  album: Album;
  /**
   * The artist of the track
   */
  artist: ArtistBasicInfo;
  /**
   * The duration of the track, in milliseconds
   */
  duration: string;
  /**
   * The amount of listeners the track has
   */
  listeners: string;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The amount of times the track has been played
   */
  playcount: string;
  /**
   * Information about the track's streamability
   */
  streamable: TrackStreamableInfo;
  /**
   * An array of tags associated with the track
   */
  toptags: unknown;
  /**
   * The URL to the track's Last.fm page
   */
  url: string;
  /**
   * Additional information about the track
   */
  wiki?: TrackWiki;
}

export interface TrackWiki {
  /**
   * The content of the wiki
   */
  content: string;
  /**
   * The date the wiki was published
   *
   * @example Sun, 27 Jul 2008 15:44:58 +0000
   */
  published: string;
  /**
   * The summary of the wiki
   */
  summary: string;
}

export interface TrackStreamableInfo {
  /**
   * A tag value of 1 indicates a 30 second preview of this song is available for streaming
   */
  '#text': string;
  /**
   * An attribute value of 1 indicates a full length preview is available for streaming
   */
  fulltrack: string;
}

export interface PartialTrack extends Omit<Track, 'album' | 'artist' | 'playcount' | 'streamable' | 'toptags' | 'wiki'> {
  /**
   * The artist of the track
   */
  artist: string;
  /**
   * Image URLs for the track
   */
  image: Image[];
  /**
   * Last.fm for some reason returns 'FIXME'.
   */
  streamable: 'FIXME';
}