$(document).ready(function(){
  $("#calendar").fullCalendar({
    height: 550,
    header: { center:'month,agendaWeek,agendaDay'},
    dayClick: function(date){
      $("#monthModal").modal('show')
      $('#monthModal').on('shown.bs.modal', function (e) {
        
        let modal = $(this);
        let eventDate = moment(date,'DD/MM/YYYY').format(" MMM D, YYYY"); 
        modal.find('.modal-body #date').text(eventDate);
      })
    }
  })
  
  $('#start').timepicker();
  $('#end').timepicker();
  
  
  $("#submit").click(function(){
    let startTime = $("#start").val();
    let endTime = $("#end").val();
    let eventTitle = $("#name").val();
    let eventDate = $("#date").val();
    alert(eventTitle+ " " +startTime+ " "+endTime+" "+eventDate);
  })
});
