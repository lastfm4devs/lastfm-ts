import type { APIImage } from '@lastfm-ts/api-types';

export class Image {
  public constructor(private readonly raw: APIImage) {
    //
  }

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
