
let clicked = '0'; //clicked side index

function createSideElements() { //이름 바꾸기 side말고 main도 만듦
    const languages = ['JAVASCRIPT', 'HTML', 'CSS', 'JAVA', 'REACT'];
    let languagesValue = languages.join("_");
    for(let i = 0; i < languages.length; i++) {
        $('#side').append(`<div id='side${i}' onclick='clickSideElements(${i})'>${languages[i]}</div>`);
        $('#main').append(`<div id='main${i}'></div>`);
    }
    //localStorage에 언어 종류들 저장
    if(localStorage.getItem('languages') === null)
        localStorage.setItem('languages', languagesValue);
    //default: clicked
    $('#side0').css('background-color', '#7addfc');
    $('#main0').css('display', 'block');
    //default: main elements
    // $('#main0').append('<a href="">Date</a>');
}

function clickSideElements(index) {
    $(`#side${clicked}`).css('background-color', '#C0FFFF');
    $(`#main${clicked}`).css('display', 'none');
    clicked = index;
    $(`#side${clicked}`).css('background-color', '#7addfc');
    $(`#main${clicked}`).css('display', 'block');
}

function clickAdd() {
    $('#modeValue').text('ADD');

    removeDeleteIcons();
    showAddContainer();

    // button display
    $('#addButton').css('display','none');
    $('#deleteButton').css('display','inline-block');
    $('#cancelButton').css('display','inline-block');
}

function clickCancel() {
    $('#modeValue').text('READ');

    hideAddContainer();
    removeDeleteIcons();

    // button display
    $('#addButton').css('display','inline-block');
    $('#deleteButton').css('display','inline-block');
    $('#cancelButton').css('display','none');
}

function clickDelete() {
    $('#modeValue').text('DELETE');

    hideAddContainer();
    showDeleteIcons();

    // button display
    $('#addButton').css('display','inline-block');
    $('#deleteButton').css('display','none');
    $('#cancelButton').css('display','inline-block');
}

function hideAddContainer() {
    $('#addContainer').css('display', 'none');
    $('#addExitButton').css('display', 'none');
}

function showAddContainer() {
    $('#addContainer').css('display', 'flex');
    $('#addContainer').html(getAddBox());
    $('#addExitButton').css('display', 'block');
}

function addTool() {
    //유효성검사
    if (document.getElementById("language").selectedIndex == 0) {
        window.alert("프로그래밍 언어를 반드시 하나 선택하세요.");
        return;
    }
    if (document.getElementById("toolName").value === "" || 
        document.getElementById("toolAddress").value === "") {
        window.alert("입력 값을 모두 입력하세요.");
        return;
    }

    let toolCnt = getToolCnt();
    const name = $('#toolName').val();
    const keyName = 'tool' + toolCnt;
    const address = $('#toolAddress').val();
    const languageIndex = document.getElementById("language").selectedIndex - 1;

    $(`#main${languageIndex}`).append(`<div class="tool" onclick="clickTool('${address}', this, '${keyName}')"><i class="fas fa-window-close cancelIcon"></i>${name}</div>`);
    
    //localStorage에 tool 추가
    const newKey = 'tool' + toolCnt;
    const newValue = languageIndex + ' ' + name + ' ' + address;
    localStorage.setItem(newKey, newValue);
    localStorage.setItem('toolCnt', toolCnt + 1);

    clickCancel();
    clickSideElements(languageIndex);
    window.alert("추가 완료!");
}

function getToolCnt() {
    return (localStorage.getItem('toolCnt') !== null) ? Number(localStorage.getItem('toolCnt')) : 0;
}

function loadTools() {
    //문서가 로드 될때 저장된 모든 코드들 가져오기.
    //Key값 : code1 ... 이런식으로 해서 codeCnt 가져와서 이 cnt만큼 for문 돌리기!
    const toolCnt = getToolCnt();
    let keyName = '';
    for(let i = 0; i < toolCnt; i++) {
        keyName = 'tool' + i;
        if(localStorage.getItem(keyName) !== null && localStorage.getItem(keyName) !== '') {            
            var [languageIndex, name, address] = localStorage.getItem(keyName).split(" ");
            $(`#main${languageIndex}`).append(`<div class="tool" onclick="clickTool('${address}', this, '${keyName}')"><i class="fas fa-window-close cancelIcon"></i>${name}</div>`);
        }
    }
}

function clickTool(address, removeTarget, keyName) {
    if ($('#modeValue').text() === 'READ') {
        //window.open('about:blank').location.href = address;
        window.open((address.includes('https://') ? '' : 'https://') + address, 'about:blank');
    }
    else if ($('#modeValue').text() === 'DELETE') {
        console.log(keyName);
        localStorage.removeItem(keyName);
        window.alert('제거 되었습니다!');
        removeTarget.remove();
    }
    
}

function removeDeleteIcons() {
    $('.cancelIcon').css('display','none');
}

function showDeleteIcons() {
    $('.cancelIcon').css('display','block');
}

function getAddBox() {
    return `<div id="addBox">
            <div>새로운 코딩도구 추가</div>
            <div id="languageBox">
                <label for="language">language:</label>
                <select id="language" name="language">
                    <option value="">--선택하세요--</option>
                    <option value="JAVASCRIPT">JAVASCRIPT</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JAVA">JAVA</option>
                    <option value="REACT">REACT</option>
                </select>
            </div>
            <div id="toolNameBox">
                <p>도구 이름</p>
                <input id="toolName" value="">
            </div>
            <div id="toolAddressBox">
                <p>주소</p>
                <input id="toolAddress" value="">
            </div>
            <input id="addSubmitButton" type="button" value="추가" onclick="addTool()">
            </div>`;
}
