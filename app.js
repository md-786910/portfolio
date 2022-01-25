const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

app.use(cors());
const port = process.env.PORT || 5000

// set static path
// app.use(bodyParser())
app.use(express.urlencoded())
app.use(express.json())


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post("/user", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body

        // sendEmail(name, email, subject, message)

        console.log("make")

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: "mdashifreza3@gmail.com", // generated ethereal user
                pass: "kamal@111", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `${name} 👻 <${email}>`, // sender address
            to: "mdashifreza3@gmail.com", // list of receivers
            subject: `${subject} ✔`, // Subject line
            html: `<b>${subject}</b>`, // plain text body
            text: `${message} 🍞`, // html body
            context: {
                name: "Adebola", // replace {{name}} with Adebola
                company: 'My Company' // replace {{company}} with My Company
            }
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


        res.status(201).json({ msg: "successfully send email" });
    } catch (error) {
        res.status(404).json({ msg: error.message })

    }
})

app.listen(port, () => {
    console.log('listening on port ' + port)
})

// https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4NjHTfl9LpK0X_6WLyUC9ME3RsafbVPNaLwEW_Le2PKKqr4h68-ln1rPkF6yNqYUpMYA2yZNXkT0hdRZ4pa5okjLtsLVA