interface IGoogleItem {
  summary: string;
  start?: {
    date: string;
  };
}
interface IFecthData {
  date: string;
  name: string;
}
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
console.log('현재 사용중인 api키:', API_KEY);
const CALENDAR_ID = 'ko.south_korea#holiday@group.v.calendar.google.com';
const currentYear = new Date().getFullYear();
const timeMin = `${currentYear - 1}-01-01T00:00:00Z`;
const timeMax = `${currentYear + 1}-12-31T23:59:59Z`;

const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
  CALENDAR_ID
)}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true`;

export const getHolidays = async (): Promise<IFecthData[]> => {
  try {
    const response = await fetch(url);
    console.log('생성된 url:', url);
    if (!response.ok) {
      throw new Error(`Loading Error! status:, ${response.status}`);
    }
    const holidayData = await response.json();
    //data(date형태)가공 후 return
    return (holidayData.items || []).map(
      (item: IGoogleItem): IFecthData => ({
        date: item.start?.date || '',
        name: item.summary || '이름 없는 공휴일',
      })
    );
  } catch (err) {
    //err가 Error 클래스의 인스턴스인지 확인
    if (err instanceof Error) {
      console.error('공휴일 fetcher 에러 상세:', err.message);
    } else {
      console.error('알 수 없는 에러 발생:', err);
    }
    return [];
  }
};
