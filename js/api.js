/**
 * api.js - GAS JSON API 呼び出しモジュール
 * 全APIリクエストはこのファイルを経由する。
 */

const GAS_URL = 'https://script.google.com/macros/s/AKfycbyoIUkVdDgIIM3l1rzqJxLAcPMtugjH-NplY93NSPYQtJpne-pKRPCel-25Tucp5GMI/exec';

/**
 * GAS doPost API を呼び出す。
 * @param {string} action - API関数名
 * @param {Object} [params={}] - パラメータ
 * @returns {Promise<Object>} レスポンスJSON
 */
async function callApi(action, params = {}) {
  const res = await fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, params }),
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`API通信エラー (${res.status})`);
  return res.json();
}

// ── 従業員向け API ────────────────────────────────

const api = {
  /** 打刻 */
  processAttendance(params) {
    return callApi('processAttendance', params);
  },

  /** 従業員情報+当日ログ取得 */
  getEmployeeInfo(employeeCode) {
    return callApi('getEmployeeInfo', { employeeCode });
  },

  /** 当日打刻状態取得 */
  getEmployeeStatus(employeeCode) {
    return callApi('getEmployeeStatus', { employeeCode });
  },

  // ── 管理者向け API ──────────────────────────────

  /** 従業員一覧 */
  getAllEmployees() {
    return callApi('getAllEmployees', { adminToken: auth.getToken() });
  },

  /** 従業員追加 */
  addEmployee(empData) {
    return callApi('addEmployee', { empData, adminToken: auth.getToken() });
  },

  /** 従業員更新 */
  updateEmployee(empId, empData) {
    return callApi('updateEmployee', { empId, empData, adminToken: auth.getToken() });
  },

  /** 従業員削除（無効化） */
  deleteEmployee(empId) {
    return callApi('deleteEmployee', { empId, adminToken: auth.getToken() });
  },

  /** 従業員再有効化 */
  reactivateEmployee(empId) {
    return callApi('reactivateEmployee', { empId, adminToken: auth.getToken() });
  },

  /** 店舗一覧 */
  getStores() {
    return callApi('getStores', { adminToken: auth.getToken() });
  },

  /** 店舗追加 */
  addStore(storeData) {
    return callApi('addStore', { storeData, adminToken: auth.getToken() });
  },

  /** 店舗更新 */
  updateStore(storeId, storeData) {
    return callApi('updateStore', { storeId, storeData, adminToken: auth.getToken() });
  },

  /** ダッシュボード */
  getDashboardData(storeId) {
    return callApi('getDashboardData', { adminToken: auth.getToken(), storeId });
  },

  /** 今日のリアルタイム出勤状況 */
  getTodayStatus() {
    return callApi('getTodayStatus', { adminToken: auth.getToken() });
  },

  /** 日次集計 */
  getDailySummary(dateStr) {
    return callApi('getDailySummary', { dateStr, adminToken: auth.getToken() });
  },

  /** 月次集計データ取得 */
  getMonthlySummary(yearMonth) {
    return callApi('getMonthlySummary', { yearMonth, adminToken: auth.getToken() });
  },

  /** 月次集計実行 */
  aggregateMonthlySummary(yearMonth) {
    return callApi('aggregateMonthlySummary', { yearMonth, adminToken: auth.getToken() });
  },

  /** 出勤簿データ取得 */
  getMonthlyAttendanceBook(empId, yearMonth) {
    return callApi('getMonthlyAttendanceBook', { empId, yearMonth, adminToken: auth.getToken() });
  },

  /** 打刻ログ一覧 */
  getDailyLogList() {
    return callApi('getDailyLogList', { adminToken: auth.getToken() });
  },

  /** Excel出力 */
  generateAttendanceExcel(yearMonth, storeId) {
    return callApi('generateAttendanceExcel', { yearMonth, storeId, adminToken: auth.getToken() });
  },

  /** PDF出力 */
  generateAttendanceBookPdf(empId, yearMonth) {
    return callApi('generateAttendanceBookPdf', { empId, yearMonth, adminToken: auth.getToken() });
  },

  /** ログアーカイブ */
  archiveAndCleanLogs(yearMonth) {
    return callApi('archiveAndCleanLogs', { yearMonth, adminToken: auth.getToken() });
  },

  /** アラートログ取得 */
  getAlertLogs() {
    return callApi('getAlertLogs', { adminToken: auth.getToken() });
  },

  /** アラート対応済み */
  resolveAlert(alertId) {
    return callApi('resolveAlert', { alertId, adminToken: auth.getToken() });
  },

  /** 打刻修正+アラート対応済み */
  correctAndResolveAlert(alertId, date, clockOutTime, note) {
    return callApi('correctAndResolveAlert', {
      alertId, date, clockOutTime, note, adminToken: auth.getToken(),
    });
  },

  /** 打刻ログ検索 */
  getPunchLogs(dateFrom, dateTo, empId) {
    return callApi('getPunchLogs', { dateFrom, dateTo, empId, adminToken: auth.getToken() });
  },

  /** 打刻ログ更新 */
  updatePunchLog(logId, logData) {
    return callApi('updatePunchLog', { logId, logData, adminToken: auth.getToken() });
  },

  /** 打刻ログ削除 */
  deletePunchLog(logId) {
    return callApi('deletePunchLog', { logId, adminToken: auth.getToken() });
  },

  /** システム設定取得 */
  getSystemSettings() {
    return callApi('getSystemSettings', { adminToken: auth.getToken() });
  },

  /** システム設定更新 */
  updateSystemSetting(key, value) {
    return callApi('updateSystemSetting', { key, value, adminToken: auth.getToken() });
  },
};
