const overlay = document.querySelector('#loading-overlay');
const openButton = document.querySelector('#open-overlay');
const closeButton = document.querySelector('#close-overlay');

openButton.addEventListener('click', () => {
  overlay.showModal();
  document.body.classList.add('has-overlay');
});

closeButton.addEventListener('click', () => overlay.close());

// Esc 和关闭按钮都会触发 close，恢复滚动及键盘焦点。
overlay.addEventListener('close', () => {
  document.body.classList.remove('has-overlay');
  openButton.focus();
});
