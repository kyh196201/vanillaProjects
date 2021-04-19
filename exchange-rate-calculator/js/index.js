import api from "./api.js";

api.getLatest().then((res) => {
  console.log(res);
});
