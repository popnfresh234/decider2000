$(() => {
  $('#menu-links').on('click', '.item', function(event) {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    if ($(this).text() === "Share"){
      $('#content-share').removeClass('hidden').addClass('visible')
      $('#content-result').removeClass('visible').addClass('hidden');
    } else {
      $('#content-result').removeClass('hidden').addClass('visible');
      $('#content-share').removeClass('visible').addClass('hidden')
    }
  })
});
