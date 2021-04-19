const API_ENDPOINT = "https://api.exchangeratesapi.io/";

function getLatest() {
  return fetch(API_ENDPOINT);
}

export default { getLatest };
