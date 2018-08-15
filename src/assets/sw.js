const dogAge = (data) => {
  return ((data.age / 10) * 2) - ((data.age / 57.7) * 0.921);
};

onmessage = event => {
  console.log('event', event);
  const response = dogAge(event.data);
  postMessage({ 'dogAge': response });
};
