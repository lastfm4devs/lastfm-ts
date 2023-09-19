import type { PartialTrack as RawPartialTrack, Track as RawTrack } from '@lastfm-ts/api-types';
import { PartialTrack } from '../../structures';
import { Track } from '../../structures/Track';
import type { Client } from '../Client';

/**
 * Options for the track get request
 */
interface TrackGetOptions {
  /**
   * Whether to search for the track if it is not found
   */
  searchIfNotFound?: boolean;
}

export class TrackManager {
  public constructor(public client: Client) {}

  /**
   * Get a track by its name and artist
   *
   * @param artist - The artist name
   * @param track - The track name
   * @param options - Additional options for the request
   * @returns The track object, or a partial track if the track is not found but the searchIfNotFound option is true
   * @example
   * ```ts
   * const track = await client.tracks.get('DROELOE', 'Sunburn');
   * console.log(`${track.name} by ${track.artist.name}`); // Sunburn by DROELOE
   * ```
   * @example
   * ```ts
   * const track = await client.tracks.get('DROELOE', 'Sun bur', { searchIfNotFound: true });
   * console.log(`${track.name} by ${track.artist.name}`); // Sunburn by DROELOE
   * ```
   */
  public async get(
    artist: string,
    track: string,
    options: TrackGetOptions & { searchIfNotFound: true },
  ): Promise<PartialTrack | Track>;
  public async get(artist: string, track: string, options?: TrackGetOptions): Promise<Track>;
  public async get(artist: string, track: string, options: TrackGetOptions = {}) {
    const res = await this.client.rest.request('GET', 'track.getinfo', {
      artist,
      track,
    });

    if (res.error === 6 && options.searchIfNotFound) {
      const search = await this.search(`${artist} - ${track}`);
      if (search.length === 0) throw new Error('No results found');

      return search[0];
    }

    return new Track(res.track as RawTrack);
  }

  public async search(query: string) {
    const res = await this.client.rest.request('GET', 'track.search', {
      track: query,
    });

    return (res.results.trackmatches.track as RawPartialTrack[]).map(track => new PartialTrack(track));
  }
}
