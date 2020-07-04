var express = require('express'),
    request = require('request');
    rp      = require('request-promise');
    app     = express();

app.set('view engine', 'ejs')  
app.use(express.static('public'));  

// Home Page
app.get('/',(req,res)=>{
    res.render('searchPage');
});  

//Search results page
app.get('/results', (req,res)=>{
    var searchElement = 'http://www.omdbapi.com/?s='+req.query.movie+'&apikey=thewdb';
    let movieDetails = [];
    let results;
    rp(searchElement)
    .then((body)=>{
        results = JSON.parse(body);     
        for(let i=0; i< results['Search'].length; i++){
            rp('http://www.omdbapi.com/?i='+results['Search'][i]['imdbID']+'&apikey=thewdb')
            .then(data => {
                movieDetails.push(JSON.parse(data));
                if(movieDetails.length === results['Search'].length){
                    res.render('movieResults',{results: results, keyword: req.query.movie, movieDetails: movieDetails});
                }
            }) 
        }   
    })
    .catch((err)=>{
        console.log(err.message);
        res.render('movieResults',{results: {'Response': 'False'}, keyword: req.query.movie});
    });

});

app.get('/results/:id', (req,res)=>{

});

app.listen(3000,()=>{
    console.log('Listening on Port 3000')
});