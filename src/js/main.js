import Calendar from './calendar';
window.onload = function(){
  const page = new Calendar;
  page.showCalendar();
  document.querySelector("#next-page").onclick = function () { page.nextPage() };
  document.querySelector("#prev-page").onclick = function () { page.prevPage() };
  document.querySelector("#today-page").onclick = function () { page.todayPage() };
};