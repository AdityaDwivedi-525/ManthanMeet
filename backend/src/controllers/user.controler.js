// import httpStatus from "http-status";
// import { User } from "../models/user.model.js";
// import bcrypt , {hash} from "bcrypt";
// import crypto from "crypto";

// const login=async (req,res)=>{
//     const {username , password}=req.body;
//     if(!username || !password ){
//         return res.status(400).json({message :"Please Provide"})
//     }

//     try{
//         const user =await User.findOne({username});
//         if(!user){
//             return res.status(httpStatus.NOT_FOUND).json({message: "User Not Found"})
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch ){
//             let token =crypto.randomBytes(20).toString("hex");
//             user.token=token;
//             await user.save();
//             return res.status(httpStatus.OK).json({message: token})
//         }
//     }catch (e){
//         return res.status(500).json({message:`Something went wrong`});
//     }
// }


// const register = async (req, res) => {
//     const { name, username, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ username });

//         if (existingUser) {
//             return res
//                 .status(httpStatus.FOUND)
//                 .json({ message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name,
//             username,
//             password: hashedPassword,
//         });

//         await newUser.save();

//         res
//             .status(httpStatus.CREATED)
//             .json({ message: "User Registered Successfully" });

//     } catch (e) {
//         res
//             .status(httpStatus.INTERNAL_SERVER_ERROR)
//             .json({ message: `Something went wrong: ${e.message}` });
//     }
// };

// export { register , login};



import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Login Controller
const login = async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Please provide username and password"
        });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "User not found"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // If password is incorrect
        if (!isMatch) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "Invalid password"
            });
        }

        // Generate token
        const token = crypto.randomBytes(20).toString("hex");

        // Save token in DB
        user.token = token;
        await user.save();

        // Send response
        return res.status(httpStatus.OK).json({
            message: "Login Successful",
            token: token
        });

    } catch (e) {
        console.log(e);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
};

// Register Controller
const register = async (req, res) => {
    const { name, username, password } = req.body;

    // Validate fields
    if (!name || !username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Please provide all fields"
        });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            username,
            password: hashedPassword
        });

        // Save user
        await newUser.save();

        return res.status(httpStatus.CREATED).json({
            message: "User Registered Successfully"
        });

    } catch (e) {
        console.log(e);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong: ${e.message}`
        });
    }
};

export { register, login };