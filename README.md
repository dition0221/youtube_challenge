# [Full Stack] YouTube (Challenge)

### 프론트+백+배포를 포함한 전체 싸이클을 돌리는 풀스택으로 Youtube와 비슷한 웹 사이트를 구성합니다.

#### [23-06-05 ~ 23-07-17(6주)] 챌린지 교육 과정.

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white"/> <img src="https://img.shields.io/badge/Pug-A86454?style=flat-square&logo=pug&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white"/> <img src="https://img.shields.io/badge/dotenv-ECD53F?style=flat-square&logo=dotenv&logoColor=white"/>

---

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.

- **23-06-05 : #1.3 ~ #2.4 / Set up NodeJS and Packages (+ Quiz)**
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
- **23-06-06 : #3.0 ~ #3.4 / Express Router (+ Code Challenge)**
  - Express 패키지로 서버 생성 및 실행하기
  - Route 설정하기, GET request 처리하기, response 반환하기
- **23-06-07 : #3.5 ~ #3.11 / Middleware (+ Code Challenge)**
  - Middleware : request와 response 사이에 위치하는 controller
    - controller의 3번째 인자인 'next'를 사용해야함
    - 'next();' 함수사용해 다음 controller를 실행함
    - 서버.use() 메서드를 통해 어느 URL에서나 작동하는 global middleware로 설정 가능
  - 패키지
    - Morgan 패키지 : http method, path, status code, 응답시간 등의 log를 보여주는 서버의 미들웨어로 사용하는 패키지
- **23-06-08 : #3.0 ~ #3.11 / (+ Quiz)**
- **23-06-09 : #4.0 ~ #4.8 / Router (+ Code Challenge)**
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
- **23-06-12 : #5.0 ~ #5.6 / Template (+ Code Challenge)**
  - Pug 패키지 : 템플릿(template)을 이용해 뷰(view)를 만드는 것을 도와주는 템플릿 엔진 또는 뷰 엔진
    - compile 시 일반적인 HTML파일로 바꾸어줌
    - 설치법
      1. 'npm i pug'로 Pug 패키지 설치
      2. Express에서 Pug를 View Engine으로 사용한다고 설정
      3. Express에서 view에 대한 경로 설정
    - 사용법
      - controller에서 'res.render("파일명")' 메서드를 사용해 렌더링
    - JavaScript 사용 가능
      - '#{}' 괄호를 사용해 JavaScript 코드를 사용 가능
      - controller에서 'res.render("파일명", {변수})' 메서드를 사용해 변수 전달 가능
        - 변수는 하나의 객체를 이용해 키-값으로 전달
    - partial : 반복적인 코드를 재사용할 수 있는 기능
      - 'include' 예약어를 사용해 다른(partial) 파일을 포함시킬 수 있음
    - Inheritance(상속) : 일종의 base를 만들고, 그 base로부터 확장(extend)해 나가는 것
      - HTML의 base를 가질 수 있으며, 일부분은 수정 가능
      - 'extends' 예약어를 사용해 base 파일을 사용
      - 'block'을 사용해 일부분 수정이 가능
- **23-06-13 : #4.0 ~ #5.5 / (+ Quiz)**
- **23-06-14 : #5.7 ~ #6.6 / Template(2) & POST (+ Code Challenge)**
  - Pug
    - element에서 변수 하나만 사용하는 경우(=variable)
    - 조건문(if/else), 반복문(each..in../while)
    - Mixin : HTML을 return 해주는 일종의 function
    - JS의 템플릿 리터럴 사용 가능 (`${}`)
  - ES6
    - 객체의 프로퍼티값을 가져올 때 shortcut 사용 가능
  - POST method
    - http POST method를 사용해 form 내용을 브라우저에서 Back-End로 데이터를 보낼 수 있음
    - form(method="POST")와 input(name)속성은 필수적으로 필요함
    - Express의 내장 middleware인 'urlencoded'로 데이터를 받을 수 있음
    - 'req.body' 객체를 사용해 데이터를 받음
    - 받은 데이터는 post router와 controller를 이용해 사용
