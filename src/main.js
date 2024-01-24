import lib from "lib";
console.log("main.js execute");
import(
  /* webpackChunkName:
"a" */ "./a.js"
);
import(
  /* webpackChunkName:
"b" */ "./b.js"
);
