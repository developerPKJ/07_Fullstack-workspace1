import { useState } from "react";

import axios from "axios";

function POSTComponent() {

    // 실행할 구문
    // 제목, 내용, 작성자 정보 (입력값) 를 담아둘 State 변수
    /*
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContent, setBoardContent] = useState("");
    const [boardWriter, setboardWriter] = useState("");
    */

    const [board, setBoard] = useState({boardTitle : "", 
                                        boardContent : "", 
                                        boardWriter : ""});

    // 입력값의 변화가 있을 때 마다 실행할 이벤트 핸들러 함수 정의
    const handleChange = e => {

        // console.log(e.target.name);
        // console.log(e.target.value);

        const newBoard = {...board};

        newBoard[e.target.name] = e.target.value;

        setBoard(newBoard);
    };

    // 등록하기 버튼 클릭 시 실행할 이벤트 핸들러 함수 정의
    const insertBoard = async e => {

        e.preventDefault();
        // > 기본이벤트 제거

        try {
            
            // 이 자리에서 입력값들을 가지고 axios 로 POST 방식으로 요청 후 다녀오면 됨!!
            const response = await axios({
                url : "http://localhost:8006/backend/boards",
                method : "post",
                /*
                data : {
                    boardTitle : board.boardTitle,
                    boardContent : board.boardContent,
                    boardWriter : board.boardWriter
                }
                */
                data : board
                // > post 방식과 data 속성은 요청 시 전달값들을
                //   url 주소의 body 영역에 담아서 데이터가 노출되지 않도록 전송해준다
            });

            // console.log(response.data);

            if(response.data == "success") {

                alert("게시글 등록에 성공했습니다.");
            }

        } catch(error) {

            console.log("POST 요청 실패!");
        }
    };

    // 이 자리에서 insertBoard 를 호출하지 않음!!
    // > 아래의 onClick 속성에 이미 insertBoard 가 연결되어있기 때문
    //   (클릭될 때 마다 insertBoard 함수가 호출됨)

    // return 구문
    return (
        <div>
            <h4>POST 요청 예제 - 게시글 등록</h4>

            <form>
                제목 : 
                <input type="text" value={ board.boardTitle }
                                   onChange={ handleChange }
                                   name="boardTitle" />

                <br/>

                내용 : 
                <textarea value={ board.boardContent }
                          onChange={ handleChange }
                          name="boardContent"></textarea>

                <br/>

                작성자 : 
                <input type="text" value={ board.boardWriter }
                                   onChange={ handleChange }
                                   name="boardWriter" />

                <br/><br/>

                <button type="submit" onClick={ insertBoard }>등록하기</button>
            </form>
        </div>
    );
}

// 내보내기
export default POSTComponent;