let array = ["ZKDNSV", "Hello", "FBKDFB", "DV", "sdfdsq"];

let newArray = array.forEach(function(e, index) {
  return (array[index] = e.toLowerCase());
});
console.log(newArray);

var array1 = ["a", "b", "c"];

array1.forEach(function(element) {
  console.log(element);
});

// expected
