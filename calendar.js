$(document).ready(function(){
  $('#start').timepicker();
  $('#end').timepicker();
  var moment_init;
  $("#calendar").fullCalendar({
    height: 550,
    header: { 
      center: 'title',
      left:'month'
      //,agendaWeek,agendaDay'
    },
    editable: true,
    //selectable: true,
    eventLimit: true,
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
  $("#submit").click(function(event){
    let startTime = $("#start").val();
    var stime_split = startTime.split(" ");
    var res = stime_split[0].split(":");
    var startDate = moment_init.set('hour', parseInt(res[0])).set('minute', parseInt(res[1])).set('second', 00);
        
    let endTime = $("#end").val();
    var etime_split = endTime.split(" ");
    var res1 = etime_split[0].split(":");
    var endDate = moment_init.set('hour', parseInt(res1[0])).set('minute', parseInt(res1[1])).set('second', 00);

    var eventTitle = $("#name").val();
        //let eDate = moment(date).format("YYYY-MM-DDT");
        //alert(eventTitle+ " " +startTime+ " "+endTime);
        /*var events_arr = [];
        events_arr.push({
          title: eventTitle,
          start: startDate,
          end: endDate,
        });
        $("calendar").fullCalendar({
           events: events_arr
         });
        $("calendar").fullCalendar('renderEvents', events_arr);*/
    $('#calendar').fullCalendar('renderEvent', {
      title: eventTitle,
      start: startDate,
      end: endDate,
      allDay: false
      //editable: true
    });
        
    event.stopPropagation();
    $("#monthModal").modal('hide');
  })
});
