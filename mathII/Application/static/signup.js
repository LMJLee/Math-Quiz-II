// function for days drop down option
$(function(){
    var $day= $(".day");
    for (i = 1; i <= 31; i++){
        $day.append($('<option></option>').val(i).html(i))
    }
});


// function for months drop down option
$(function(){
    var $month = $(".month");
    for (i = 1; i <= 12; i++){
        $month.append($('<option></option>').val(i).html(i))
    }
});


// function for years drop down option
$(function(){
    var $year = $(".year");
    for (i = 1899; i <= 2023; i++){
        $year.append($('<option></option>').val(i).html(i))
    }
});


$(function() {
    $('input[name="dob"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1899,
      maxYear: 2023
    }, function(start, end, label) {
      var years = moment().diff(start, 'years');

    });
  });