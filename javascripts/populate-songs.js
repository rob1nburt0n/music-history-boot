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


define(function(){
  return {
   querySongs: function(functionPassedFromMainModule) { 
      
      $.ajax({
            url: "https://popping-torch-5281.firebaseio.com/.json"
          }).done(function(data) {
            console.log(data);
            functionPassedFromMainModule(data);
      });
          
     }
  };
});
// });
