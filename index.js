const myModules = require("./info");
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/score", (req, res) => {
  console.log("점수계산 페이지");
  res.sendFile(path.join(__dirname, "score.html"));
  const dora = req.query.dora;
  const tsumo_ron = req.query.tsumo_ron;
  const ippatsu = req.query.ippatsu;
  const riichi = req.query.riichi;
  const oya = req.query.oya;

  console.log("도라 : " + dora);
  if (tsumo_ron == "tsumo") console.log("츠모");
  else console.log("론");
  if (ippatsu == "on") console.log("일발");
});

app.get("/scorerule", (req, res) => {
  console.log("점수계산법");
  res.sendFile(path.join(__dirname, "scoreRule.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  //특정 포트에서 리스닝하고 있음을 알려주는 역활
});
