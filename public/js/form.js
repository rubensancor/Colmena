function validateForm() {
  var isValid = true;
  var email = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  $('.form-control').each(function() {
    if ($(this).attr('id') == 'email') {
      if (email.test($(this).val())) {
        $(this).parent().removeClass('has-error');
      } else {
        $(this).parent().addClass('has-error');
        isValid = false;
      }
    } else if ($(this).val() === '') {
      $(this).parent().addClass('has-error');
      isValid = false;
    } else {
      $(this).parent().removeClass('has-error');

    }
  });
  if (isValid) {
    $("#formAlert").slideUp(400, function() {});
    $('#casperButton').click()
  } else {
    $("#formAlert").slideDown(400);
    $("#formAlert").removeClass('hide');
  }
}


function formCertificate() {

  var x = document.getElementById("formCertificateCol");

  var json = {};
  json.id = x.elements[0].value;
  json.DNI = x.elements[1].value;
  json.fullName = x.elements[2].value;
  json.social = x.elements[3].value;
  json.email = x.elements[4].value;
  json.address = x.elements[5].value;
  json.CP = x.elements[6].value;
  json.town = x.elements[7].value;
  json.province = x.elements[8].value;

  var jsonReady = JSON.stringify(json);
  $.ajax({
    type: "POST",
    url: "http://192.168.1.34:3000/form2",
    //url: "http://192.168.1.34:3000/json",
    data: jsonReady,
    dataType: "json",
    contentType: "application/json",
    success: function() {
      window.location.href = '/';
    }
  });
}
