$(document).ready(function(){
  //Setting JS Plugin Time Picker
  let startingTimePicker = $('#start').timepicker({
    showMeridian: false,
    showWidget: true
  });

  //location coordinates
  let latt;
  let long;
  
  //Function for Event with Parameter
  function Event(title, start, end, allDay){
    this.title = title;
    this.start = start;
    this.allDay = allDay;
  }
  
  let moment_init;
  let events_arr = new Array();
  let events_stored = new Array();
  
  //Check for LocalStorage
  if(localStorage.length >0){
    events_arr = JSON.parse(localStorage.getItem('events'));
    events_stored = $('#calendar').fullCalendar('clientEvents');
    console.log("from clientEvents: "+events_stored[0]);
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
      
      let myDate = moment(date).format("YYYY-MM-DD");
      moment_init = moment(myDate);
      //console.log(moment_init);
      $("#monthModal").modal('show');
      $('#monthModal').on('shown.bs.modal', function (e) {
        let modal = $(this);
        let eventDate = moment(date,'DD/MM/YYYY').format("MMM D, YYYY"); 
        modal.find('.modal-body #date').text(eventDate);
        getLocation();
        
      });
    },
    eventClick: function(event, jsEvent, view){
      $("#detailsModal").modal('show');
      $("#detailsModal").on('shown.bs.modal', function(e){
        
        let modal = $(this);
        modal.find('.modal-body #e_title').text(event.title);
        modal.find('.modal-body #e_date').text("Date: "+moment(event.start).format("MMM D, YYYY"));
        modal.find('.modal-body #st_time').text("Start time: "+moment(event.start).format("HH:mm"));
        
      });
    }
  }) //time wala masla
  
  //form data:
  $("#submit").click(function(event){
    //getting start date and time
    let startTime = $("#start").val();
    let res = startTime.split(":");
    let startDate = moment_init.set('hour', parseInt(res[0])).set('minute', parseInt(res[1])).set('second', 0);
    
    let eventTitle = $("#name").val();
    
    let obj = new Event(eventTitle ,startDate, false);
    $('#calendar').fullCalendar('renderEvent', obj, true);
    obj.start = startDate.add(5, 'h');
    events_arr.push(obj);
    
    localStorage.setItem('events', JSON.stringify(events_arr));
    
    event.stopPropagation();
    $("#start").val("");
    $("#date").val("");
    $("#name").val("");
    $("#weather").val("");
    $("#monthModal").modal('hide');
  })
  
  function getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    
  }
  
  function showPosition(position){
    latt = position.coords.latitude;
    long = position.coords.longitude;
    locationSearchFromAPI(latt,long);
    
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
      case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
      case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
      case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    }
  }
  
  function locationSearchFromAPI(latt,long){
    $.get("https://www.metaweather.com/api/location/search/?lattlong="+ latt +","+ long, function (data, status){
      console.log("locationSearchFromAPI: "+status);
      //getWeatherFromAPI(data);
      let id = data[0].woeid;
      let curr_date = moment_init.format("YYYY/MM/DD");
      $.get("https://www.metaweather.com/api/location/"+ id +"/"+ curr_date +"/", function(weather,status){
        console.log("getWeatherFromAPI: "+status);
        let state_name = weather[0].weather_state_name;
        //let state_abbr = weather[0].weather_state_abbr;
        alert("Weather forecast for "+moment_init.format("MMM D, YYYY")+": "+state_name);
      });
    })
  }
});
