async function requester(method, url, data) {
  const options = {};

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    options.headers = {
      ...options.headers,
      "X-Authorization": accessToken,
    };
  }

  if (method !== "GET") {
    options.method = method;
  }

  if (data) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };

    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
}

const get = requester.bind(null, "GET");
const post = requester.bind(null, "POST");
const put = requester.bind(null, "PUT");
const remove = requester.bind(null, "DELETE");

export default {
  get,
  post,
  put,
  remove,
};
