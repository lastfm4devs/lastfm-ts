import type { APITrack } from '@lastfm-ts/api-types';
import { Album } from './Album';
import { PartialAlbum } from './PartialAlbum';
import { PartialArtist } from './PartialArtist';

export class Track {
  public constructor(private readonly raw: Partial<APITrack>) {
    //
  }

  /**
   * The artist of the track
   */
  public get artist() {
    return this.raw.artist ? new PartialArtist(this.raw.artist) : null;
  }

  /**
   * The album of the track
   */
  public get album() {
    if (!this.raw.album) return null;
    if (!('tracks' in this.raw.album)) return new PartialAlbum(this.raw.album);

    return new Album(this.raw.album);
  }

  /**
   * The duration of the track in milliseconds
   */
  public get duration() {
    return Number(this.raw.duration);
  }

  /**
   * The name of the track
   */
  public get name() {
    return this.raw.name;
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
   * The release date of the track
   */
  public get releaseDate() {
    if (!this.raw.album) return null;
    if (this.album instanceof Album) return this.album.releaseDate;

    return null;
  }

  /**
   * The release timestamp of the track
   */
  public get releaseTimestamp() {
    if (!this.raw.album) return null;
    if (this.album instanceof Album) return this.album.releaseTimestamp;

    return null;
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
