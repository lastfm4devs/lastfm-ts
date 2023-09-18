import { Track } from '../../structures/Track';
import type { Client } from '../Client';

export class TrackManager {
  public constructor(public client: Client) {}

  public async get(artist: string, track: string): Promise<Track> {
    const res = await this.client.rest.request('GET', 'track.getinfo', {
      artist,
      track,
    });

    return new Track(res.track);
  }
}
