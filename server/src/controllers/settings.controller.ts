import { Request, Response } from "express";
import { db } from "../config/mongodb";



interface ISettings {

  _id?: string;

  userId: string;

  notifications: {
    email: boolean;
    updates: boolean;
  };

  appearance: {
    darkMode: boolean;
  };

  security: {
    loginAlert: boolean;
  };

  ai: {
    memory: boolean;
    defaultModel: string;
  };

  createdAt: Date;
  updatedAt: Date;

}



// const settingsCollection =
//   db().collection<ISettings>("settings");





// GET USER SETTINGS

interface Params {
  userId:string;
}


export const getSettings = async (
  req: Request<Params>,
  res: Response
) => {


try {


const settingsCollection =
  db().collection<ISettings>("settings");


const { userId } = req.params;


let settings: ISettings | null =
  await settingsCollection.findOne({
    userId
  });



    if (!settings) {


      const defaultSettings: ISettings = {


        userId,


        notifications: {

          email: true,

          updates: false

        },


        appearance: {

          darkMode: false

        },


        security: {

          loginAlert: true

        },


        ai: {

          memory: true,

          defaultModel: "gemini"

        },


        createdAt: new Date(),

        updatedAt: new Date()


      };



      await settingsCollection.insertOne(
        defaultSettings
      );



      settings = defaultSettings;


    }



    res.status(200).json({

      success: true,

      data: settings

    });



  }

  catch(error){


    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to get settings"

    });


  }


};









// UPDATE SETTINGS


export const updateSettings = async(
req: Request<Params>,
res: Response
)=>{

try{

const settingsCollection =
db().collection<ISettings>("settings");


const {userId}=req.params;


const updateData=req.body;


// remove immutable field
delete updateData._id;



await settingsCollection.updateOne(

{
 userId
},

{
$set:{
 ...updateData,
 updatedAt:new Date()
}
},

{
upsert:true
}

);



res.status(200).json({

success:true,

message:"Settings updated"

});


}
catch(error){

console.error(
"UPDATE ERROR:",
error
);


res.status(500).json({

success:false,

message:"Update failed"

});

}

};