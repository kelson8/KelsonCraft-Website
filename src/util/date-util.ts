// https://howtodoinjava.com/typescript/typescript-date-object/
const currentDate = new Date();
// Adds one, this starts at 0
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const currentYear = currentDate.getFullYear();
// TODO Set these up later
// const currentSecond = currentDate.getSeconds();
// const currentMinute = currentDate.getMinutes();
// const currentHour = currentDate.getHours();

export class DateUtil {
  fullDate = currentDate.toLocaleDateString("en-US");
}
