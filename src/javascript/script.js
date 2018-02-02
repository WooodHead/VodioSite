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
    event.stopPropagation();
    var id = event.target.id;
    $(".header-menu").slideToggle(100);
  });
});
