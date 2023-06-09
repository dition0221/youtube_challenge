# [Full Stack] YouTube (Challenge)

### 프론트+백+배포를 포함한 전체 싸이클을 돌리는 풀스택으로 Youtube와 비슷한 웹 사이트를 구성합니다.

#### [23-06-05 ~ 23-07-17(6주)] 챌린지 교육 과정.

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/Pug-A86454?style=flat-square&logo=pug&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white"/>

---

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.

- **23-06-05** : #1.3 ~ #2.4 / Set up NodeJS and Packages (+ Quiz)
  - NodeJS : 브라우저 밖에서 사용할 수 있는 JavaScript 런타임
  - npm : NodeJS와 상호작용을 할 수 있는 JavaScript 언어를 위한 패키지 매니저
  - package.json : NodeJS에서 프로젝트 정보를 입력한 텍스트 파일
    - script를 이용해 프로젝트를 실행할 수 있음
    - dependencies : 해당 패키지(프로젝트)가 실행하기 위해 필요한 패키지(모듈)들
    - devDependencies : 개발자에게 필요한 dependencies
  - node_modules 폴더 : npm으로 설치한 모든 패키지가 저장됨
  - package-lock.json : 프로젝트의 패키지들을 안전하게 관리해줌 (패키지 버전 등)
  - npm i 명령문 : 프로젝트의 package.json의 dependencies와 devDependencies를 보고 자동으로 필요한 모듈들을 설치함 ('package-lock.json'이 관리하는 패키지 버전으로 설치함)
  - 패키지
    - Express 패키지 : Back-End 서버를 만들 수 있는 패키지
    - babel 패키지 : 최신 JavaScript 문법을 사용할 수 있도록 해주는 컴파일러
    - nodemon 패키지 : 파일이 수정되는 것을 감시해 자동으로 script를 재실행해주는 패키지
- **23-06-06** : #3.0 ~ #3.4 / Express Router (+ Code Challenge)
  - Express 패키지로 서버 생성 및 실행하기
  - Route 설정하기, GET request 처리하기, response 반환하기
- **23-06-07** : #3.5 ~ #3.11 / Middleware (+ Code Challenge)
  - Middleware : request와 response 사이에 위치하는 controller
    - controller의 3번째 인자인 'next'를 사용해야함
    - 'next();' 함수사용해 다음 controller를 실행함
    - 서버.use() 메서드를 통해 어느 URL에서나 작동하는 global middleware로 설정 가능
  - 패키지
    - Morgan 패키지 : http method, path, status code, 응답시간 등의 log를 보여주는 서버의 미들웨어로 사용하는 패키지
- **23-06-08** : #3.0 ~ #3.11 / (+ Quiz)
- **23-06-09** : #4.0 ~ #4.8 / Router (+ Code Challenge)
  - Router
    1. 생성 : const 라우터명 = express.Router();
    2. 사용 : 서버명.use("루트URL", 라우터명); [전역 Middleware처럼 사용]
    3. Router에 Controller 연결하기 (GET, POST 등)
  - 코드 정리(분할 정복)
    - import, export, export default
  - URL Parameter
    - URL 안에 변수를 포함시킬 수 있게 함
    - ':변수명'으로 사용
    - 'req.params' 파라미터를 통해 object 형식으로 값을 읽을 수 있음
    - text로 이루어진 경로는 URL Parameter로 이루어진 경로보다 코드가 앞에 위치해야 함
      - 해당 text가 URL Parameter로 인식할 수 있기 때문
  - 정규식 : 문자열로부터 특정 정보를 추출해내는 방법

---

- **23-06-12** : #5.0 ~ #5.6 / (+ Code Challenge)
- **23-06-13** : #4.0 ~ #5.5 / (+ Quiz).
- **23-06-14** : #5.7 ~ #6.6 / (+ Code Challenge)
- **23-06-15** : #6.0 ~ #6.6 / (+ Code Challenge).
- **23-06-16** : #6.7 ~ #6.10 / (+ Code Challenge)

---

1. 프로젝트 준비 및 패키지 설치
   - NodeJS 설치
   - package.json 생성 (npm init)
   - 패키지 설치 { Express, babel, nodemon }
2. 서버 생성 및 Route 설정
   - Express를 이용해 서버 생성 및 실행
   - Route 설정 (GET, req, res 등)
3. 미들웨어 설정
   - 패키지 설치 { Morgan }
   - Morgan을 전역 Middleware로 설정
4. Router 설정
   - Router로 URL 그룹화 (global, videos, users)
   - Router와 Controller 분할 및 정복
   - URL Parameter 및 정규식 사용

---

Router

/ -> Home
/join -> Join
/login -> Login
/search -> Search

/users/:id -> See User
/users/logout -> Log out
/users/edit -> Edit My Profile
/users/delete -> Delete My Profile

/videos/:id -> Watch Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video
