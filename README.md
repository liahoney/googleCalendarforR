# googleCalendarforR
 구글 캘린더처럼 주별 달력, 월별 달력을 구현하고 스케줄을 등록할 수 있게 함

# 실행
npm start

localhost:3000에 접속 

# 사용
React, Redux, tailwind css, typescript

# 기능구현
1. 반응형구현하기
2. 주달력의 주 이동, 월 이동
3. 주달력의 스케줄 등록하기
4. 주달력의 스케줄 삭제하기
5. 월 달력의 주 이동, 월 이동
6. 월 달력의 스케줄 등록하기
7. 월 달력의 스케줄 삭제하기

# 파일 설명
src/components
|제목|내용|설명|
|------|---|-----------|
|AddScheduleButton|달력 왼쪽 위에 있는 '만들기' 버튼|만들기를 누르면 스케줄을 등록할 수 있는 모달창이 나온다|
|AddScheduleModal|스케줄을 등록할 수 있는 모달창|모달창에서 원하는 시간대에 스케줄을 등록 할 수 있다|
|DatePicker|화면 왼쪽에 보이는 작은 달력|버튼을 이용해 다음달을 볼 수 있고, 현재 셀렉된 날짜의 주를 렌더링하도록 도와준다|
|Header|화면의 맨 위에 _년_월 을 보여주는 헤더 | 현재 년,월과 오늘 버튼을 가지고 있고 오늘 버튼을 누르면 오늘에 대당하는 년,월을 렌더링한다|
|LeftCalendar|DatePicker를 감싸는 컴포넌트| 주달력에서 메뉴 아이콘을 누르면 작은 달력이 접히고 열리는 기능을 한다|
|MonthCalendar|월달력에서 오른쪽 부분 스케줄을 렌더링하는 달력| 각 날짜마다 저장한 스케줄을 렌더링하는 부분이다|
|ScheduleCalendar|주달력에서 오른쪽 부분 스케줄을 렌더링하는 달력| 각 날짜의 시간마다 저장한 스케줄을 렌더링하는 부분이다|

src/util
|제목|내용|설명|
|------|---|-----------|
|checkIsThisWeek|주어진 날짜가 현재 주에 속하는지 판별하는 함수| day: 판별하고자 하는 날짜, current: 현재 날짜로 기준이 되는 날짜|
|classNames|주어진 클래스 이름들을 결함하여 하나의 문자열로 반환 하는 함수| ...classes: 가변 인자로서 클래스 이름들을 전달 받는다|
|dayOfWeek|요일| 일요일부터 토요일을 string형태로 배열에 저장|
|generateSelectTimes|시간 목록을 생성하는 함수|  hours24 배열과 minutes 배열을 활용하여 시간과 분을 조합하여 객체(시간,분,텍스트를 가짐)로 구성한 후 배열로 저장하여 반환한다|
|getCalendar|선택한 날짜와 현재 날짜를 기준으로 달력정보를 생성하는 함수| days: typeDays객체의 배열로, 해당 달에 표시될 날짜 정보 가짐/month: 선택한 날짜의 월을 나타내는 숫자/week: 해당 달의 첫날이 무슨 요일인지 나타내는 숫자/year: 선택한 날짜의 연도를 나타내는 숫자|
|getThisMonth|days배열에서 현재 달에 해당하는 날짜 정보만 필터링하여 반환하는 함수|해당 함수는 입력으로 받은 days배열에서 현재 달에 해당하는 날짜 정보만을 추출하여 반환하는 역할을 한다|
|getThisWeek|days배열에서 현재 주에 해당하는 날짜 정보만 추출하여 반환하는 함수|해당 함수는 입력으로 받은 days 배열에서 현재 주에 해당하는 일주일 동안의 날짜 정보만을 추출하여 반환 하는 역할을 한다|
|HoursAday|24시간 형식의 시간 배열을 생성하는 함수|typeHours 객체의 배열로 정의되어있고, 시간을 텍스트로 표시하는 text속성과 24시간 형식의 시간을 나타내는 hour 속성을 가진다|
|plusMonth|주어진 날짜(date)에 월(month)을 더한 새로운 날짜를 반환하는 함수| 주어진 날짜에 월을 더하여 새로운 날짜를 계산하고, 계산된 날짜를 문자열로 반환한다|
|plusWeek|주어진 날짜(date)에 주(week)을 더한 새로운 날짜를 반환하는 함수| 주어진 날짜에 주를 더하여 새로운 날짜를 계산하고, 계산된 날짜를 문자열로 반환한다|

