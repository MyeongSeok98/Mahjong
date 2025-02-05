const myModules = require("./info");
const express = require("express");
const path = require("path");
const pesan = require("./modules/pesan");
const yaku = require("./modules/yaku");

const app = express();
const port = 3000;

//판, 부수 변수
var fan = 0;
var busu = 0;
// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/score", (req, res) => {
  console.log("점수계산 페이지");
  res.sendFile(path.join(__dirname, "score.html"));
  console.log(req.query);
  const dora = req.query.dora;
  const tsumo_ron = req.query.tsumo_ron;
  const riichi = req.query.riichi;
  const oya = req.query.oya;
  const doubleRiichi = req.query.double_riichi;
  const ippatsu = req.query.ippatsu;
  const chankan = req.query.chankan;
  const rinshanKaihou = req.query.rinshan_kaihou;
  const haitei = req.query.haitei;
  const menzen = req.query.menzen === "true";
  const doubletaiki = req.query.doubletaiki === "true";
  const prevalent = req.query.prevalent;
  const seat = req.query.seat;
  const ankou = req.query.ankou;
  const selectedTiles = req.query.selected_tiles
    ? req.query.selected_tiles.split(",")
    : [];

  console.log("Received tiles:", selectedTiles);
  console.log("도라 : " + dora);
  if (tsumo_ron == "tsumo") console.log("츠모");
  else console.log("론");
  if (ippatsu == "on") {
    fan += 1;
    console.log("일발");
  }
  if (riichi == "on") {
    console.log("리치");
    fan += 1;
  }
  if (oya == "on") console.log("오야");
  if (doubleRiichi == "on") console.log("더블리치");
  if (chankan == "on") console.log("창깡");
  if (rinshanKaihou == "on") console.log("영상개화");
  if (haitei == "on") console.log("해저로월");
  if (menzen == "on") console.log("멘젠");
  if (doubletaiki == "on") console.log("양면대기");

  console.log("장 : ", prevalent);

  const headBodyShunzu = pesan.identifyHeadAndBodyShunzu(selectedTiles);
  console.log("Body : ", headBodyShunzu.bodies);
  console.log("Head : ", headBodyShunzu.heads);

  const headBodyCouzu = pesan.identifyHeadAndBodyCouzu(selectedTiles);
  console.log("Body : ", headBodyCouzu.bodies);
  console.log("Head : ", headBodyCouzu.heads);

  const shuntsuFan = yaku.recognizeYaku(
    headBodyShunzu.heads,
    headBodyShunzu.bodies,
    ankou,
    menzen,
    doubletaiki,
    prevalent,
    seat
  );

  const couzuFan = yaku.recognizeYaku(
    headBodyCouzu.heads,
    headBodyCouzu.bodies,
    ankou,
    menzen,
    doubletaiki,
    prevalent,
    seat
  );
  if (couzuFan > shuntsuFan) {
    fan += couzuFan;
  } else {
    fan += shuntsuFan;
  }

  console.log("전체 판수 : ", fan);
  console.log(req.query);
});

app.get("/scorerule", (req, res) => {
  console.log("점수계산법");
  res.sendFile(path.join(__dirname, "scoreRule.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  //특정 포트에서 리스닝하고 있음을 알려주는 역활
});
