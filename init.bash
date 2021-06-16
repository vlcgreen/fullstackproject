sequelize model:generate --name users --attributes name:string,password:string,photo:string,roleID:integer,email:string
sequelize model:generate --name membership --attributes userID:integer,familyID:integer,isApproved:boolean
sequelize model:generate --name family --attributes familyName:string,owner:integer,familyPhoto:string
sequelize model:generate --name roles --attributes title:integer,level:string
sequelize model:generate --name user_recipes --attributes title:string,ingredients:string,directions:string,image:string,userID:integer,tag:string
sequelize model:generate --name rating --attributes userID:integer,recipeID:integer,rating:integer
sequelize model:generate --name tag --attributes name:string,description:string


