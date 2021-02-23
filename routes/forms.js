const express = require('express')
const forms_model=require('../models/formsave')
const answer_model=require('../models/save_answers')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const multer  = require('multer')
const sharp = require('sharp')
const uuid = require('uuidv4')
const routes = express.Router()
const fs = require('fs')
var nodemailer = require('nodemailer');
const { Int32 } = require('mongodb')
let data=""
let Answer_key=""
let your_asnw=""

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.pass
    }
  });

function sentmail(yougot,totalMarks,id , email){
    var mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'Your Submission',
        html: `<!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Your Submission</title>
            <style>
              /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
              img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; }
              body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0; 
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; }
              table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%; }
                table td {
                  font-family: sans-serif;
                  font-size: 14px;
                  vertical-align: top; }
              /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */
              .body {
                background-color: #f6f6f6;
                width: 100%; }
              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display: block;
                Margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px; }
              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                box-sizing: border-box;
                display: block;
                Margin: 0 auto;
                max-width: 580px;
                padding: 10px; }
              /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
              .main {
                background: #fff;
                border-radius: 3px;
                width: 100%; }
              .wrapper {
                box-sizing: border-box;
                padding: 20px; }
              .footer {
                clear: both;
                padding-top: 10px;
                text-align: center;
                width: 100%; }
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                  color: #999999;
                  font-size: 12px;
                  text-align: center; }
              /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
              h1,
              h2,
              h3,
              h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                Margin-bottom: 30px; }
              h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize; }
              p,
              ul,
              ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                Margin-bottom: 15px; }
                p li,
                ul li,
                ol li {
                  list-style-position: inside;
                  margin-left: 5px; }
              a {
                color: #3498db;
                text-decoration: underline; }
              /* -------------------------------------
                  BUTTONS
              ------------------------------------- */
              .btn {
                box-sizing: border-box;
                width: 100%; }
                .btn > tbody > tr > td {
                  padding-bottom: 15px; }
                .btn table {
                  width: auto; }
                .btn table td {
                  background-color: #ffffff;
                  border-radius: 5px;
                  text-align: center; }
                .btn a {
                  background-color: #ffffff;
                  border: solid 1px #3498db;
                  border-radius: 5px;
                  box-sizing: border-box;
                  color: #3498db;
                  cursor: pointer;
                  display: inline-block;
                  font-size: 14px;
                  font-weight: bold;
                  margin: 0;
                  padding: 12px 25px;
                  text-decoration: none;
                  text-transform: capitalize; }
              .btn-primary table td {
                background-color: #3498db; }
              .btn-primary a {
                background-color: #3498db;
                border-color: #3498db;
                color: #ffffff; }
              /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
              .last {
                margin-bottom: 0; }
              .first {
                margin-top: 0; }
              .align-center {
                text-align: center; }
              .align-right {
                text-align: right; }
              .align-left {
                text-align: left; }
              .clear {
                clear: both; }
              .mt0 {
                margin-top: 0; }
              .mb0 {
                margin-bottom: 0; }
              .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0; }
              .powered-by a {
                text-decoration: none; }
              hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                Margin: 20px 0; }
              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important; }
                table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
                  font-size: 16px !important; }
                table[class=body] .wrapper,
                table[class=body] .article {
                  padding: 10px !important; }
                table[class=body] .content {
                  padding: 0 !important; }
                table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important; }
                table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important; }
                table[class=body] .btn table {
                  width: 100% !important; }
                table[class=body] .btn a {
                  width: 100% !important; }
                table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important; }}
              @media all {
                .ExternalClass {
                  width: 100%; }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%; }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important; } 
                .btn-primary table td:hover {
                  background-color: #34495e !important; }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important; } }
            </style>
          </head>
          <body class="">
          <h1>Google Forms clone</h1>
            <table border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
                    <span class="preheader">Subscribe to google clone </span>
                    <table class="main">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <h1>Your submission</h1>
                                <h2>You got ${yougot}/${totalMarks}</h2>
                                <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                          <tbody>
                                            <tr>
                                              <td> <a href='http://localhost:3000/view_submission/${id}' target="_blank">view submission</a> </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p>You received this email from google forms clone . your submission is comformed </p>
              
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
        
                    <!-- START FOOTER -->
                    
                    
                  <!-- END CENTERED WHITE CONTAINER -->
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}




routes.post('/search' ,async (req,res)=>{
    data=req.body;
    let additional_data=JSON.parse(data['additional_data']);
    let isQuiz=additional_data['idquiz']
    let release_Grade=additional_data['release_grade']
    let conformation_message =additional_data['conformation_message']
    let response_reciept = additional_data['response_reciept']
    let limit =additional_data['limit']
    let background_color=additional_data['background_color']
    let foreground_color=additional_data['foreground_color']
    let themeImage=additional_data['themeImage']
    let mainImage=additional_data['mainImage']
    let name =data['Title']
    let email=req.user.email
    let title = data['Title']
    
    console.log(additional_data)
    
    const new_form_data=new forms_model({
        form_data:JSON.stringify(data), 
        "isQuiz":isQuiz,
        "release_Grade":release_Grade, 
        'conformation_message':conformation_message,
        'response_reciept':response_reciept,
        'limit':limit,
        'background_color':background_color,
        'foreground_color':foreground_color,
        'themeImage':themeImage,
        'mainImage':mainImage,
        "email":email , 
        "name":name , 
        "Title":title})
        new_form_data.save((err,room)=>{
            // res.send(err)
            res.redirect('/')
            // res.send(data)
        })

    
     

    

    
        

    
});


// Multer single file parser
const upload = multer({limits:{fileSize:4000000}}).single('avatar')

routes.post('/upload', (req, res)=>{
    upload(req, res, async function(err){ 
     // check for error thrown by multer- file size etc
     if( err|| req.file === undefined){
         console.log(err)
         res.send("error occured")
     }else{
       
        let fileName = req.file.originalname+ + new Date() +".jpeg"
        var image = await sharp(req.file.buffer) 
        .jpeg({
            quality: 40,
        }).toFile('./public/uploads/'+fileName)
        .catch( err => { console.log('error: ', err) })
        res.send(`/uploads/${fileName}`)
     }
    })
})

routes.post('/canvas',(req,res)=>{
    var data = req.body.imgBase64.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    const fileName= 'form_main_image'+Date.now()+'.png';

    fs.writeFile('./public/uploads/'+fileName, buf, (err) => {
        if (err) console.log("didnt work", err);
        else {

            res.send(`/uploads/${fileName}`)
        };
    }); 
})

routes.post('/answw',async(req,res)=>{
function getanswers(data){
    let temp=JSON.parse(data)
    let questions=temp['flow'].split(",").filter(Boolean)
    let no_of_questions=questions.length
    let answer=[]
    let points=[]

    for(let i=1;i<=no_of_questions;i++){
        answer.push(temp[`Answ-${i}`])

    }
    for(let i=1;i<=no_of_questions;i++){
        points.push(temp[`Marks-${i}`])
    }

    return  [answer, points];
}
function getSimilaritry(answ, your_answ) {
    let rank=0;
    
    for(let i=0;i<your_answ.length;i++){
        if(your_answ[0] in answ){
            rank+=1
        }


    }
    return rank/your_answ.length
  }
function evaluateMarks(your_asnw,answer,points){
let yougot=0
let totalMarks=0
let correct_answer=[]
for(let i=0;i<answer.length;i++){
    
    if(typeof answer[i]=="string"){
    
    if(points[i]!=""){
        totalMarks+=parseInt(points[i])
    }
    
    if(your_asnw[`Answ-${i+1}`]==answer[i]){
        correct_answer.push(1)
    }
    else{
        correct_answer.push(0)
    }}
    else{
        
            if(points[i]!=''){
                totalMarks+=parseInt(points[i])
            }

            if(typeof answer[i]=='undefined'){
                correct_answer.push(0)
            }
            if(typeof answer[i]=='object'){
                correct_answer.push(getSimilaritry(answer[i],your_asnw[`Answ-${i+1}`]))
                
            }

            
    
    
        }
    }

    for(let i=0;i<answer.length;i++){
        yougot+=correct_answer[i]*points[i]
    }
//     console.log(your_asnw)
// console.log(answer)
// console.log(correct_answer)
// console.log(points)
// console.log(totalMarks)
// console.log(yougot)    

return [correct_answer,totalMarks,yougot]


}
const your_asnw = req.body;
const form_id=req.session.current_form;
const form_data=await forms_model.find({"_id":form_id});
const [answers,points]=getanswers(form_data[0]['form_data'])
const [correct_answer,totalMarks,yougot]=evaluateMarks(your_asnw,answers,points)
console.log(correct_answer,totalMarks,yougot)
const release_Grade=form_data[0]['release_Grade'];
const conformation_message=form_data[0]['conformation_message'];
const response_reciept=form_data[0]['response_reciept'];
console.log(req.user.email)


// saving into database 
const new_submission = new answer_model({
    'email':req.user.email,
    'correct_answer':JSON.stringify(correct_answer),
    'name':req.user.displayName,
    'form_id':form_id,
    'Answers':JSON.stringify(your_asnw),
    'Marks':yougot
})
new_submission.save((err,room)=>{
    // res.send(err)
    console.log(err)
        if(release_Grade){
            sentmail(yougot,totalMarks,room.id , req.user.email)
            
            res.render('done',{'score':JSON.stringify(yougot), 'conformation_message':conformation_message, 'totalMarks':totalMarks , viewlink:`http://localhost:3000/view_submission/${room.id}`})
        }
        else{
            sentmail('null',totalMarks,'null' , req.user.email)
            res.render('done',{'conformation_message':conformation_message})

            
        }
    // }
    
})


})

