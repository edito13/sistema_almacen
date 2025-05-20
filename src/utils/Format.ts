class Format {
  constructor() {}

  date(DateTime: Date, format?: string) {
    const currentDate = new Date(DateTime);
    let day = currentDate.getDate();
    let month = 1 + currentDate.getMonth();
    const year = currentDate.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day.toString();
    const formattedMonth = month < 10 ? `0${month}` : month.toString();

    if (format === "yy-mm-dd")
      return `${year}-${formattedMonth}-${formattedDay}`;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }
}

const format = new Format();

export default format;
