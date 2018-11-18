export async function sendRequest(method, url, data) {
  const options = {
    method: method,
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return await fetch(url, options);
}