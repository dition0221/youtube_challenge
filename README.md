# [Full Stack] YouTube (Challenge)

### 프론트+백+배포를 포함한 전체 싸이클을 돌리는 풀스택으로 Youtube와 비슷한 웹 사이트를 구성합니다.

#### [23-06-05 ~ 23-07-17(6주)] 챌린지 교육 과정.

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/Pug-A86454?style=flat-square&logo=pug&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white"/>

---

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.

- **23-06-05** : #1.3 ~ #2.4 / Set up NodeJS and Packages (+Quiz)
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
