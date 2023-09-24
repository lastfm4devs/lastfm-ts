import type { APIArtist } from '@lastfm-ts/api-types';
import { Image } from './Image';
import { PartialArtist } from './PartialArtist';

export class Artist {
  public constructor(private readonly raw: APIArtist) {}

  /**
   * The name of the album
   */
  public get name() {
    return this.raw.name;
  }

  /**
   * The biography of the artist
   */
  public get bio() {
    return this.raw.bio.content;
  }

  /**
   * Whether the artist is currently on tour
   */
  public get onTour() {
    return this.raw.ontour === '1';
  }

  /**
   * Whether the artist is streamable
   */
  public get streamable() {
    return this.raw.streamable === '1';
  }

  /**
   * An array of similar artists to the artist
   */
  public get similar() {
    return this.raw.similar.artist.map(artist => new PartialArtist(artist));
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
