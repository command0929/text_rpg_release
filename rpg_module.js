function numberFormat(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function ac(number) {
  if (number == 0) {
    return "0";
  }
  var inputNumber = number < 0 ? false : number;
  var unitWords = ["", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ",", ","];
  var splitUnit = 1000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = "";
  for (var i = 0; i < splitCount; i++) {
    var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (var i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) {
      continue;
    }
    resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
  }
  var changeString = resultString.split(",");
  for (var i = 1; i < changeString.length; i++) {
    var tN = changeString[i];
    if (tN.length == 0) {
      changeString[i] = '000';
    } else if (tN < 10) {
      changeString[i] = '00' + tN;
    } else if (tN < 100) {
      changeString[i] = '0' + tN;
    }
  }
  resultString = '';
  for (var i = 0; i < changeString.length; i++) {
    resultString += changeString[i] + ',';
  }
  resultString = resultString.slice(0, -1);
  return resultString;
}
function joinV(name, id) {
  var data = {};
  data = {
  name: name, 
  id: id, 
  btc: 0, 
  inv: [], 
  time: [], 
  lv: 1, 
  exp: 0, 
  expM: 100, 
  isAuto: false, 
  abi: {
  print: 1, 
  medic: 1, 
  bullet: 1, 
  search: 1, 
  mine: 1, 
  printExp: 0, 
  printEM: 10, 
  medicExp: 0, 
  medicEM: 10, 
  bulletExp: 0, 
  bulletEM: 10, 
  searchExp: 0, 
  searchEM: 10, 
  mineExp: 0, 
  mineEM: 10}, 
  status: {
  hp: 10, 
  maxhp: 10, 
  armor: 0, 
  regen: 0, 
  dmg: 1, 
  critC: 10, 
  critM: 10, 
  shield: 5, 
  maxshield: 5, 
  miss: 0, 
  exit: 20, 
  downcost: 0, 
  bag: 50, 
  regenM: 0}, 
  map: 0, 
  enemy: {
  fight: 0, 
  list: [], 
  status: {
  name: '',
  lv: 0, 
  hp: 0, 
  shield: 0, 
  maxhp: 0, 
  maxshield: 0, 
  dmg: 0, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {}}}};
  return data;
}
const tools = require('tools');
const line = '─'.repeat(20);
function on(path, prefix, msg, name, id, sende, type) {
  if (type == 1 || type == 2) 
    function send(arg) {
    sende.send(arg);
  }
  else if (type == 0) 
    function send(arg) {
    sende.reply(arg);
  }
  else 
    throw new ReferenceError('알려지지 않은 타입');
  var rfsT = Date.now();
  const path1 = path;
  var rpg = {};
  try {
    rpg[id] = tools.jead(path1 + 'user/' + id + '.json');
    rpg[id].name = name;
    tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
  }  catch (e) {
  rpg[id] = undefined;
}
  if (msg.startsWith(prefix)) {
    var ms = msg.slice(prefix.length + 1);
    if(ms == '도움말' || ms == '명령어') {
       var useThis = prefix+' ';
send('[ 알피지 도움말 BETA ]'+'\u200b'.repeat(500)+'\n\n\n'+[
useThis+'가입 : 알피지에 가입을 합니다.',
useThis+'인벤토리 : 자신의 인벤토리를 봅니다. ( 아이템 못얻음 )',
useThis+'정보 : 자신의 정보를 봅니다.',
useThis+'정보 (아이디) : 그 아이디의 유저의 정보를 봅니다.',
useThis+'유저목록 : ( 유저 이름 : 유저 아이디 ) 로 목록을 표시합니다.',
useThis+'사냥터 (숫자) : 사냥터를 지정합니다. ( 최대 200 )',
useThis+'사냥종료 : 사냥터에서 다시 돌아옵니다.',
useThis+'사냥시작 : 사냥터의 몹 목록을 표시합니다.',
useThis+'사냥시작 (아이디) : 그 아이디의 몹을 사냥합니다.',
useThis+'공격 : 사냥중인 몹을 공격합니다.',
useThis+'도움말 : 도움말을 표시합니다.',
useThis+'실행 (cmd) : eval'
].join('\n\n'));
      }
    if (ms == '가입') {
      if (rpg[id] != undefined) {
        tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
        send(name + '님, 이미 가입했어!\n[ ' + (Date.now() - rfsT) + 'ms ]');
      } else {
        rpg[id] = joinV(name, id);
        tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
        send(name + '님, 알피지 가입 완료했어!\n`;알피지 명렁어`\n[ ' + (Date.now() - rfsT) + 'ms ]');
      }
    } else if (rpg[id] != undefined) {
      if (ms == '인벤토리') {
        if (rpg[id].inv.length < 1) {
          send(name + '님, 인벤토리가 비어있어!\n[ ' + (Date.now() - rfsT) + 'ms ]');
        } else {
          var iL = '';
          for (var inv = 0; inv < rpg[id].inv.length; inv++) {
            var item = rpg[id].inv[inv];
            var itc = '[ Lv.' + item.lv + ' ] ( ' + item.rank + ' ) ' + item.name + ' ( Id : ' + inv + ' )\n' + line + '\n종류 : ' + typec[item.type] + '\n설명 : ' + item.description + '\n';
            var itb = '';
            if (item.maxhp != undefined) 
              itb += '최대 체력 +' + ac(item.maxhp) + '\n';
            if (item.armor != undefined) 
              itb += '방어력 +' + ac(item.armor) + '\n';
            if (item.regen != undefined) 
              itb += '자연 재생 +' + ac(item.regen) + '\n';
            if (item.dmg != undefined) 
              itb += '공격력 +' + ac(item.dmg) + '\n';
            if (item.critC != undefined) 
              itb += '치명타 확률 +' + item.critC + '%\n';
            if (item.critM != undefined) 
              itb += '치명타 뎀지 ' + (item.critM + 100) + '%\n';
            if (item.maxshield != undefined) 
              itb += '실드 +' + ac(item.maxshield) + '\n';
            if (item.miss != undefined) 
              itb += '회피율 +' + item.miss + '%\n';
            if (item.exit != undefined) 
              itb += '후퇴 가능 확률 +' + item.exit + '%\n';
            if (item.downcost != undefined) 
              itb += '흥정 +' + item.downcost + '%\n';
            if (item.regenM != undefined) 
              itb += '재생 배율 +' + (item.maxhp) / 100 + '%\n';
            if (rpg[id].inv[(inv) + 1] != undefined) {
              iL += itc + itb + line + '\n';
            } else {
              iL += itc + itb;
            }
          }
          send(name + '님의 인벤토리야!' + '​'.repeat(500) + '\n\n\n' + line + '\n' + iL);
        }
      }
      function Bar(Max, Normal, Num) {
        return ("█".repeat(Normal / Num) + "▓".repeat((Max - Normal) / Num));
      }      function mBar(count, max, barLength, showPercentage) {
        const BAR = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];
        let length = (barLength * count / max), dec = length % 1, int = length - dec, result = (BAR[8].repeat(int) + BAR[Math.round(dec * 8)]);
        let percentage = showPercentage ? ' ' + (count / max * 100).toFixed(2) + '%' : '';
        return (result + '   '.repeat(barLength - result.length)) + percentage;
      }      function bar(min, max) {
        return mBar(((min) / max) * 100, 100, 10, true);
      }      if (ms.startsWith('정보')) {
        var userInfo = "";
        var targetId;
        if (ms.length == 2) {
          targetId = id;
        } else if (ms.length == 3) {
          return send(name + '님, 정보 (아이디) 로 다른이의 정보를 볼 수 있어!');
        } else {
          targetId = ms.slice(3);
          if (FileStream.read('sdcard/' + path1 + 'user/' + targetId + '.json') == null) 
            return send(name + '님, `' + targetId + '` 아이디를 가진 유저는 없어!');
        }
        var status = ['ONLINE'];
        var dI = tools.jead(path1 + 'user/' + targetId + '.json');
        var iL = '';
        for (var inv = 0; inv < dI.inv.length; inv++) {
          var item = dI.inv[inv];
          var itc = '[ Lv.' + item.lv + ' ] ( ' + item.rank + ' ) ' + item.name + ' ( Id : ' + inv + ' )\n' + line + '\n종류 : ' + typec[item.type] + '\n설명 : ' + item.description + '\n';
          var itb = '';
          if (item.maxhp != undefined) 
            itb += '최대 체력 +' + ac(item.maxhp) + '\n';
          if (item.armor != undefined) 
            itb += '방어력 +' + ac(item.armor) + '\n';
          if (item.regen != undefined) 
            itb += '자연 재생 +' + ac(item.regen) + '\n';
          if (item.dmg != undefined) 
            itb += '공격력 +' + ac(item.dmg) + '\n';
          if (item.critC != undefined) 
            itb += '치명타 확률 +' + item.critC + '%\n';
          if (item.critM != undefined) 
            itb += '치명타 뎀지 ' + (item.critM + 100) + '%\n';
          if (item.maxshield != undefined) 
            itb += '실드 +' + ac(item.maxshield) + '\n';
          if (item.miss != undefined) 
            itb += '회피율 +' + item.miss + '%\n';
          if (item.exit != undefined) 
            itb += '후퇴 가능 확률 +' + item.exit + '%\n';
          if (item.downcost != undefined) 
            itb += '흥정 +' + item.downcost + '%\n';
          if (item.regenM != undefined) 
            itb += '재생 배율 +' + (item.maxhp) / 100 + '%\n';
          if (dI.inv[(inv) + 1] != undefined) {
            iL += itc + itb + line + '\n';
          } else {
            iL += itc + itb;
          }
        }
        userInfo = '[ Lv.' + ac(dI.lv) + ' ] ' + dI.name + "'s Profile\n\n" + line + '\n\n[ 경험치 ] : ' + ac(dI.exp) + '/' + ac(dI.expM) + '\n' + Bar(100, ((dI.exp) / dI.expM) * 100, 10) + ' ' + Math.floor((dI.exp / dI.expM) * 100) + '%\n\n' + line + '\n\n[ 코인 ] : ' + dI.btc + '코인\n\n[ 상태 ] : ' + (dI.map < 1 ? status[dI.map] : (dI.isAuto ? dI.map + ' 스테이지 - 자동사냥' : dI.map + ' 스테이지')) + '\n\n' + line + '\n' + line + '\n\n[ 인쇄 레벨 ] : ' + dI.abi.print + ' ( ' + dI.abi.printExp + '/' + dI.abi.printEM + ' )\n' + Bar(100, ((dI.abi.printExp) / dI.abi.printEM) * 100, 10) + ' ' + Math.floor((dI.abi.printExp / dI.abi.printEM) * 100) + '%\n\n[ 의학 지식 ] : ' + dI.abi.medic + '( ' + dI.abi.medicExp + '/' + dI.abi.medicEM + ' )\n' + Bar(100, ((dI.abi.medicExp) / dI.abi.medicEM) * 100, 10) + ' ' + Math.floor((dI.abi.medicExp / dI.abi.medicEM) * 100) + '%\n\n[ 탄약 제작 ] : ' + dI.abi.bullet + ' ( ' + dI.abi.bulletExp + '/' + dI.abi.bulletEM + ' )\n' + Bar(100, ((dI.abi.bulletExp) / dI.abi.bulletEM) * 100, 10) + ' ' + Math.floor((dI.abi.bulletExp / dI.abi.bulletEM) * 100) + '%\n\n[ 탐색 기술 ]: ' + dI.abi.search + ' ( ' + dI.abi.searchExp + '/' + dI.abi.searchEM + ' )\n' + Bar(100, ((dI.abi.searchExp) / dI.abi.searchEM) * 100, 10) + ' ' + Math.floor((dI.abi.searchExp / dI.abi.searchEM) * 100) + '%\n\n[ 채굴 기술 ] : ' + dI.abi.mine + ' ( ' + dI.abi.mineExp + '/' + dI.abi.mineEM + ' )\n' + Bar(100, ((dI.abi.mineExp) / dI.abi.mineEM) * 100, 10) + ' ' + Math.floor((dI.abi.mineExp / dI.abi.mineEM) * 100) + '%\n\n' + line + '\n' + line + '\n\n[ 최대 체력 ] : ' + ac(dI.status.maxhp) + '\n\n[ 방어력 ] : ' + ac(dI.status.armor) + '\n\n[ 자연 재생 ] : ' + ac(dI.status.regen) + '\n\n[ 공격력 ] : ' + ac(dI.status.dmg) + '\n\n[ 치명타 확률 ] : ' + (dI.status.critC < 40 ? dI.status.critC : 40) + '%' + '\n\n[ 치명타 뎀지 ] : ' + (dI.status.critM < 200 ? (dI.status.critM + 100) : 300) + '%' + '\n\n[ 실드 ] : ' + ac(dI.status.maxshield) + '\n\n[ 회피 ] : ' + (dI.status.miss < 40 ? dI.status.miss : 40) + '%' + '\n\n[ 후퇴 가능 확률 ] : ' + (dI.status.exit < 80 ? dI.status.exit : 80) + '%' + '\n\n[ 흥정 ] : ' + (dI.status.downcost < 40 ? dI.status.downcost : 40) + '%' + '\n\n[ 주머니 ] : ' + (dI.status.bag < 128 ? dI.status.bag : 128) + '\n\n[ 회복 배율 ] : ' + (dI.status.regenM < 100 ? dI.status.regenM : 100) + '%' + '\n\n' + line + '\n' + line + '\n\n' + line + '\n' + line + '\n' + (dI.inv.length < 1 ? '\n인벤토리가 비어있음' : iL);
        var info = dI.name + '님의 정보야!' + '​'.repeat(500) + '\n\n' + line + '\n\n' + userInfo;
        send(info);
      }
      if (ms == '유저목록') {
        var userI = tools.userList(path1 + 'user/', 'lv');
        var userIdList = '';
        for (var iii = 0; iii < userI.length; iii++) {
          var iiii = iii;
          if (userI[(iiii)++] == undefined) {
            userIdList += '\n\n' + userI[iii].name + ' : ' + userI[iii].id;
          } else {
            userIdList += '\n\n' + userI[iii].name + ' : ' + userI[iii].id + '\n\n' + line;
          }
        }
        send('[ rpg 유저 목록 ]' + '​'.repeat(500) + '\n\n\n' + line + userIdList);
      }
      if (ms.startsWith('사냥터 ')) {
        var stage = Number(ms.slice(4).split('.')[0]);
        if (isNaN(stage)) 
          return send(name + '님, `;알피지 사냥터 (숫자)` 로 적어줘!');
        if (stage < 1) 
          return send(name + '님, 사냥터 위치는 1 이상의 자연수로 써줘!');
        if ((200 < stage)) 
          return send(name + '님, 사냥터의 최대 위치는 200이야!');
        if (rpg[id].map == stage) 
          return send(name + '님, 이미 ' + stage + ' 스테이지에 있어!');
        rpg[id].map = stage;
        var aos = 1;
        var aon = 1;
        for (var i = 0; i < stage; i++) {
          aos *= 1.5 * 1.5;
          aon *= 1.5 * 1.2;
        }
        var mao = (Math.floor(aos) - Math.floor(aon));
        var maod = Math.floor(mao / 16);
        var enemyList = [];
        var enemy = {};
        if (stage == 1) {
          for (var i = 0; i < 2; i++) {
enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 1, 
  hp: 5, 
  shield: 1, 
  maxhp: 5, 
  maxshield: 1, 
  dmg: 1, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 10) + 10}};
            enemyList.push(enemy);
          }
          for (var i = 0; i < 7; i++) {
            enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 2, 
  hp: 10, 
  shield: 2, 
  maxhp: 10, 
  maxshield: 2, 
  dmg: 3, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 15) + 12}};
            enemyList.push(enemy);
          }
          for (var i = 0; i < 7; i++) {
            enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 3, 
  hp: 15, 
  shield: 3, 
  maxhp: 15, 
  maxshield: 3, 
  dmg: 5, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 30) + 15}};
            enemyList.push(enemy);
          }
        }
