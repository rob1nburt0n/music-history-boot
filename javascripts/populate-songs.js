define(function() {
  
 return {
  querySongs: function(getList) {
    $.ajax({
      url: "songs.json",
    }).done(function(data) {
      getList.call(this, data);
     
  });
 }
};
});
