const URL = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(`${URL}/data`)
    .then((response) => response.json())
    .then((offers) => onSuccess(offers))
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    `${URL}`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
