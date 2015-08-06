requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});


requirejs(["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
function($, Handlebars, bootstrap, access, populate, getMore) {


  populate.querySongs(function(songs) {
    require(['hbs!../templates/songs', 'hbs!../templates/artist', 'hbs!../templates/album'], function(songTemplate, artistTemplate, albumTemplate) {
      $("#songs").before(songTemplate(songs));
      $("#artistList").append(artistTemplate(songs));
      $("#albumList").append(albumTemplate(songs));
    });
  });


  access.getMoreButton().click(function(){
    getMore.querySongs(function(songs) {
      require(['hbs!../templates/songs', 'hbs!../templates/artist', 'hbs!../templates/album'], function(songTemplate, artistTemplate, albumTemplate) {
        $("#songs").before(songTemplate(songs));
        $("#artistList").append(artistTemplate(songs));
        $("#albumList").append(albumTemplate(songs));
      });
    });
  });

  $( document ).on( "click", "#deleteButton", function() {
    $(this).parent().remove();
  });

});

// var songList = function(data) {
     //  for (var i = 0; i <data.length; i++) {
     //  var songName = data[i].name;
     //  var songArtist = data[i].artist;
     //  var songAlbum = data[i].album;
     //  var songsText = '<div class="song-name"><h3>' + songName + "</h3><p>" + songArtist + " | " + songAlbum + "</p>" + "<button id='deleteButton'>Delete</button>" + "</div>";
     //  $("#more").before(songsText);
     //  console.log(songsText);
     //  }
    