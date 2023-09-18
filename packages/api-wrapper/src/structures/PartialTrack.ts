import type { PartialTrack as RawPartialTrack } from '@lastfm-ts/api-types';

export class PartialTrack {
  public constructor(private readonly raw: RawPartialTrack) {}

  /**
   * The name of the artist
   */
  public get artist() {
    return this.raw.artist;
  }

  /**
   * The name of the track
   */
  public get name() {
    return this.raw.name;
  }

  /**
   * The number of listeners the album has
   */
  public get listeners() {
    return Number(this.raw.listeners);
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
