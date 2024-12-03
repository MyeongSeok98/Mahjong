const pesan = require("./yaku");

function identifyHeadAndBodyShunzu(tiles) {
  tiles.sort();

  const bodies = []; // 몸통(세트) 배열
  const heads = []; // 머리(쌍) 배열
  const tileCount = {}; // 타일의 개수

  // 타일 개수 세기
  tiles.forEach((tile) => {
    if (!tileCount[tile]) {
      tileCount[tile] = 0;
    }
    tileCount[tile]++;
    //tileCount[tile] = (tileCount[tile] || 0) + 1;
  });

  // 몸통(세트) 찾기: 3개짜리 같은 타일 또는 연속된 3개 타일
  // 연속된 숫자 3개 세트 찾기
  const mTileNumbers = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m"];
  const pTileNumbers = ["1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p"];
  const sTileNumbers = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s"];

  for (let i = 0; i < mTileNumbers.length - 2; i++) {
    const sequence = [
      mTileNumbers[i],
      mTileNumbers[i + 1],
      mTileNumbers[i + 2],
    ];
    while (sequence.every((tile) => tileCount[tile] > 0)) {
      bodies.push(sequence); // 연속된 3개 세트 추가
      tileCount[sequence[0]] -= 1;
      tileCount[sequence[1]] -= 1;
      tileCount[sequence[2]] -= 1;
    }
  }

  for (let i = 0; i < pTileNumbers.length - 2; i++) {
    const sequence = [
      pTileNumbers[i],
      pTileNumbers[i + 1],
      pTileNumbers[i + 2],
    ];
    while (sequence.every((tile) => tileCount[tile] > 0)) {
      bodies.push(sequence); // 연속된 3개 세트 추가
      tileCount[sequence[0]] -= 1;
      tileCount[sequence[1]] -= 1;
      tileCount[sequence[2]] -= 1;
    }
  }

  for (let i = 0; i < sTileNumbers.length - 2; i++) {
    const sequence = [
      sTileNumbers[i],
      sTileNumbers[i + 1],
      sTileNumbers[i + 2],
    ];
    while (sequence.every((tile) => tileCount[tile] > 0)) {
      bodies.push(sequence); // 연속된 3개 세트 추가
      tileCount[sequence[0]] -= 1;
      tileCount[sequence[1]] -= 1;
      tileCount[sequence[2]] -= 1;
    }
  }
  // 같은 숫자 3개 세트 찾기
  for (const tile in tileCount) {
    while (tileCount[tile] >= 3) {
      bodies.push([tile, tile, tile]); // 3개짜리 세트 추가
      tileCount[tile] -= 3; // 몸통에 사용된 타일 3개를 감소
    }
  }

  // 머리(쌍) 찾기: 2개짜리 같은 타일
  for (const tile in tileCount)
    for (const tile in tileCount) {
      if (tileCount[tile] == 2) {
        heads.push(tile); // 2개짜리 타일을 머리로 추가
        tileCount[tile] -= 2; // 머리에서 2개를 사용했으므로 그만큼 감소
        break;
      }
    }

  return {
    bodies: bodies,
    heads: heads,
  };
}

function identifyHeadAndBodyCouzu(tiles) {
  tiles.sort();

  const bodies = []; // 몸통(세트) 배열
  const heads = []; // 머리(쌍) 배열
  const tileCount = {}; // 타일의 개수

  // 타일 개수 세기
  tiles.forEach((tile) => {
    if (!tileCount[tile]) {
      tileCount[tile] = 0;
    }
    tileCount[tile]++;
    //tileCount[tile] = (tileCount[tile] || 0) + 1;
  });
  // 같은 숫자 3개 세트 찾기
  for (const tile in tileCount) {
    while (tileCount[tile] >= 3) {
      bodies.push([tile, tile, tile]); // 3개짜리 세트 추가
      tileCount[tile] -= 3; // 몸통에 사용된 타일 3개를 감소
    }
  }
  // 몸통(세트) 찾기: 3개짜리 같은 타일 또는 연속된 3개 타일
  // 연속된 숫자 3개 세트 찾기
  const mTileNumbers = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m"];
  const pTileNumbers = ["1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p"];
  const sTileNumbers = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s"];

  for (let i = 0; i < mTileNumbers.length - 2; i++) {
    const sequence = [
      mTileNumbers[i],
      mTileNumbers[i + 1],
      mTileNumbers[i + 2],
    ];
    while (sequence.every((tile) => tileCount[tile] > 0)) {
      bodies.push(sequence); // 연속된 3개 세트 추가
      tileCount[sequence[0]] -= 1;
      tileCount[sequence[1]] -= 1;
      tileCount[sequence[2]] -= 1;
    }
  }

  for (let i = 0; i < pTileNumbers.length - 2; i++) {
    const sequence = [
      pTileNumbers[i],
      pTileNumbers[i + 1],
      pTileNumbers[i + 2],
    ];
    while (sequence.every((tile) => tileCount[tile] > 0)) {
      bodies.push(sequence); // 연속된 3개 세트 추가
      tileCount[sequence[0]] -= 1;
      tileCount[sequence[1]] -= 1;
      tileCount[sequence[2]] -= 1;
    }
  }

  for (let i = 0; i < sTileNumbers.length - 2; i++) {
    const sequence = [
      sTileNumbers[i],
      sTileNumbers[i + 1],
      sTileNumbers[i + 2],
    ];
    while (sequence.every((tile) => tileCount[tile] > 0)) {
      bodies.push(sequence); // 연속된 3개 세트 추가
      tileCount[sequence[0]] -= 1;
      tileCount[sequence[1]] -= 1;
      tileCount[sequence[2]] -= 1;
    }
  }

  // 머리(쌍) 찾기: 2개짜리 같은 타일
  for (const tile in tileCount)
    for (const tile in tileCount) {
      if (tileCount[tile] == 2) {
        heads.push(tile); // 2개짜리 타일을 머리로 추가
        tileCount[tile] -= 2; // 머리에서 2개를 사용했으므로 그만큼 감소
        break;
      }
    }

  return {
    bodies: bodies,
    heads: heads,
  };
}
// 타일 배열
const tiles = [
  "1m",
  "1m",
  "4m",
  "4m",
  "6m",
  "6m",
  "5s",
  "5s",
  "8s",
  "8s",
  "1s",
  "1s",
  "1z",
  "1z",
];

module.exports = {
  identifyHeadAndBodyShunzu,
  identifyHeadAndBodyCouzu,
};
/*
// identifyHeadAndBody 함수 호출
const result = identifyHeadAndBody(tiles);

// 결과 출력
console.log("Identified Bodies (Sets):", result.bodies);
console.log("Identified Heads (Pairs):", result.heads);
*/
