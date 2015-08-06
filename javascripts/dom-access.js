define(["jquery"],function($) {
  var $outputEl = $("#songs");

  var $moreButton = $("#more");

  return {
    getOutputElement: function() {
      return $outputEl;
    },
    getMoreButton: function() {
      return $moreButton;
    }
  };
});


