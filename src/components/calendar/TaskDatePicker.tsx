import { ko } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; //스타일 임포트 필수
registerLocale('ko', ko);

//표준방식으로 props 타입정의
interface TaskDatePickerProps {
  currentDate: Date | string | null | undefined;
  onDateChange: (date: Date | null) => void;
}

function TaskDatePicker({ currentDate, onDateChange }: TaskDatePickerProps) {
  //selected의 propd으로 받은 currentDate의 타입을 DatePicker가 요구하는 Date객체로 변환
  const dateValue = currentDate ? new Date(currentDate) : null;

  return (
    <DatePicker
      locale="ko"
      dateFormatCalendar="yyyy년 MM월 dd일"
      inline // 달력 바로 보이기
      className={`absolute bg-transparent dark:text-gray-100 hover:scale-105 `}
      dateFormat="yyyy.MM.dd"
      shouldCloseOnSelect // 날짜선택 후 datePicker 자동닫힘
      placeholderText="날짜 미입력"
      minDate={new Date('2020-01-01')}
      maxDate={new Date('2050-12-31')}
      selected={dateValue} //필수 지정
      onChange={(date: Date | null) => onDateChange(date)} //날짜 지정(필수)
      isClearable // 날짜 비우기
    />
  );
}

export default TaskDatePicker;
