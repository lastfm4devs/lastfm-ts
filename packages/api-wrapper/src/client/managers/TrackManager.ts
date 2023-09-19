import type { APIGetSimilarTrack, APIGetTrackInfo, APISearchTrack } from '@lastfm-ts/api-types';
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
   * if (track instanceof PartialTrack) console.log(`${track.name} by ${track.artist}`); // Sunburn by DROELOE
   * else console.log(`${track.name} by ${track.artist.name}`); // Sunburn by DROELOE
   * ```
   */
  public async get(
    artist: string,
    track: string,
    options: TrackGetOptions & { searchIfNotFound: true },
  ): Promise<PartialTrack | Track>;
  public async get(artist: string, track: string, options?: TrackGetOptions): Promise<Track>;
  public async get(artist: string, track: string, options: TrackGetOptions = {}) {
    try {
      const res = (await this.client.rest.request('GET', 'track.getinfo', {
        artist,
        track,
      })) as APIGetTrackInfo;
      return new Track(res.track);
    } catch (error: any) {
      if (error.message !== 'Track not found') throw error;

      if (!options.searchIfNotFound) throw new Error('No results found');

      const search = await this.search(`${artist} - ${track}`);
      if (search.length === 0) throw new Error('No results found');

      return search[0];
    }
  }

  /**
   * Get similar tracks of a track
   *
   * @param artist - The artist name
   * @param track - The track name
   * @returns An array of tracks
   * @example
   * ```ts
   * const tracks = await client.tracks.getSimilar('Gunna', 'DOLLAZ ON MY HEAD');
   * console.log(tracks.map(track => `${track.name} by ${track.artist.name}`)); // [ 'DOLLAZ ON MY HEAD by Gunna', 'WUNNA by Gunna', ... ]
   * ```
   */
  public async getSimilar(artist: string, track: string) {
    const res = (await this.client.rest.request('GET', 'track.getsimilar', {
      artist,
      track,
    })) as APIGetSimilarTrack;

    return res.similartracks.track.map(track => new Track(track));
  }

  /**
   * Search for a track
   *
   * @param query - The query to search for
   * @returns An array of partial tracks
   * @example
   * ```ts
   * const tracks = await client.tracks.search('droeloe');
   * console.log(tracks.map(track => `${track.name} by ${track.artist}`)); // [ 'Sunburn by DROELOE', 'Looking Back by DROELOE', ... ]
   * ```
   * @example
   * ```ts
   * const tracks = await client.tracks.search('droeloe - sunburn');
   * console.log(tracks[0].name); // Sunburn
   * ```
   */
  public async search(query: string) {
    const res = (await this.client.rest.request('GET', 'track.search', {
      track: query,
    })) as APISearchTrack;

    return res.results.trackmatches.track.map(track => new PartialTrack(track));
  }
}
