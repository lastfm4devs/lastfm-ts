import type { APIPartialAlbum } from '@lastfm-ts/api-types';
import { Image } from './Image';

export class PartialAlbum {
  public constructor(private readonly raw: APIPartialAlbum) {
    //
  }

  /**
   * The name of the artist
   */
  public get artist() {
    return this.raw.artist;
  }

  /**
   * The name of the album
   */
  public get name() {
    return this.raw.title ?? this.raw.name ?? '';
  }

  /**
   * An array of images for the album
   */
  public get images() {
    return this.raw.image.map((image) => new Image(image));
  }

  /**
   * The Last.fm URL for the album
   */
  public get url() {
    return this.raw.url;
  }
}
