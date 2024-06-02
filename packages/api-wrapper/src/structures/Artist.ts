import type { APIArtist } from '@lastfm-ts/api-types';
import { Image } from './Image';
import { PartialArtist } from './PartialArtist';

export class Artist {
  public constructor(private readonly raw: APIArtist) {
    //
  }

  public get bio() {
    return this.raw.bio.content;
  }

  public get images() {
    return this.raw.image.map((image) => new Image(image));
  }

  public get mbid() {
    return this.raw.mbid;
  }

  public get name() {
    return this.raw.name;
  }

  public get onTour() {
    return this.raw.ontour === '1';
  }

  public get similar() {
    return this.raw.similar.artist.map((artist) => new PartialArtist(artist));
  }

  public get stats() {
    return {
      listeners: Number(this.raw.stats.listeners),
      playCount: Number(this.raw.stats.playcount)
    };
  }

  public get streamable() {
    return this.raw.streamable === '1';
  }

  public get url() {
    return this.raw.url;
  }
}
