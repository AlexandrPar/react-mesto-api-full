const BASE_URL = '//alexander.par.nomoredomains.sbs';

function getRequest(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json()
      .then(data => {
        throw new Error(data.error || data.message);
      });
  }
}

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(getRequest);
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(getRequest);
};

export const chekToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(getRequest);
};