var countries = require("i18n-iso-countries");
console.log("US (Alpha-2) => " + countries.getName("US", "en")); // United States
console.log("US (Alpha-2) => " + countries.getName("US", "de")); // Vereinigte Staaten von Amerika
console.log("US (Alpha-2) => " + countries.getName("US", "es")); // Estados Unidos de América
console.log("USA (Alpha-3) => " + countries.getName("USA", "en")); // United States
console.log("USA (Numeric) => " + countries.getName("840", "en")); // United States