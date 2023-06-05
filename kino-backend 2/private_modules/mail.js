const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lemo.cam.sender@gmail.com',
      pass: 'yimhfvrxmoboukje'
    }
});
  
const mailOptions = {
    from: 'lemo.cam.sender@gmail.com', // sender address
    to: 'lemo.cam.channel@gmail.com', // list of receivers
    subject: 'Kino Bez Piździucha - rezerwacja', // Subject line
    text: 'SEAT BOOKED', // plain text body
};
  
const sendMail = () => transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});

module.exports = {
    transporter,
    mailOptions,
    sendMail
}