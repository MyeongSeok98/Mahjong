const JSON = require("JSON");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const mySql = require("mysql");

var connection = mySql.createConnection({
  host: "localhost",
  user: "testuser",
  password: "1234",
  database: "test",
});

module.exports = {
  express: express,
  JSON: JSON,
  path: path,
  bodyParser: bodyParser,
  init: function () {
    return connection;
  },
  connect: function (conn) {
    conn.connect(function (err) {
      if (err) console.log("mysql error" + err);
      else console.log("sql 연결 성공");
    });
  },
};
