import {Request, Response} from "express";
import {db} from "../config/mongodb";




// GET ADMIN SETTINGS

export const getAdminSettings = async(
req:Request,
res:Response
)=>{


try{


const {email}=req.params;



const admin =
await db()
.collection("admin_settings")
.findOne({

"profile.email": email

});





if(!admin){


const newAdmin={


profile:{

name:"Admin User",
email,
role:"Super Admin",
image:""

},


settings:{

aiLogs:true,
maintenance:false,
email:true,
twoFactor:true

},


createdAt:new Date(),
updatedAt:new Date()


};



await db()
.collection("admin_settings")
.insertOne(newAdmin);



return res.json(newAdmin);


}




res.json(admin);



}
catch(error){


console.log(error);

res.status(500).json({

message:"Failed to get settings"

});


}



};










// UPDATE SETTINGS


export const updateAdminSettings = async(

req:Request,
res:Response

)=>{


try{


const {email}=req.params;


const {settings}=req.body;



await db()
.collection("admin_settings")
.updateOne(

{
"profile.email":email
},

{

$set:{

settings,

updatedAt:new Date()

}

}

);



res.json({

message:"Settings updated"

});


}
catch(error){


res.status(500).json({

message:"Update failed"

});


}


};










// UPDATE PROFILE

export const updateAdminProfile = async(
req:Request,
res:Response
)=>{


try{


const {email}=req.params;

const profile=req.body;


// admin_settings update

await db()
.collection("admin_settings")
.updateOne(

{
"profile.email":email
},

{
$set:{

"profile.name":profile.name,
"profile.image":profile.image,

updatedAt:new Date()

}

}

);

// Better Auth user update

await db()
.collection("user")
.updateOne(

{
email
},

{
$set:{

name:profile.name,
image:profile.image,
updatedAt:new Date()

}

}

);



res.json({

message:"Profile updated"

});


}

catch(error){

console.log(error);

res.status(500).json({

message:"Profile update failed"

});

}


};