const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  GET: '/data',
  SEND: '',
};

const ErrorMessage = {
  GET: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND: 'Не удалось отправить данные в форме. Попробуйте ещё раз',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method, body, message) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => response.json())
    .catch(() => {
      throw new Error(message);
    });

const getData = () => load(Route.GET, Method.GET, null, ErrorMessage.GET);

const sendData = (body) => load(Route.SEND, Method.POST, body, ErrorMessage.SEND);

export { getData, sendData };
