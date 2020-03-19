var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node App' });
});

router.post('/ville', async function(req, res, next){
  const ville = req.body.ville; 
  var response;
  try{
    response =  await axios.get('https://geocode.xyz/' + encodeURI(ville) + '?json=1&region=FR');
  }
  catch (error) {
    console.log(error);
  };
  if(response.data.error == null){
    const latlng = response.data.latt + ',' + response.data.longt;
    // const lng = response.data.longt;
    // const lat = response.data.latt;
    // res.render('ville', { ville: ville, lng: lng, lat : lat, visibility : 'visible'});
    res.render('ville', { ville: ville, latlng : latlng, visibility : 'visible'});

  }else{
    res.render('ville', { ville: "Désolé, cette ville est inconnue :(", visibility : 'hidden' });
  }
})

module.exports = router;