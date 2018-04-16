import {setShortCuts, readDate} from './helper';
import {DayOfMonth, DayEvents} from './day';

const Calendar = function () {
    this.currentMonth = (new Date).getMonth();
    this.currentYear = (new Date).getFullYear();
    this.days = [];
    this.today = {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
    window.addEventListener("keyup", setShortCuts(39, this.nextPage.bind(this)), false);
    window.addEventListener("keyup", setShortCuts(37, this.prevPage.bind(this)), false);
  }

  //render a page (month) of the calendar according to current date 
  Calendar.prototype.showCalendar = function () {
    document.querySelector("#month-name").innerHTML = `${readDate.month(this.currentMonth)} ${this.currentYear}`;
    document.querySelector(".month").innerHTML = "";
    this.recordDays();
    for (var i = 0; i < this.days.length; i++) {
      document.querySelector(".month").innerHTML += DayOfMonth(this.days[i], i);
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
        days.push({date:k, events:DayEvents(k), month: this.currentMonth, year:this.currentYear});
      }
    }
    this.days = days;
  }
  export default Calendar;