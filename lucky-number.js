// «lucky» number cobsists only of 5 and 3,
// script should return the closest «lucky» number to any given one

function solution(number) {
  let arr = [...number.toString()].map((i) => i - 0);

  let fillLength = (arg, length) => {
    let result = "";
    for (let i = 0; i <= length; i++) {
      result += arg;
    }
    return result;
  };

  let terminalCase = fillLength("5", arr.length - 1);
  if (number >= Number(terminalCase)) {
    return fillLength("3", arr.length);
  }

  let check = (current, arr, previous) => {
    let next = arr[1];
    
    if (current < 3) {
      previous += "3";
      return previous.concat(fillLength("3", arr.length - 2));
    }

    if (current === 3 && next < 5) {
      previous += "3";
      return check(arr[1], arr.slice(1), previous);
    }

    if (current < 5) {
      previous += "5";
      return previous.concat(fillLength("3", arr.length - 2));
    }

    if (current === 5) {
      previous += "5";
      return check(arr[1], arr.slice(1), previous);
    }
  };

  return check(arr[0], arr, "");
}

console.log(solution(47560060));
// 5  == solution(4)
// 53  == solution(45)
// 53  == solution(48)
// 333  == solution(130)
// 333  == solution(98)
// 3333  == solution(949)
// 353  == solution(339)
