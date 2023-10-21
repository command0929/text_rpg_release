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
function generateId(length) {
  if (!isNaN(length) && (0 < length && length <= 52)) {
    var characters = "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6";
    var shuffled = shuffleString(characters).substring(0, length);
    return shuffled;
  } else {
    return undefined;
  }
}
var json = {
  read: function(path) {
  try{
    var readV = JSON.parse(FileStream.read('sdcard/'+path));
    }catch(e) {
    throw new TypeError('불러올 데이터가 옳지 않습니다.\n데이터 : sdcard/'+path);
    }
    return readV;
  },
  write: function(path1, input) {
  try{
  var writeV = JSON.stringify(input, null, 3);
  }catch(e) {
  throw new TypeError('저장할 데이터가 올바르지 않습니다.');
  }
    FileStream.write('sdcard/'+path1, writeV);
  }
};
function userList(path3, check) {
  var idList = [];
  var iLF = java.io.File('sdcard/'+path3).listFiles();
    for(var kj=0;kj<iLF.length;kj++) {
      try {
        var idD = JSON.parse(FileStream.read(iLF[kj]));
        if(idD[check] != 0) {
        var idData = {name: idD.name, id: idD.id};
        idList.push(idData);
        }
      }catch(e) {
      
      }
    }
    return idList;
}
function userFind(path4, obj, type) {
   var fFL = java.io.File('sdcard/'+path4).listFiles();
   var result = [];
   for(var fj=0;fj<fFL.length;fj++) {
     var fFI = JSON.parse(FileStream.read(fFL[fj]));
     if(type == 0) {
        if(fFI.name == obj) result.push(fFI.id);
     }else if(type == 1) {
       if(fFI.id == obj) result.push(fFI.name);
     }else throw new ReferenceError('선언되지 않은 검색 타입');
   }
 return result;
}
function rank(path2, max, type, check, score, score2, score3) {
  
    var ranking = [];
    var rp = [];
    var pF = java.io.File("sdcard/"+path2).listFiles();
    for (var i = 0; i < pF.length; i++) {
        var playerData = FileStream.read(pF[i]);
        rp.push(playerData);
    }
    for (var j = 0; j < rp.length; j++) {
      try{
        var playerObj = JSON.parse(rp[j]);
        }catch(e) {}
        if(playerObj == undefined) {
          throw new TypeError('파일을 불러올 수 없음');
        }
 if(playerObj[check] != 0){
            var score1 = {};
            if(playerObj[score2] != undefined && playerObj[score3] != undefined) {
             score1 = {
                name: playerObj.name,
                score: playerObj[score] + playerObj[score2] + playerObj[score3]
            };
            }else if(playerObj[score2] != undefined) {
             score1 = {
                name: playerObj.name,
                score: playerObj[score] + playerObj[score2]
            };
            }else{
             score1 = {
                name: playerObj.name,
                score: playerObj[score]
            };
            }
            ranking.push(score1);
    }
    }
    ranking.sort(function (a, b) {
        var scoreA = a.score;
        var scoreB = b.score;
        return scoreB - scoreA;
    });
    var result = "";
    for (var k = 0; k < max; k++) {
        if (ranking[k] !== undefined) {
            result += (k + 1) + "위 " + ranking[k].name + ": " + ranking[k].score + type+"\n\n";
        }
    }
  return result;
}
function random(str0) {
  return (Math.random()*100 < Number(str0));
}
function rv() {
  return (Math.random() * 100);
}
exports.id52 = generateId;
exports.jead = json.read;
exports.jrite = json.write;
exports.userList = userList;
exports.userFind = userFind;
exports.rank = rank;
exports.random = random;
exports.rv = rv;
