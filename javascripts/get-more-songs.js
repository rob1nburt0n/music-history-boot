define(function() {
  
 return {
  querySongs: function(getList) {
    $.ajax({
      url: "songsTwo.json",
    }).done(function(data) {
      getList.call(this, data.songs);
     
  });
 }
};
});