const date = new Date(); //날짜객체 만들기(시스템 날짜)

const viewYear = date.getFullYear(); //년도 가져오기
const viewMonth = date.getMonth(); //월 가져오기
document.querySelector('.year_month').textContent=`${viewYear}년 ${viewMonth+1}월`
// 쿼리:데이터베이스에 정보요청

const prevLast = new Date(viewYear, viewMonth, 0); //이전 달의 날짜(이번달의 0번째 요일)
const thisLast = new Date(viewYear, viewMonth+1, 0); //이번 달의 마지막 날짜(다음달의 0번째 요일)

const PLDate = prevLast.getDate(); //지난달 마지막 날짜
const PLDay = prevLast.getDay(); // 지난달 마지막 요일

const TLDate = thisLast.getDate(); //이번달 마지막 날짜
const TLDay = thisLast.getDay(); //이번달 마지막 요일

// 날짜를 담을 배열
const prevDates=[]
const thisDates=[...Array(TLDate + 1). keys()].slice(1);
// ...(three dots) : rest parameter(나머지 값들 다 출력(맨마지막parameter로밖에 사용))와 spread operator 상황에 사용
// ...쓰는 이유:rest parameter는 배열, 따라서 arguments 객체들을 배열 전환 필요 없이 바로 argument 배열에 js 배열 속성 적용 가능
// Rest parameter : argument(입력값)들이 배열로 함수 내부에 전달
// Spread Parameter : 배열이 개별 원소가 된다.
// argument(전달인자, 인자) : 함수와 매서드의 입력 값(Value)
// Parameter(매개변수) : 함수와 매서드의 입력 변수병(Variable)
// 예) function distructuringParam(...[a,b,c]){console.log(a,b,c);}
//destructuringParam(1,2,3); //1,2,3 //a,b,c 출력하라니 1,2,3 그대로 출력
// slice(시작 포함 잘라 가질 부분(앞에서 끊음)) : 잘라서 새배열 생성(제거아님)
// splice(잘라내기 시작 부분(뒤에서 끊음), 자를 요소 갯수, 추가항목...) : 배열의 조각 잘라내기 및 새 항목 추가

//array(n)으로 배열짜면 길이가 n인 배열 생성(모든 요소 정의되지 않음)
//요소가 정의되지 않은 empty값이라 keys()(key값 뽑아내기)매서드 사용하면 0에서 n-1까지 배열 생성(인덱스로 생각하면 편함)
//그래서 1~n까지를 얻기 위해 TLDate에 1더해서 n-1을 n으로 변경, slice써서 1부터 n까지의 새배열 생성
const nextDates=[]

//prevDates와 nextDates 채우기
// ===(타입도 같아야 함(엄격)), ==(타입다르면 변환해 값 비교)
// i++(맨마지막에 증감), ++i(먼저 증감시키고 조건수행) : 둘다 1씩 증가시키는 연산자
if(PLDay !== 6){ //달력 맨 오른쪽이 토요일이기에 다음달 마지막 날이 토요일이면 굳이 그릴 필요 없다.
    for(let i=0; i<PLDay+1; i++){
        //요일:일~금(0~5), 토요일은 6
        prevDates.unshift(PLDate-i)
    }
}
// unshift:배열 앞에 값 추가
// push:배열 뒤에 값 추가
for(let i=1; i<7-TLDay; i++){ 
    //i=1인 이유: 달력 맨 왼쪽이 일요일이기에 다음달 첫날이 i=0(일요일)이면 굳이 그릴 필요 없다. 
    //요일:월~토(1~6)
    nextDates.push(i)
}

// html에 그리기
const dates=prevDates.concat(thisDates,nextDates);
//prevDates에 thisDates랑 nextDates를 연결해라.
//concat() 인자로 주어진 배열이나 값들을 합쳐(연결) 새 배열 반환
dates.forEach((date,i) => {
    dates[i] = `<div class="date">${date}</div>`;
    //화살표함수:변수=(파라미터(=매개변수))=>리턴값;
    //기존:변수명=function(파라미터){리턴값;}
    //date는 위에 시스템 날짜 가져오는 변수로 있음
    //dates[i] = `<div class="date">${그냥 날짜}</div>`; : dates의 모든 날짜들 div칸 줌.
    // 그래서 처음 출력하면 세로로 나열되어 있음.
})

document.querySelector('.dates').innerHTML=dates.join('');
//join():배열의 모든 원소(문자열)를 연결해 하나로 합치는 매소드
//join()=>가,나,다 //join('')=>가나다






