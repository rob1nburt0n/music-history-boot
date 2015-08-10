requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});


requirejs(
  ["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "populate-songs", "add-song"], 
  function($, _, _firebase, Handlebars, bootstrap, access, populate, addSong) {


  // populate.querySongs(function(songObjectFromFirebaseThatWeGotFromPopulate) {
  // });

  var myFirebaseRef = new Firebase("https://popping-torch-5281.firebaseio.com/");

  myFirebaseRef.child("songs").on("value", function(snapshot) {
    var songObjectFromFirebase = snapshot.val(); 
    console.log("songObjectFromFirebase",songObjectFromFirebase);

    var songObjectForTemplates = {
      songs: songObjectFromFirebase
    };
    console.log("songObjectForTemplates",songObjectForTemplates);

    require(['hbs!../templates/songs', 'hbs!../templates/artist', 'hbs!../templates/album'], function(songTemplate, artistTemplate, albumTemplate) {
      $("#songs").before(songTemplate(songObjectForTemplates));

      $("#artistList").append(artistTemplate(songObjectForTemplates));

      $("#albumList").append(albumTemplate(songObjectForTemplates));
    });
  });

  $("#submitSong").click(function(){ 

    var newSong = {
      "name": $("#name").val(),
      "artist": $("#artist").val(),
      "album": $("#album").val(),
    };
    newSong = JSON.stringify(newSong);
    addSong.addSong(newSong);
  });
   


  $('#filter').click(function() {
    var newArtist = $("#artistList").val(); 
     console.log(newArtist);
    $(".song-name").hide();
    $("[artist='"+newArtist+"']").show();

    var newAlbum = $("#albumList").val(); 
    console.log(newAlbum);
    // $(".song-name").hide();
    $("[album='"+newAlbum+"']").show();
  });



 
  $( document ).on( "click", "#deleteButton", function() {
    $(this).parent().remove();
  });

});
