function recognizeYaku(head, bodies, ankou, menzen, taiki, prevalent, seat) {
  let fan = 0;

  //장풍패 확인
  let foundPrevalent = false;
  if (prevalent == "east") {
    for (const body of bodies) {
      if (body.includes("1z")) {
        console.log("동장풍패");
        foundPrevalent = true;
      }
    }
  }
  if (prevalent == "south") {
    for (const body of bodies) {
      if (body.includes("2z")) {
        console.log("남장풍패");
        foundPrevalent = true;
      }
    }
  }

  //자풍패 확인
  let foundSeat = false;

  const seatMap = {
    east: "1z",
    south: "2z",
    west: "3z",
    north: "4z",
  };

  const seatTile = seatMap[seat];

  for (const body of bodies) {
    if (body.includes(seatTile)) {
      foundSeat = true;
      console.log("자리 : ", seat, "  자풍패 : ", seatTile);
    }
  }

  //연풍패 확인
  if (foundPrevalent && foundSeat) {
    fan += 2;
    console.log("연풍패 판수 + 2");
  } else if (foundPrevalent) {
    fan += 1;
    console.log("장풍패 판수 + 1");
  } else if (foundSeat) {
    fan += 1;
    console.log("자풍패 판수 + 1");
  }

  //탕야오인지 파악
  let tanyao = true;

  for (const tile of head) {
    if (isTanyao(tile) == false) {
      tanyao = false;
    }
  }

  for (const body of bodies) {
    for (const tile of body) {
      if (isTanyao(tile) == false) {
        tanyao = false;
      }
    }
  }

  if (tanyao) {
    fan += 1;
    console.log("탕야오");
  }
  //치또이츠인지 파악
  let foundChitoitsu = false;
  if (isChitoitsu(bodies)) {
    foundChitoitsu = true;
    console.log("치또이츠");
  }
  //이페코, 량페코인지 파악
  const sequences = {};
  var ippeko = 0;

  for (const body of bodies) {
    if (isShuntsu(body)) {
      const sequencekey = body.join(""); //배열 문자열 하나로 합치기 ex. 15,6,5 => 1565
      if (sequences[sequencekey] == null) {
        sequences[sequencekey] = 0;
      }
      sequences[sequencekey] += 1;
    }
  }

  var ippeko = 0;
  for (const count of Object.values(sequences)) {
    if (count >= 2) {
      ippeko += Math.floor(count / 2); // 동일 슌츠가 두 번 등장하면 한 쌍으로 취급
    }
  }

  if (ippeko >= 2) {
    console.log("량페코");
    fan += 3;
  } else if (foundChitoitsu) {
    console.log("치또이츠");
    fan += 2;
  } else if (ippeko == 1) {
    console.log("이페코");
    fan += 1;
  }

  //핑후 확인

  let isPinfu = true;
  for (const body of bodies) {
    if (!isShuntsu(body)) {
      isPinfu = false;
      break;
    }
  }

  if (isHonorTile(head[0]) || menzen == false || taiki != "double") {
    isPinfu = false;
  }

  if (isPinfu) {
    console.log("핑후");
    fan += 1;
  }

  //삼색동순인지 확인
  if (isSanshockuDoujin(bodies)) {
    console.log("삼색동순");
    fan += 2;
  }

  //일기통관인지 확인
  if (isIkkitsuukan(bodies)) {
    console.log("일기통관");
    fan += 2;
  }

  //또이또이인지 확인
  if (isToitoi(bodies)) {
    console.log("또이또이");
    fan += 2;
  }

  //산안커인지 확인
  if (ankou == 3) {
    console.log("산안커");
    fan += 2;
  }

  //삼색동관인지 확인
  if (isSanshokuDoukou(bodies)) {
    console.log("삼색동관");
    fan += 2;
  }

  //혼노두인지 확인
  if (isHonroutou(head, bodies)) {
    console.log("삼색동관");
    fan += 2;
  }
  //소삼원인지 확인
  if (isShousangen(head, bodies)) {
    console.log("소삼원");
    fan += 2;
  }
  //청일색인지 확인
  let triggerChinniisou = false;
  if (isChiniisou(head, bodies)) {
    console.log("청일색");
    fan += 6;
    triggerChinniisou = true;
  }
  //혼일색인지 확인
  if (isHoniisou(head, bodies) && !triggerChinniisou) {
    console.log("혼일색");
    fan += 3;
  }
  console.log("판수 : ", fan);
  return fan;
}

//자패인지 확인하는 함수
function isHonorTile(tile) {
  return ["1z", "2z", "3z", "4z", "5z", "6z", "7z"].includes(tile);
}
//탕야오인지 확인 함수
function isTanyao(tiles) {
  const noTanyaoTiles = [
    "1m",
    "9m",
    "1p",
    "9p",
    "1s",
    "9s", // 끝 수 패
    "1z",
    "2z",
    "3z",
    "4z",
    "5z",
    "6z",
    "7z", // 문자패
  ];

  return !noTanyaoTiles.includes(tiles);
}
//슌쯔인지 확인하는 함수
function isShuntsu(body) {
  const [tile1, tile2, tile3] = body;
  return (
    tile1[1] === tile2[1] &&
    tile2[1] === tile3[1] && // 같은 종류인지 (m, p, s)
    parseInt(tile2[0]) === parseInt(tile1[0]) + 1 &&
    parseInt(tile3[0]) === parseInt(tile2[0]) + 1
  );
}
//커쯔인지 확인하는 함수
function isKoutsu(body) {
  const [tile1, tile2, tile3] = body;

  return tile1 == tile2 && tile2 == tile3;
}

