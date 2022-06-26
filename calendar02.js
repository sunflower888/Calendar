// calendar.js에서 date만 남기고 함수로 만들기
// date 객체 생성
let date = new Date(); //let으로 수정, goToday함수에서 date값을 재할당해줘야 해서 const가 아닌 let으로 수정
// let은 재할당만 가능, const는 재선언,재할당 불가능

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    // year_month 채우기
    document.querySelector('.year_month').textContent=`${viewYear}년${viewMonth+1}월`;

    // 지난 달의 마지막 Date, 이번 달의 마지막 Date
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth+1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    // Dates 기본 배열들
    const prevDates= []
    const thisDates = [...Array(TLDate+1).keys()].slice(1);
    const nextDates = [];

    // prevDates 계산
    if (PLDay !== 6) {
        for(let i=0; i<PLDay+1; i++){
            prevDates.unshift(PLDate-i);
        }
    }

    // nextDates 계산
    for(let i=1; i<7-TLDay; i++){
        nextDates.push(i)
    }

    // Dates 합치기
    const dates = prevDates.concat(thisDates, nextDates)

    // Dates 정리
    // dates.forEach((date, i) => {
    //     dates[i] = `<div class="date">${date}</div>`;
    // })

    // Dates 정리
    const firstDateIndex = dates.indexOf(1); //1을 찾음
    //indexOf(찾을 문자(열)(필수), 찾기 시작할 위치(선택)) : 특정 문자의 위치를 찾기 위해 사용, 처음 발견되는 문자열의 위치 인덱스 값 반환(찾는 문자열 없으면 -1리턴)(대소문자 구분)
    //lastindexOf(찾을 문자(열)(필수), 찾기 시작할 위치(선택)) : 특정 문자가 마지막으로 나타나는 위치에 대한 인덱스 값 반환
    const lastDateIndex = dates.lastIndexOf(TLDate) //마지막 날을 찾음
    dates.forEach((date, i) => {
        const condition = i>=firstDateIndex && i<lastDateIndex+1
        ? 'this' //yes
        : 'other'; //no
        // && : 동시에, || : ~이거나, 또는
        // condition ? consequent : alternative
        // 부울식(참, 거짓) 계산 후 참과 거짓에 따라 결과 반환
        dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
    })
    

    // Dates 그리기
    document.querySelector('.dates').innerHTML = dates.join('');

    // 오늘 날짜 그리기
    const today = new Date(); //지금 보이는 날짜가 다른 날짜일 수 있기 때문
    if(viewMonth===today.getMonth() && viewYear===today.getFullYear()){
        for (let date of document.querySelectorAll('.this')){
            //for..in : 객체 순환(키와 밸류 중 키, 인덱스값), for...of : 배열값 순환(배열한 값, 인덱스x)
            // this라는 클래스를 가진 모든 태그를 찾아 반복문 실행
            if(+date.innerText === today.getDate()){
                //date가 가지고 있는 날짜가 문자열이라서 + 단항 연산자를 통해 숫자로 변경하고 오늘 날짜와 비교
                date.classList.add('today');
                //충족시 해당 태그에 today라는 클래스 추가
                break;
                //추가하고 반복문 종료(오늘 날짜가 하나밖에 없기에 더이상 반복은 필요 없다.)
                //검은색으로 표시된 당월의 날짜 중 오늘의 날짜와 일치하는 날에 today 클래스 추가하고 반복문 종료
            }
        }
    }
}
renderCalendar();

// 월 이동하기
// 계속 날짜이동 가능한 이유 : rendarCalendar()로 다음 혹은 이전 달의 월이 viewMonth로 getMonth에 들고와지기 때문
const prevMonth =()=> {
    date.setDate(1);
    date.setMonth(date.getMonth()-1);
    renderCalendar();
}
const nextMonth =()=>{
    date.setDate(1);
    date.setMonth(date.getMonth()+1);
    renderCalendar();
}
const goToday =()=> {
    date = new Date();
    renderCalendar();
}






