define(function() {
  
 return {
  querySongs: function(getList) {
    $.ajax({
      url: "songsTwo.json",
    }).done(function(data) {
      getList.call(this, data);
     
   });
  }
 };
});

// define(["jquery", "q"], function($, Q) {
//   return function() {
//     var deferred = Q.defer();

//     $.ajax({
//       url: "songsTwo.json"
//     })
//     .done(function(songs_data){
//       deferred.resolve(songs_data);
//     })
//     .fail(function(xhr, status, error){
//       deferred.reject(error);
//     });
//    return deferred.promise;
//  }

// });