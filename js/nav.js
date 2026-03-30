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
    { key: 'log-edit',  label: '打刻ログ編集', href: 'log-edit.html' },
    { key: 'settings',  label: 'システム設定', href: 'settings.html' },
    { key: 'qrprint',   label: 'QR印刷',        href: 'qrprint.html' },
  ];

  const links = pages.map(p => {
    const cls = p.key === activePage ? 'nav-link active' : 'nav-link';
    const badge = p.key === 'alerts' ? '<span id="nav-alert-badge" class="nav-badge" style="display:none;"></span>' : '';
    return `<a href="${p.href}" class="${cls}">${escHtml(p.label)}${badge}</a>`;
  }).join('');

  container.innerHTML = `
    <nav class="admin-nav">
      <div class="nav-brand">勤怠管理</div>
      <div class="nav-links">${links}</div>
      <button class="nav-logout" onclick="auth.clear();location.href='dashboard.html'">ログアウト</button>
    </nav>
  `;

  // 未対応アラート件数をバッジ表示
  loadAlertBadge();
}

async function loadAlertBadge() {
  try {
    const data = await api.getDashboardData('');
    const count = data.pendingAlerts || 0;
    const badge = document.getElementById('nav-alert-badge');
    if (badge && count > 0) {
      badge.textContent = count;
      badge.style.display = '';
    }
  } catch (e) { /* バッジ取得失敗は無視 */ }
}
