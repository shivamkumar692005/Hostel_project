const express = require('express');
const path = require('path');
const ejsMate = require("ejs-mate");
require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./model/student");
const Admin = require("./model/admin");
const Complain = require("./model/complaint");
const fs = require("fs");
const uploadOnCloudinary = require("./utils/cloudnary");
const upload = require("./middleware/multer.middleware");
const app = express();
const port = 8080;

//connect to mongodb
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hostel");
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")));


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'slider.html'));
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'slider.html'));
});

app.get('/main', (req, res) => {
    res.render("sections/index.ejs");
});

// app.get('/main1', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'home.html'));
// });



app.post('/complain', upload.single("complaint[file]"), async (req, res) => {
  try {
      let complaintData = req.body.complaint || {};
      let imageUrl = null;

      if (req.file) {
          const uploadResult = await uploadOnCloudinary(req.file.path);
          if (uploadResult) {
              imageUrl = uploadResult.secure_url; // Get the image URL
              try {
                  
                  fs.unlinkSync(req.file.path);
                  console.log("Local file removed after uploaded");
              } catch (unlinkErr) {
                  console.error("Error removing file:", unlinkErr);
              }
          }
      }

      if (imageUrl) {
          complaintData.file = imageUrl; 
      }

      const newComplain = new Complain(complaintData);
      await newComplain.save();

      res.redirect("/table");

  } catch (error) {
      console.error("Error saving complaint:", error);
      res.status(500).send("Error processing complaint.");
  }
});

  


app.get("/table", async(req, res) => {
  try {
    let complains = await Complain.find();
    res.render("sections/admintable",{complains});
  } catch {
    console.log("Error ")
  }
})
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});