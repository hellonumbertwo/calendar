  import {readDate} from './helper';
  //just for demonstration days width events
  export const DayEvents = function(i){
    let events;
    if(i==9){
      events="<b>Напиться!</b><br>Витя Костин, Петр Михайлов, другие ребята";
    }else if(i==22){
      events="<b>ДР!</b><br>Дима Молодцов";
    }else{return null;}
    return events;
  }
  export const DayOfMonth = function(day, number){
    const currentDate = new Date(day.year, day.month, day.date).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    let status = `${currentDate === today ? " today" : ""}${day.events ? " assigned" : ""}`;
    
    const header = number <= 6 
    ? `<span class="day__descr day-of-week">${readDate.weekDay(number)}</span> <span class="day__descr">${day.date}</span>` 
    : `<span class="day__descr">${day.date}</span>`;
    
    const events = day.events ? `<div class="day__events">${day.events}</div>` : "";
    
    let content = `<article class='month__day day${status}'>
    <h2 class='day__header'>${header}</h2>
    ${events}
    </article>`; 
    return content;
  }