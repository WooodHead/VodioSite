$(document).ready(function() {
 
  $(".last-content-right-tabs > ul > li > a").click(function(event) {
    event.preventDefault();
    $(this)
      .parent()
      .addClass("current");
    $(this)
      .parent()
      .siblings()
      .removeClass("current");
    var tab = $(this).attr("href");
    $(".last-content-tab")
      .not(tab)
      .css("display", "none");
    $(tab).fadeIn();
  });
  $(".single-product-news-letter-header").click(function() {
    $(".single-product-news-letter-content").slideToggle("100");
  });
  $(document).click(function(event) {
    var id = event.target.id;
    if (
      id == "header-bg-show" ||
      $(".header-bg-drop-down").css("display") != "none"
    ) {
      $(".header-bg-drop-down").slideToggle(100);
    }
  });
  $(".show-main-menu-btn").click(function(event) {
    var id = event.target.id;
    $(".header-menu").slideToggle(100);
  });
});

$(function() {
  $(".float-top-header").click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000
        );
        return false;
      }
    }
  });
});
$(function() {
  var nav = $("#header");
  var TopMoviez = $(".content-holder");
  var navHomeY = nav.offset().top;
  var isFixed = false;
  var $w = $(window);
  $w.scroll(function() {
    var scrollTop = $w.scrollTop();
    var shouldBeFixed = scrollTop > navHomeY;
    if (shouldBeFixed && !isFixed) {
      TopMoviez.css({ margin: "100px auto 0" });
      nav.css({
        position: "fixed",
        background: "rgba(255,255,255,1)",
        boxShadow: "0 20px 30px rgba(0,0,0,.1)",
        top: 0,
        left: nav.offset().left,
        width: nav.width()
      });
      isFixed = true;
    } else if (!shouldBeFixed && isFixed) {
      nav.css({
        position: "absolute",
        boxShadow: "none"
      });
      isFixed = false;
    }
  });
});
