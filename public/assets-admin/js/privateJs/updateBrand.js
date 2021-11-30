

$('#brandEditForm').on('submit', function (e){
    e.preventDefault();

    $('#nameErrorMsg').text('');

    $('#successMsg').hide();

    openAjaxLoader();

    let _token = $('meta[name="csrf-token"]').attr('content');

    let name = $('#brandNameEditForm').val();
    let id = $('#brandId').val();


    $.ajax({
        url: "/admin/updateBrandFormSubmit",
        type: "POST",
        data: {
            name: name,
            id: id,
            _token: _token
        },
        dataType:"json"
    }).done(function (response) {

        closeAjaxLoader();

        $('#successMsg').show();

        toastr.success('The brand information has been successfully updated!');

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

