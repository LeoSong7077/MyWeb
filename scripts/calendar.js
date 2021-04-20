//calendar.js

function showTodayPlan(today) {
  showPlan(today.getFullYear(), today.getMonth(), today.getDate());
  // *** 슬래쉬 제거. td의 id
  //$('#' + today.getFullYear() + '\\/' + today.getMonth() + '\\/' + today.getDate()).css('border', '2px solid red');
  $(`#${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`).css('border', '2px solid red');
}

function makeCalendars(today) {
  const last = new Date(today.getFullYear(), today.getMonth() - 1);
  const next = new Date(today.getFullYear(), today.getMonth() + 1);
  showCalendar('last_calendar', last);
  showCalendar('now_calendar', today);
  showCalendar('next_calendar', next);
}

function showCalendar(target, date) {
  $(`#${target}Box .year`).text(date.getFullYear());
  $(`#${target} .month`).text(date.getMonth() + 1); // Month는 0부터니 +1
  $(`#${target} tbody`).append(getCalendar(date));
}

function getDateLines(firstDay, finalDate, year, month) {
  const week = 7;
  const linesLength = Math.floor((firstDay + finalDate) / week);
  let result = "";
  let date = 1;
  let day_cnt = 0; //달력 앞쪽에 비는 곳을 나타 내기 위한 도구
  for (let line = 0; line <= linesLength; line++) {
    result += "<tr class='dates'>";
    for (let day = 0; day < week; day++) {
      if (day < firstDay && day_cnt < firstDay) {
        result += `<td></td>`; //앞쪽 빈 곳 채워주기
        day_cnt++;
      } else if (date > finalDate) {
        result += `<td></td>`; //마지막 빈 곳도 채워주기
      } else {
        // *** id 정의, 슬래쉬 제거
        result += `<td id='${year}-${month}-${date}'
                onclick='showPlan(${year}, ${month}, ${date})'
                style='${(day !== 0) ? "color:snow" : "color:red"}'
                >${date}${makeDot(year, month, date)}</td>`;
        date++;
      }
    }
    result += "</tr>"
  }
  return result;
}

function getCalendar(date_object) {
  const firstDay = getDayFirst(date_object.getFullYear(), date_object.getMonth()); //그 달의 첫째 요일
  const finalDate = getDateFinal(date_object.getFullYear(), date_object.getMonth()); //그 달의 마지막 일
  const year = date_object.getFullYear();
  const month = date_object.getMonth();
  return getDateLines(firstDay, finalDate, year, month);
}

function getDayFirst(year, month) { //이번 달의 첫번째 일의 요일
  const first = new Date(year, month, 1);
  return first.getDay();
}

function getDateFinal(year, month) { //이번 달의 마지막 일
  const final = new Date(year, month + 1, 0);
  return final.getDate();
}

/* !!! 전역변수 사용 */
let currentKey = "";

function showPlan(year, month, date) { //달력에서 날짜 클릭
  changeTableHighlight(year, month, date);
  writeSelectedDate(year, month, date);
  setCurrentKey(year, month, date);
  getData(currentKey);
  $('#plan').show();
  $('#plan_edit').hide();
}

function editPlan() { //edit 버튼
  $('#plan').hide();
  $('#plan_edit').show();
  $('#plan_edit textarea').focus();
}

function savePlan() { //save 버튼
  const text = $('div#planBox textarea').val();
  setData(currentKey, text);
  $('div#planBox pre').text(text);
  $('#plan').show();
  $('#plan_edit').hide();
  updateDot(text);
}

function changeTableHighlight(year, month, date) {
  removeLastHighlight();
  makeNewHighlight(year, month, date);
}

/* !!! 아이디에 / 사용은 권장하지 않음 */
function removeLastHighlight() {
  // *** 슬래쉬 제거. td의 id
  //const [year, month, date] = currentKey.split("/");
  const [year, month, date] = currentKey.split("-");
  //$(`#${year}\\/${month}\\/${date}`).css('background-color', '#464646');
  $(`#${year}-${month}-${date}`).css('background-color', '#464646');

  //여기서 색깔은 table 색과 임의로 맞춰줘야 한다.
}

function makeNewHighlight(year, month, date) {
  // *** 슬래쉬 제거. td의 id
  //$('#' + year + '\\/' + month + '\\/' + date).css('background-color', '#828282');
  $(`#${year}-${month}-${date}`).css('background-color', '#828282');
}

function writeSelectedDate(year, month, date) {
  $('#selected').text(year + "년 " + (month + 1) + "월 " + date + "일");
}

function setCurrentKey(year, month, date) {
  // *** 슬래쉬 제거 currentKey 
  //currentKey = year + "/" + month + "/" + date;
  currentKey = year + "-" + month + "-" + date;
}

function makeDot(year, month, date) {
  // *** 슬래쉬 제거. 아이콘의 dotKey
  //const key = year + "/" + month + "/" + date;
  const key = year + "-" + month + "-" + date;
  const id = key + "dot";
  if(localStorage.getItem(key) == '' || localStorage.getItem(key) == undefined) {
      return `<i id=${id} class="fas fa-circle" style="display:none"></i>`;
  }
  return `<i id=${id} class="fas fa-circle" style="display:block"></i>`
}

function updateDot(text) { 
  // *** currentKey , 아이콘의 dotkey 
  //const [year, month, date] = currentKey.split("/");
  const [year, month, date] = currentKey.split("-");
  //$('#' + tempArr[0] + '\\/' + tempArr[1] + '\\/' + tempArr[2] + 'dot').css('display', (text === '')?'none':'block')
  $(`#${year}-${month}-${date}dot`).css('display', (text === '')?'none':'block')
}