- **23-06-15 : #6.0 ~ #6.6 / (+ Code Challenge)**
- **23-06-16 : #6.7 ~ #6.10 / Database (+ Code Challenge)**
  - MongoDB : NoSQL DataBase
  - mongoose : Node.js와 MongoDB를 서로 상호작용할 수 있게해주는 패키지
    - MongoDB 연결 : mongoose.connect("MongoDB주소URL/TABLE명")
    - DB logger 생성
    - DB Model 및 Schema 작성
- **23-06-19 : #6.11 ~ #6.18 / DB find & create (+ Code Challenge(2 days)[1st day])**
  - 파일 분할 정복 : server파일과 init파일(DB연결 및 App 실행) 분리
  - DB 검색
    1. 사용하고자 하는 DB model 파일을 import
    2. '모델명.find()' 메서드를 사용해 DB에서 검색
    - 비동기(async, await, try-catch)로 사용
  - DB 업로드
    - '모델명.create({스키마})'를 사용해 DB에 업로드 (document 생성 + DB 저장을 한 코드로 가능)
      - document 생성 : const 변수명 = new 모델명({스키마})
      - DB 저장 : await 변수명.save()
  - 더 많은 model schema의 옵션들
    - { required, default, trim, minLength, maxLength 등 }
- **23-06-20 : #6.19 ~ #6.28 / DB update & delete & middleware & static (+ Code Challenge(2 days)[2nd day])**
  - 정규식, 404 page
  - DB
    - Update : 모델명.findOneAndUpdate({조건}, {업뎃내용}) 또는 모델명.findByIdAndUpdate(아이디, {업뎃내용})
    - Exists : 모델명.exists({조건}) / '\_id'프로퍼티를 가지는 객체 또는 null
    - middleware(mongoose) : 스키마명.pre("메서드명", 비동기콜백함수) / 'this' 예약어 사용 가능
    - static : 모델의 메서드를 직접 만들 수 있음 / export, import 따로 필요없음 (모델자체를 export/import)
      - 생성법 : 스키마명.static("만들메서드명", 만들콜백함수)
      - 사용법 : 모델명.스태틱명(매개변수)
    - Delete : 모델명.findOneAndDelete({조건}) 또는 모델명.findByIdAndDelete(아이디)
    - 정렬 : .sort({프로퍼티명: "desc/asc"})
- **23-06-21 : #6.7 ~ #6.17 / (+ Quiz)**
- **23-06-22 : #7.0 ~ #7.3 / User Authentication (+ Code Challenge(2 days)[1st day])**
  - 회원가입(join) 페이지 생성
    - DB Model / template / controller / router / 예외처리(중복 및 존재 체크)
  - PW 보안 : 해시(Hash)
    - 패키지 : 'bcrypt'
      - 해싱 : await bcrypt.hash(해시할텍스트, SALT_ROUND)
      - 비교 : await bcrypt.compare(비교할텍스트, 비교할해시텍스트)
- **23-06-23 : #7.4 ~ #7.11 / User Authentication (+ Code Challenge(2 days)[2nd day])**
  - 상태코드(Status Code) : res.status(CODE)
  - 세션(session) : server와 client 간에 어떤 활동을 했는지 기억하는 것
    - 패키지 : 'express-session'
    - 세션 설정 : app.use(session({secret:"...", resave:false, saveUninitialized: false}))
    - 최초로 Back-End가 browser에게 session id를 줌
      - 사용자가 request를 보낼 때 마다, browser가 Back-End에게 쿠키에서 session id를 보냄
      - Back-End는 session id를 통해 사용자를 개별적으로 파악할 수 있음
    - 'req.session' 객체에서 참조 가능
  - 'res.locals' 객체 : Express서버와 Pug템플릿에서 기본적으로 공유하는 전역변수
- **23-06-26 : #7.11 ~ #7.18 / Login Part (+ Quiz)**
  - 세션을 DB에 저장
    - 기본값으로 세션 데이터는 서버의 memory에 저장되므로, 비휘발성인 DB에 저장하도록 해야 함
    - 패키지 : 'connect-mongo'
      - 설정 : 세션 설정에서 'store: MongoStore.create({ mongoUrl: "몽고DB주소URL" })' 속성 추가
  - 코드 보호
    - 보안상의 이유로 공개되지 말아야 할 코드가 존재
      - { session의 secret, DB주소, API key 등 }
    - 환경변수 파일(.env)을 사용
      - '.env' 파일 생성 및 값 추가 / '.gitignore' 등록
      - 패키지: 'dotenv'
        - 프로젝트 최상단 코드에 'import "dotenv/config";' 구문 작성
        - 'process.env' 객체의 프로퍼티로 접근
        - '.env'의 프로퍼티는 대문자로 작성
