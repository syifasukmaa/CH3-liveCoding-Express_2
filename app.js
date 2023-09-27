// OUR OWN PACKAGE/MODULE
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

// THIRD PARTY PACKAGE/MODULE
const fs = require("fs")
const express = require("express")
const morgan = require("morgan")
const yaml = require("js-yaml")
const swaggerUi = require("swagger-ui-express")

const app = express()

// middleware dari express
app.use(express.json())
app.use(morgan("dev"))
const swaggerDocument = yaml.load(
  fs.readFileSync(
    "./swagger/swagger.yaml",
    "utf-8"
  )
)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)

// membaca statuc file di public
app.use(express.static(`${__dirname}/public`))

// OUR OWN MIDDLEWARE
app.use((req, res, next) => {
  console.log(
    "hallo FSW2 di middleware kita sendiri"
  )
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

// middleware untuk check nih boleh gak di akses user tersebut === authorization
// app.use((req, res, next) => {
//   if (req.body.role !== "admin") {
//     return res.status(401).json({
//       message: "kamu gak boleh akses",
//     })
//   }

//   next()
// })

// baca data dari file json

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

module.exports = app
