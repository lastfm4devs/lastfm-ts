import type { PartialTrack as RawPartialTrack, Track as RawTrack } from '@lastfm-ts/api-types';
import { PartialTrack } from '../../structures';
import { Track } from '../../structures/Track';
import type { Client } from '../Client';

interface TrackGetOptions {
  searchIfNotFound?: boolean;
}

export class TrackManager {
  public constructor(public client: Client) {}

  public async get(artist: string, track: string, options?: TrackGetOptions): Promise<Track>;
  public async get(
    artist: string,
    track: string,
    options: TrackGetOptions & { searchIfNotFound: true },
  ): Promise<PartialTrack | Track>;
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
