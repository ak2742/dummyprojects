const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user")
const prodModel = require("../models/product")
const cartModel = require("../models/cart")
const middleware = require("../handler/auth")
const otphandler = require("../handler/otp")
const saveImg = require('../handler/file')
const secret = process.env.JWT_SECRET

router.post("/login",
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Use a strong password").isLength({ min: 8, max: 25 }),
    async (req, res) => {
        try {
            let success = false
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })
            }
            const { email, password } = req.body
            const existingUser = await userModel.findOne({ email }).select("id name email password verified");
            if (!existingUser) {
                return res
                    .status(400)
                    .json({ success, error: "incorrect credentials" });
            }
            const passwordMatch = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!passwordMatch) {
                return res
                    .status(400)
                    .json({ success, error: "incorrect credentials" });
            }
            if (!existingUser.verified) {
                const token = await otphandler.newotp(existingUser)
                return res.json({ token: token, message: "Please verify your email to continue" })
            }
            const tokenElement = {
                user: {
                    id: existingUser.id,
                    verified: true
                }
            }
            const token = jwt.sign(tokenElement, secret, { expiresIn: "365d" });
            success = true
            res.json({ success, token })

        } catch (error) {
            console.error(error.message);
            res.status(500).send({ error: "INTERNAL SERVER ERROR" })
        }
    }
)

router.post("/", middleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await userModel.findById(userId).select("-password");
        res.json(userData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

router.post("/edit", middleware, async (req, res) => {
    try {
        const reqUser = await userModel.findById(req.user.id)
        const { image, name, description } = req.body
        let newUser = {}
        if (image) {
            newUser.image = await saveImg(image, reqUser.name)
        }
        if (name) {
            newUser.name = name
        }
        if (description) {
            newUser.description = description
        }
        await userModel.findByIdAndUpdate(
            req.user.id,
            { $set: newUser },
            { new: true }
        );
        const userData = await userModel.findById(req.user.id).select("-password");
        return res.json(userData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

router.delete("/delete",
    body("password").isLength({ min: 8, max: 25 }),
    middleware, async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })
            }
            const existingUser = await userModel.findById(req.user.id);
            const passwordMatch = await bcrypt.compare(
                req.body.password,
                existingUser.password
            );
            if (!passwordMatch) {
                return res
                    .status(400)
                    .json({ error: "incorrect password" });
            }
            const deletedUser = await userModel.findByIdAndDelete(req.user.id).select("-password");
            const deletedProducts = await prodModel.find({ user: req.user.id });
            await prodModel.deleteMany({ user: req.user.id });
            await cartModel.deleteMany({ user: req.user.id });
            for (const item of deletedProducts) {
                await cartModel.deleteMany({ product: item._id });
            }
            res.json({ Success: "Account and related stuff has been deleted", Account: deletedUser, Products: deletedProducts });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ error: "INTERNAL SERVER ERROR" })
        }
    }
)

router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await userModel.findById(userId)?.select("-password -email -balance");
        if (!userData?.verified) {
            return res.status(404).json({ error: "user not found" })
        }
        res.json(userData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

module.exports = router