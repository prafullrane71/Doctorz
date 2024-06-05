import nodemailer from 'nodemailer';

function sendMail(email,password)
{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'prafullrane71@gmail.com',
        pass: 'gbowdelzpmzqhukh'
      }
    });
    
    var mailOptions = {
        from: 'vilekhofficial@gmail.com',
        to: email,
        subject: 'Verification Email By Doctorz',
        html: "<h1>Welcome to Doctorz</h1><p>You have successfully register with our app , your login credentials are attached below</p><h2>Username : "+email
        +"</h2><h2>Password : "+password
        +"</h2><h3>Click on the link below to redirect....</h3>http://localhost:3000/verifyuser/"+email
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
  
  export default sendMail;