import type { APIPartialAlbum } from '@lastfm-ts/api-types';
import { Image } from './Image';

export class PartialAlbum {
  public constructor(private readonly raw: APIPartialAlbum) {}

  /**
   * The artist of the album
   */
  public get artist() {
    return {};
  }

  /**
   * The name of the album
   */
  public get name() {
    return this.raw.title;
  }

  /**
   * An array of images for the album
   */
  public get images() {
    return this.raw.image.map(image => new Image(image));
  }

  /**
   * The Last.fm URL for the album
   */
  public get url() {
    return this.raw.url;
  }
}
