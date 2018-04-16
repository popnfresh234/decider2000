$(() => {

  function postPhoneNumbers(phoneNumberArray){
    var id = $('#content-container').data('id');
    $.ajax({
      url: '/polls/' + id + '/phone/',
      method: 'POST',
      data: {phoneNumberArray},
      dataType: 'json',
      success: function(data) {
        if (typeof data.redirect == 'string'){
          window.location = data.redirect;
        }
      }
    });
  }


  var phoneNumberArray = [];
  var hidden = true;

  $('#button-add-phone').on('click', function(event){
    var phoneNumber = $('#input-phone').find('input').val();

    //Build and appendlist item
    var item = $('<div class="item test">');
    var leftFloatedContent = $('<div class="left floated content">')
    leftFloatedContent.append('<div class="ui huge header phone-number">' + phoneNumber + '</div>')
    item.append(leftFloatedContent);
    var rightFloatedContent = $('<div class="right floated content">');
    rightFloatedContent.append('<div class="ui button inverted basic icon"><i class="times icon"></i></div>');
    item.append(rightFloatedContent);
    $('#list-phone-number').append(item);

  });

  $('#list-phone-number').on('click', '.button', function(event) {
    $(this).closest('.item').remove();
  })

  $('#button-submit').on('click', function(event){
    $( ".item" ).each(function( index , element) {
      var phoneNumber = $(element).find('.phone-number').text();
      phoneNumberArray.push({phoneNumber});
    });
    console.log("SUBMIT!");
    postPhoneNumbers(phoneNumberArray);
    phoneNumberArray = [];
  });
});
