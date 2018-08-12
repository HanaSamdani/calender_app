$(document).ready(function(){
  //Setting JS Plugin Time Picker
  var startingTimePicker = $('#start').timepicker({
    showMeridian: false,
    showWidget: true
  });
  var endingTimePicker = $('#end').timepicker({
    showMeridian: false,
    showWidget: false
  });

    //Function for Event with Parameter
  function Event(title, start, end, allDay){
    this.title = title;
    this.start = start;
    this.end = end;
    this.allDay = allDay;
  }
  
  var moment_init;
  var events_arr = new Array();
  
  //Check for LocalStorage
  if(localStorage.length >0){
    events_arr = JSON.parse(localStorage.getItem('events'));
  }
  
  //Initializing Calender Plugin
  $("#calendar").fullCalendar({
    height: 550,
    header: { 
      center: 'title',
      left:'month'
    },
    editable: true,
    //selectable: true,
    eventLimit: true,
    events: events_arr,
    dayClick: function(date){
      var myDate = moment(date).format("YYYY-MM-DD");
      moment_init = moment(myDate);
      console.log(moment_init);
      $("#monthModal").modal('show');
      $('#monthModal').on('shown.bs.modal', function (e) {
        let modal = $(this);
        let eventDate = moment(date,'DD/MM/YYYY').format("MMM D, YYYY"); 
        modal.find('.modal-body #date').text(eventDate);
      });
    }
  })
  var events_stored = $('#calendar').fullCalendar('clientEvents');
  $("#submit").click(function(event){
    //getting start date and time
    let startTime = $("#start").val();
    var res = startTime.split(":");
    var startDate = moment_init.set('hour', parseInt(res[0])).set('minute', parseInt(res[1])).set('second', 0);
    
    //getting end date and time
    let endTime = $("#end").val();
    var res1 = endTime.split(":");
    var endDate = moment_init.set('hour', parseInt(res1[0])).set('minute', parseInt(res1[1])).set('second', 0);
    
    var eventTitle = $("#name").val();
    
    var obj = new Event(eventTitle ,startDate, endDate, false);
    events_arr.push(obj);
    console.log(events_arr);
    
    localStorage.setItem('events', JSON.stringify(events_arr));
    
    $('#calendar').fullCalendar('renderEvent', obj, true);
    
    event.stopPropagation();
    $("#start").val("");
    $("#end").val("");
    $("#date").val("");
    $("#name").val("");
    $("#monthModal").modal('hide');
  })
});
