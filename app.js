const express=require('express')
const bodyParser=require('body-parser')
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const app=express()
const mongoose =require("mongoose")
const graphQlSchema=require("./graphql/schema/index")
const graphQlResolvers=require("./graphql/resolvers/index")



app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
  schema :graphQlSchema,
 rootValue:graphQlResolvers,
 graphiql:true
  
}));




app.get('/',(req,res,next)=>{
    res.send("Bonjour à tous")
})
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER}@cluster0.lxagwwy.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.listen(3000)