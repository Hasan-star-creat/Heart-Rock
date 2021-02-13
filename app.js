const seachSongs = async() => {
    // const spinner = document.getElementById('spiner').innerText;
    // spinner.style.display= "inline-block";
    const searchText = document.getElementById('search-field').value;
    const  url = `https://api.lyrics.ovh/suggest/:${searchText}`
    //  load data 
    // const res = await fetch(url);
    // const data = await res.json();
    // displaySongs(data.data);
   
    //get one data 
     toggleSpinner()  // snipper fuction calling 
            fetch(url)
            .then(res => res.json())
            .then(data => displaySongs(data.data)) 
            .catch(error =>displayError('something went wrong!! plese try again latter!'))
}
const displaySongs = songs => {
     console.log(songs)
    const songContainer = document.getElementById('song-container'); //get parentdiv
      songContainer.innerText = ''; // previw data don;t stored 
    songs.forEach(song => { // for Each looping 
    //    console.log(song.title) 
   const songdiv =   document.createElement('div'); // div creat  
   songdiv.className = 'single-result row align-items-center my-3 p-3'; // div class creta 
       songdiv.innerHTML = `
       <div class="col-md-9">
       <h3 class="lyrics-name">${song.title}</h3>
       <p class="author lead">Album by <span>${song.artist.name}</span></p>
       <audio controls>
        <source src="${song.preview}" type="audio/ogg">
        </audio> </br>
        <img src="${song.artist.picture}" alt="">
   </div>
   <div class="col-md-3 text-md-right text-center">
       <button onclick = "getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
   </div>
       `; // parent div crete value append 
       songContainer.appendChild(songdiv); 
       toggleSpinner()
    });
    
} 
 
// lyric API || use of async await method 
  const getLyric =async(artist, title) => {
      const url  = `https://api.lyrics.ovh/v1/${artist}/${title}` ;
       try {  
           
            const res = await fetch(url)
            const data = await res.json();
            getLyricDisplay(data.lyrics);
       }
        catch(error){
          displayError('Sorry! I failed to load lyrics, Please try again later!')
       }
    
      //  fetch(url)
      //  .then(res => res.json())
      //  .then(data => getLyricDisplay(data.lyrics))
  }
    
  const getLyricDisplay = lyrics => {
    const lyricsDiv =  document.getElementById('lyric-container');
    lyricsDiv.innerText = lyrics;
      //  console.log(lyrics);
  }
      
       // disply errro show 
      const displayError = error => {
       const Error = document.getElementById('disply-error');
       Error.innerText = error;
  }

   const toggleSpinner = () => {
      const spinner = document.getElementById('spiner');
      spinner.classList.toggle('d-none'); // use of toggle method 0 1 
      // if(show){
      //   spinner.classList.remove('d-none');
      // }
      // else{
      //   spinner.classList.add('d-none');
      // }  
   }

    //  use of Eter key search button 
    const searchField = document.getElementById('search-field').addEventListener('keypress',function(event){
          if(event.key === 'Enter'){
          document.getElementById('search-button').click();
          }
    });
