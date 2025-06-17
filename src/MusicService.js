const { Pool } = require('pg');

class MusicService {
  constructor() {
    this.pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGNAME,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });
  }

  async getSongsFromPlaylist(playlistId) {
    const queryPlaylist = {
      text: `
        SELECT playlist.id, playlist.name
        FROM playlist
        WHERE playlist.id = $1
      `,
      values: [playlistId],
    };

    const querySongs = {
      text: `
        SELECT song.id, song.title, song.performer 
        FROM song 
        JOIN song_playlist ON song.id = song_playlist.song_id 
        WHERE song_playlist.playlist_id = $1
      `,
      values: [playlistId],
    };

    const playlistResult = await this.pool.query(queryPlaylist);

    const songsResult = await this.pool.query(querySongs);
    return {
      playlist: {
        ...playlistResult.rows[0],
        songs: songsResult.rows,
      },
    };
  }
}

module.exports = MusicService;
