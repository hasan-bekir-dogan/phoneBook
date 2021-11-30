

$('#categoryEditForm').on('submit', function (e){
    e.preventDefault();

    $('#nameEnErrorMsg').text('');
    $('#nameTrErrorMsg').text('');

    $('#successMsg').hide();

    openAjaxLoader();

    let _token = $('meta[name="csrf-token"]').attr('content');

    let name_en = $('#categoryNameEditEnForm').val();
    let name_tr = $('#categoryNameEditTrForm').val();
    let id = $('#categoryId').val();


    $.ajax({
        url: "/admin/updateCategoryFormSubmit",
        type: "POST",
        data: {
            name_en: name_en,
            name_tr: name_tr,
            id: id,
            _token: _token
        },
        dataType:"json"
    }).done(function (response) {

        closeAjaxLoader();

        $('#successMsg').show();

        toastr.success('The category information has been successfully updated!');

    }).fail(function (response) {

        closeAjaxLoader();

        $('#nameEnErrorMsg').text(response.responseJSON.errors.name_en);
        $('#nameTrErrorMsg').text(response.responseJSON.errors.name_tr);

    });
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