routes.get('/update_submission/:id',async(req,res)=>{
    
    let id=req.params.id;
    req.session.update_form_id=id
    const temp= answer_model.findById(id,(err,temp)=>{
        if(!err){

            const temp2= forms_model.findById(temp.form_id,(err,form_data)=>{
            res.render('update_submission',{ isAdmin:true,   data:JSON.parse(form_data.form_data) , fulldata:form_data , user_submission:temp})
        });
        }
        else{
            console.log(err)
        }
})
});

routes.get('/view_submission/:id' , async(req,res)=>{
    let id=req.params.id;
    const temp= answer_model.findById(id,(err,temp)=>{
        if(!err){

            const temp2= forms_model.findById(temp.form_id,(err,form_data)=>{
            res.render('view_submission',{ isAdmin:false,   data:JSON.parse(form_data.form_data) , fulldata:form_data , user_submission:temp , marks:temp.Marks})
        });
        }
        else{
            console.log(err)
        }
})
});

routes.post('/update_student_submission',async(req,res)=>{
    let id=req.session.update_form_id
    let temp=req.body
    if(typeof req.body.marks=='string'){
      console.log('string')
     let total_marks=parseInt(req.body.marks)
     console.log(total_marks)
     const temp1=answer_model.updateOne({_id:id} ,{$set:{Marks:total_marks}},(err,data)=>{
      res.send('DONE')
  })
    }
    else{
      let marks_list=req.body.marks.map(function(v) {
        return parseInt(v, 10);
      });
      let total_marks=marks_list.reduce((a, b) => a + b)
      const temp1=answer_model.updateOne({_id:id} ,{$set:{Marks:total_marks}},(err,data)=>{
        res.send('DONE')
    })
    }
    

})
routes.get('/form/:id', async (req,res)=>{

    let id=req.params.id;
    req.session.current_form=id;
    
    const form_data=await forms_model.find({"_id":id});
    
    if(form_data[0].response_reciept=='true' && form_data[0].limit=='true'){
        req.session.current_url=id;
        if(req.isAuthenticated()){
            const view_submission = await answer_model.find({'form_id':form_data[0]['_id'] , 'email':req.user.email })

    if(view_submission==0){
        res.render('answ.ejs',{data:JSON.parse(form_data[0]['form_data']) , fulldata:form_data})
    }
    else{
        res.send('<h2>you already submitted</h2><a href="/" > home </a> ')
        
    }
        }
        else{
          req.session.redirecturl=req.url;
            res.redirect('/auth/google')
        }
    }
    else{
        res.render('answ.ejs',{data:JSON.parse(form_data[0]['form_data']) , fulldata:form_data})
        // res.send('no access')
    }
    
    
})
routes.get('/delete/:id',async(req,res)=>{
    let id=req.params.id;
    let user=req.user.email
    const temp= forms_model.findById(id,(err,temp)=>{
        if(temp.email==user){
            let asd=forms_model.remove({'_id':id},(err,temp)=>{
                res.redirect('/')
            })
        }
        else{
            res.redirect('/')
        }
    })

})

