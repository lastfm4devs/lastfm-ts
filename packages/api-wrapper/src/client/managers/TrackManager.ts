import type { PartialTrack as RawPartialTrack, Track as RawTrack } from '@lastfm-ts/api-types';
import { PartialTrack } from '../../structures';
import { Track } from '../../structures/Track';
import type { Client } from '../Client';

export class TrackManager {
  public constructor(public client: Client) {}

  public async get(artist: string, track: string) {
    const res = await this.client.rest.request('GET', 'track.getinfo', {
      artist,
      track,
    });

    return new Track(res.track as RawTrack);
  }

  public async search(query: string) {
    const res = await this.client.rest.request('GET', 'track.search', {
      track: query,
    });

    return (res.results.trackmatches.track as RawPartialTrack[]).map(track => new PartialTrack(track));
  }
}
