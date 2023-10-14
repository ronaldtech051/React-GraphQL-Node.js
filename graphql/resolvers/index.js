const authResolver =require("./auth")
const bookingResolver =require("./booking")
const eventResolver =require("./event")


const rootResolver={
  ...authResolver,
  ...bookingResolver,
  ...eventResolver
}


module.exports=rootResolver;