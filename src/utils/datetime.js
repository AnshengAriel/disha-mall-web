const fillZero = num => {
  return num > 9 ? num : '0' + num;
}

const getDateStr = timestamp => {
  let date = new Date(timestamp > 1000000000000 ? timestamp : timestamp * 1000);
  let Y = date.getFullYear();
  let M = fillZero(date.getMonth() + 1);
  let D = fillZero(date.getDate());
  let h = fillZero(date.getHours());
  let m = fillZero(date.getMinutes());
  let s = fillZero(date.getSeconds());
  return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}

const getDateTimeStr = timestamp => {
  let date = new Date(timestamp > 1000000000000 ? timestamp : timestamp * 1000);
  let M = fillZero(date.getMonth() + 1);
  let D = fillZero(date.getDate());
  let h = fillZero(date.getHours());
  let m = fillZero(date.getMinutes());
  return M + "-" + D + " " + h + ":" + m;
}

const getTimeStr = millis => {
  const date = new Date(millis || 0);
  let hoursStr = date.getUTCHours() > 0 ? fillZero(date.getUTCHours()) + ":" : '';
  return hoursStr + fillZero(date.getUTCMinutes()) + ":" + fillZero(date.getUTCSeconds());
}

const getLocalTimeStr = millis => {
  const date = new Date(millis || 0);
  let hoursStr = date.getHours() > 0 ? fillZero(date.getHours()) + ":" : '';
  return hoursStr + fillZero(date.getMinutes()) + ":" + fillZero(date.getSeconds());
}

const getTodayStartTime = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export {
  getDateStr, getTimeStr, getDateTimeStr, getLocalTimeStr, getTodayStartTime,
}