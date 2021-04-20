const LS = {};

LS.setFirst = function (flag) {
  localStorage.setItem('isFirst', flag);
}

LS.getFirst = function () {
  return JSON.parse(localStorage.getItem('isFirst'));
}

LS.isFirst = function () {
  return JSON.parse(localStorage.getItem('isFirst'));
}

LS.getToday = function () {
  // ***
  return localStorage.getItem('today').split('-').map(Number);
}

LS.setBaseKey = function (year, month) {
  // ***
  localStorage.setItem('baseKey', year + "-" + month);
}

LS.getBaseKey = function () {
  // ***
  return localStorage.getItem('baseKey').split("-").map(Number);
}

LS.setDateKey = function (year, month, date, val = "") {
  // ***
  localStorage.setItem(year + "-" + month + "-" + date, val);
}