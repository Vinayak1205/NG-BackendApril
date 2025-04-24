
const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const myDb = require('./MongoDb');
const axios = require('axios');
const PhysicsCyclePdf = require("./PhysicsCyclePdf");
const ChemistryCyclePdf = require("./ChemistryCyclePdf");
const SecondYearPdf = require("./SecondYearPdf")



const App = express();
const PORT = 5000;

App.use(cors({ origin: "*" }));
App.use(bp.json());
App.use(express.urlencoded({ extended: false }));


App.use("/api/PhysicsCycle", PhysicsCyclePdf);
App.use("/api/ChemistryCycle", ChemistryCyclePdf);
App.use("/api/SecondYear",SecondYearPdf)
// Google OAuth client credentials


const GOOGLE_CLIENT_ID = '671517750511-mmdjce8r01fgqmfbiqevoq7fcr46df4p.apps.googleusercontent.com';  // Replace with your Google Client ID

// Secret key for signing JWT (use a secure key in production)
const JWT_SECRET_KEY = 'vinuamamaa32#$32';  // Replace with a secure secret key

// Initialize Google OAuth2 Client
const client = new OAuth2Client(GOOGLE_CLIENT_ID); 

// Middleware to parse JSON request body
App.use(express.json());

// Enable CORS for the frontend running on localhost:3000
App.use(cors({
  origin: ['http://localhost:3000','https://ng-backend-1-f4r9.onrender.com'] // Allow requests only from this origin
  methods: ['GET', 'POST'], // Allow only GET and POST methods
  credentials: true, // Enable cookies and credentials
}));

// // Google Authentication Endpoint
// App.post('/api/auth/google', async (req, res) => {
//   const { token } = req.body;

//   console.log("token : " +token)

//   try {
//     // Verify the token using Google's OAuth2Client
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: GOOGLE_CLIENT_ID, // Using the hardcoded Google Client ID
//     });

//     const payload = ticket.getPayload();
//     const userId = payload.sub;
//     const userEmail = payload.email;

  
//     // Access the 'login' collection

//     // Try to find a user with the same email
   

    

//     let jwtToken;
//     const collection = myDb.collection('Login');

//     const existingUser = await collection.findOne({email:userEmail})

//     if (existingUser) {
//       // If user exists, generate a JWT token and log them in

//       const result = await collection.updateOne(
//         { email: userEmail }, // Match the document with the specific email
//         { $inc: { numberOfVisits: 1 } } // Increment the numberOfVisits field by 1
//       );

//       jwtToken = jwt.sign(
//         { userId, email: userEmail },
//         JWT_SECRET_KEY,  // Secret key for signing the JWT
//         { expiresIn: '1h' }  // Set token expiration time (e.g., 1 hour)
//       );

//       console.log('User logged in:', userEmail);
//     } else {

//         // Regular expression to match the 'cs' part in the email (before the number)
//     const emailPattern = /^[a-z]+\.([a-z]+)\d+@bmsce\.ac\.in$/;

// // Test the email against the pattern
//     const match = userEmail.match(emailPattern);

//         if (match && match[1]) {
//             const branch = match[1]; // Extracted 'cs' part
//             console.log('Branch:', branch);
//       // If user doesn't exist, insert them into the "login" collection (sign up process)
//       await collection.insertOne({
//         email: userEmail,
//         userId,
//         name: payload.name,
//         numberOfVisits:1,
//         branch:branch
//       });
    
//     }

//       // Generate a JWT token for the newly signed-up user
//       jwtToken = jwt.sign(
//         { userId, email: userEmail },
//         JWT_SECRET_KEY,  // Secret key for signing the JWT
//         { expiresIn: '1h' }  // Set token expiration time (e.g., 1 hour)
//       );

//       console.log('New user signed up:', userEmail);
//     }

