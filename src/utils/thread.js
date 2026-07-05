
function sleep(delay) {
  const start = (new Date()).getTime();
  while((new Date()).getTime() - start < delay) {
      continue
  }
}

export {
  sleep,
}