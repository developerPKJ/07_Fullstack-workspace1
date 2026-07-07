import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import GETComponent from "./GETComponent";
import POSTComponent from "./POSTComponent";

function App() {
  
  // 실행할 구문

  // return 구문
  return (
    <div>
      <h1>REST API</h1>

      <p>
        - REST (Representational State Transfer) 의 약자 <br/>
        - 클라이언트 (프론트엔드) 와 서버 (백엔드) 가 서로 데이터를 주고받기 위한 약속 (규칙) <br/>
        - 요청과 응답은 주로 JSON 형식으로 주고받는다!! 
      </p>

      <br/>
      <hr/>

      <h3>1. REST API 를 쓰는 이유</h3>

      <p>
        - 기존에는 JSP 같은 걸로 Spring 프로젝트 내부에서 화면과 서버 로직이 하나로 합쳐져 있었음!!
          (Server Side Rendering - SSR, Server 단에서 화면까지 다 관여한다) <br/>
        - React 나 Vue 등 프론트엔드 라이브러리 (프레임워크) 를 이용하면,
          프론트엔드와 백엔드를 완전히 분리해서 개발할 수 있게 된다.
          (Client Side Rendering - CSR, Server 단에서 화면에 관련된 것들을 수행하지 않겠다) <br/>
        - REST API 를 쓰면 프론트는 프론트대로, 백엔드는 백엔드대로
          따로따로 개발하고, 서로 API 로만 통신할 수 있게 된다!! (개발 문서) <br/>
        - 즉, 백엔드 개발자가 백엔드 코드를 다 작성하고, 이 코드를 어떤 식으로 호출하고 사용해야하는지
          개발 문서 (API) 로 작성해서 넘겨주면, 프론트엔드 개발자가 그 문서를 보고 호출해서
          백엔드와 연결 (통신) 해주는 것!! <br/>
        - "풀스택 개발의 핵심" 이 바로 REST API 임!! 
      </p>

      <br/>
      <hr/>

      <h3>2. REST API 요청 종류 (HTTP Method)</h3>

      {/* 기존에 우리가 알던 GET, POST 와는 다른 의미이므로 주의할 것!! */}

      <p>
        1) GET : 데이터 조회 (가져오기) <br/>
        - 서버한테 "이 데이터좀 주세요 (GET)!" 라고 요청하는 것 <br/>
        2) POST : 데이터 등록 (새로 만들기) <br/>
        - 서버한테 "이 데이터를 게시해 주세요 (POST)!" 라고 요청하는 것 <br/>
        3) PUT : 데이터 수정 (전부 갱신하기) <br/>
        - 서버한테 "이 데이터를 전부 덮어씌워주세요 (PUT)!" 라고 요청하는 것 <br/>
        4) DELETE : 데이터 삭제 (삭제하기) <br/>
        - 서버한테 "이 데이터를 지워주세요 (DELETE)!" 라고 요청하는 것
      </p>

      {/*
        - 기존의 GET, POST 와 기술적인 특징은 똑같다!!
        - 단, Representation (표현) - 요청 방식의 영단어 "의미, 표현" 을 잘 확인하고
          상황에 알맞은 방식으로 서버로 요청할 줄 알아야 한다!!

        참고) PATCH 라는 메소드도 있다!!
        - PUT 은 전체 수정, PATCH 는 일부(부분) 수정용
        - 실무에서는 PUT 과 PATCH 를 구분해서 쓰기도 하고, 그냥 PUT 으로 통일해서 쓰기도 한다!!
          (우리 수업시간에는 통일해서 쓸 예정)
      */}

      <br/>
      <hr/>

      <h3>3. REST API URL 설계 규칙</h3>

      <p>
        - REST API 에서는 URL 주소를 설계할 때에도 나름 규칙이 있다!! <br/>
        - 이 규칙을 잘 지킨 URL 주소를 "RESTful" 하다 라고 표현한다. <br/>

        <br/>

        - 기본 규칙 <br/>
        1) URL 주소 상에 "동사 (행위)" 를 쓰지 않는다. <br/>
        - 행위는 어차피 HTTP 메소드 (GET, POST, PUT, DELETE) - 요청 방식으로 표현!! <br/>

        (나쁜 예) GET  /getMembers   (X) <br/>
        (나쁜 예) POST /insertMember (X) <br/>
        (좋은 예) GET  /members      (O) <br/>
        (좋은 예) POST /members      (O) <br/>

        {/* 위의 예시에서 url 주소가 /members 로 같더라도 방식이 다르면 서로 다른 요청으로 판별 */}

        2) URL 은 "명사 (자원, 데이터)" 를 사용한다. <br/>
        - 특히, 데이터 (자원) 을 중심으로 "복수형" 을 사용하는 것이 관례이다!! <br/>

        예) GET    /members      회원 목록 조회 <br/>
            GET    /members/3    3번 회원 한명 조회 <br/>
            POST   /members      회원 신규 등록 <br/>
            PUT    /members/3    3번 회원의 정보 수정 <br/>
            DELETE /members/3    3번 회원 정보 삭제 <br/>

        {/* 
          정리하면, "같은 URL 주소" 에 "다른 HTTP 메소드" 를 사용해서 
          서로 다른 기능을 수행하도록 유도하는 것이 REST API 의 핵심이다!!  

          REST API 를 axios 를 이용해서 호출할 것이기 때문에
          실제 브라우저 주소창에는 리액트의 라우터 URL 이 보이고,
          REST API 요청 URL 은 내부적으로 서버로 전송되기 때문에 사용자 눈에는 보이지 않는다!!
        */}
      </p>

      <br/>
      <hr/>

      {/* 실제 코드로 연습해보기 */}

      <h3>4. GET 요청 예제</h3>

      <p>
        - 서버로부터 데이터를 "조회" 할 때 사용한다. <br/>
        - method : "get", 전달값은 params 속성에 담는다.
      </p>

      <GETComponent />

      <br/>
      <hr/>

      <h3>5. POST 요청 예제</h3>

      <p>
        - 서버에 새로운 데이터를 "등록, 게시" 할 때 사용한다. <br/>
        - method : "post", 전달값은 data 속성에 담는다.
      </p>

      <POSTComponent />

    </div>
  )
}

// 내보내기
export default App
