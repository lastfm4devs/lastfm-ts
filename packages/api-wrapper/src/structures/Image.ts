import type { Image as RawImage } from '@lastfm-ts/api-types';

export class Image {
  public constructor(private readonly raw: RawImage) {}

  /**
   * The URL of the image
   */
  public get url() {
    return this.raw['#text'];
  }

  /**
   * The size of the image
   */
  public get size() {
    return this.raw.size;
  }
}
