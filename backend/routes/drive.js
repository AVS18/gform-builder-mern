const DriveModel = require('../models/drive')
const RegisterModel = require('../models/register')
var express = require('express');
var router = express.Router();

router.post('/createDrive', (req,res)=>{
    let data = req.body;
    console.log(data);
    if(!data.form){
        return res.status(200).json({'status':false,message:'form field empty'});
    }
    if(!data.link){
        return res.status(200).json({'status':false,message:'link field empty'});
    }
    if(!data.companyName){
        return res.status(200).json({'status':false,message:'companyName field empty'});
    }
    let drive = DriveModel(data);
    drive.save().then(data => {
        return res.status(200).json({'status':true,message:'drive created successfully'});
    })
    .catch(err => {
        return res.status(200).json({'status':false,message:'adding new drive failed'});
    });
});

router.get('/getDrive', async(req,res)=>{
    let data = req.query;
    if (!data.link){
        return res.status(200).json({'status':false,data:null,'message':"Link Not Found"})
    }
    let drive = await DriveModel.findOne({'link':data.link})
    return res.status(200).json({
        'status':true,
        data:drive,
        message:"Drive Details fetched successfully"
    });
});

router.post('/registerCandidate', async(req,res)=>{
    let data = req.body;
    console.log(data)
    if(!data.registrationData){
        return res.status(200).json({'status':false,'message':'Candidate Registration Data not send'})
    }
    if(!data.company){
        return res.status(200).json({'status':false,'message':"Company ID not send"})
    }
    let response = await checkUserAlreadyRegistered(data.company,data.registrationData.email);
    if (!response)
    return res.status(200).json({'status':false,'message':"Candidate Already Registered"})
    let register = RegisterModel(data);
    register.save().then(data =>{return res.json({'status':true,'message':'Candidate Registered Successfully'})})
    .catch(err => {return res.json({'status':false,'message':"Candidate Registration Failed"})});
})

checkUserAlreadyRegistered = async(company,email) => {
    let data = await RegisterModel.findOne({company,"registrationData.email":email});
    if(!data){
        return true
    }else{
        return false
    }
}

module.exports = router;
