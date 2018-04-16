/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
  const readDate = (function(){
    const days = ["Пн", "Вт", "Cр", "Чт", "Пт", "Сб", "Вс"];
    const months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентярь", "октябрь", "ноябрь", "декабрь"];
    return {
      weekDay: function(number){
        return days[number];
      },
      month: function(number){
        return months[number];
      }
    };
  })();
/* harmony export (immutable) */ __webpack_exports__["a"] = readDate;

  const setShortCuts = (function() {
    return function(key, func){
      return function(e) {
        if ( e.keyCode === key) func();
      };
    }
  })();
/* harmony export (immutable) */ __webpack_exports__["b"] = setShortCuts;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar__ = __webpack_require__(2);

window.onload = function(){
  const page = new __WEBPACK_IMPORTED_MODULE_0__calendar__["a" /* default */];
  page.showCalendar();
  document.querySelector("#next-page").onclick = function () { page.nextPage() };
  document.querySelector("#prev-page").onclick = function () { page.prevPage() };
  document.querySelector("#today-page").onclick = function () { page.todayPage() };
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__day__ = __webpack_require__(3);



const Calendar = function () {
    this.currentMonth = (new Date).getMonth();
    this.currentYear = (new Date).getFullYear();
    this.days = [];
    this.today = {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
    window.addEventListener("keyup", Object(__WEBPACK_IMPORTED_MODULE_0__helper__["b" /* setShortCuts */])(39, this.nextPage.bind(this)), false);
    window.addEventListener("keyup", Object(__WEBPACK_IMPORTED_MODULE_0__helper__["b" /* setShortCuts */])(37, this.prevPage.bind(this)), false);
  }

  //render a page (month) of the calendar according to current date 
  Calendar.prototype.showCalendar = function () {
    document.querySelector("#month-name").innerHTML = `${__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* readDate */].month(this.currentMonth)} ${this.currentYear}`;
    document.querySelector(".month").innerHTML = "";
    this.recordDays();
    for (var i = 0; i < this.days.length; i++) {
      document.querySelector(".month").innerHTML += Object(__WEBPACK_IMPORTED_MODULE_1__day__["b" /* DayOfMonth */])(this.days[i], i);
    };
  }

  //set params for rendering next month 
  Calendar.prototype.nextPage = function () {
    if (this.currentMonth == 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.showCalendar();
  }

  //set params for rendering previous month 
  Calendar.prototype.prevPage = function () {
    if (this.currentMonth == 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.showCalendar();
  }

  //set params for rendering a page (month), which today's date belongs to 
  Calendar.prototype.todayPage = function () {
    this.currentMonth = this.today.month;
    this.currentYear = this.today.year;
    this.showCalendar();
  }

  //count and record the set of days for rendering a current month page of the calendar
  Calendar.prototype.recordDays = function () {
    this.prevMonth = this.currentMonth - 1;
    this.nextMonth = this.currentMonth + 1;
    //current month
    var firstDayOfWeek = (new Date(this.currentYear, this.currentMonth, 1)).getDay();
    var lastDayOfWeek = (new Date(this.currentYear, this.nextMonth, 0)).getDay();


    var extraStart = firstDayOfWeek ? firstDayOfWeek - 1 : 6;
    var extraEnd = lastDayOfWeek ? 7 - lastDayOfWeek : 0;

    var currentMonthLength = (new Date(this.currentYear, this.nextMonth, 0)).getDate();
    var prevMonthLength = (new Date(this.currentYear, this.currentMonth, 0)).getDate();
    //days set
    var set = [
      { month: this.prevMonth, start: (prevMonthLength - extraStart + 1), end: prevMonthLength },
      { month: this.currentMonth, start: 1, end: currentMonthLength },
      { month: this.nextMonth, start: 1, end: extraEnd }
    ];
    //record days
    var days = [];
    for(var i=0; i<set.length; i++){ 
      for(var k = set[i].start; k<=set[i].end; k++){
        days.push({date:k, events:Object(__WEBPACK_IMPORTED_MODULE_1__day__["a" /* DayEvents */])(k), month: this.currentMonth, year:this.currentYear});
      }
    }
    this.days = days;
  }
  /* harmony default export */ __webpack_exports__["a"] = (Calendar);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
  
  //just for demonstration days width events
  const DayEvents = function(i){
    let events;
    if(i==9){
      events="<b>Напиться!</b><br>Витя Костин, Петр Михайлов, другие ребята";
    }else if(i==22){
      events="<b>ДР!</b><br>Дима Молодцов";
    }else{return null;}
    return events;
  }
/* harmony export (immutable) */ __webpack_exports__["a"] = DayEvents;

  const DayOfMonth = function(day, number){
    const currentDate = new Date(day.year, day.month, day.date).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    let status = `${currentDate === today ? " today" : ""}${day.events ? " assigned" : ""}`;
    
    const header = number <= 6 
    ? `<span class="day__descr day-of-week">${__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* readDate */].weekDay(number)}</span> <span class="day__descr">${day.date}</span>` 
    : `<span class="day__descr">${day.date}</span>`;
    
    const events = day.events ? `<div class="day__events">${day.events}</div>` : "";
    
    let content = `<article class='month__day day${status}'>
    <h2 class='day__header'>${header}</h2>
    ${events}
    </article>`; 
    return content;
  }
/* harmony export (immutable) */ __webpack_exports__["b"] = DayOfMonth;


/***/ })
/******/ ]);