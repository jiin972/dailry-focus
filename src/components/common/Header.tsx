import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

type UpdateGreetingType = () => void;

const morningGreetings: string[] = [
  '좋은 아침이에요!🌞',
  '오늘도 힘차게 시작해봐요!',
  '모닝 커피 한 잔 어때요?☕️',
];
const afternoonGreetings: string[] = [
  '활기찬 오후 되세요!💪',
  '나른한 오후도 힘내세요🔥!',
  '남은 오후 시간도 화이팅!📣',
];
const eveningGreetings: string[] = [
  '편안한 저녁입니다.🌛',
  '오늘 하루 어떠셨나요?',
  '아직 오늘이 끝나지 않았어요.',
];

//순수 함수: 문구 계산만 하고 return(string)
const calculateGreeting = (): string => {
  const now = new Date();
  const currentHour = now.getHours();
  let selecedArray: string[] = [];

  if (currentHour >= 6 && currentHour < 12) {
    selecedArray = morningGreetings;
  } else if (currentHour >= 12 && currentHour < 18) {
    selecedArray = afternoonGreetings;
  } else {
    selecedArray = eveningGreetings;
  }
  //난수 생성
  const randomIdx = Math.floor(Math.random() * selecedArray.length);
  const finalGreeting = selecedArray[randomIdx];
  return finalGreeting; //string return
};

function Header() {
  const [greeting, setGreeting] = useState(calculateGreeting());
  const { theme, toggleTheme } = useTheme(); //theme 적용 커스텀훅
  const updateGreeting: UpdateGreetingType = () => {
    const finalGreeting = calculateGreeting();
    setGreeting(finalGreeting);
  };
  //setInterval(부수효과)제어, 마운트 및 클린업
  useEffect(() => {
    const timeCheck = setInterval(updateGreeting, 900000); //15분단위 시간체크
    return () => clearInterval(timeCheck); // 정리함수(메모리 누수방지)
  }, []); // 의존성 배열을 비워 첫 한번만 실행

  //
  return (
    <header className="mx-auto w-full pt-4  dark:bg-gray-800">
      <div className="mx-auto max-w-5xl px-6 flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{greeting}</h1>
        <button
          onClick={toggleTheme}
          className=" text-2xl text-gray-400 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700  "
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
