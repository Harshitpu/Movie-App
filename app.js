const searchform=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputbox');
const searchBtn=document.querySelector('.searchbtn');

//function to fetch movie details using api
const getMovieInfo=async (movie)=>{
    try {
        const mapi_key="61cc298";
        const url=`http://www.omdbapi.com/?apikey=${mapi_key}&t=${movie}`;
    
        const response=await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch Movie data");
        }

        const data=await response.json();
       
        showmoviedata(data);
        // console.log(data);
        
    } catch (error) {
        showerror("No Movie Found!!");
    }
    
   

}


//show movie details on screen
const showmoviedata=(data)=>{

    movieContainer.innerHTML="";
    movieContainer.classList.remove('noback');
    //use destructuring properties
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster,BoxOffice,Country
       , Director,Language,Writer,Awards}=data;

    const MovieElement=document.createElement('div');
    MovieElement.classList.add('movie-ele');
    MovieElement.innerHTML=`<h2>${Title}</h2>
                            <p><strong>IMDB-Rating -> &#11088;</strong>${imdbRating}</p>`;

    const MovieGenreElement=document.createElement('div');
    MovieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p=document.createElement('p');
        p.innerText=element;
        MovieGenreElement.appendChild(p);

    });

    MovieElement.appendChild(MovieGenreElement);
    MovieElement.innerHTML+=`<p><strong>Released Date --> </strong>${Released}</p>
                             <p><strong>Duration --> </strong>${Runtime}</p>
                             <p><strong>Cast --> </strong>${Actors}</p>
                             <p><strong>Collections --> </strong>${BoxOffice}</p>
                             <p><strong>Country --> </strong>${Country}</p>
                             <p><strong>Director --> </strong>${Director}</p>
                             <p><strong>Language --> </strong>${Language}</p>
                             <p><strong>Story-writer --> </strong>${Writer}</p>
                             <p><strong>Winning-Awards --> </strong>${Awards}</p>
                             <p><strong>Story --> </strong>${Plot}</p>`;
    //creating a div add to movie poster
    const moviePoster=document.createElement('div');
    moviePoster.classList.add('movie-poster');
    moviePoster.innerHTML=`<img src="${Poster}"/>`;
    
    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(MovieElement);
}

//functionto display error msg
const showerror=(message)=>{
    movieContainer.innerHTML=`<h2>${message}</h2>`
    movieContainer.classList.add('noback');
}

//function to handle form submission
const handleform=(e)=>{
    e.preventDefault();
   const movieName=inputBox.value.trim();
   if(movieName!=="")
    {
        showerror("Fetching Movie Information...")
      getMovieInfo(movieName);
    }
    else{
       showerror("Enter movie name to get movie information")
    }

}

//Add event listner to search form
searchform.addEventListener('submit',handleform);


