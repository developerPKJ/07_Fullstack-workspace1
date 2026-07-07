import axios from "axios";

function DELETEComponent() {

    // 실행할 구문
    const deleteBoard = async () => {

        try {

            const response = await axios({
                url : "http://localhost:8006/backend/boards/1", // 1번 게시글을
                method : "delete"                               // 삭제하겠다
            });

            console.log(response);

            if(response.data == "success") {

                alert("게시글 삭제에 성공했습니다.");
            }

        } catch(error) {

            console.log("DELETE 요청 실패!");
        }
    };

    // return 구문
    return (
        <div>
            <h4>DELETE 요청 예제 - 1번 게시글 삭제</h4>

            제목 : 1번 게시글의 제목입니다. <br/>
            작성자 : user01 <br/>
            내용 : 1번 게시글의 내용입니다. <br/>

            <button>게시글 수정</button>
            {/* 수정 버튼 클릭 시 PUTComponent 가 라우팅에 의해 보여야함 */}
            &nbsp;
            <button onClick={ deleteBoard }>게시글 삭제</button>
            {/* 삭제 버튼 클릭 시 실제 삭제 요청을 보내야함 */}
        </div>
    );
}

// 내보내기
export default DELETEComponent;