const scoreTable = {
  //25부, 20부, 30부, 40부, 50부, 60부, 70부 순으로
  ko: [
    [null, null, 1000, 1300, 1600, 2000, 2300],
    [1600, 1300, 2000, 2600, 3200, 3900, 4500],
    [3200, 2600, 3900, 5200, 6400, 7700, 8000],
    [6400, 5200, 7700, 8000, 8000, 8000, 8000],
  ],
  oya: [
    [null, null, 1500, 2000, 2400, 2900, 3400],
    [2400, 2000, 2900, 3900, 4800, 5800, 6800],
    [4800, 3900, 5800, 7700, 9600, 11600, 12000],
    [9600, 700, 11600, 12000, 12000, 12000, 12000],
  ],
};

const scoreCaculate = function ScoreCalculate(fan, busu, chitoitsu, oya) {
  var totalScore;
  var scoreFan = fan - 1;
  var scoreBusu;
  //치또이츠일 경우 활성화
  if (chitoitsu && busu == 25) scoreBusu = 0;
  else {
    scoreBusu = Math.ceil(busu / 10) - 1;
  }
  //오야인 경우 점수 계산
  if (oya) {
    if (scoreFan < 4) totalScore = scoreTable.oya[scoreFan][scoreBusu];
    else if (scoreFan == 4) totalScore = 12000;
    else if (scoreFan >= 5 && scoreFan <= 6) totalScore = 18000;
    else if (scoreFan >= 7 && scoreFan <= 9) totalScore = 24000;
    else if (scoreFan >= 10 && scoreFan <= 11) totalScore = 36000;
    else if (scoreFan >= 12) totalScore = 48000;
  }
  //오야가 아닐 경우 점수 계산
  else {
    if (scoreFan < 4) totalScore = scoreTable.ko[scoreFan][scoreBusu];
    else if (scoreFan == 4) totalScore = 8000;
    else if (scoreFan >= 5 && scoreFan <= 6) totalScore = 12000;
    else if (scoreFan >= 7 && scoreFan <= 9) totalScore = 16000;
    else if (scoreFan >= 10 && scoreFan <= 11) totalScore = 24000;
    else if (scoreFan >= 12) totalScore = 32000;
  }
  return totalScore;
};
