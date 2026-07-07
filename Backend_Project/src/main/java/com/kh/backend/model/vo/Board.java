package com.kh.backend.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// lombok 을 이용해서 나머지 코드는 자동완성
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Board {
	
	// BOARD 테이블이 있다라는 가정 하에 간단히 필드들 구성해보기
	private int boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardWriter;

}
