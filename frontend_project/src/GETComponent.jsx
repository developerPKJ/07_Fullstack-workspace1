import { useState, useEffect } from "react";

import axios from "axios";

function GETComponent() {

    // 실행할 구문
    // 조회된 데이터들을 tr 요소로 옮긴 후 차곡차곡 담은 배열을 나타낼 State 형 변수
    const [dataList, setDataList] = useState([]);

    // 이 컴포넌트가 최초로 단 한번 로딩된 다음 딱 한번만 실행할 구문
    useEffect(() => {

        // axios().then().catch().finally();

        const getData = async () => {

            try {

                const response = await axios({
                    url : "http://localhost:8006/backend/boards",
                    method : "get",
                    params : { cpage : 1 } // 1번 페이지를 보겠다.
                    // > params 는 url 주소 뒤에 데이터들을 쿼리스트링으로 만들어준다.
                    // > 실제 요청 url 은
                    //   http://localhost:8006/backend/boards?cpage=1
                    // > get 방식과 params 는 url 주소의 header 영역에 데이터를 담아서 전송함
                });

                // console.log(response); // 전체 응답 정보
                // console.log(response.data); // 응답 데이터

                // 조회된 데이터를 별도의 변수에 담기
                const items = response.data;

                const trArr = items.map((item, index) => {

                    return (
                        /*
                            실습문제) 
                            게시글 1개를 나타내는 tr 요소마다 클릭 이벤트를 연결하고,
                            클릭 시, 해당 게시글 번호를 GET 요청으로 넘기면서
                            "게시글 상세조회 (GET)" 해오기!!
                            - 오늘은 상세조회한 내용을 alert 로만 간단히 출력해보기

                            힌트)
                            GET 방식으로 요청하되
                            http://localhost:8006/backend/boards/글번호

                            Controller 에서 
                            @PathVariable 어노테이션으로 뽑기 가능
                        */
                        <tr key={ index } onClick={ () => { selectBoard(item.boardNo); } }>
                            <td>{ item.boardNo }</td>
                            <td>{ item.boardTitle }</td>
                            <td>{ item.boardWriter }</td>
                        </tr>
                        /*
                            tr 요소들이 클릭되었을 때
                            라우팅에 의해 DELETEComponent (상세조회화면) 이 보여야함
                        */
                    );
                });

                setDataList(trArr);

            } catch(error) {

                console.log("GET 요청 실패!");
            }
        };

        getData();

    }, []);

    // tr 요소 클릭 시 실행할 이벤트 핸들러 함수
    const selectBoard = async boardNo => {

        try {

            // console.log(boardNo);

            const response = await axios({
                // url : "http://localhost:8006/backend/boards/" + boardNo,
                url : `http://localhost:8006/backend/boards/${ boardNo }`,
                method : "get"
            });

            // console.log(response.data);

            alert(`제목 : ${ response.data.boardTitle } \n` +
                  `내용 : ${ response.data.boardContent } \n` +
                  `작성자 : ${ response.data.boardWriter }`);

        } catch(error) {

            console.log("게시글 상세조회용 GET 요청 실패!");
        }
    };

    // return 구문
    return (
        <div>
            <h4>GET 요청 (조회 요청) 예제 - 게시글 목록 조회</h4>

            <table border="1">
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>{ dataList }</tbody>
            </table>
        </div>
    );
}

// 내보내기
export default GETComponent;