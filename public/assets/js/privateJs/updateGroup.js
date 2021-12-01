

$('#groupEditForm').on('submit', function (e){
    e.preventDefault();

    $('#nameErrorMsg').text('');

    $('#successMsg').hide();

    openAjaxLoader();

    let _token = $('meta[name="csrf-token"]').attr('content');

    let name = $('#groupNameEditForm').val();
    let id = $('#groupId').val();


    $.ajax({
        url: "/groups/"+id.toString(),
        type: "PATCH",
        data: {
            name: name,
            _token: _token
        },
        dataType:"json"
    }).done(function (response) {

        closeAjaxLoader();

        $('#successMsg').show();

        toastr.success('The group information has been successfully updated!');

    }).fail(function (response) {

        closeAjaxLoader();

        $('#nameErrorMsg').text(response.responseJSON.errors.name);

    });

    e.stopImmediatePropagation();
});


function openAjaxLoader(){
    $ajaxLoaderAllScreen = ajaxLoaderAllScreen();
    $($.parseHTML($ajaxLoaderAllScreen)).insertBefore($('#pcoded'));

    $('.ajaxLoaderAllScreen').fadeIn(300);
}
function closeAjaxLoader(){
    $('.ajaxLoaderAllScreen').fadeOut(300);

    setTimeout(function() {
        $('.ajaxLoaderAllScreen').remove();
    }, 300);
}

