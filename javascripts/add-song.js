// define(function() {
  
//  return {
//   querySongs: function(getList) {
//     $.ajax({
//       url: "songs.json",
//     }).done(function(data) {
//       getList.call(this, data);
     
//   });
//  }
// };
// });
// $(document).ready(function(){


define(["jquery", "q", "authentication"], function($, Q, auth) {
  return {
    addSong: function(songs) { 
      var deferred = Q.defer();
      
      var newSong = {
        "name": $("#name").val(),
        "artist": $("#artist").val(),
        "album": $("#album").val(),
        "uid": auth.getUid()
      };
      newSong = JSON.stringify(newSong);


      $.ajax({
        url: "https://popping-torch-5281.firebaseio.com/songs.json",
        method: "POST",
        data: newSong
      }).done(function(addSong) {
        console.log("addSong:", addSong);
         deferred.resolve(addSong);
      })
      .fail(function(xhr, status, error){
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
});
 



// define(["jquery", "q"], function($, Q) {
//   return function() {
//     var deferred = Q.defer();

//     $.ajax({
//       url: "songs.json"
//     })
//     .done(function(songs_data){
//       deferred.resolve(songs_data);
//     })
//     .fail(function(xhr, status, error){
//       deferred.reject(error);
//     });


//     return deferred.promise;
//  }

// });







