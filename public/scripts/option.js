$(() => {

  var optionArray = [];
  var hidden = true;

  $('#button-add-option').on('click', function(event){
    var optionName = $('#input-option').find('input').val();
    var description = $('#input-description').find('input').val();

    //Build and appendlist item
    var item = $('<div class="item">');
    var leftFloatedContent = $('<div class="left floated content">')
    leftFloatedContent.append('<div class="header option-name">' + optionName + '</div>')
    leftFloatedContent.append('<span class="option-description">' + description + '</span>');
    item.append(leftFloatedContent);
    var rightFloatedContent = $('<div class="right floated content">');
    rightFloatedContent.append('<div class="ui button basic icon"><i class="times icon"></i></div>');
    item.append(rightFloatedContent);
    $('#list-options').append(item);
  });

  $('#list-options').on('click', '.button', function(event) {
    $(this).closest('.item').remove();
  })

  $('#button-next-step').on('click', function(event){
    $( ".item" ).each(function( index , element) {
      var optionName = $(element).find('.option-name').text();
      var description = $(element).find('.option-description').text();
      optionArray.push({optionName, description});
    });
    console.log(optionArray);
  });


});

          // <div class="item">
          //   <div class="left floated content">
          //     <div class="header">Snickerdoodle</div>
          //     An excellent companion
          //   </div>
          //   <div class="right floated content">
          //     <div class="ui button basic icon">
          //       <i class="times icon"></i>
          //     </div>
          //   </div>
          // </div>
