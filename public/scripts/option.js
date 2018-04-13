$(() => {

  var optionArray = [];


  $('#button-add-option').on('click', function(event){
    var optionName = $('#input-option').find('input').val();
    var description = $('#input-description').find('input').val();
    var option ={optionName, description};
    var id = optionArray.push(option) - 1;
    console.log(id);

    var item = $('<div class="item">').data('id',id);
    var leftFloatedContent = $('<div class="left floated content">')
    leftFloatedContent.append('<div class="header">' + optionName + '</div>')
    leftFloatedContent.append(description);
    item.append(leftFloatedContent);


    var rightFloatedContent = $('<div class="right floated content">');
    rightFloatedContent.append('<div class="ui button basic icon"><i class="times icon"></i></div>');
    item.append(rightFloatedContent);

    $('#list-options').append(item);
  });

  $('#list-options').on('click', '.button', function(event) {
    console.log('CLIKED');
    var index = ($(this).closest('.item').data('id'));
    $(this).closest('.item').remove();
    optionArray.splice(index, 1);
    console.log(optionArray);
  })


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
