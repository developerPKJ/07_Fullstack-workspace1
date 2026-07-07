import { useState } from "react";

import axios from "axios";

function PUTComponent() {

    // 실행할 구문
    const [board, setBoard] = useState({boardTitle : "",
                                        boardContent : "",
                                        boardWriter : ""});

    // 입력값이 바뀔 때 마다 실행할 이벤트 핸들러 함수
    const handleChange = e => {

        const newBoard = {...board};

        newBoard[e.target.name] = e.target.value;

        setBoard(newBoard);
    };

    // 수정하기 버튼 클릭 시 실행할 이벤트 핸들러 함수
    const updateBoard = async e => {

        e.preventDefault();
        // > 기본이벤트 제거

        try {

            const response = await axios({
                url : "http://localhost:8006/backend/boards/1", // 1번 게시글을 
                method : "put",                                 // 수정하겠다
                data : board                                    // 어떻게 수정할건지 데이터
            });
            // > 식별자 역할을 하는 (즉, where 절에 들어갈 PK 내지 UQ) 데이터는
            //   Path Variable 방식으로, 상세 수정할 (set 절에 들어갈) 데이터들은
            //   data 속성으로 보내준다.
            //   (적어도 상세 수정할 데이터들은 URL 주소에 노출되지 않음)

            // console.log(response.data);

            if(response.data == "success") {

                alert("게시글 수정에 성공했습니다.");
            }

        } catch(error) {

            console.log("PUT 요청 실패!");
        }
    };

    // return 구문
    return (
        <div>
            <h4>PUT 요청 예제 - 1번 게시글 수정</h4>

            {/* 
                PUT 은 "전체 수정" 을 의미한다!!
                의미상 PUT 요청을 보낼 때에는 모든 데이터를 다 전달해야 한다!!
                (만약 일부 수정만 하고싶다면 PATCH 요청을 보낸다)

                - 의미상 다 전달하긴 해야하나,
                  실제 쿼리문의 set 절에서 일부만 변경해도 기술적으로 문제 없음!!
                  (동작은 한다)
            */}

            <form>
                수정할 제목 : 
                <input type="text" name="boardTitle"
                                   value={ board.boardTitle }
                                   onChange={ handleChange } />

                <br />

                수정할 내용 : 
                <textarea name="boardContent" 
                          value={ board.boardContent }
                          onChange={ handleChange }></textarea>

                <br/>

                수정할 작성자 : 
                <input type="text" name="boardWriter"
                                   value={ board.boardWriter }
                                   onChange={ handleChange } />

                <br/>

                <button type="submit" onClick={ updateBoard }>수정하기</button>
            </form>
        </div>
    );
}

// 내보내기
export default PUTComponent;