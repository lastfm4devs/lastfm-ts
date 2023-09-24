import type { APIAlbum } from '@lastfm-ts/api-types';
import { Image } from './Image';
import { Track } from './Track';

export class Album {
  public constructor(private readonly raw: APIAlbum) {}

  /**
   * The name of the artist of the album
   */
  public get artist() {
    return this.raw.artist;
  }

  /**
   * The name of the album
   */
  public get name() {
    return this.raw.name;
  }

  /**
   * An array of images for the album
   */
  public get images() {
    return this.raw.image.map(image => new Image(image));
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
   * The release date of the album
   */
  public get releaseDate() {
    return new Date(this.raw.releasedate);
  }

  /**
   * The release timestamp of the album
   */
  public get releaseTimestamp() {
    return this.releaseDate.getTime();
  }

  /**
   * An array of tracks on the album
   */
  public get tracks() {
    return this.raw.tracks.track.map(track => new Track(track));
  }

  /**
   * The Last.fm URL for the album
   */
  public get url() {
    return this.raw.url;
  }

  /**
   * The MusicBrainz ID for the album
   */
  public get mbid() {
    return this.raw.mbid;
  }
}
