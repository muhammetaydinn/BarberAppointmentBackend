const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const Dates = require("./models/Date");
const Barber = require("./models/Barber");
const Randevularim = require("./models/Randevularim");
 var todayy = new Date();
 const today = todayy.toISOString().split("T")[0];
//GUN KONTROLU ILE BIRLIKTE GUN TASIMA YAPILACAK

 function diffInToday(date1) {
   var todayy = new Date();
   const today = todayy.toISOString().split("T")[0];
   const date2 = new Date(today); //bugünün normal formatı
   const date3 = new Date(date1); //date1 in normal formatı
   const Difference_In_Time = date2.getTime() - date3.getTime();
   const Difference_In_Days = Math.abs(Difference_In_Time / (1000 * 3600 * 24));
   return Difference_In_Days;
 }


//Deletes old appointments
function deleteOldAppointments() {
  Randevularim.deleteMany({ date: { $lt: today } }, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

Dates.findById("638179d027430419a4e409d3", function (err, date) {
  console.log(date.date);
  console.log(diffInToday(date.date));
  
  if (err) return handleError(err);
  if (diffInToday(date.date) == 0) {
    console.log("bugün bisey yapmamıza gerek yok");
  } else if (diffInToday(date.date) == 1) {
    console.log("yarın günleri 1 kaydır");
    updateDates1().then(() => {
      Dates.updateOne(
        { _id: "638179d027430419a4e409d3" },
        { $set: { date: today } },
        function (err, res) {
          if (err) throw err;
          console.log("1 gün kaydırıldı");
        }
      );
    });


  } else if (diffInToday(date.date) == 2) {
    console.log("yarından sonra");
    updateDates2().then(() => { 
      Dates.updateOne(
        { _id: "638179d027430419a4e409d3" },
        { $set: { date: today } }
      ).then(() => {
        console.log("tarih güncellendi");
      });

    });
   
  } else {
    console.log("geçmiş");
     updateDates().then(() => {
       Dates.updateOne(
         { _id: "638179d027430419a4e409d3" },
         { $set: { date: today } },
         function (err, res) {
           if (err) throw err;
           console.log("1 document updated");
         }
       );
     });
  } 
});



async function updateDates1() {
    try {
    const updatedDate = await Barber.updateMany(
      {  },
     
      [{ $set: { 
      today:"$tomorrow",
      tomorrow:"$nextDay",
      nextDay:false

      } }]
    );
    console.log(updatedDate);
  } catch (err) {
      console.log(err);
  }
}


async function updateDates2() {
    try {
    const updatedDate = await Barber.updateMany(
      {  },
     
      [{ $set: { 
      today:"$nextDay",
      tomorrow:false,
      nextDay:false

      } }]
    );
    console.log(updatedDate);
  } catch (err) {
      console.log(err);
  }
}







//hepsini müsait yapmak

async function updateDates() {
  try {
    const updatedDate = await Barber.updateMany(
      { },
      [
      {
        $set: {
          today: false,
          tomorrow: false,
          nextDay: false,
        },
      },
      ]
    );
    console.log(updatedDate);
  } catch (err) {
    console.log(err);
  }
}

  
require('dotenv/config');

//Middleware
app.use(cors());
app.use(bodyParser.json());
//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

const barbersRoute = require('./routes/barbers');
app.use('/barbers', barbersRoute);

const randevularimRoute = require('./routes/randevularim');
app.use('/randevularim', randevularimRoute);

const datesRoute = require('./routes/dates');
app.use('/dates', datesRoute);


//Routes
app.get('/', (req, res) => {
    res.send('we are on home');
});
//Connnect to DB
mongoose.connect(process.env.DB_CONNECTION,() => {
    console.log('Connected to DB!');
});
//how to we start listening to server
app.listen(3000);