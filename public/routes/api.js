const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const mongojs = require('mongojs');
const pdfFiller = require('pdffiller');

/* Conection the colmena database, now in local */
const db = mongojs('mongodb://localhost:27017/colmena', ['donaciones']);
/* The mailer address */
//var transporter = nodemailer.createTransport('smtps://colmenadeusto%40gmail.com:deustotech@smtp.gmail.com');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'colmenadeusto@gmail.com', // Your email id
        pass: 'deustotech' // Your password
    }
});


/* Get the index page */
router.get('/', function(req, res) {
    res.render('index');
});

/**  Method to execute when posting to /form
 *   Searches for a donation given the id and returns a json if found one
 */
router.post('/form', function(req, res) {
    db.donaciones.findOne({
        'idDonacion': parseInt(req.body.id)
    }, function(err, donacion) {
        if (err || donacion == null || donacion.usada == true) {
            res.status(400);
            res.send({
                success: false,
            });
        } else {
            return res.json(donacion);
        }
    });
});

/**
 *   Service to receive the donation
 *   Sends an email to the donator, received in the request
 */

router.post('/json', function(req, res) {
    /* Generate a random id for the donation */
    var id = new Date().getTime() + Math.floor(Math.random() * 101);
    req.body.idDonacion = id;
    if (req.body) {
        /* if there were an error, we would send { error: 'error description' } */
        db.donaciones.insert(req.body);
        /* setup e-mail data with unicode symbols */
        var mailOptions = {
            from: '"Colmena" <colmena@colmena.com>', // sender address
            /* Uncomment the next to use the page id */
            // to: req.body.email,
            to: 'colmenadeusto@gmail.com', // list of receivers
            subject: 'Aquí tienes tu codigo de donación', // Subject line
            text: 'Tu código de donacion: ' + id, // plaintext body
            html: 'Tu código de donacion: <br><b>' + id + '</b>' // html body
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
        res.send({
            success: true,
            idDonacion: id
        });
    } else {
        // if there were an error, we would redirect to an error page
        // res.redirect(303, 'form');
    }
});

/* Consult to get the certificate. Renders the form to fill the certificate */
router.get('/form2', function(req, res) {
    db.donaciones.findOne({
        'idDonacion': parseInt(req.query.id)
    }, function(err, donacion) {
        if (err || donacion == null || donacion.usada == true) {
            res.status(400);
        } else {
            res.render('form2', {
                idDonacion: req.query.id
            });
        }
    });

});

/* Code to submit the form of the certificate, generate it and send it by email */
router.post('/form2', function(req, res) {
    /* Codigo para enviar el certificado */

    var sourcePDF = "/home/gusy/apuntes/alboan/serverColmena/CertificadoRenta.pdf";
    var destinationPDF = "/home/gusy/apuntes/alboan/serverColmena/Certificado.pdf";

    var donation;

    var mailOptions = {
        from: '"Colmena" <colmena@colmena.com>', // sender address
        /* Uncomment the next to use the page id */
        // to: req.body.email,
        to: req.body.email, // list of receivers
        subject: 'Aquí tienes tu certificado de donación', // Subject line
        text: 'Tu certificado de donación.', // plaintext body
        attachments: [{
            path: 'Certificado.pdf'
        }]
    };

    db.donaciones.findOne({
        'idDonacion': parseInt(req.body.id)
    }, function(err, donacion) {
        donation = donacion.importe;

        var data = {
            "Numero": req.body.id,
            "Numero2": req.body.id,
            "Nombre": req.body.fullName,
            "Nombre2": req.body.fullName,
            "Nombre3": req.body.fullName,
            "Nombre4": req.body.fullName,
            "RazonSocial": req.body.social,
            "RazonSocial2": req.body.social,
            "Direccion": req.body.address,
            "Direccion2": req.body.address,
            "CodigoPostal": req.body.CP,
            "CodigoPostal2": req.body.CP,
            "Poblacion": req.body.town,
            "Poblacion2": req.body.town,
            "Provincia": req.body.province,
            "Provincia2": req.body.province,
            "DNI": req.body.DNI,
            "DNI2": req.body.DNI,
            "Importe": donation,
            "Importe2": donation,
        };


        pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
            if (err) throw err;

            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                return console.log(error);
              }
              db.donaciones.update({
                'idDonacion': parseInt(req.body.id)
              }, {
                $set: {
                  'DNI': req.body.DNI,
                  'Nombre': req.body.fullName,
                  'RazonSocial': req.body.social,
                  'Direccion': req.body.address,
                  'CodigoPostal': req.body.CP,
                  'Poblacion': req.body.town,
                  'Provincia': req.body.province,
                  'usada': true
                }
              });
              console.log('Message sent: ' + info.response);
            });
        });
    });

    res.send({
      success: true
    });

});

