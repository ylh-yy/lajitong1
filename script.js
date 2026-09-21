// 使用原生 audio 控件；切换曲目时，暂停其他播放器。
const players = [...document.querySelectorAll('audio')];
const nowPlaying = document.querySelector('.now-playing');
const nowPlayingText = document.querySelector('#now-playing-text');

players.forEach((player) => {
  const card = player.closest('.music-card');
  const status = card.querySelector('.track-status');
  const title = card.querySelector('h2').textContent;

  player.addEventListener('play', () => {
    players.forEach((other) => {
      if (other !== player) other.pause();
    });
    card.classList.add('is-playing');
    status.textContent = '正在播放 · MVP 胜利音乐';
    nowPlaying.classList.add('active');
    nowPlayingText.textContent = `正在播放：${title}`;
  });

  player.addEventListener('pause', () => {
    card.classList.remove('is-playing');
    status.textContent = '已暂停 · MVP 胜利音乐';
    if (!players.some((other) => !other.paused)) {
      nowPlaying.classList.remove('active');
      nowPlayingText.textContent = `已暂停：${title}`;
    }
  });

  player.addEventListener('ended', () => {
    card.classList.remove('is-playing');
    status.textContent = '播放结束 · 可以再次收听';
    nowPlaying.classList.remove('active');
    nowPlayingText.textContent = `${title} 播放结束，挑选下一首吧。`;
  });

  player.addEventListener('error', () => {
    card.classList.remove('is-playing');
    status.textContent = '音频加载失败，请检查 assets/audio 文件夹。';
    if (!players.some((other) => !other.paused && !other.error)) {
      nowPlaying.classList.remove('active');
      nowPlayingText.textContent = `${title} 暂时无法播放。`;
    }
  });
});

document.querySelector('#start-listening').addEventListener('click', async () => {
  try {
    await players[0].play();
  } catch {
    nowPlayingText.textContent = '播放未能开始，请尝试歌曲下方的播放按钮。';
  }
});
