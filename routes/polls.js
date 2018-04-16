const express = require('express');
const router  = express.Router();


require('dotenv').config();
//const twilio = require('twilio');

module.exports = (knex) => {

  //var client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

  function insertOptions(optionArray, id) {
    optionArray.forEach((option) => {
      let title = option.title;
      let description = option.description;
      knex('option')
      .insert({title, description, poll_id: id[0]})
      .then((err) => {
        if (err) {
          console.log(err);
        }
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  function insertPhoneNumbers(phoneNumberArray, id){
    if (phoneNumberArray && phoneNumberArray.length > 0) {
      phoneNumberArray.forEach((number) => {
        knex('phone')
        .insert({number, poll_id: id[0]})
        .then((err) => {
          console.log(err);
        }).catch((err) => {
          console.log(err);
        });
      });
    }
  }


  //*********************************************
  //*** GET polls/:id/ ***
  //*********************************************


  router.get("/:id", (req, res)=> {
    let id = req.params.id;
    knex('poll')
    .innerJoin('option', 'poll.id', '=', 'option.poll_id')
    .where('poll.id', id)
    .then((results) => {
      res.render('poll', {results});
    }).catch((err) => {
      console.log(err);
    });
  });


  //*********************************************
  //*** GET polls/:id/links ***
  //*********************************************

  router.get("/:id/links", (req, res) => {
    let id = req.params.id;
    knex('phone')
    .where('poll_id', id)
    .then((results) => {

    }).catch((err) => {
      console.log(err);
    });
    res.render('links', {id, host: process.env.HOST});
  });

  //*********************************************
  //*** GET /polls/:id/result ***
  //*********************************************


  router.get("/:id/result", (req, res)=> {
    let id = req.params.id;
    knex('poll')
    .join('option', 'poll.id', '=', 'option.poll_id')
    .where('poll.id', id)
    .orderBy('rank', 'desc')
    .then((results) => {
      res.render('results', {results});
    }).catch((err) => {
      console.log(err);
    });
  });

  //*********************************************
  //*** GET /polls/:id/result ***
 //*********************************************
 router.get("/:id/options", (req, res) => {
  let id = req.params.id;
  knex('poll')
  .where('id', id)
  .then((result) => {
    res.render('options', {result: result[0], id})
  })
});


 router.post("/", (req, res) => {
  let ptitle = req.body.ptitle;
  let email = req.body.email;
    //Create poll:
    knex('poll')
    .returning('id')
    .insert({ptitle, email})
    .then((id) => {
      console.log("INSERTED: ", id);
      res.send({redirect: '/polls/' + id + '/options'});
    }).catch((err) => {
      console.error(err);
    })
  })


  //*********************************************
  //*** POST/ polls/:id/option ***
  //*********************************************

  router.post('/:id/options', (req, res) => {
    let optionArray = req.body.options;
    for (let option of optionArray) {
      let title = option.title;
      let description = option.description;
      knex('option')
      .returning('id')
      .insert({title, description, poll_id: req.params.id})
      .then((id)=>{
        console.log("Successful insert");
      })
      .catch((err) => {
        console.error(err);
      })
    }
    res.send({redirect: '/polls/' + req.params.id + '/phone'});
  })

  //*********************************************
  //*** GET/ polls/:id/phone ***
  //*********************************************
  router.get('/:id/phone', (req, res) => {
    res.render('phone', {id: req.params.id});
  })

  //*********************************************
  //*** POST/ polls/:id/phone ***
  //*********************************************
  router.post('/:id/phone', (req, res) => {
    let id = req.params.id;
    let phoneNumberArray = req.body.phoneNumberArray;

    if (phoneNumberArray && phoneNumberArray.length > 0) {

      for (let number of phoneNumberArray) {
        knex('phone')
        .insert({number, poll_id: id})
        .then((result) => {
          console.log("Successful phone number insert");
        }).catch((err) => {
          console.error(err);
        })
      }
    }
    res.send({redirect: '/polls/' + req.params.id + '/links'});
  })

  //*********************************************
  //*** PUT/ polls/:id ***
  //*********************************************

  router.put("/:id", (req, res) => {
    let id = req.params.id;
    console.log("THIS IS THE ID:", id);
    knex('poll')
    .select('email')
    .where('id', id)
    .then((result) => {
      let email = result[0].email;
      //do whatever with email
    }).catch((err) => {
      console.log(err);
    });

    let optionsArray = req.body.data;
    optionsArray.forEach((option) => {
      knex('option')
      .increment('rank', option.rank)
      .where('id', option.option_id)
      .then((err) => {
        console.log(err);
      });
    });
    res.send({redirect: '/'});
  });
  return router;
};
