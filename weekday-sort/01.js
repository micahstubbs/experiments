function sortDays(days, locale) {
  var l = locale || "en";

  var sortOrder = {
    "en": [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ],
    "de": [
      "montag",
      "dienstag",
      "mittwoch",
      "donnerstag",
      "freitag",
      "samstag",
      "sonntag"
    ]
  }

  var inputLength = days[0].length;
  if(inputLength <= 5) { // if day names are abbreviated
    var list = sortOrder[l].map(function(el){return el.slice(0,inputLength)});
  } else {
    var list  = sortOrder[l];
  }

  return days.sort(function(a,b){
      return list.indexOf(a.toLowerCase()) > list.indexOf(b.toLowerCase());
  })
}

// tests
/*
var days = ["Thu", "Sun", "Tue"];
console.log(sortDays(days));

var days = ["Th", "Su", "Sa", "We"];
console.log(sortDays(days));

var days = ["Tuesday", "Friday", "Wednesday", "MONDAY", "thursday"]
console.log(sortDays(days));

var days = ["Tuesd", "Frida", "Wedne", "MONDA", "thurs"]
console.log(sortDays(days));
*/

function weekDay(string){
    var weekDays = {
      "en": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ],
      "de": [
        "montag",
        "dienstag",
        "mittwoch",
        "donnerstag",
        "freitag",
        "samstag",
        "sonntag"
      ]
    };

  var locales = ["en", "de"]

  var result = {
    "weekdaystring": false,
    "locale": ""
  }

  locales.some(function(l){
    console.log(l);
    console.log(containsString(string, weekDays[l]))
    if(containsString(string, weekDays[l])){ 
      result["weekdaystring"] = true;
      result["locale"] = l;
      return true;
    } 
      

    for(var i=2; i<6; i++){
      var abbreviatedWeekDays = weekDays[l].map(function(el){ return el.slice(0,i) });
      console.log(abbreviatedWeekDays);
      console.log(containsString(string, abbreviatedWeekDays));
      if(containsString(string, abbreviatedWeekDays)) {
        result["weekdaystring"] = true;
        result["locale"] = l;
        return true;
      } 
    }
  }) 
  return result; 
}

function containsWeekDays(array, n){
  var result;
  array.some(function(el , i){
    result = weekDay(el);
    if(!result["weekdaystring"]){ return true };
    if(n === i){ return true };
  })
  return result;
}

// compare the contents of two arrays
// if the target array contains each of the elements 
// in the source array from position 0 to position n
// return true
function contains(source, target, n){
  var contentsMatch = false;
  source.some(function(el, i, arr) {
    // end the iteration when we've looked at the first n elements
    if(i === n) return true;

    target.indexOf(source[i].toLowerCase()) > -1 ? contentsMatch = true : contentsMatch = false;

    // end the iteration if the current element is not a weekday string
    return target.indexOf(source[i].toLowerCase()) === -1 
  })
  return contentsMatch;
}

function containsString(source, target) {
  return target.indexOf(source.toLowerCase()) > -1 ? true : false;
}
  
// tests



var days = ["Tuesd", "Frida", "Wedne", "MONDA", "thurs"];
var source = "Thurs";

//console.log(containsString(source,days));
console.log(days);
console.log(containsWeekDays(days));
//console.log(days);
//console.log(containsWeekDays(days));
/*
var days = ["Tu", "Fr", "We", "MO", "th"];

var days = [
    "dienstag",
    "montag",
    "samstag",
    "mittwoch",
    "donnerstag",
    "freitag",
    "sonntag"
  ];


var days = [
    "di",
    "mo",
    "sa",
    "mi",
    "do",
    "fr",
    "so"
  ];

*/



