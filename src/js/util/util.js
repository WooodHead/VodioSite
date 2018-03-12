export function latinToPersian(string) {
  var latinNumbers = [
    /1/g,
    /2/g,
    /3/g,
    /4/g,
    /5/g,
    /6/g,
    /7/g,
    /8/g,
    /9/g,
    /0/g
  ];
  var latinToPersianMap = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
  var result = string;

  for (var index = 0; index < 10; index++) {
    result = result.replace(latinNumbers[index], latinToPersianMap[index]);
  }

  return result;
};

export function persianToLatin(string) {
  var latinToPersianMap = [
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
    /۰/g
  ];
  var latinNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  var result = string;

  for (var index = 0; index < 10; index++) {
    result = result.replace(latinToPersianMap[index], latinNumbers[index]);
  }

  return result;
}

export function convertSecondToString(second) {
  var hour = parseInt(second / 3600);
  var minute = parseInt((second - hour * 3600) / 60);
  if (hour != 0) {
    return hour + " ساعت و " + minute + " دقیقه";
  } else {
    return minute + " دقیقه";
  }
}
