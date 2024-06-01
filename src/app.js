import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//app.use() is used for middleware configs etc
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// This is middleware configuration

//routes import
import userRouter from './routes/user.routes.js'
import projectRouter from './routes/project.routes.js'

// routes declaration
app.use("/api/v1/user", userRouter) // whenever someone requests "/users", control will be with the userRouter
app.use("/api/v1/project", projectRouter)


// now when I go to http://localhost:8000/api/v1/user, I will see "Hello from home controller"
// http://localhost:8000/api/v1/user/register => "Hello from Register Controller"

export { app };

// testing:
/*
    1. register 2 users
        http://localhost:8000/api/v1/user/register
        {
            "username":"",
            "email":"",
            "password":""
        }
        userId_1: 
        userId_2: 
    2. get login tokens of each
        http://localhost:8000/api/v1/user/login
        {
            "email":"",
            "password":""
        }
        -> token1: 
        -> token2: 
    3. create project
        http://localhost:8000/api/v1/project/create
        {
            "projectName":"",
            "projectDescription":""
        }
        ->projectId: 
    4. create content
        http://localhost:8000/api/v1/project/:projectId/content
        {
            "type":""
        }
        ->contentId: 
    5. create version
        http://localhost:8000/api/v1/project/:projectId/content/:contentId/versions
        {
            "filePath":""
        }
        ->versionId: 
    6. try create content by user2
        http://localhost:8000/api/v1/project/:projectId/content
        {
            "type":""
        }
    7. try create version by user2
        http://localhost:8000/api/v1/project/:projectId/content/:contentId/versions
        {
            "filePath":""
        }
    8. join project
        http://localhost:8000/api/v1/project/join
        {
            "projectId":"",
            "role":""
        }
        
    9. try 6 and 7 again
*/