- **23-06-27 : #7.19 ~ #7.23 / Social Login (+ Code Challenge(2 days)[1st day])**
  - github 소셜 로그인
    1. github에서 새로운 OAuth App 생성하기
       - { Application name ,Homepage URL, Authentication callback URL }
    2. 프로젝트의 Front-End에서 github 로그인을 위해 redirect 시키는 element 생성하기
       - { client_id, allow_signup, scope 등 }
    3. 'scope'를 사용해 private 데이터까지 가져오기
       - 'URLSearchParams' 객체를 사용해 인코딩하면 더욱 간단함
    4. 승인 후 callback되는 페이지 생성하기
       - URL에 github에서 'code' 프로퍼티를 받음
       - { client_id, client_secret, code } 매개변수들과 함께 POST방식으로 보냄
       - token으로 바꿔줌
    5. 'access_token'을 가지고 github API를 사용해 사용자 정보 가져오기
       - 받은 token 객체에서 'access_token' 추출
       - 'access_token'을 가지고 사용자 정보, 이메일 정보 등을 가져옴
    6. 로그인 규칙 만들기
    - 일반 회원가입과 소셜 회원가입의 계정이 중복될 수 있는 문제 발생
      - 여러 방법의 규칙이 존재함
      - 소셜 회원가입 시 소셜 로그인만 가능하도록 채택할 예정
        - userSchema에서 'socialOnly' 속성을 추가해 소셜 여부 판별
  - 로그아웃 페이지
    - 세션을 파괴시킨 후, 홈페이지로 redirect
      - req.session.destroy()
- **23-06-28 : #8.0 ~ #8.9 / Edit Profile & Upload File (+ Code Challenge(2 days)[2nd day])**
  - Edit profile 페이지, Change PW 페이지
    - DB 및 session 업데이트
  - 로그인/비로그인 상태에 따라 열람할 수 있는 페이지 설정
    - middleware와 req.session을 사용
  - file upload
    - 패키지 : 'multer'
      - from(enctype="multipart/form-data")
      - Middleware : export const MIDDLEWARE = multer({CONFIG})
      - uploads 폴더 : 자동으로 생성됨, .gitignore에 추가
      - route에 생성한 middleware 적용 : MIDDLEWARE.single("FILE")
        - FILE명은 form의 input의 name속성값과 같아야 함
      - 'req.file' 객체를 통해 DB 업데이트 (파일 업로드 x / 파일 경로 업로드 o)
      - Front-End에 표현
        - 'express.static("FOLDER")'를 사용해 폴더 노출 시키기
          - ex. app.use("/uploads", express.static("uploads"));
        - 'req.session'에 값을 저장해서 사용
- **23-06-29 : #8.10 ~ #8.15 + #9.0 ~ #9.7 / DB Model Relationship & Webpack (+ Quiz)**
  - profile 페이지 생성
  - DB Model을 서로 연결하기 (relationship)
    - 'id' 속성값을 이용해 연결 : Model Schema에서 속성 추가
      - type: mongoose.Schema.Types.ObjectId / mongoose의 ObjectID 타입
      - ref : MODEL / 어느 모델을 참조할 것인지
  - 연결된 DB Model 사용하기
    - '.populate("파라미터명")' : 연결된 model의 정보를 가져올 수 있음
    - 'ref' 속성값을 참조해 해당 model에서 가져옴
  - '.isModified("파라미터명")' : 해당 model schema 타입이 변경되었는지 Boolean값으로 반환
  - 영상의 주인만 video를 edit/delete 할 수 있도록 수정
  - Webpack : input으로 주는 파일들(ex. ES6.js, .scss)을 압축 및 변환해서 output 파일(ex. normal.js, .css)로 변환해주는 프레임워크
    - 패키지 : {webpack, webpack-cli, babel/core, babel/preset-env, babel-loader, sass-loader, css-loader, MiniCssExtractPlugin 등}
    - 설정파일 : webpack.config.js
    - script 설정 : '"assets": "webpack"'
    - 'path.resolve()' : 파일 경로를 만들어주는 메서드 (import path 필요)
    - 생성된 파일을 사용하기위해 'express.static()' 메서드를 사용해 middleware설정
      - app.use("/static", express.static("assets"));
    - webpack에 'clean: true' 속성을 추가해 자동으로 이전 output삭제 후 output
    - webpack에 'watch: true' 속성을 추가해 자동 재시작 기능 사용
      - Back-End script와 Webpack script를 동시에 사용해야 함
      - 'nodemon.json' nodemon 설정파일을 만들어, Back-End script에서는 webpack관련 파일들을 무시하도록 설정
  - SCSS
