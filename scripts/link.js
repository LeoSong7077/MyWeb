// let linkMode = 'read';

function clickLinkPlus() {
    if(localStorage.getItem('linkCnt') === null) {
        localStorage.setItem('linkCnt', '0');
    }
    if(Number(localStorage.getItem('linkCnt')) < 4) {
        const addLinkContainer = document.getElementById("addLinkContainer");
        addLinkContainer.style.display = 'flex';
    }
    else {
        window.alert('링크 개수가 최대치 입니다.');
    }
}

function clickLinkMinus() {
    const minusCancelButton = document.getElementById('minusCancelButton');
    minusCancelButton.style.display = 'block';
    const minusButton = document.getElementById('minusButton');
    minusButton.style.display = 'none';
    const linkCancelIcon = document.getElementsByClassName('linkCancelIcon');
    for(let i = 0; i < linkCancelIcon.length; i++) {
        linkCancelIcon[i].style.display = 'block';
    }
}

function clickLinkMinusCancel() {
    const minusCancelButton = document.getElementById('minusCancelButton');
    minusCancelButton.style.display = 'none';
    const minusButton = document.getElementById('minusButton');
    minusButton.style.display = 'block';
    const linkCancelIcon = document.getElementsByClassName('linkCancelIcon');
    for(let i = 0; i < linkCancelIcon.length; i++) {
        linkCancelIcon[i].style.display = 'none';
    }
}  

function clickAddLink() {
    let cnt = localStorage.getItem('linkCnt');
    const name = getName(document.getElementById("addLinkName").value);
    const address = document.getElementById("addLinkAddress").value;

    localStorage.setItem('link' + cnt, name + ' ' + address);
    window.alert('새로운 링크가 추가되었습니다!')
    //링크 추가
    $('#linkBox').append(`<div id="link${cnt}"><a href="${address}" target="_blank">
        <img class="link-icon" src='images/chrome.png'>
        <span>${name}</span>
    </a><i onclick="removeLink(${name}, ${cnt})" class="fas fa-window-close cancelIcon"></i></div>`);
    increaseLinkCnt();
    //창 끄기
    const addLinkContainer = document.getElementById("addLinkContainer");
    addLinkContainer.style.display = 'none';
}

function clickAddLinkExit() {
    const addLinkContainer = document.getElementById("addLinkContainer");
    addLinkContainer.style.display = 'none';
}

function updateLinks() {
    const length = localStorage.getItem('linkCnt');
    for(let i = 0; i < length; i++) {
        const [name, address] = localStorage.getItem('link' + i).split(' ');
        $('#linkBox').append(`<div id="link${i}"><a href="${address}" target="_blank">
            <img class="link-icon" src='images/chrome.png'>
            <span>${name}</span>
        </a><i onclick="removeLink(${name}, ${i})" class="fas fa-window-close linkCancelIcon"></i></div>`);
    }
}

function removeLink(name, index) {
    window.alert(name + ' 링크가 삭제되었습니다.');
    document.querySelector('#link' + index).style.display = 'none';
    localStorage.removeItem('link' + index);
    decreaseLinkCnt();
}

function getName(name) {
    return (name.length > 5) ? name[0] + name[1] + name[2] + name[3] + name[4] + '...' : name;
}

function increaseLinkCnt() {
    let cnt = Number(localStorage.getItem('linkCnt'));
    cnt++;
    localStorage.setItem('linkCnt', cnt);
}

function decreaseLinkCnt() {
    let cnt = Number(localStorage.getItem('linkCnt'));
    cnt--;
    localStorage.setItem('linkCnt', cnt);
}