//치또이츠인지 판별하는 함수
function isChitoitsu(bodies) {
  const allTiles = [];

  bodies.forEach((body) => allTiles.push(...body));

  const tileCount = {};
  for (const tile of allTiles) {
    if (!tileCount[tile]) {
      tileCount[tile] = 0;
    }
    tileCount[tile]++;
  }

  // 치또이츠 조건: 정확히 7쌍 (각 타일이 2번 등장)
  const pairCount = Object.values(tileCount).filter(
    (count) => count === 2
  ).length;

  return pairCount === 6; // 7쌍이면 치또이츠
}

//삼색동순 판별함수
function isSanshockuDoujin(bodies) {
  const mTiles = [];
  const pTiles = [];
  const sTiles = [];

  for (const body of bodies) {
    if (isShuntsu(body)) {
      if (body[0].endsWith("m")) mTiles.push(body.join(""));
      if (body[0].endsWith("p")) pTiles.push(body.join(""));
      if (body[0].endsWith("s")) sTiles.push(body.join(""));
    }
  }

  for (let i = 1; i <= 7; i++) {
    const hasM = mTiles.includes(`${i}m${i + 1}m${i + 2}m`);
    const hasP = pTiles.includes(`${i}p${i + 1}p${i + 2}p`);
    const hasS = sTiles.includes(`${i}s${i + 1}s${i + 2}s`);

    if (hasM && hasP && hasS) {
      return true; // 삼색동순 발견
    }
  }

  return false; // 삼색동순 없음
}

//일기통관 판별함수
function isIkkitsuukan(bodies) {
  const mSequences = new Set();
  const pSequences = new Set();
  const sSequences = new Set();

  // bodies에서 각 슌츠를 문양별로 구분하여 Set에 추가
  for (const body of bodies) {
    if (isShuntsu(body)) {
      const sequenceKey = body.join(""); // '1m2m3m' 형태로 변환
      if (body[0].endsWith("m")) mSequences.add(sequenceKey);
      if (body[0].endsWith("p")) pSequences.add(sequenceKey);
      if (body[0].endsWith("s")) sSequences.add(sequenceKey);
    }
  }

  // 일기통관 확인에 필요한 세트
  const ikkitsuukanSequences = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  // 특정 문양에서 일기통관 여부 확인
  function checkIkkitsuukan(sequences, tileType) {
    return ikkitsuukanSequences.every((seq) =>
      sequences.has(seq.map((num) => num + tileType).join(""))
    );
  }

  // 만(m), 통(p), 삭(s) 각각에 대해 일기통관 확인
  if (
    checkIkkitsuukan(mSequences, "m") ||
    checkIkkitsuukan(pSequences, "p") ||
    checkIkkitsuukan(sSequences, "s")
  ) {
    return true; // 일기통관 발견
  }

  return false; // 일기통관 없음
}
//또이또이 판별함수
function isToitoi(bodies) {
  let foundKoutsuCount = 0;
  for (const body of bodies) {
    if (isKoutsu(body)) {
      foundKoutsuCount += 1;
    }
  }
  return foundKoutsuCount == 4;
}
//삼색동각 판별함수
function isSanshokuDoukou(bodies) {
  const mTiles = [];
  const pTiles = [];
  const sTiles = [];

  // 각 몸통에서 같은 타일 3개를 찾아서 m, p, s 배열에 추가
  for (const body of bodies) {
    if (body[0][0] === body[1][0] && body[1][0] === body[2][0]) {
      // 같은 타일이 3개인 경우 (동각)
      if (body[0].endsWith("m")) mTiles.push(body[0]);
      if (body[0].endsWith("p")) pTiles.push(body[0]);
      if (body[0].endsWith("s")) sTiles.push(body[0]);
    }
  }

  // 각 색상에서 같은 번호의 타일이 존재하는지 확인
  for (let i = 1; i <= 9; i++) {
    const hasM = mTiles.includes(`${i}m`);
    const hasP = pTiles.includes(`${i}p`);
    const hasS = sTiles.includes(`${i}s`);

    if (hasM && hasP && hasS) {
      return true; // 삼색동각 발견
    }
  }

  return false; // 삼색동각 없음
}
//혼노두 판별함수
function isHonroutou(head, bodies) {
  // 타일 종류 확인 함수 (1, 9, 자패: 백, 발, 중만 허용)
  const isHonorTile = (tile) => {
    const honorTiles = [
      "1m",
      "9m",
      "1p",
      "9p",
      "1s",
      "9s",
      "1z",
      "2z",
      "3z",
      "4z",
      "5z",
      "6z",
      "7z",
    ]; // 자패 포함
    return honorTiles.includes(tile);
  };

  // 헤드가 1개 타일일 경우 그 타일이 혼노두 조건에 맞는지 확인
  if (!isHonorTile(head)) {
    return false; // 헤드가 1, 9, 자패가 아니면 혼노두가 아님
  }

  // 바디가 모두 혼노두 조건에 맞는지 확인
  for (const body of bodies) {
    if (!isKoutsu(body)) {
      return false;
    }
    for (const tile of body) {
      if (!isHonorTile(tile)) {
        return false; // 바디 안에 중간 숫자나 다른 타일이 포함되면 안됨
      }
    }
  }
  return true; // 헤드와 바디 모두 혼노두 조건에 맞으면 true 반환
}
//소삼원인지 확인하는 함수
function isShousangen(head, bodies) {
  // 삼원패 정의 (5z, 6z, 7z)
  const honorTiles = ["5z", "6z", "7z"];

  let pairCount = false;
  let bodyCount = 0;

  // 헤드가 삼원패에 해당하는지 확인
  if (honorTiles.includes(head)) {
    pairCount = true;
  }

  // 몸체에서 삼원패 타일을 포함하는 셋을 찾음
  for (const body of bodies) {
    if (honorTiles.some((tile) => body.includes(tile))) {
      bodyCount += 1;
    }
  }

  // 두 개 이상의 셋이 삼원패를 포함하는지 확인
  if (pairCount && bodyCount >= 2) {
    return true;
  }

  return false;
}

