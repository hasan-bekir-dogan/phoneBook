

$('#addCategoryForm').on('submit', function (e){
    e.preventDefault();

    $('#nameEnErrorMsg').text('');
    $('#nameTrErrorMsg').text('');

    $('#successMsg').hide();

    openAjaxLoader();

    let _token = $('meta[name="csrf-token"]').attr('content');

    let name_en = $('#categoryNameEnForm').val();
    let name_tr = $('#categoryNameTrForm').val();



    $.ajax({
        url: "/admin/addCategoryFormSubmit",
        type: "POST",
        data: {
            name_en: name_en,
            name_tr: name_tr,
            _token: _token
        },
        dataType:"json"
    }).done(function (response) {

        closeAjaxLoader();

        $('#successMsg').show();

        toastr.success('The category information has been successfully updated!');

        let timerInterval
        Swal.fire({
            title: 'You are redirected to the category list page.',
            timer: 4000,
            timerProgressBar: false,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            window.location.href='/admin/categories';

            if (result.dismiss === Swal.DismissReason.timer) {
            }
        })


    }).fail(function (response) {

        closeAjaxLoader();

        $('#nameEnErrorMsg').text(response.responseJSON.errors.name_en);
        $('#nameTrErrorMsg').text(response.responseJSON.errors.name_tr);

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