routes.get('/display/:id', async (req,res)=>{

    req.session.current_url=req.url
    
    let id=req.params.id;
    const temp= forms_model.findById(id,(err,temp)=>{
        if(!err){
            if(req.user.email==temp.email){

                const temp2= answer_model.find({'form_id':id},(err,temp2)=>{
                    res.render('update',{ user:req.user, temp:temp , temp2:temp2.length , reponseData:temp2 ,   data:JSON.parse(temp.form_data) , fulldata:temp})});
                }else{
                    res.redirect('/')
                }
        }
        else{
            console.log(err)
        }
        // let form_data=JSON.parse(temp['form_data']);
        // let title = temp['Title'];
        // let release_Grade = temp['release_Grade'];
        // let isQuiz=temp['isQuiz'];
    });
})
routes.get('/', ensureAuth,async (req,res)=>{
    const forms=await forms_model.find({"email":req.user.email},{_id:1,email:1,Title:1,time:1});
    
    res.render('home_page',{form_data:forms , user:req.user})
})
routes.get('/create_form', ensureAuth,(req,res)=>{
    
    res.render('main')
})
routes.get('/log',ensureGuest,(req,res)=>{
    res.render('login')
})

routes.get('/logout',(req,res)=>{
    req.logOut()
    // req.session.destroy()
    res.redirect('/log')

})
routes.get('/change_account',(req,res)=>{
    req.logOut()
    res.redirect('/auth/google')
    

})

module.exports=routes;