텍스트 알피지 [ 배포 ]
======================

> 대충 텍스트 알피지 배포용이다

> # 사용 방법

> 일단 .zip 으로 다운로드 해주고,
> 압축을 푼 뒤 rpg_module.js 과 tools.js 를
> msgbot 폴더의 global_modules 에 붙여넣어줍니다

> [ tools.js 가 이미 있다고뜨면 기존걸 지우고 
> 다시 붙여넣어주세요 ]

> 그 뒤에 새로 메신저봇R 에서 코드를 만든뒤 아래
> 코드를 붙여넣어주면 끝

> 설정은 알아서 다시 해줘요

``` javascript

// 이 코드는 레거시 API를 사용, 통합된 매개변수를 사용하지 않습니다

/**

MIT License

Copyright (c) 2023 command0929

*/

const scriptName = 'text_rpg';

var text_rpg = require('rpg_module').on;
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  text_rpg('Download/rpgData/' /* 기본 위치를 제외한 저장 폴더 위치 */, ';알피지' /* 알피지 접두사 */, msg /* 보낸 내용 */, sender /* 보낸 이의 이름 */, imageDB.getProfileHash() /* 유저 구분 아이디 */, replier /* 전송용 함수 ( 건들지 말 것 ) */, 0 /* 건들지 말 것 */);
}

```

