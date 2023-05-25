import moment from 'moment';

export const getYesterday = () => {
  return ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date()).toISOString().slice(0, 10);
};

export const getInYesterday = () => {
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1)
  const convert = new Date(yesterday).getFullYear() + '-' + formatDate(new Date(yesterday).getMonth() + 1) + '-' + formatDate(new Date(yesterday).getDate())
  return convert
}


export function removeAccents(str) {
  var accentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"
  ];
  for (var i = 0; i < accentsMap.length; i++) {
    var re = new RegExp('[' + accentsMap[i].substr(1) + ']', 'g');
    var char = accentsMap[i][0];
    str = str.replace(re, char);
  }


  return str.trim().toLowerCase();
}

//format giá trị
export function formatDate(value: number) {
  if (value < 10) return '0' + value;
  return value;
}

export function disabledDateCurrent(date) {
  const current = moment()
  const convert = current.year() + '-' + (current.month() + 1) + '-' + current.date()
  return date && date > moment(convert)
}

//sort table columns
export function sortTableString(value1, value2, index) {
  // let row1: number = 0;
  // let row2: number = 0;


  if (value1[index] === null || value1[index] === 0 || value1[index] === '0') value1[index] = ''
  else if (value1[index].toString().indexOf('/') > -1) {
    let convertValue1 = value1[index].split('/');
    if ((convertValue1[0] === 0 && convertValue1[1] === 0) || (convertValue1[0] === "0" && convertValue1[1] === "0")) value1[index] = 0
    else value1[index] = convertValue1[0] / convertValue1[1];
  } else if (value1[index].toString().indexOf('%') > -1) {
    let convertValue1 = value1[index].split('%');
    value1[index] = convertValue1[0];
  }
  // else if (parseFloat(value1[index]).toFixed(3).indexOf('.') > -1) {
  //   value1[index] = Number(parseFloat(value1[index]).toFixed(0));
  // } else value1[index] = value1[index]?.length

  if (value2[index] === null || value2[index] === 0 || value2[index] === '0') value2[index] = ''
  else if (value2[index].toString().indexOf('/') > -1) {
    let convertValue2 = value2[index].split('/');
    if ((convertValue2[0] === 0 && convertValue2[1] === 0) || (convertValue2[0] === "0" && convertValue2[1] === "0")) value2[index] = 0
    else value2[index] = convertValue2[0] / convertValue2[1];
  } else if (value2[index].toString().indexOf('%') > -1) {
    let convertValue2 = value2[index].split('%');
    value2[index] = convertValue2[0];
  }
  return value1[index].toString() - value2[index].toString()
}

function getDivision(number, subLength) {
  let intNumber = parseInt(number);
  return Math.pow(10, intNumber.toString().length - subLength);
}

export function getMaxLineChart(maxValue, percent, interval) {
  if (maxValue < 0) return maxValue
  if (maxValue === 0) return 0
  if (maxValue > 0 && maxValue <= 0.1) return 0.12
  if (maxValue > 0.1 && maxValue < 0.4) return 0.4
  if (maxValue >= 0.4 && maxValue < 0.8) return 0.9
  if (maxValue >= 0.8 && maxValue < 1) return 1
  if (maxValue >= 1 && maxValue < 4) return 4
  if (maxValue >= 4 && maxValue < 8) return 8
  if (maxValue >= 8 && maxValue < 10) return 12
  // if (maxValue < 10) return 10;
  // else if (maxValue > 10 && maxValue < 100) return 100;

  let max = maxValue + maxValue * percent; //4636
  let division = getDivision(max, 1); //1000
  let result = Math.floor(max / division) * division + division; // 5000
  let divisionResult = getDivision(max, 2); //100
  let totalLength = maxValue.toString().length;
  if (totalLength === Number(division.toFixed(0)).toString().length)
    divisionResult = division;
  while (true) {
    if (result % interval === 0) break;
    result += divisionResult;
  }
  return result;
}

export function titleCase(str) {
  const strNotUnitKey = removeAccents(str)
  const splitStr = strNotUnitKey.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[0] = splitStr[0].toLowerCase();
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join('');
}

export function switchSliderOne(length, configs) {
  switch (length) {
    // eslint-disable-next-line
    case 7: {
      configs.slider.start = 0;
      configs.slider.end = 0.9
    }
      break;
    // eslint-disable-next-line
    case 8: {
      configs.slider.start = 0;
      configs.slider.end = 0.8
    }
      break;
    // eslint-disable-next-line
    case 9: {
      configs.slider.start = 0;
      configs.slider.end = 0.7
    }
      break;
    // eslint-disable-next-line
    case 10: {
      configs.slider.start = 0;
      configs.slider.end = 0.6
    }
      break;
    // eslint-disable-next-line
    case 11: {
      configs.slider.start = 0;
      configs.slider.end = 0.5
    }
      break;
    // eslint-disable-next-line
    case 12: {
      configs.slider.start = 0;
      configs.slider.end = 0.5
    }
      break;
    // eslint-disable-next-line
    default: {
      configs.slider.start = 0;
      configs.slider.end = 1
    }
  }
}

export function switchSliderTwo(length, configs) {
  switch (length) {
    // eslint-disable-next-line
    case 7: {
      configs.slider.start = 0.2;
      configs.slider.end = 1
    }
      break;
    // eslint-disable-next-line
    case 8: {
      configs.slider.start = 0.3;
      configs.slider.end = 1
    }
      break;
    // eslint-disable-next-line
    case 9: {
      configs.slider.start = 0.4;
      configs.slider.end = 1
    }
      break;
    // eslint-disable-next-line
    case 10: {
      configs.slider.start = 0.5;
      configs.slider.end = 1
    }
      break;
    // eslint-disable-next-line
    case 11: {
      configs.slider.start = 0.5;
      configs.slider.end = 1
    }
      break;
    // eslint-disable-next-line
    case 12: {
      configs.slider.start = 0.6;
      configs.slider.end = 1
    }
      break;
    // eslint-disable-next-line
    default: {
      configs.slider.start = 0;
      configs.slider.end = 1
    }
      break;
  }
}

export function configDefaultSliderChart(length) {
  let configSlider = {
    start: 0,
    end: 1,
  }

  switch (length) {
    case 7: {
      return configSlider = {
        start: 0.2,
        end: 1,
      }
    }

    case 8: {
      return configSlider = {
        start: 0.3,
        end: 1,
      }
    }
    case 9: {
      return configSlider = {
        start: 0.4,
        end: 1,
      }
    }
    case 10: {
      return configSlider = {
        start: 0.5,
        end: 1,
      }
    }
    case 11: {
      return configSlider = {
        start: 0.5,
        end: 1,
      }
    }
    case 12: {
      return configSlider = {
        start: 0.6,
        end: 1,
      }
    }
    default: {
      // eslint-disable-next-line
      return configSlider = {
        start: 0,
        end: 1,
      }
    }
  }
}