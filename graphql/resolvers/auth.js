const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt =require("jsonwebtoken")

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('Cet utilisateur existe déjà.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login :async(args)=>{
    const user = await User.findOne({email:args.email})
    if(!user){
      throw new Error("Cet utilisateur n'existe pas");
    }
    const isEqual= await bcrypt.compare(args.password,user.password)
    if(!isEqual){
      throw new Error("Mot de passe incorrect")
    }
    const token =jwt.sign({userId:user.userId,email:user.email},"somesupersecretkey",{expiresIn: "1h"})
    return({userId:user.id,token:token,tokenExpiration:1})
  }
};