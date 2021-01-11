//$(document).foundation();

window.onscroll = function() {
    scrollFunction();
}

function scrollFunction() {
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        console.log("change")
        $("#navigation").addClass("scroll")
    } else {
        console.log("change back")
        $("#navigation").removeClass("scroll")
    }
}

$(document).ready(function() {
    $(".menuBtn").click(function() {
      $("#mobileNav").show()
    })
    $(".closeBtn").click(function() {
      $("#mobileNav").hide()
    })
  })