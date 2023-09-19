import type { APITrack } from '@lastfm-ts/api-types';
import { Album } from './Album';

export class Track {
  public constructor(private readonly raw: Partial<APITrack>) {}

  /**
   * The artist of the track
   */
  public get artist() {
    return {};
  }

  /**
   * The album of the track
   */
  public get album() {
    return this.raw.album ? new Album(this.raw.album) : null;
  }

  /**
   * The name of the track
   */
  public get name() {
    return this.raw.name;
  }

  /**
   * The number of plays the album has
   */
  public get playCount() {
    return Number(this.raw.playcount);
  }

  /**
   * The number of listeners the album has
   */
  public get listeners() {
    return Number(this.raw.listeners);
  }

  /**
   * The release date of the track
   */
  public get releaseDate() {
    return this.album?.releaseDate ?? null;
  }

  /**
   * The release timestamp of the track
   */
  public get releaseTimestamp() {
    return this.album?.releaseTimestamp ?? null;
  }

  /**
   * The Last.fm URL for the track
   */
  public get url() {
    return this.raw.url;
  }

  /**
   * The MusicBrainz ID for the track
   */
  public get mbid() {
    return this.raw.mbid;
  }
}
