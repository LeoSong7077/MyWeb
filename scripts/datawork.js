function initDefaultDateKey(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  for (let i = 1; i <= getDateFinal(year, month); i++) {
    LS.setDateKey(year, month, i);
  }
}

function initPlans(today) {
  const last = new Date(today.getFullYear(), today.getMonth() - 1);
  const next = new Date(today.getFullYear(), today.getMonth() + 1);
  // ***
  //localStorage.setItem('baseKey', last.getFullYear() + "/" + last.getMonth());
  localStorage.setItem('baseKey', last.getFullYear() + "-" + last.getMonth());
  setToday(today);
  //모든 storage 생성
  initDefaultDateKey(last);
  initDefaultDateKey(today);
  initDefaultDateKey(next);

  localStorage.setItem('isFirst', 'false');
}

function updatePlans(today) {
  const [year, month] = LS.getToday();
  const isEqualYear = (year === today.getFullYear());
  const isEqualMonth = (month === today.getMonth());

  let monthGap = 0;
  if (!isEqualYear) { 
    const finalMonth = 11;
    const thisYearNextYearMonthGap = finalMonth - month;
    const nextYearRealMonth = today.getMonth() + 1;
    monthGap = thisYearNextYearMonthGap + nextYearRealMonth; 
  } else if (!isEqualMonth) {
    monthGap = today.getMonth() - month; 
  }

  if (monthGap <= 2) {
    for (let i = 0; i < monthGap; i++) {
      removeFirstMonth()
      addLastMonth()
      nextBaseKey();
    }
    updateToday(today);
  } else {
    localStorage.clear();
    initPlans(today);
  }
}

function removeFirstMonth() { //맨 앞쪽 month 삭제
  const [year, month] = LS.getToday();
  for (let i = 1; i <= getDateFinal(year, month - 1); i++) {
    // ***
    //localStorage.removeItem(localStorage.getItem('baseKey') + "/" + i);
    localStorage.removeItem(localStorage.getItem('baseKey') + "-" + i);
  }
}

function addLastMonth() { //새로운 month 추가
  const [year, month] = LS.getToday();
  const nextMonth = month + 1;
  for (let i = 1; i <= getDateFinal(year, nextMonth); i++) {
    const [tempYear, tempMonth] = LS.getBaseKey();
    const numberOfCalendar = 3;
    const tempDate = new Date(tempYear, tempMonth + numberOfCalendar);
    // ***
    //localStorage.setItem(tempDate.getFullYear() + "/" + tempDate.getMonth() + "/" + i, "");
    localStorage.setItem(tempDate.getFullYear() + "-" + tempDate.getMonth() + "-" + i, "");
  }
}

function nextBaseKey() {
  const [year, month] = LS.getBaseKey();
  const nextMonth = month + 1;
  const tempDate = new Date(year, nextMonth);
  LS.setBaseKey(tempDate.getFullYear(), tempDate.getMonth());
}

function updateToday(today) {
  removeToday();
  setToday(today);
}

function removeToday() {
  localStorage.removeItem('today');
}

function setToday(today) {
  // ***
  //localStorage.setItem('today', today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate());
  localStorage.setItem('today', today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate());
}

function setData(currentKey, text) {
  localStorage.setItem(currentKey, text);
}

/* !!! */
function getData(currentKey) {
  //이름 바꾸기
  $('div#planBox pre').text(localStorage.getItem(currentKey));
  $('div#planBox textarea').val(localStorage.getItem(currentKey));
}


