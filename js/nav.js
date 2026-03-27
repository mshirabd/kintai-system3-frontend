/**
 * nav.js - 管理画面ナビゲーションバー
 * <div id="nav-container"></div> に動的注入する。
 */

function renderNav(activePage) {
  const container = document.getElementById('nav-container');
  if (!container) return;

  const pages = [
    { key: 'dashboard', label: 'ダッシュボード', href: 'dashboard.html' },
    { key: 'employees', label: '従業員管理',     href: 'employees.html' },
    { key: 'stores',    label: '店舗管理',       href: 'stores.html' },
    { key: 'summary',   label: '勤怠集計',       href: 'summary.html' },
    { key: 'book',      label: '出勤簿',         href: 'book.html' },
    { key: 'excel',     label: 'Excel出力',      href: 'excel.html' },
    { key: 'alerts',    label: 'アラート',       href: 'alerts.html' },
    { key: 'qrprint',   label: 'QR印刷',        href: 'qrprint.html' },
  ];

  const links = pages.map(p => {
    const cls = p.key === activePage ? 'nav-link active' : 'nav-link';
    return `<a href="${p.href}" class="${cls}">${escHtml(p.label)}</a>`;
  }).join('');

  container.innerHTML = `
    <nav class="admin-nav">
      <div class="nav-brand">勤怠管理</div>
      <div class="nav-links">${links}</div>
      <button class="nav-logout" onclick="auth.clear();location.href='dashboard.html'">ログアウト</button>
    </nav>
  `;
}
