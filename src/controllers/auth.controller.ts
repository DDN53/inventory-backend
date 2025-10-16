import { Request, Response, NextFunction } from "express";
import { User} from "../models/user"; 
import { Role } from "../models/role.model";
import bcrypt from "bcrypt";


export const register = async (req: Request, res: Response, next: NextFunction) => {
try {
        const {name,email,password,roleName="CLERK"} = req.body;
        const role = await Role.findOne({where: {name:roleName}});
        const passwordHash = await bcrypt.hash(password,10);
        const user = new User({name,email,password:passwordHash,role:role?.id});
        await user.save();
        res.status(201).json({message:"User registered successfully"});
        
    } catch (error) {
        next(error);
    }

};

// const signTokens = (user:any) => {
//     const access = jwt.sign(
//       { sub:user.id, roleId:user.roleId }, process.env.JWT_SECRET!, { expiresIn: Number(process.env.JWT_EXPIRES) }
//     );
//     const refresh = jwt.sign(
//       { sub:user.id }, process.env.REFRESH_SECRET!, { expiresIn: Number(process.env.REFRESH_EXPIRES) }
//     );
//     return { access, refresh };
//   };


// export const login = async (req: Request, res: Response, next: NextFunction) => {

//     try {
//         const {email,password} = req.body;
//         const user:any = await User.findOne({where:{ email }, include:[Role] });
//         if(!user) return res.status(401).json({ message:"Invalid credentials" });
//         const ok = await bcrypt.compare(password,user.password);
//         if(!ok) return res.status(401).json({ message:"Invalid credentials" });
//         res.json({ tokens: signTokens(user), user:{ id:user.id, name:user.name, role:user.role.name } });
     
        
//     } catch (error) {
//         next(error);
//     }
// };




// export const refresh = async (req: Request, res: Response, next: NextFunction) => {
//     try{
//         const { token } = req.body;
//         const decoded:any = jwt.verify(token, process.env.REFRESH_SECRET!);
//         const user = await User.findByPk(decoded.sub);
//         res.json({ tokens: signTokens(user) });
//       } catch(e){ next(e); }

// }