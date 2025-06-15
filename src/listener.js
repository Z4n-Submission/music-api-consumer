class Listener {
  constructor(musicService, mailSender) {
    this.musicService = musicService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlisId, targetEmail } = JSON.parse(message.content.toString());

      const music = await this.musicService.getSongsFromPlaylist(playlisId);
      const result = await this.mailSender.sendEmail(
        targetEmail,
        JSON.stringify(music)
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
