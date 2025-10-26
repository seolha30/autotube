# 오토벤치마킹 백엔드 API

프론트엔드와 Google Apps Script 사이의 보안 중계 서버입니다.

---

## 📋 목차
1. [로컬에서 테스트하기](#로컬에서-테스트하기)
2. [GitHub에 업로드하기](#github에-업로드하기)
3. [Vercel에 배포하기](#vercel에-배포하기)
4. [프론트엔드 연결하기](#프론트엔드-연결하기)

---

## 🏠 로컬에서 테스트하기

### 1단계: Node.js 설치 확인
명령 프롬프트(cmd)를 열고 입력하세요:
```bash
node --version
```
버전이 나오면 OK! 안 나오면 https://nodejs.org 에서 다운로드하세요.

### 2단계: 패키지 설치
```bash
cd C:\project\분리\backend
npm install
```

### 3단계: .env 파일 만들기
`.env.example` 파일을 복사해서 `.env` 파일을 만드세요.
그리고 당신의 Google Apps Script URL을 넣으세요:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/실제_URL/exec
VERIFICATION_URL=https://script.google.com/macros/s/실제_URL/exec
PORT=3000
```

### 4단계: 서버 실행
```bash
npm start
```

브라우저에서 http://localhost:3000/api/health 열어보세요.
`{"status":"OK"}` 나오면 성공! ✅

---

## 📤 GitHub에 업로드하기

### 1단계: GitHub 계정 만들기
https://github.com 에서 계정을 만드세요 (무료)

### 2단계: 새 저장소(Repository) 만들기
1. GitHub 로그인
2. 오른쪽 위 `+` 버튼 클릭
3. `New repository` 클릭
4. 이름: `autobenchmarking-backend` (원하는 이름)
5. Private 선택 (중요! 남들이 못 보게)
6. `Create repository` 클릭

### 3단계: 코드 업로드
명령 프롬프트(cmd)에서:
```bash
cd C:\project\분리\backend

git init
git add .
git commit -m "첫 업로드"
git branch -M main
git remote add origin https://github.com/당신ID/autobenchmarking-backend.git
git push -u origin main
```

**주의:** `.env` 파일은 자동으로 제외됩니다 (.gitignore에 있음)

---

## 🚀 Vercel에 배포하기

### 1단계: Vercel 계정 만들기
1. https://vercel.com 접속
2. `Sign Up` 클릭
3. `Continue with GitHub` 선택
4. GitHub 계정으로 로그인

### 2단계: 프로젝트 배포
1. Vercel 대시보드에서 `Add New...` → `Project` 클릭
2. GitHub에서 `autobenchmarking-backend` 선택
3. `Import` 클릭

### 3단계: 환경변수 설정 (중요!)
배포 전에:
1. `Environment Variables` 섹션 찾기
2. 3개 추가:
   ```
   이름: GOOGLE_SCRIPT_URL
   값: https://script.google.com/macros/s/실제_URL/exec
   
   이름: VERIFICATION_URL
   값: https://script.google.com/macros/s/실제_URL/exec
   
   이름: PORT
   값: 3000
   ```
3. `Deploy` 버튼 클릭

### 4단계: 배포 완료!
몇 분 기다리면 완료됩니다.
배포된 URL이 나옵니다:
```
https://your-project.vercel.app
```

**테스트:** `https://your-project.vercel.app/api/health` 열어보세요!

---

## 🔗 프론트엔드 연결하기

배포된 URL을 프론트엔드(index.html)에 넣으세요.

예시:
```javascript
// 원래 (삭제할 것)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/...';

// 새로운 코드 (추가할 것)
const API_BASE_URL = 'https://your-project.vercel.app';
```

자세한 수정 방법은 `frontend` 폴더의 수정 가이드를 참고하세요!

---

## 🆘 문제 해결

### "Module not found" 오류
```bash
npm install
```
다시 실행하세요.

### 환경변수 오류
`.env` 파일이 제대로 만들어졌는지 확인하세요.
경로: `C:\project\분리\backend\.env`

### Vercel 배포 실패
환경변수를 Vercel에서 제대로 설정했는지 확인하세요.

---

## 📞 지원

문제가 생기면 `server.js` 파일의 콘솔 로그를 확인하세요.
