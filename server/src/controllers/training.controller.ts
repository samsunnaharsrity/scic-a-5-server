import {Request,Response} from "express";
import {db} from "../config/mongodb";



// GET TRAINING DATA


export const getTrainingData = async(
req:Request,
res:Response
)=>{


try{


const {email}=req.params;



let training =
await db()
.collection("training")
.findOne({
userEmail:email
});





if(!training){


training={
 userEmail:email,
 files:[],
 trainedAgents:0,
 accuracy:0,
 progress:0,
 lastTraining:null
};


await db()
.collection("training")
.insertOne(training);


}




res.json(training);



}catch(error:any){


res.status(500).json({

message:error.message

});


}



};





// Upload Training File

export const uploadTrainingFile = async(
req:Request,
res:Response
)=>{


try{


const {
email
}=req.body;



if(!req.file){

return res.status(400).json({

message:"No file uploaded"

});

}



const file={

name:req.file.originalname,

type:req.file.mimetype,

size:req.file.size,

path:req.file.path,

uploadedAt:new Date()

};




await db()
.collection("training")
.updateOne(

{
userEmail:email
},

{

$push:{
files:file
},

$set:{
updatedAt:new Date()
}

},

{
upsert:true
}

);



res.json({

success:true,

message:"File uploaded",

file

});


}catch(error:any){


res.status(500).json({

message:error.message

});


}


};