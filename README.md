# 매일 할 일을 기록하는 앱

이 앱은 사용자가 매일 해야 할 일을 기록하고 관리할 수 있도록 도와줍니다. 간단한 인터페이스를 통해 할 일 목록을 추가, 수정, 삭제할 수 있습니다.

## 주요 기능

- 할 일 추가: 사용자가 새로운 할 일을 입력하고 목록에 추가할 수 있습니다.
- 할 일 수정: 기존의 할 일을 수정할 수 있습니다.
- 할 일 삭제: 완료된 할 일을 목록에서 삭제할 수 있습니다.
- 할 일 목록 보기: 현재 등록된 모든 할 일을 한눈에 볼 수 있습니다.
  - 주/월별 캘린더 제공
- 완료 표시: 할 일을 완료 상태로 표시할 수 있습니다.
- 일정 없는 할 일: 일정이 없는 할 일을 따로 관리할 수 있습니다.

- 알림 설정: 특정 시간에 할 일에 대한 알림을 받을 수 있습니다.
- 테마적용: 다크 모드 및 라이트 모드 지원
  - Dark Mode: dark:bg-gray-900 transition-colors duration-300

## 사용한 기술 스택

- 프론트엔드: React
- 언어: TypeScript
- 상태 관리: Recoil
- 입력관리: React Hook Form
- API사용: google calendar API
  - API Key 필요
  - API 공식문서: https://developers.google.com/calendar
- 스타일링: tailwind CSS
- 라우터관리: React Router DOM
- 날짜 관리: date-fns, date-picker
- 아이콘: lucide-react
- 데이터 저장: localStorage(recoil-persist사용)
- 번들러: Vite
- 토스트: react-hot-toast
