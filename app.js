var express = require("express")
var nodemailer = require("nodemailer");
var smtpTransport=require("nodemailer-smtp-transport")
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));


app.set("view engine","ejs")

app.set('views', 'views');

app.use(express.static('public'));

app.get("/",function(req,res){
    res.render("index");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/courses",function(req,res){
    res.render("courses");
});

app.get("/about",function(req,res){
    res.render("about");
});

app.get("/blog",function(req,res){
    res.render("blog");
});

// app.get("/blog-single",function(req,res){
//     res.render("blog-single");
// });

app.get("/teacher",function(req,res){
    res.render("teacher");
});


app.post("/",function(req,res){

    var firstname=req.body.first-name;
    var lastname=req.body.last-name;
    var phone =req.body.phone;
    var choice=req.body.choice;
    // var email =req.body.email;
    var message =req.body.message;
    console.log(firstname);
    
    
    var newRentride={firstname:firstname,lastname:lastname,phone:phone,
    message:message,choice:choice}
    
    /*Rentride.create(newRentride,function(err,newlyCreated){
    if(err){
    console.log(err);
    req.flash("error","Sorry!There is some issue. Try again later!")
    res.redirect("/rent")
    }else{
    console.log(newlyCreated);
    req.flash("success","Successfully submitted! We will notify you soon.")
    res.redirect("/");
    }
    })  */
    
    //mail
    const output=`
    <ul>
    <li>First Name:${firstname}</li><br>
    <li>Last Name:${lastname}</li><br>
    <li>Choice of Course:${choice}</li><br>
    <li>Phone: ${phone}</li><br>
    <li>Message:${message}</li><br>
    
    </ul>
    `
    
    async function main(){
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    
    // create reusable transporter object using the default SMTP transport
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'gupta.aman1602@gmail.com',
    pass: '2305aman9336559951'
    }
    });
    const mailOptions = {
    from: '"SGJCC" <gupta.aman1602@gmail.com>', // sender address
    to: "gupta.aman1602@gmail.com", // list of receivers
    subject: "Course Choice", // Subject line
    html: output// plain text body
    };
    // send mail with defined transport object
    // let info = await transporter.sendMail({
    // from: '"MyTasi" <mytasi.com@gmail.com>', // sender address
    // to: req.user.emailid, // list of receivers
    // subject: "Ride Details", // Subject line
    // text: "Hi there,", // plain text body
    // html: output // html body
    // });
    transporter.sendMail(mailOptions, function (err, info) {
    if(err)
    console.log(err)
    else
    console.log(info);

    transporter.close();
    }); 
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);
    
    });


app.listen(process.env.PORT||3000, process.env.IP, function(){
    console.log("The German Website server has started");
});