src/modules
|제목|내용|설명|
|------|---|-----------|
|calendar|Redux Toolkit을 사용하여 만든 calendarSlice라는 Redux슬라이스|캘린더 상태와 관련된 액션 및 리듀서를 정의한다|
|schedule|Redux Toolkit을 사용하여 만든 scheduleSlice라는 Redux슬라이스|스케줄 상태와 관련된 액션 및 리듀서를 정의한다|


# 기능구현 
1. 달력 이동
  * redux를 사용하여 리듀서 실행 
  * nextWeek, lastWeek, setMonth등과 같은 action을 받아서 리듀서는 createSlice에 의해 새로운 state로 반환
  * day, days,year, month를 저장하고 useSelector를 이용해서 가져와 씀
{
    select: 날짜 선택시
    current: { 포커스 이동에 따라 변함
        day: 선택된 월 달력의 list,
        days: 현재 선택된 날짜
        year: 선택된 년
        month: 선택된 월
    }
}
2. 스케줄 등록
 * redux를 사용하여 리듀서 실행
 * addSchedule, removeSchedule과 같은 action을 받아서 리듀서는 새로운 state로 반환
 * 시작시간, 종료시간을 저장
  '2023-01-01': [
    {
      start: { hour: 3, minute: 30 },
      end: { hour: 5, minute: 30 },
      color: 'blue',
      title: '공부',
    },
  ],
* hour과 minute은 스케줄 렌더링할때의 높이를 계산하기 위함

3. 스케줄 삭제
 * delete [해당 스케줄의 날짜][index] ; 인덱스를 이용해 삭제한다 
4. 스케줄 생성 모달 보이기/숨기기 
 * useState로 state 생성
 * 자식 컴포넌트에 SetStateAction 전달(useState 훅을 사용하여 상태를 업데이트하는 데 사용되는 함수의 타입을 정의)
5. 스케줄 모달 시간 
 * 선택한 시작 시간이 종료 시간의 index보다 크면 
   종료 시간의 index를 변경
   if(endSelectTimeIndex < startSelectTimeIndex) {
   endTimeChange( ..)

# 트러블슈팅
1. Header와 DatePicker를 월별달력과 주달력에서 공유하면서 월별달력이 제대로 렌더링 되지 않는 문제

   *처음 했던 방법: 원래는 pages 폴더에 Calendar.tsx에서 weekView State를 사용해서 삼항연산자로 
   weekView가 true일때는 ScheduleCalendar를 보여주고, false일때는 MonthCalendar를 렌더링했다.
 
   *해결 방법: pages폴더에 CalendarMonth.tsx, CalendarWeek.tsx를 만들어서 
           월별 달력은 CalendarMonth에서, 주별달력은 CalendarWeek.tsx에 만들어서 코드를 나눴다.

2. index.ts 파일이 import 되지 않는 문제 
   *처음 했던 방법: import intex.ts from "../.." 이렇게 import 했다.

   *해결 방법: eslint plugin을 install 해서 문제를 해결했다. 

3. 월별 달력에서 DatePicker의 쉐브론버튼을 눌러도 월 이동이 되지 않고 날짜가 계속 생성되는 달력이 되는 문제 

    *문제 원인: Calendar 컴포넌트에서 DayPicker를 사용하는 MonthCalendar 컴포넌트에서 MonthCalendar 컴포넌트는 daypicker 패키지에 의존하기 때문이다.

    *해결 방법: MonthCalendar 컴포넌트에서 DayPicker의 onMonthChange 핸들러를 사용하였다.



4.월별달력에서 스케줄을 리덕스에 저장은되는데 화면에 렌더링이 되지않는 문제

     *처음했던방법: 주별달력의 ScheduleData에 형태를 그대로 갖고와서 문제가 발생했다.

     *해결 방법: {scheduleDate: ,color: ,px: , } 이런식으로 ScheduleData를 변형하여 문제 해결
  
