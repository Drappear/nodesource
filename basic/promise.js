// Promise 객체

import { reject } from "lodash";

function getData() {
  return new Promise((resolve, reject) => {
    let data = 100;
    resolve(data);
  });
}

getData()
  .then((data) => console.log(data))
    .catch();
  
