var $window = $(window),
    $body = $("body"),
    $goTop = $(".goto-top");

var config = {
    "scrollTopVal" : 249,
    "scrollTopTime" : 500
}

var Page = {
    
    init:function() {

      $window.scroll(function(){
          var val = $(this).scrollTop();
          if(val > config.scrollTopVal){
              $goTop.show();
          }else{
              $goTop.hide();
          }
      });

      $goTop.click(function(e){
          e.preventDefault();
          $body.animate({scrollTop:0},config.scrollTopTime); 
      });

    }
}

Page.init();