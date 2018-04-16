  export const readDate = (function(){
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
  export const setShortCuts = (function() {
    return function(key, func){
      return function(e) {
        if ( e.keyCode === key) func();
      };
    }
  })();