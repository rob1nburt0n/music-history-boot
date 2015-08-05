requirejs(
  ["dom-access", "populate-songs", "get-more-songs"], 
  function(access, populate, getMore) {
    
    var songList = function(data) {
      for (var i = 0; i <data.length; i++) {
      var songName = data[i].name;
      var songArtist = data[i].artist;
      var songAlbum = data[i].album;
      var songsText = '<div class="song-name"><h3>' + songName + "</h3><p>" + songArtist + " | " + songAlbum + "</p>" + "<button id='deleteButton'>Delete</button>" + "</div>";
      $("#more").before(songsText);
      console.log(songsText);
      }
    };
 
    populate.querySongs(songList);

    access.getMoreButton().click(function(){

    getMore.querySongs(songList);
      
  });

      $( document ).on( "click", "#deleteButton", function() {
       $(this).parent().remove();
      });

});