/* Test method fot statistics, given a year and a month retrieves the donations in that period */
router.get('/date/:year/:month', function(req, res) {
    var thisMonth = parseInt(req.params.month);
    var nextMonth = thisMonth;
    if (thisMonth == 12)
        nextMonth = 1;
    else
        nextMonth++;
    db.donaciones.find({
        "fecha.anyo": parseInt(req.params.year),
        "fecha.mes": {
            "$gte": thisMonth,
            "$lt": nextMonth
        }
    }, function(err, donaciones) {
        if (err) {
            res.send(err);
        } else {
            console.log(donaciones.length)
            res.json(donaciones);
        }
    });
});

/* Test method fot statistics, given a year and a month retrieves the donations in that period */
router.get('/creacion-wizard', function(req, res) {
    res.render('wizard');
});

/* Emailing for contact */
router.post('/contact', function(req, res) {
    contact = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "colmenadeusto@gmail.com",
            pass: "deustotech"
        }
    });

    contact.sendMail({
        from: 'Me',
        to: 'colmenadeusto@gmail.com',
        subject: '[NUEVO CONTACTO]',
        html: req.body.name + ' - ' + req.body.email + ' ha contactado con la Colmena:<br><br>' + req.body.message,
        text: req.body.name + ' ' + req.body.email + ' ' + req.body.message
    }, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    res.send({
        success: true
    });
});

/* function to autosaving the new script */
router.post('/autosave', function(req, res) {
    var title = req.body.company + '_colmena.js';
    var scriptMin = 'function changeAmount(a){a?(document.getElementById("colmenaCantidad").innerHTML="1€",addEuro()):(document.getElementById("colmenaCantidad").innerHTML="0€",removeEuro())}function multiChangeAmount(a){document.getElementById("colmenaCantidad").innerHTML=a+"€"}function colmenaEnviarDatos(){var a={},b=new Date;if(document.getElementById("colmenaCheckbox").checked&&(a.importe="1"),a.usada="false",a.fecha={},a.fecha.anyo=b.getFullYear(),a.fecha.mes=b.getMonth()+1,a.fecha.dia=b.getDate(),"1"==a.importe){var c=JSON.stringify(a);$.ajax({type:"POST",url:"http://10.45.1.60:3000/json",data:c,dataType:"json",contentType:"application/json"})}}var main_container = document.getElementById("colmenaWidget");main_container.innerHTML = ""+' + "'" + req.body.data + "'" + ''
    fs.exists("public/routes/" + title, (exists) => {
        if (exists) {
            res.status(400);
            res.send({
                success: false,
            });
        } else {
            fs.writeFile("public/routes/" + title, scriptMin, function(err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
            res.status(200);
        }
    });
});

/* Add here the new scripts. Each page has to have one method */

/* Example method for retrieving the widget */
router.get('/script', function(req, res) {
    res.sendFile(__dirname + "/s2.js")
});

router.get('/alboan_colmena', function(req, res) {
    res.sendFile(__dirname + "/alboan_colmena.js")
});


/* End of scripts */

module.exports = router;
