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
    var searchElement = 'https://www.omdbapi.com/?s='+req.query.movie+'&apikey=thewdb';
    var movieDetails = [];
    var results;
    rp(searchElement)
    .then((body)=>{
        results = JSON.parse(body);  
        if(results['Response']=='True'){
            for(let i=0; i< results['Search'].length; i++){
                rp('https://www.omdbapi.com/?i='+results['Search'][i]['imdbID']+'&apikey=thewdb')
                .then(data => {
                    movieDetails.push(JSON.parse(data));
                    if(movieDetails.length === results['Search'].length){
                        res.render('movieResults',{results: results, keyword: req.query.movie, movieDetails: movieDetails});
                    }
                }) 
            }
        }
        else{
            res.render('movieResults',{results: results, keyword: req.query.movie, movieDetails: movieDetails});
        }        
    })
    .catch((err)=>{
        var displayError = JSON.parse(err['error']);
        console.log(displayError['Error']);
        res.render('movieResults',{results: {'Response': 'False', 'Error': displayError['Error']}, keyword: req.query.movie});
    });

});


app.listen(3000,()=>{
    console.log('Listening on Port 3000')
});

