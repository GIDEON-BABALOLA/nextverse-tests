
const mongoose = require("mongoose")
const app = express();
const PORT = 3000
mongoose.connect("mongodb+srv://nextverse101:n3dblQlCnV63uvZU@cluster0.hhv6f.mongodb.net/litenoteDB")
.then(() => {
      app.listen(PORT, () => {
        console.log(` Connected To Database && Server is running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
    console.log(error.name)
    console.log("Unable To Connect To Database")
})