- **23-06-30 : #11.0 ~ #11.3 / Video Player(1) (+ Code Challenge)**
- **23-07-01 : #10.0 ~ #10.3 / CSS styling**

---

- **23-07-03 : #11.4 ~ #11.11 / Video Player(2) (+ Code Challenge(2 days)[1st day])**
- **23-07-04 : #11.4 ~ #11.11 / Video Player(2) (+ Code Challenge(2 days)[2nd day])**
- #12.0 ~ #12.2
- **23-07-05 : #13.0 ~ #13.5 / (+ Code Challenge(2 days)[1st day])**
- **23-07-06 : #13.0 ~ #13.5 / (+ Code Challenge(2 days)[2nd day])**
- **23-07-07 : #14.0 / (+ Quiz)**

- #14.1 ~ #14.6 / #15.0 ~ #15.1 / #16.0 ~ #16.9 / #17.0 ~ #17.10

---

1. **프로젝트 준비 및 패키지 설치**
   - NodeJS 설치
   - package.json 생성 (npm init)
   - _패키지 설치 { Express, babel, nodemon }_
2. **서버 생성 및 Route 설정**
   - Express를 이용해 서버 생성 및 실행
   - Route 설정 (GET, req, res 등)
3. **미들웨어 설정**
   - _패키지 설치 { Morgan }_
   - Morgan을 전역 Middleware로 설정
4. **Router 설정**
   - Router로 URL 그룹화 (global, videos, users)
   - Router와 Controller 분할 및 정복
   - URL Parameter 및 정규식 사용
5. **View Engine (Pug) 설정**
   - _패키지 설치 { Pug }_
   - View Engine 설정 및 경로 설정
   - partial, extends, block 등을 사용해 코드 재사용 가능
   - JavaScript 코드 사용 가능
   - 조건문, 반복문 사용 가능
   - mixin을 이용해 HTML을 return 해주는 일종의 function을 사용 가능
6. **POST 설정**
   - Front-End에서 method="POST"인 form 생성
   - 데이터를 받기위해 Express의 내장 middleware인 'urlencoded' 설정
   - POST method를 사용할 router와 controller 생성
   - controller에서 'req.body' 객체를 사용해 데이터를 받음
7. **Database 설정**
   - _MongoDB와 mongoose 설치_
   - server와 MongoDB 연결 및 연결로그 작성
   - DB Model 작성
8. **Database 사용**
   - 더 많은 DB Model Schema 옵션 사용 (required, default 등)
   - DB 검색 : 모델명.find()
   - DB 저장 : 모델명.create()
   - DB 업데이트 : 모델명.findOneAndUpdate() / 모델명.findByIdAndUpdate()
   - DB 삭제 : 모델명.findOneAndDelete() / 모델명.findByIdAndDelete()
   - DB 존재확인 : 모델명.exists()
   - middleware : 스키마명.pre("메서드명", 비동기콜백함수) / 'this' 예약어 사용 가능
   - static : 모델의 메서드를 직접 만들 수 있음 / export, import 따로 필요없음 (모델자체를 export/import)
     - 생성법 : 스키마명.static("만들메서드명", 만들콜백함수)
     - 사용법 : 모델명.스태틱명(매개변수)
9. **사용자 인증 (User Authentication)**
   - _패키지 설치 { bcrypt, express-session, connect-mongo }_
   - 'User' DB 모델 생성 및 회원가입, 로그인 페이지 제작
   - PW 보안: 해시함수 이용
   - DB에 사용자 계정 저장
   - 문제 발생 시 상태코드를 사용해 처리
   - session을 이용해 개별적으로 사용자 구분 및 로그인 유지

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
