const host = `http://${process.env.REACT_APP_HOST}`
let token = localStorage.getItem("auth") || "";

const tokenCall = () => {
     token = localStorage.getItem("auth") || "";

}

const loadByIDAPI = async (id, date) => {
     try {
          if (!id) {
               return { error: "invalid argument" }
          }
          if (!date) {
               date = new Date()
          }
          tokenCall()
          const response = await fetch(`${host}/product/read/${id}?dt=${date}`, {
               method: "GET",
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

const loadByUserAPI = async (id, date) => {
     try {
          if (!id) {
               return { error: "invalid argument" }
          }
          if (!date) {
               date = new Date()
          }
          tokenCall()
          const response = await fetch(`${host}/product/by/0/${id}?dt=${date}`, {
               method: "GET",
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

const loadByUserAuthAPI = async (id, date) => {
     try {
          if (!id) {
               return { error: "invalid argument" }
          }
          if (!date) {
               date = new Date()
          }
          tokenCall()
          const response = await fetch(`${host}/product/by/1/${id}?dt=${date}`, {
               method: "GET",
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

const searchMeAPI = async (term, date) => {
     try {
          if (!date) {
               date = new Date()
          }
          if (term !== "") {
               tokenCall()
               const response = await fetch(`${host}/product/read/search?q=${term}&dt=${date}`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         "authToken": token
                    },
               })
               let res = await response.json()
               return res
          } else {
               return { error: "invalid argument" }
          }
     } catch (error) {
          return { error: error }
     }
}

const createNewAPI = async (params) => {
     try {
          if (!params) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/product/add`, {
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

const deleteOneAPI = async (id) => {
     try {
          if (!id) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/product/delete/${id}`, {
               method: "DELETE",
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

const editOneAPI = async (params) => {
     try {
          if (!params) {
               return { error: "invalid argument" }
          }
          tokenCall()
          const response = await fetch(`${host}/product/edit/${params.id}`, {
               method: "PUT",
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

module.exports = { loadByIDAPI, loadByUserAPI, loadByUserAuthAPI, createNewAPI, editOneAPI, deleteOneAPI, searchMeAPI }