//준찬타인지 확인하는 함수
function isJunchantaiyaochuu(head, bodies) {
  const noduTiles = ["1m", "9m", "1p", "9p", "1s", "9s"];
  return body.every((tile) => noduTiles.includes(tile));
}
//혼일색인지 확인하는 함수
function isHoniisou(head, bodies) {
  const mTiles = [];
  const pTiles = [];
  const sTiles = [];
  const zTiles = [];

  for (const tile of head) {
    if (tile.endsWith("m")) mTiles.push(tile);
    if (tile.endsWith("p")) pTiles.push(tile);
    if (tile.endsWith("s")) sTiles.push(tile);
    if (tile.endsWith("z")) zTiles.push(tile);
  }

  for (const body of bodies) {
    for (const tile of body) {
      if (tile.endsWith("m")) mTiles.push(tile);
      if (tile.endsWith("p")) pTiles.push(tile);
      if (tile.endsWith("s")) sTiles.push(tile);
      if (tile.endsWith("z")) zTiles.push(tile);
    }
  }

  if (
    (mTiles.length && sTiles.length == 0 && pTiles.length == 0) ||
    (sTiles.length && mTiles.length == 0 && pTiles.length == 0) ||
    (pTiles.length && sTiles.length == 0 && mTiles.length == 0) ||
    (zTiles.length &&
      mTiles.length == 0 &&
      pTiles.length == 0 &&
      sTiles.length == 0)
  ) {
    return true;
  }
  return false;
}

//청일색인지 확인하는 함수
function isChiniisou(head, bodies) {
  const mTiles = [];
  const pTiles = [];
  const sTiles = [];
  const zTiles = [];

  if (head) {
    for (const tile of head) {
      if (tile.endsWith("m")) mTiles.push(tile);
      if (tile.endsWith("p")) pTiles.push(tile);
      if (tile.endsWith("s")) sTiles.push(tile);
      if (tile.endsWith("z")) zTiles.push(tile);
    }
  }

  for (const body of bodies) {
    for (const tile of body) {
      if (tile.endsWith("m")) mTiles.push(tile);
      if (tile.endsWith("p")) pTiles.push(tile);
      if (tile.endsWith("s")) sTiles.push(tile);
      if (tile.endsWith("z")) zTiles.push(tile);
    }
  }

  if (
    (mTiles.length &&
      sTiles.length == 0 &&
      pTiles.length == 0 &&
      zTiles.length == 0) ||
    (sTiles.length &&
      mTiles.length == 0 &&
      pTiles.length == 0 &&
      zTiles.length == 0) ||
    (pTiles.length &&
      sTiles.length == 0 &&
      mTiles.length == 0 &&
      zTiles.length == 0)
  ) {
    return true;
  }
  return false;
}
module.exports = {
  recognizeYaku,
  isShuntsu,
};
// 장풍패 이페코 확인
/*
const head = "2m";
const bodies = [
  ["1m", "2m", "3m"], // 슌츠
  ["1m", "2m", "3m"], // 동일 슌츠
  ["1z", "1z", "1z"], // 슌츠
  ["2z", "2z", "2z"], // 동일 슌츠
];

recognizeYaku(head, bodies, true, true, "east", "east");
*/

//량페코 핑후 확인
/*
const head = "7z";
const bodies = [
  ["5z", "5z", "5z"], // 슌츠
  ["6z", "6z", "6z"], // 동일 슌츠
  ["1m", "1m", "1m"], // 슌츠
  ["6p", "7p", "8p"], // 동일 슌츠
];

recognizeYaku(head, bodies, true, true, "east", "east");
*/
