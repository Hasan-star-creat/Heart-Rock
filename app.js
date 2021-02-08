const seachSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const  url = `https://api.lyrics.ovh/suggest/:${searchText}`
    //  load data 
     fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data)) // get one data 
}
 
const displaySongs = songs => {
    //  console.log(songs)
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

    });
} 
 
// lyric API 
  const getLyric = (artist, title) => {
      const url  = `https://api.lyrics.ovh/v1/${artist}/${title}` ;
       fetch(url)
       .then(res => res.json())
       .then(data => getLyricDisplay(data.lyrics))
  }
   
  const getLyricDisplay = lyrics => {
    const lyricsDiv =  document.getElementById('lyric-container');
    lyricsDiv.innerText = lyrics;
          console.log(lyrics);
  }