//     // Send the JWT token back to the client
//     res.json({
//       message: existingUser ? 'User logged in' : 'User signed up',
//       token: jwtToken,  // Send the JWT token to the frontend
//       userId,
//       userEmail,
//       name: payload.name,
//       picture: payload.picture,
//     });

//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// // Middleware to authenticate JWT token for protected routes
// const authenticateJWT = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];  // Get token from Authorization header

//   if (!token) {
//     return res.sendStatus(403);  // Forbidden if no token is provided
//   }

//   jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);  // Invalid token
//     }
//     req.user = user;  // Attach user info to the request
//     next();  // Pass the request to the next middleware
//   });
// };

// // Example of a protected route that requires a valid JWT token
// App.get('/api/user/data', authenticateJWT, (req, res) => {
//   res.json({
//     message: 'Protected user data',
//     user: req.user,  // Return user info from JWT payload
//   });
// });




// Endpoint to get Physics cycle subjects
App.post("/api/GetPhysicsCycleSubjects", async (req, resp) => {
    const PhysicsCycleCollection = myDb.collection("PhysicsCycle");
    const SearchedSubject = req.body.SubjectName;
    console.log(SearchedSubject);
   
    const regex = new RegExp(SearchedSubject, 'i');
    const Subjects = await PhysicsCycleCollection.find({ SubjectName: regex }).toArray();
   
    console.log(Subjects);
    resp.send(Subjects);
});

// Endpoint to get Chemistry cycle subjects
App.post("/api/GetChemistryCycleSubjects", async (req, resp) => {
    const ChemistryCycleCollection = myDb.collection("ChemistryCycle");
    const SearchedSubject = req.body.SubjectName;
    console.log(SearchedSubject);
   
    const regex = new RegExp(SearchedSubject, 'i');
    const Subjects = await ChemistryCycleCollection.find({ SubjectName: regex }).toArray();
   
    console.log(Subjects);
    resp.send(Subjects);
});


App.post("/api/GetSearchedBranchRelatedSubjects",async(req,resp)=>{

    const Collection = null

    const SearchedSubject = req.body.SubjectName
    const Branch = req.body.Branch


    console.log(SearchedSubject)



    const regex = new RegExp(SearchedSubject, 'i');

    const Subjects = [];
    if(Branch === "CSE"){
        Collection = myDb.collection("CSE")
        Subjects = await Collection.find({ SubjectName: regex }).toArray();
    }
    else
    if(Branch === "ISE"){
        Collection = myDb.collection("ISE")
        Subjects = await Collection.find({ SubjectName: regex }).toArray();
    }
    else
    if(Branch === "ECE"){
        Collection = myDb.collection("ECE")
        Subjects = await Collection.find({ SubjectName: regex }).toArray();
    }
    else
    if(Branch === "ETE"){
        Collection = myDb.collection("ETE")
        Subjects = await Collection.find({ SubjectName: regex }).toArray();
    }
   

    console.log(Subjects)

    resp.send(Subjects);
})


App.post("/api/getBranchRelatedPYQ", async (req, resp) => {
    try {
        let Collection;
        const Sem = req.body.Sem;
        const Branch = req.body.Branch;

        if (!Sem || !Branch) {
            return resp.status(400).send('Sem and Branch are required');
        }

        switch (Branch) {
            case "CSE":
                Collection = myDb.collection("CSE");
                break;
            case "ISE":
                Collection = myDb.collection("ISE");
                break;
            case "ECE":
                Collection = myDb.collection("ECE");
                break;
            case "ETE":
                Collection = myDb.collection("ETE");
                break;
            default:
                return resp.status(400).send('Invalid Branch');
        }

        const Subjects = await Collection.find({ Sem: Sem }).toArray();
        console.log(Subjects);
        resp.send(Subjects);
    } catch (error) {
        console.error('Error fetching branch-related PYQ:', error);
        resp.status(500).send('Internal Server Error');
    }
});



// Start the server
App.listen(PORT, err => {
    if (err)
        console.log(err);
    else
        console.log("Server Running at port " + PORT);
});

