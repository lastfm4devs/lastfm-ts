import type { APIArtistBasicInfo, APIPartialArtist } from '@lastfm-ts/api-types';
import { Image } from './Image';

export class PartialArtist {
  public constructor(private readonly raw: APIArtistBasicInfo | APIPartialArtist) {}

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
    if ('image' in this.raw) return this.raw.image.map(image => new Image(image));
    return [];
  }

  /**
   * The amount of listeners the artist has
   */
  public get listeners() {
    if ('listeners' in this.raw) return Number(this.raw.listeners);
    return undefined;
  }

  /**
   * Whether the artist is streamable
   */
  public get streamable() {
    if ('streamable' in this.raw) return this.raw.streamable === '1';
    return undefined;
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
