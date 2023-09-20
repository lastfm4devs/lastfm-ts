import type { APIArtist } from '@lastfm-ts/api-types';
import { Image } from './Image';

export class Artist {
  public constructor(private readonly raw: APIArtist) {}

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

  public get stats() {
    return {
      listeners: Number(this.raw.stats.listeners),
      playCount: Number(this.raw.stats.playcount),
    };
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
