import express from "express";

import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { User } from "./db/schema";

const app = express();




app.use(cors({origin :ENV.FRONTEND_URL}))
app.use(clerkMiddleware())
app.use(express.json())  // for parsing application/json
// eg - when user sends post request to server, the body of the request is parsed by this middleware
//  we get data in format of json to send it to our db using drizzle
// in this format , {a:1, b:2}
// without this middleware we would not be able to access the body of the request

app.use(express.urlencoded({extended : true}))

// encoded means  that server should be able to parse the urlencoded format of data
// urlencoded format is like this , a=1&b=2&c=3
// without this middleware we would not be able to access the body of the urlencoded data
// example of urlencoded data is - form submission - when you submit a form in a website
// extended : true means that the body can be parsed in a nested format (Objects inside Objects)

// example - {"name" : "billy" , "email" : "[EMAIL_ADDRESS]"} this is json format
// example - name=billy&email=[EMAIL_ADDRESS]" this is urlencoded format
// this is urlencoded format , we can send this data to server
// and when we send this data to server , we can access it using req.body
// and we can send this data to server using fetch api with method post , and content type urlencoded






app.get("/", (req,res) => {
    res.json({
        message : "Welcome to product selling platform",
        endpoints : {
            users : "/api/users",
            products : "/api/products",
            comments : "/api/comments",
            
        }
    })
})

app.listen( ENV.PORT , () => {
    console.log("Server is running on port " + ENV.PORT);
})