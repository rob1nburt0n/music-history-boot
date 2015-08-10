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


define(function() {
  return {
    addSong: function(songs) { 
      $.ajax({
        url: "https://popping-torch-5281.firebaseio.com/songs.json",
        method: "POST",
        data: songs
      }).done(function(addSong) {
        console.log("addSong:", addSong);
      });
    }
  };
});

