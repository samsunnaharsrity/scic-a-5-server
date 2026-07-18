export interface ISettings {

  userId:string;

  notifications:{
    email:boolean;
    updates:boolean;
  };


  appearance:{
    darkMode:boolean;
  };


  security:{
    loginAlert:boolean;
  };


  ai:{
    memory:boolean;
    defaultModel:string;
  };


  createdAt?:Date;

  updatedAt?:Date;

}