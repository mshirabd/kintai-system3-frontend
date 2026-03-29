/**
 * utils.js - 共通ユーティリティ
 */

/** HTMLエスケープ */
function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/** 分 → 'Xh Ym' 表示 */
function minToHM(min) {
  if (!min || min <= 0) return '';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h + ':' + String(m).padStart(2, '0');
}

/** 現在時刻を 'HH:mm:ss' で返す */
function nowTimeStr() {
  const d = new Date();
  return d.toLocaleTimeString('ja-JP', { hour12: false });
}

/** 今日の日付を 'YYYY-MM-DD' で返す */
function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-'
    + String(d.getMonth() + 1).padStart(2, '0') + '-'
    + String(d.getDate()).padStart(2, '0');
}

/** 今月を 'YYYY-MM' で返す */
function thisMonthStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

/** ローディング表示 */
function showLoading(el) {
  el.innerHTML = '<div class="loading">読み込み中...</div>';
}

/** エラー表示 */
function showError(el, msg) {
  el.innerHTML = `<div class="error-message">${escHtml(msg)}</div>`;
}

/** リアルタイム時計を開始 */
function startClock(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const tick = () => { el.textContent = nowTimeStr(); };
  tick();
  setInterval(tick, 1000);
}
