const dogAge = (data) => {
  return ((data.age / 10) * 2) - ((data.age / 57.7) * 0.921);
};

self.addEventListener('message', event => {
  console.log('event', event);
  const response = dogAge(event.data);
  event.ports[0].postMessage({ 'dogAge': response });
});
