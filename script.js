
let myNotesObj = {
    length: 0,
};
let month = new Date().getMonth() + 1
let year = new Date().getFullYear()
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
let table = document.createElement('table');
table.style.backgroundColor = 'white';
let th1 = document.createElement('th')
let myDate = new Date()
function createStandart() {
    let tr1 = document.createElement('tr')
    th1.colSpan = '8';
    th1.style.paddingLeft = '10px';
    tr1.classList.add('font')
    let butUp = document.createElement('button')
    butUp.id = 'upCal';
    let arrowUp = document.createElement('i')
    arrowUp.classList.add('fa')
    arrowUp.classList.add('fa-angle-left')
    butUp.appendChild(arrowUp)
    let butDown = document.createElement('button')
    butDown.id = 'downCal';
    let arrowDown = document.createElement('i')
    arrowDown.classList.add('fa')
    arrowDown.classList.add('fa-angle-right')
    butDown.appendChild(arrowDown)
    th1.appendChild(butDown)
    th1.appendChild(butUp)
    tr1.appendChild(th1)
    tr1.style.textAlign = 'left';
    table.appendChild(tr1)
    let weekDay = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    let tr = document.createElement('tr')
    for (let i = 0; i < 7; i++) {
        let th = document.createElement('th')
        th.appendChild(document.createTextNode(weekDay[i]))
        tr.appendChild(th)
        tr.classList.add('week')
        table.appendChild(tr)
        th.id = `day${i}`
    }
    butUp.addEventListener('click', calendarUp)
    butDown.addEventListener('click', calendarDown)
}
function drowCalendarNumbers() {
    let localSt = JSON.parse(localStorage.getItem('notes'))
    if (localSt != null) {
        myNotesObj = localSt
    }
    th1.appendChild(document.createTextNode(months[month - 1] + ` ${year}`))
    let day = myDate.getDate()
    let wkDay = myDate.getDay()
    let start = day;
    while (!(start >= 1 && start <= 7)) {
        start -= 7;
    }
    let num = 1;
    let k = 0;
    let st = wkDay - start;
    if (st <= 0) {
        st += 7;
    }
    let d = daysInMonth(month, myDate.getFullYear())
    for (let i = 0; i < 6; i++) {
        let tr2 = document.createElement('tr')
        if (i == 0) {
            tr2.style.boxShadow = 'inset 0px 12px 10px -10px'
            tr2.id = 'firstrow'
        }
        if (i == 1) {
            tr2.id = 'secondrow'
        }
        if (i == 5) {
            tr2.id = 'lastrow'
        }
        for (let j = 0; j < 7; j++) {
            let th = document.createElement('th');
            if (k == st) {
                if (day == num && month == new Date().getMonth() + 1 && year == new Date().getFullYear()) {
                    th.style.borderRadius = '50%';
                    th.style.backgroundColor = '#ff7750';
                    th.style.color = 'white';
                }
                if (myNotesObj.length >= 1) {
                    for (let z = 0; z < myNotesObj.length; z++) {
                        let date = myNotesObj[`date${z}`].split('-')
                        if (num == date[0] && month == date[1] && year == date[2]) {
                            th.style.color = myNotesObj[`color${z}`];
                            th.style.textDecoration = 'underline'
                        }
                    }
                    // th.style.textDecoration = 'underline';
                    // th.style.color = 'black';
                }
                if (num != d + 1) {
                    th.appendChild(document.createTextNode(num))
                    st++
                    num++
                }
            }
            k++
            tr2.appendChild(th)

        }
        table.appendChild(tr2)
    }
    notesViewer()
}
function calendarUp() {
    th1.innerHTML = '';
    table.innerHTML = '';
    if (month == 1) {
        month = 13
        myDate.setYear(year - 1)
        year -= 1
    }
    myDate.setMonth(month - 2)
    month -= 1
    createStandart()
    drowCalendarNumbers()
    checker()
    let buttonUp = document.getElementById('upCal')
    buttonUp.addEventListener('click', calendarUp)
    let buttonDown = document.getElementById('downCal')
    buttonDown.addEventListener('click', calendarDown)
}
function calendarDown() {
    th1.innerHTML = '';
    table.innerHTML = '';
    if (month == 12) {
        month = 0
        myDate.setYear(year + 1)
        year += 1
    }
    myDate.setMonth(month)
    month += 1
    createStandart()
    drowCalendarNumbers()
    checker()
    let buttonUp = document.getElementById('upCal')
    buttonUp.addEventListener('click', calendarUp)
    let buttonDown = document.getElementById('downCal')
    buttonDown.addEventListener('click', calendarDown)
}
function checker() {
    let regex = /[^0-9]+/gm
    let first = document.querySelector('#firstrow').innerText.replace(regex, '')
    let last = document.querySelector('#lastrow').innerText.replace(regex, '')
    if (first == '') {
        document.querySelector('#firstrow').remove()
        document.querySelector('#secondrow').style.boxShadow = 'inset 0px 12px 15px -10px'
    }
    if (last == '') {
        document.querySelector('#lastrow').remove()
    }
}
function open_input() {
    document.querySelector('.input_div').classList.toggle('d-none')
}
function addNewNote() {
    let date = document.getElementById('notedate')
    let text = document.getElementById('notetext')
    let color = document.getElementById('color')
    if (validator(date.value)) {
        if (Object.values(myNotesObj).indexOf(date.value) == -1) {
            myNotesObj[`date${myNotesObj.length}`] = date.value;
            myNotesObj[`color${myNotesObj.length}`] = color.value;
            myNotesObj[`text${myNotesObj.length}`] = text.value;
            myNotesObj.length += 1
            localStorage.setItem('notes', JSON.stringify(myNotesObj))
            th1.innerHTML = '';
            table.innerHTML = '';
            open_input()
            createStandart()
            drowCalendarNumbers(date.value, color.value)
            checker()
        }
    }
    else {
        console.log(date.value + ' is not valid')
    }
}
function notesViewer() {
    let storageLocal = JSON.parse(localStorage.getItem('notes'))
    if(storageLocal == null) {return}
    let mydiv = document.querySelector('.notesView')
    mydiv.innerHTML = ''
    for (var i = storageLocal.length - 1; i >= 0; i--) {
        let h2 = document.createElement('h2')
        h2.appendChild(document.createTextNode(storageLocal[`date${i}`]))
        h2.style.color = storageLocal[`color${i}`]
        let p = document.createElement('p')
        p.appendChild(document.createTextNode(storageLocal[`text${i}`]))
        p.style.color = storageLocal[`color${i}`]
        mydiv.appendChild(h2)
        mydiv.appendChild(p)
    }
}
function validator(text) {
    let regex = /^(([3][0-1])|([1-2][0-9])|([0][1-9]))\-(([0][1-9])|([1][0-2]))\-([0-9]{4})$/gm
    return regex.test(text)
}
createStandart()
drowCalendarNumbers()

document.getElementById('block').appendChild(table)

checker()
let buttonUp = document.getElementById('upCal')
buttonUp.addEventListener('click', calendarUp)
let buttonDown = document.getElementById('downCal')
buttonDown.addEventListener('click', calendarDown)

let addnotebut = document.querySelector('.addNote button');
addnotebut.addEventListener('click', open_input)
let buttonAdd = document.getElementById('add')
buttonAdd.addEventListener('click', addNewNote)