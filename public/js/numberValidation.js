$(document).ready(function() {
    $("#number").keypress(function(e) {
        if (e.which == 13) { // the enter key code
            $("#btnEnviar").click();
            return false;
        }
    })
});

function sendFormData() {
    var number = document.getElementById('number').value;
    //console.log(number);
    if (number === "") {
        // If its value is empty
        $("#formDanger").slideUp(400, function() {});
        $("#formAlert").slideDown(400); // Show the Alert
        $("#formAlert").removeClass('hide'); // Delete hide class so it can appear
    } else {
        $("#formAlert").slideUp(400, function() {});
        $("#formDanger").slideUp(400, function() {});
        var idDon = {};
        idDon.id = number;
        $.ajax({
            type: 'POST',
            data: idDon,
            url: '/form',
            success: function(data) {
                window.location.href = 'form2?id=' + data.idDonacion;
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error.message);
                $("#formDanger").slideDown(400); // Show the Alert
                $("#formDanger").removeClass('hide'); // Delete hide class so it can appear
            }
        });
    }
}
