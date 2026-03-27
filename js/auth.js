/**
 * auth.js - 認証管理モジュール
 * 管理者トークンを sessionStorage で管理する。
 */

const auth = {
  /** sessionStorage のキー */
  _KEY: 'adminToken',

  /**
   * 管理者トークンを取得する。
   * sessionStorage → URLパラメータ の順で探す。
   * @returns {string}
   */
  getToken() {
    let token = sessionStorage.getItem(this._KEY);
    if (token) return token;

    // URLパラメータから取得して sessionStorage に保存
    const params = new URLSearchParams(location.search);
    token = params.get('adminToken') || '';
    if (token) {
      this.setToken(token);
      // URLからトークンを消す（履歴に残さない）
      params.delete('adminToken');
      const newUrl = location.pathname + (params.toString() ? '?' + params : '');
      history.replaceState(null, '', newUrl);
    }
    return token;
  },

  /**
   * 管理者トークンを保存する。
   * @param {string} token
   */
  setToken(token) {
    sessionStorage.setItem(this._KEY, token);
  },

  /**
   * 管理者トークンをクリアする。
   */
  clear() {
    sessionStorage.removeItem(this._KEY);
  },

  /**
   * 管理者認証を要求する。トークンがなければログイン画面を表示。
   * @returns {boolean} 認証済みなら true
   */
  requireAdmin() {
    if (this.getToken()) return true;
    // ログインフォームを表示
    document.body.innerHTML = `
      <div style="max-width:360px;margin:80px auto;padding:24px;font-family:sans-serif;text-align:center;">
        <h2>管理者ログイン</h2>
        <form id="loginForm">
          <input type="password" id="tokenInput" placeholder="管理者コードを入力"
            style="width:100%;padding:12px;font-size:16px;border:1px solid #ccc;border-radius:6px;margin:16px 0;">
          <button type="submit"
            style="width:100%;padding:12px;font-size:16px;background:#1A73E8;color:#fff;border:none;border-radius:6px;cursor:pointer;">
            ログイン
          </button>
        </form>
      </div>
    `;
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const token = document.getElementById('tokenInput').value.trim();
      if (token) {
        this.setToken(token);
        location.reload();
      }
    });
    return false;
  },
};
