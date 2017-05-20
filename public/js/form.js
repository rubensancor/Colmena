function validateForm() {
    var isValid = true;
    $('.form-control').each(function() {
        if ($(this).val() === '') {
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
        url: "http://10.164.62.77:3000/form2",
        //url: "http://192.168.0.77:3000/json",
        data: jsonReady,
        dataType: "json",
        contentType: "application/json",
        success: function(){
          window.location.href = '/';
        }
    });
}
