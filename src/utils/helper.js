const getRemainingSeconds = function (date) {
  const remaining = 60 * ((60 - date.getMinutes()) % 30) - date.getSeconds();
  return remaining;
};

const getDateWithoutTime = function (date = null) {
  const newDate = date ? date : new Date();
  return newDate.toLocaleDateString();
};

const pauseExecution = async function (time) {
  return await new Promise((resolve) => setTimeout(resolve, time));
};

const getUsername = function (user) {
  const member = user.member ? user.member : user;
  return member.nickname || member.user.username;
};

const botConnected = function (connection) {
  if (!connection) {
    return false;
  }
  return true;
};

module.exports = {
  getRemainingSeconds,
  getDateWithoutTime,
  pauseExecution,
  getUsername,
  botConnected
};
