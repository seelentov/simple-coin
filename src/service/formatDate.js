export function formatDate(dateString) {

    const date = new Date(dateString);


    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];


    const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });


    const day = date.getDate();
    const month = months[date.getMonth()];


    const formattedDate = `${day} ${month} ${date.getFullYear()} ${time} (МСК)`;

    return formattedDate;
}

export function formatOnlyDate(dateString) {

  const date = new Date(dateString);


  const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
  ];


  const day = date.getDate();
  const month = months[date.getMonth()];


  const formattedDate = `${day} ${month} ${date.getFullYear()}`;

  return formattedDate;
}

export const formatOnlyDayMonth = (dateString) => {

  const dateObject = new Date(dateString);
  
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  
  const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;
  
  return formattedDate;
}