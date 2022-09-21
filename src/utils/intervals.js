const { setDriftlessInterval, clearDriftless } = require('driftless');

const intervals = new Set();

const startInterval = function (func, timeout) {
  const id = setDriftlessInterval(func, timeout);
  intervals.add(id);
  return id;
};

const stopInterval = function (id) {
  intervals.delete(id);
  clearDriftless(id);
};

const clearIntervals = function () {
  intervals.forEach((id) => {
    stopInterval(id);
    clearDriftless(id);
  });
};

const getIntervals = function () {
  const intervalList = Array.from(intervals);
  return intervalList;
};

module.exports = {
  startInterval,
  stopInterval,
  clearIntervals,
  getIntervals
};