if (stage == 2) {
          for (var i = 0; i < 5; i++) {
  enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 3, 
  hp: 20, 
  shield: 5, 
  maxhp: 20, 
  maxshield: 5, 
  dmg: 9, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 40) + 50}};
            enemyList.push(enemy);
          }
          for (var i = 0; i < 5; i++) {
  enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 4, 
  hp: 36, 
  shield: 7, 
  maxhp: 36, 
  maxshield: 7, 
  dmg: 9, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 50) + 60}};
            enemyList.push(enemy);
          }
          for (var i = 0; i < 6; i++) {
            enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 3, 
  hp: 45, 
  shield: 10, 
  maxhp: 45, 
  maxshield: 10, 
  dmg: 11, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 60) + 70}};
            enemyList.push(enemy);
          }
        }
        if (stage == 3) {
          for (var i = 0; i < 5; i++) {
            enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 5, 
  hp: 45, 
  shield: 10, 
  maxhp: 45, 
  maxshield: 10, 
  dmg: 13, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 70) + 80}};
            enemyList.push(enemy);
          }
          for (var i = 0; i < 5; i++) {
            enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 7, 
  hp: 65, 
  shield: 15, 
  maxhp: 65, 
  maxshield: 15, 
  dmg: 15, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 80) + 90}};
            enemyList.push(enemy);
          }
          for (var i = 0; i < 6; i++) {
            enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 11, 
  hp: 80, 
  shield: 20, 
  maxhp: 80, 
  maxshield: 20, 
  dmg: 20, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 100) + 100}};
            enemyList.push(enemy);
          }
        }
        if (stage == 4) {
          for (var i = 0; i < 5; i++) {
            enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 10, 
  hp: 75, 
  shield: 15, 
  maxhp: 75, 
  maxshield: 15, 
  dmg: 25, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 150) + 110}};
            enemyList.push(enemy);
          }
          for (var i = 0; i < 5; i++) {
            enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 17, 
  hp: 100, 
  shield: 30, 
  maxhp: 100, 
  maxshield: 30, 
  dmg: 45, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 200) + 150}};
            enemyList.push(enemy);
          }
          for (var i = 0; i < 6; i++) {
            enemy = {
  name: Math.floor(Math.random() * 899) + 100, 
  lv: 25, 
  hp: 150, 
  shield: 50, 
  maxhp: 150, 
  maxshield: 50, 
  dmg: 65, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 300) + 200}};
            enemyList.push(enemy);
          }
        }
    if(4 < stage) {
        for (var i = 0; i < 16; i++) {
          var eL = maod * i + Math.floor(aon);
          enemy = {
  lv: eL, 
  hp: 45 * eL, 
  shield: 3 * eL, 
  maxhp: 45 * eL, 
  maxshield: 3 * eL, 
  dmg: 4 * eL, 
  critC: 0, 
  critM: 0, 
  miss: 0, 
  give: {
  exp: Math.floor(Math.random() * 15 * eL) + 10 * eL}};
          enemyList.push(enemy);
        }
    }
        rpg[id].enemy.list = enemyList;
        tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
        send(name + '님, ' + stage + ' 스테이지에 접속했어!' + '​'.repeat(500) + '\n\n적정 레벨: \n' + ac(Math.floor(aon)) + '\n\n ~ \n\n' + ac(Math.floor(aos)));
      }
      if (ms == '사냥종료') {
        if (rpg[id].enemy.fight != 0) 
          return send(name + '님, 아직 싸우는중이야!');
        if (rpg[id].map == 0) 
          return send(name + '님, 사냥중이지 않아!');
        rpg[id].map = 0;
        rpg[id].hp = rpg[id].maxhp;
        tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
        send(name + '님, 사냥을 종료했어!');
      }
      if (ms.startsWith('사냥시작')) {
        if (rpg[id].map == 0) 
          return send(name + '님, 사냥터가 지정되어있지 않아!');
        if (rpg[id].enemy.fight == 0) {
          if (ms.length == 4) {
            var enemyL = '';
            var enemyLa = rpg[id].enemy.list;
            for (var i = 0; i < enemyLa.length; i++) {
              var data = enemyLa[i];
              enemyL += '[ Lv.'+ac(data.lv)+' ] '+
              data.name+' ( Id : '+i+' )\n체력 : '+ac(data.hp)+' / '+ac(data.maxhp)+
              '\n실드 : '+ac(data.shield)+' / '+ac(data.maxshield)+
              '  공격력 : '+ac(data.dmg)+'\n보상 : '+ac(data.give.exp)+'exp\n\n';
            }
            return send('[ 몹 목록 ]'+'\u200b'.repeat(500)+'\n\n\n'+enemyL);
          }
          var enemyId = Number(ms.slice(5).split(".")[0]);
          if (enemyId < 0 || 15 < enemyId || isNaN(enemyId)) 
            return send(name + '님, 올바르지 않은 적 아이디야!');
            rpg[id].enemy.status = rpg[id].enemy.list[enemyId];
            rpg[id].enemy.fight = 1;
            tools.jrite(path1 + 'user/' + enemyId + '.json', rpg[id]);
            send(name+'님, [ Lv.'+rpg[id].enemy.status.lv+' ] '+rpg[id].enemy.status.name+
            ' 을 사냥시작했어!'+'\u200b'.repeat(500)+'\n\n\n'+'[ Lv.'+ac(rpg[id].enemy.list[enemyId].lv)+' ] '+
              rpg[id].enemy.list[enemyId].name+' ( Id : '+i+' )\n체력 : '+ac(rpg[id].enemy.list[enemyId].hp)+' / '+ac(rpg[id].enemy.list[enemyId].maxhp)+
              '\n실드 : '+ac(rpg[id].enemy.list[enemyId].shield)+' / '+ac(rpg[id].enemy.list[enemyId].maxshield)+
              '공격력 : '+ac(rpg[id].enemy.list[enemyId].dmg)+'\n보상 : '+ac(rpg[id].enemy.list[enemyId].give.exp)+'exp\n\n');
        } else 
          send(name + '님, 이미 사냥중이야!');
      }
      if(ms == '공격') {
       if(rpg[id].enemy.fight == 0) return send(name+'님, 사냥중이 아니야!');
       var critA = false;
       var attackD = 0;
       var winE = false;
       var loseHp = 0;
       if(tools.random((70 <= rpg[id].status.critC ? 70 : rpg[id].status.critC))) critA = true;
       if(critA) {
         attackD = Math.floor(rpg[id].status.dmg * ((rpg[id].critM + 100) / 100));
         }else attackD = rpg[id].status.dmg;
         rpg[id].enemy.status.hp -= attackD;
         if(rpg[id].enemy.status.hp <= 0) winE = true;
         else loseHp = (rpg[id].enemy.status.dmg - rpg[id].status.armor);
         if(loseHp <= 0) loseHp = 0;
         rpg[id].status.hp -= loseHp;
         if(rpg[id].status.hp <= 0) {
           rpg[id].enemy.fight = 0;
           rpg[id].status.hp = rpg[id].status.maxphp;
           tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
           return send('적이 너무 강력해서 사냥에 실패했어!');
           }
         if(!winE) {send(name+'님, '+rpg[id].enemy.status.name+' 에게 '+
         attackD+' 데미지를 입혔어!\n적 체력 : '+rpg[id].enemy.status.hp+' / '+rpg[id].enemy.status.maxhp);
         tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
         return send('적이 당신에게 '+loseHp+' 데미지를 입혔어!\n남은 체력 : '+rpg[id].status.hp+' / '+rpg[id].status.maxhp);}
         else
         {
           rpg[id].enemy.fight = 0;
           rpg[id].status.hp = rpg[id].status.maxhp;
           rpg[id].exp += rpg[id].enemy.status.give.exp;
           var upLevel = {is:false,amount:0};
           if(rpg[id].expM <= rpg[id].exp) upLevel.is = true;
           for(var i=0;i<1;i=i) {
             rpg[id].exp -= rpg[id].expM;
             upLevel.amount++;
             rpg[id].lv++;
             java.lang.Thread.sleep(30);
             if(!(rpg[id].expM <= rpg[id].exp)) i++;
           }
           if(upLevel.is) {
             for(var ko=0;ko<upLevel.amount;ko++){
             var userSI = rpg[id].status;
             userSI.maxhp = Math.floor(userSI.maxhp * 1.2 * 1.1);
             userSI.hp = userSI.maxhp;
             userSI.armor = (userSI.armor == 0 ? 3 : (Math.floor(userSI.armor * 1.2)));
             userSI.critC += 0.2;
             userSI.critM += 1;
             userSI.maxshield = Math.floor(userSI.maxshield * 1.1);
             userSI.shield = userSI.maxshield;
             userSI.miss += 0.2;
             userSI.exit += 0.2;
             userSI.regenM += 0.5;
             rpg[id].status = userSI;
             }
             tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
             return send(name+'님, '+rpg[id].enemy.status.name+' 을/를 잡아\n'+
             rpg[id].enemy.status.give.exp+'exp 를 얻고 레벨이 올랐어!\n'+rpg[id].lv+'렙 ( +'+
             upLevel.amount+' )');
           }
           tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
           return send(name+'님, '+rpg[id].enemy.status.name+' 을/를 잡아 \n'+
           rpg[id].enemy.status.give.exp+'exp 를 획득했어!');
         }
      }
      if (ms.startsWith('실행 ')) {
        if(true === false) send(name+'님, 이 명령어는 막혀있어!'); else
        try {
          send(eval(ms.slice(3)));
        }        catch (e) {
  send(e + ' ( #' + e.lineNumber + ' )');
}
      }
    tools.jrite(path1 + 'user/' + id + '.json', rpg[id]);
    }
  }
}
function dF(path, oD) {
  if (oD == undefined) 
    oD = '';
  var firstList = [];
  java.io.File(path).listFiles().map(e => firstList.push(String(e)));
  if (firstList.length == 0) 
    return '파일이 없음';
  var List = [];
  var result = oD;
  for (var i = 0; i < firstList.length; i++) {
    if (FileStream.remove(firstList[i])) {
      result += '삭제된 파일 : \n' + firstList[i] + '\n\n';
    } else {
      List.push(String(firstList[i]));
    }
    if ((firstList.length - 1) == i) {
      var Liist = [];
      if (0 < List.length) {
        for (var j = 0; j < List.length; j++) {
          result = dF(List[j], result);
        }
      }
    }
  }
  return result;
}
function delFile(path) {
  var ruN = '';
  for (var i = 0; i < 3; i++) {
    var testN = dF(path);
    if (testN != '파일이 없음') 
      ruN += testN;
  }
  return ruN;
}
function 문상(개수) {
  var i = 1;
  var result = '[ 문상 생성기 ]' + '​'.repeat(500) + '\n\n';
  if (isNaN(개수) || 개수 < 1 || 999 < 개수) 
    return '1부터 999만 받음';
  if (개수 < 10) {
    for (var j = 0; j < 개수; j++) {
      result += i + '. ' + gen(0) + '\n';
      i++;
    }
  } else if (9 < 개수 && 개수 < 100) {
    for (var j = 0; j < 개수; j++) {
      if (i < 10) {
        result += '0' + i + '. ' + gen(0) + '\n';
      } else {
        result += i + '. ' + gen(0) + '\n';
      }
      i++;
    }
  } else if (99 < 개수 && 개수 < 1000) {
    for (var j = 0; j < 개수; j++) {
      if (i < 10) {
        result += '00' + i + '. ' + gen(0) + '\n';
      } else if (i < 100) {
        result += '0' + i + '. ' + gen(0) + '\n';
      } else {
        result += i + '. ' + gen(0) + '\n';
      }
      i++;
    }
  }
  result += '\n'.repeat(500) + 'made by loop\n\nPs. 응~ 다 작동 안되는 가짜야';
  return result;
}
function gen(type) {
  var result = '';
  if (type == 0) {
    result += res(4) + '-' + res(4) + '-' + res(4) + '-' + res(6);
  } else if (type == 1) {
    result = 'discord.com/gifts/' + res(24);
  }
  return result;
}
function res(length) {
  var c = '0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += c[Math.floor(Math.random() * 10)];
  }
  return result;
}
var cH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function geK1(length) {
  var result = '';
  if(length <= 0) return '0';
  for(var i=0;i<length;i++) {
    result += cH[Math.floor(Math.random()*cH.length)];
  }
  return result;
}
function geK2(length) {
  return shuffleString(cH).slice(0, length);
}
function shuffleString(str) {
    var arr = str.split("");
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr.join("");
}
exports.on = on;
