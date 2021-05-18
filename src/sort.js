const array = [
  "123a4567",
  "123d45",
  "12d3456789",
  "1sf23",
  "1234",
  "1d234s5678",
  "12s",
  "1d",
];

const numArray = [1234567, 12345, 123456789, 12, 1234, 12345678, 12, 1];

const sort = (array, comparison) => {
  if (comparison) {
    for (let j = 0; j < array.length - 1; j++) {
      for (let i = 0; i < array.length - 1; i++) {
        if (comparison(array[i], array[i + 1])) {
          let tempVal = array[i];
          array[i] = array[i + 1];
          array[i + 1] = tempVal;
        }
      }
    }
    return array;
  } else return array.sort();
};


console.log(sort(array, (a, b) => {
    if (typeof a === "string") return a.length > b.length ? true : false;
    if (typeof a === "number") return a > b ? true : false;
  }));
