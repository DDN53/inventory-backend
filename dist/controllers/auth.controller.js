import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// ---------------- Register ----------------
export const register = async (req, res, next) => {
    try {
        const { name, email, password, roleName = "CLERK" } = req.body;
        const role = await Role.findOne({ where: { name: roleName } });
        if (!role)
            return res.status(400).json({ message: `Role '${roleName}' not found` });
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            passwordHash,
            roleId: role.id
        });
        if (!user.roleId) {
            return res.status(500).json({ message: "No role assigned to user" });
        }
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user.id, name: user.name, email: user.email },
        });
    }
    catch (err) {
        next(err);
    }
};
// ---------------- Helper for tokens ----------------
const signTokens = (user) => {
    const secret = process.env.JWT_SECRET || "12345rtyu";
    const refreshSecret = process.env.REFRESH_SECRET || "67890uiop";
    const access = jwt.sign({ sub: user.id, roleId: user.roleId }, secret, { expiresIn: Number(process.env.JWT_EXPIRES) || 86400 });
    const refresh = jwt.sign({ sub: user.id }, refreshSecret, { expiresIn: Number(process.env.REFRESH_EXPIRES) || 604800 });
    return { access, refresh };
};
// ---------------- Verify Middleware ----------------
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer "))
            return res.status(401).json({ message: "No token provided" });
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "12345rtyu"; // ✅ unified
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("JWT verification failed:", err);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
// ---------------- Login ----------------
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email and password are required" });
        const user = await User.findOne({
            where: { email },
            include: [{ model: Role, as: "role" }]
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok)
            return res.status(401).json({ message: "Invalid email or password" });
        const tokens = signTokens(user);
        res.json({
            message: "Login successful",
            tokens,
            user: { id: user.id, name: user.name, email: user.email, role: user?.role?.name },
        });
    }
    catch (err) {
        next(err);
    }
};
// ---------------- Refresh ----------------
export const refresh = async (req, res, next) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET || "67890uiop");
        const user = await User.findByPk(decoded.sub);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ tokens: signTokens(user) });
    }
    catch (err) {
        next(err);
    }
};
