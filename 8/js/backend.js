const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const BODY_NULL = null;

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '',
};

const ErrorMessage = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить данные в форме. Попробуйте ещё раз',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method, body, message) =>
  fetch(BASE_URL + route, { method, body })
    .then((response) => response.json())
    .catch(() => {
      throw new Error(message);
    });

const getData = () => load(Route.GET_DATA, Method.GET, BODY_NULL, ErrorMessage.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body, ErrorMessage.SEND_DATA);

export { getData, sendData };
