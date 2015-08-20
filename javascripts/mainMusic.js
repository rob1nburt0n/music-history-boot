requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});


requirejs(
  ["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "populate-songs", "q", "add-song", "get-more-songs", "authentication"], 
  function($, _, _firebase, Handlebars, bootstrap, access, populate, q, addSong, getmoresongs, auth) {
//Detect if the user is already logged in
    var ref = new Firebase("https://popping-torch-5281.firebaseio.com");
    var authData = ref.getAuth();
if (authData === null) {
  ref.authWithOAuthPopup("github", function(error, authData) {
    if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    auth.setUid(authData.uid);
    // require([""], function(){});
   }
});
  //user already authenticated, store uid and show data
}else {
  auth.setUid(authData.uid);
  // require([""], function(){});
}


  // var firstSongList = addSong();

  // var all_songs = [];

  // firstSongList
  //   .then(function(first_songs){
  //     for (var i = 0; i < first_songs.songs.length; i++) {
  //        all_songs.push(first_songs.songs[i]);
  //      }
  //      return getmoresongs();
  //   })
  //   .then(function(second_songs){
  //     for (var i = 0; i < second_songs.songs.length; i++) {
  //        all_songs.push(second_songs.songs[i]);
  //        //or
  //        //.then(function(second_songs){
  //        //second_songs.songs.forEach(function(song){
  //      }
  //   })
  //   .done(function(){
  //     console.log("all_songs", all_songs);
  //   });

  // populate.querySongs(function(songObjectFromFirebaseThatWeGotFromPopulate) {
  // });
  var myFirebaseRef = new Firebase("https://popping-torch-5281.firebaseio.com/");
  
  var currentUser = auth.getUid();

  myFirebaseRef.child("songs").orderByChild("uid").equalTo(currentUser).on("value", function(snapshot) {
    var songObjectFromFirebase = snapshot.val(); 
    console.log("songObjectFromFirebase",songObjectFromFirebase);

    var songObjectForTemplates = {
      songs: songObjectFromFirebase
    };
    console.log("songObjectForTemplates",songObjectForTemplates);

    require(['hbs!../templates/songs', 'hbs!../templates/artist', 'hbs!../templates/album'], function(songTemplate, artistTemplate, albumTemplate) {
      console.log("songObjectForTemplates",songObjectForTemplates);
      $("#songs").html(songTemplate(songObjectForTemplates));

      $("#artistList").html(artistTemplate(songObjectForTemplates));

      $("#albumList").html(albumTemplate(songObjectForTemplates));
    });
  });

  $("#submitSong").click(function(){ 

    addSong.addSong().then(function(newlyAddedSong){
      console.log(newlyAddedSong);
    }).fail(function(error){
      console.log(error);
    });
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

$('#reset').click(function() {
  $(".song-name").show();
  // document.location.reload();
  });

 $( document ).on( "click", "#deleteButton", function() {
    var titleKey = $(this).parent().attr("key");
    console.log("titleKey", titleKey);
    var fb = new Firebase('https://popping-torch-5281.firebaseio.com/songs/' + titleKey);
    fb.remove();
  });

});


