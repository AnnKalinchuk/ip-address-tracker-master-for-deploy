import moment from "moment-timezone";

const timezoneFormat = (timeZone) => {
  const currentTime = moment.tz(moment(), timeZone);

  const offsetMinutes = currentTime.utcOffset();

  const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
  const offsetMinutesRemainder = Math.abs(offsetMinutes % 60);
  const offsetSign = offsetMinutes >= 0 ? "+" : "-";
  const offsetFormatted = ` ${offsetSign}${offsetHours
    .toString()
    .padStart(2, "0")}:${offsetMinutesRemainder.toString().padStart(2, "0")}`;

  return offsetFormatted;
};

export default timezoneFormat;
