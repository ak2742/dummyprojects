const userModel = require("../models/user")
const chatModel = require("../models/chat")
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

let usersJoined = [];
let inboxConnections = [];

const msgUpdate = async (data) => {
    try {
        if (data.status === "recieved") {
            if (data.from === "") {
                await chatModel.updateMany({ to: data.to, status: "sent" }, { status: "recieved" })
                return "updated"
            }
            await chatModel.updateMany({ from: data.from, to: data.to, status: "sent" }, { status: "recieved" })
            return "updated"
        }
        if (data.status === "read") {
            if (data.from === "") {
                await chatModel.updateMany({ to: data.to, status: "recieved" }, { status: "read" })
                return "updated"
            }
            await chatModel.updateMany({ from: data.from, to: data.to, status: "recieved" }, { status: "read" })
            return "updated"
        }
        let status = "sent"
        const getStatus = userModel.findOne({ id: data.to }).select("lastActive")
        if (getStatus?.lastActive === "active") {
            status = "recieved"
        }
        const msgNew = new chatModel({
            from: data.from,
            to: data.to,
            status: status,
            message: data.msg,
            createdAt: data.createdAt
        });
        await msgNew.save();
        return "saved"
    } catch (err) {
        console.log(err.message);
        return "error"
    }
}

const lsUpdate = async (data) => {
    try {
        await userModel.findByIdAndUpdate(data.user, { lastActive: data.status }, { new: true })
        return "status changed"
    } catch (err) {
        console.log(err.message);
        return "error"
    }
}

const socket = (io) => {
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token
            const auth = jwt.verify(token, secret)
            if (!auth.user?.verified) {
                next(new Error("not authorized"))
            }
            usersJoined[socket.id] = auth.user
            next()
        } catch {
            next(new Error("not authorized"))
        }
    })
    io.on("connection", async (socket) => {
        try {
            let user = await userModel.findById(usersJoined[socket.id].id).select("id name")
            usersJoined[socket.id] = user
            inboxConnections[socket.id] = new Set()
            lsUpdate({ status: "active", user: usersJoined[socket.id].id })
            socket.join(user.id)
            socket.broadcast.emit("user-joined", usersJoined[socket.id]);

            let sorted = await chatModel.find({ to: usersJoined[socket.id].id, status: "sent" }).sort({ createdAt: -1 })
            socket.emit("recieved-data", { from: "", history: sorted })
            for (let i = 0; i < sorted.length; i++) {
                const msg = sorted[i];
                inboxConnections[socket.id].add(msg.from.toString())
                inboxConnections[socket.id].add(msg.to.toString())
            }
        } catch (error) {
            console.log(error.message);
        }

        socket.on("request-user-chat", async (data) => {
            try {
                let todt = data.date ? new Date(data.date) : new Date()
                let sorted = await chatModel.find().or([{ to: data.userID, from: usersJoined[socket.id].id }, { from: data.userID, to: usersJoined[socket.id].id }]).and([{ createdAt: { $lte: todt } }]).limit(10).sort({ createdAt: -1 })
                socket.emit("recieved-data", { from: data.userID, history: sorted })
                for (let i = 0; i < sorted.length; i++) {
                    const msg = sorted[i];
                    inboxConnections[socket.id].add(msg.from.toString())
                    inboxConnections[socket.id].add(msg.to.toString())
                }
            } catch (error) {
                console.log(error.message);
            }
        });

        socket.on("request-inbox-users", async () => {
            try {
                let sorted = await chatModel.find().or([{ from: usersJoined[socket.id].id, to: { $nin: [...inboxConnections[socket.id]] } }, { to: usersJoined[socket.id].id, from: { $nin: [...inboxConnections[socket.id]] } }]).limit(5).sort({ createdAt: -1 })
                socket.emit("recieved-data", { from: "", history: sorted })
                for (let i = 0; i < sorted.length; i++) {
                    const msg = sorted[i];
                    inboxConnections[socket.id].add(msg.from.toString())
                    inboxConnections[socket.id].add(msg.to.toString())
                }
            } catch (error) {
                console.log(error.message);
            }
        });

        socket.on("send-msg", (data) => {
            try {
                if (data.to) {
                    if (data.message !== "") {
                        if (!data.createdAt) {
                            data.createdAt = new Date()
                        }
                        socket.to(data.to).emit("recieved-msg", {
                            message: data.message,
                            from: usersJoined[socket.id].id,
                            createdAt: data.createdAt
                        });
                        msgUpdate({ from: usersJoined[socket.id].id, to: data.to, msg: data.message, createdAt: data.createdAt, status: "sent" })
                        if (data.to !== "") {
                            inboxConnections[socket.id].add(data.to)
                        }
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        });

        socket.on("recieved", (from) => {
            try {
                msgUpdate({ from: from, to: usersJoined[socket.id].id, status: "recieved" })
                if (from !== "") {
                    inboxConnections[socket.id].add(from)
                }
            } catch (error) {
                console.log(error.message);
            }
        });

        socket.on("read", (from) => {
            try {
                msgUpdate({ from: from, to: usersJoined[socket.id].id, status: "read" })
                if (from !== "") {
                    inboxConnections[socket.id].add(from)
                }
            } catch (error) {
                console.log(error.message);
            }
        });

        socket.on("disconnect", () => {
            try {
                if (usersJoined[socket.id]) {
                    socket.broadcast.emit("user-left", usersJoined[socket.id]);
                    lsUpdate({ status: `${new Date()}`, user: usersJoined[socket.id].id })
                    inboxConnections[socket.id].clear()
                }
            } catch (error) {
                console.log(error.message)
            }
        });
    });
}
module.exports = socket