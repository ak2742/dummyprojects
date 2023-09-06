const host = `http://${process.env.REACT_APP_HOST}`
let token = localStorage.getItem("auth") || "";
let tempToken = localStorage.getItem("deauth") || "";

const tokenCall = () => {
     token = localStorage.getItem("auth") || "";
}

const tempTokenCall = () => {
     tempToken = localStorage.getItem("deauth") || "";
}

const signupAPI = async (params) => {
     try {
          if (!params) {
               return { error: "invalid argument" }
          }
          const response = await fetch(`${host}/auth/join`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(params)
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

const loginAPI = async (params) => {
     try {
          if (!params) {
               return { error: "invalid argument" }
          }
          const response = await fetch(`${host}/account/login`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(params)
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

const myAccAPI = async () => {
     try {
          tokenCall()
          const response = await fetch(`${host}/account`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

const findAccAPI = async (id) => {
     try {
          if (!id) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/account/${id}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
               },
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

const lostPassAPI = async (email) => {
     try {
          if (!email) {
               return { error: "invalid argument" }
          }
          const response = await fetch(`${host}/auth/passwordlost`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({email})
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

const newPassAPI = async (password) => {
     try {
          if (!password) {
               return { error: "invalid argument" }
          }
          const response = await fetch(`${host}/auth/newpassword`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify({password})
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

const verifyMailAPI = async (otp) => {
     try {
          if (!otp) {
               return { error: "invalid argument" }
          }
          tempTokenCall()
          const response = await fetch(`${host}/auth/verifyemail`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": tempToken
               },
               body: JSON.stringify({otp})
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

const resendMailAPI = async () => {
     try {
          await tempTokenCall()
          const response = await fetch(`${host}/auth/resendmail`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": tempToken
               },
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

const editAccAPI = async (params) => {
     try {
          if (!params) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/account/edit`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify(params)
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

const delAccAPI = async (password) => {
     try {
          if (!password) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/account/delete`, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify({password})
          })
          let res = await response.json()
          return res
     } catch (error) {
          return { error: error }
     }
}

module.exports = { signupAPI, loginAPI, myAccAPI, findAccAPI, editAccAPI, delAccAPI, verifyMailAPI, resendMailAPI, lostPassAPI, newPassAPI }
