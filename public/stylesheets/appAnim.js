var data = document.querySelector('#data').textContent;
var card = document.querySelectorAll('.card-title');
var bigCard = document.querySelector('.big-card');
var cardMovieData = document.querySelector('.movie-data');
var bigCardImage = document.querySelector('.movie-data .main-image');
var noPreview = document.querySelectorAll('.black-filter p a');
var coverImage = document.querySelector('.movie-data .cover-image');
const noPreviewImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQkmpiE3saxLv17jlQVpffuUAAtU95HJoaPRw&usqp=CAU';
data = JSON.parse(data);

// Movie description
var movieTitle = document.querySelector('.movie-title');
var imdbRating = document.querySelector('.big-card .rating');
var movieType = document.querySelector('.movie-type');
var movieGenre = document.querySelector('.movie-genre');
var movieLang = document.querySelector('.movie-lang');
var moviePlot = document.querySelector('.movie-plot');
var movieRelease = document.querySelector('.movie-release');
var movieDirector = document.querySelector('.movie-director');
var movieCast = document.querySelector('.movie-cast');


for(let i=0; i< card.length; i++){
    if(noPreview[i].getAttribute('href')=='N/A'){
        noPreview[i].setAttribute('href', noPreviewImage);
    }

    card[i].addEventListener('click',()=>{
        let poster = data[i]['Poster'];
        // Movie details in preview card
        bigCardImage.setAttribute('src', data[i]['Poster']);
        coverImage.setAttribute('src', data[i]['Poster']);
        movieTitle.textContent = data[i]['Title'];
        imdbRating.textContent = data[i]['imdbRating']; 
        movieType.innerHTML ="<span id='topic'>Type:</span> &nbsp;" + data[i]['Type'];
        movieLang.innerHTML = "<span id='topic'>Language:</span> &nbsp;" + data[i]['Language'];
        movieGenre.innerHTML = "<span id='topic'>Genre:</span> &nbsp;" + data[i]['Genre'];
        moviePlot.innerHTML = data[i]['Plot'];
        movieRelease.innerHTML = "<span id='topic'>Release Date:</span> &nbsp;" + data[i]['Released'];
        movieDirector.innerHTML = "<span id='topic'>Director:</span> &nbsp;" + data[i]['Director'];
        movieCast.innerHTML = "<span id='topic'>Cast:</span> &nbsp;" + data[i]['Actors'];
        // -------------------------------------------------

        bigCard.classList.add('open');
        cardMovieData.classList.add('open');
    });
}

bigCard.addEventListener('click', (e)=>{
    if(e.target.classList.contains('big-card') || e.target.classList.contains('close-icon')){
        bigCard.classList.remove('open');
        cardMovieData.classList.remove('open');
    }
});