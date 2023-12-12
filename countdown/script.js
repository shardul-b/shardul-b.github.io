const appendZero = (val) => {
  return val < 10 ? '0' + val : val;
};
const getTimeUntilNextDay = () => {
  let currentDate = new Date();
  let nextDate = new Date('2023-12-18T00:00:00+05:30');
  console.log(nextDate);
  //next day
  // nextDate.setDate(nextDate.getDate() + 1);
  //midnight
  nextDate.setHours(0, 0, 0, 0);
  //difference
  let diff = nextDate - currentDate;
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 3600 * 24));
  // console.log(hours, minutes, seconds);
  const timeLeftString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  document.querySelector('.container').textContent = `${timeLeftString}`;
};

getTimeUntilNextDay();
setInterval(getTimeUntilNextDay, 1000);
