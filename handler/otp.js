
const otpgenerator = require("otp-generator")
const mailer = require("../mailer/sendMail")
const userModel = require("../models/user")
const otpModel = require("../models/otp")
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

const newotp = async (usr, updatePwd = false) => {
    try {
        if (usr.verified && usr.verified === true) {
            return { message: "invalid request" }
        }
        await otpModel.deleteMany({ user: usr.id })
        const otp = otpgenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        await otpModel.create({
            user: usr.id,
            otp: otp
        });
        if (!usr.name || !usr.email) {
            usr = await userModel.findById(usr.id).select("id name email")
        }
        let tokenElement = {
            user: { id: usr.id, verified: false },
            otp: otp,
            date: `${Date.now()}`,
            updatePwd: updatePwd
        }
        if (!updatePwd) {
            await mailer.verifyMail({ name: usr.name, mail: usr.email, otp: otp })
        } else {
            await mailer.resetPwd({ name: usr.name, mail: usr.email, otp: otp })
        }
        const token = jwt.sign(tokenElement, secret, { expiresIn: "1h" });
        return token
    } catch (err) {
        console.log(err.message);
        return err
    }
}

const verify = async (otp, token) => {
    try {
        const matched = await jwt.verify(token, secret)
        if (matched.user?.verified === "true") {
            return { message: "invalid token" }
        }
        if (matched.otp !== otp) {
            return { message: "incorrect otp" }
        }
        const checkdb = await otpModel.findOne({ otp: otp, user: matched.user.id })
        if (!checkdb) {
            return { message: "invalid otp" }
        }
        await otpModel.deleteMany({ user: matched.user.id })
        await userModel.findByIdAndUpdate(matched.user.id, { verified: true })
        matched.user.verified = true
        return matched.user

    } catch (err) {
        console.log(err.message);
        return err
    }
}

module.exports = { newotp, verify }
