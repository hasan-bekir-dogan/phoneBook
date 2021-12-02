

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

$('#deleteGroupButtonId').click(function(){
    var id = $('#groupId').val();
    deleteGroup(id);
});

// this method delete group.
function deleteGroup(groupId){
    let _token   = $('meta[name="csrf-token"]').attr('content');

    Swal.fire({
        title: 'Do you want to delete the group?',
        showDenyButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
        customClass: {
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {

            openAjaxLoader();

            $.ajax({
                url: "/groups/"+groupId.toString(),
                type:"DELETE",
                data:{
                    _token: _token
                },
                dataType:"json"
            }).done(function (response) {
                closeAjaxLoader();

                toastr.success('The group has been successfully deleted.');

                let timerInterval
                Swal.fire({
                    title: 'You are redirected to the group list page.',
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
                    window.location.href = '/group/list';

                    if (result.dismiss === Swal.DismissReason.timer) {
                    }
                })
            }).fail(function (response) {

                toastr.error('Something went wrong.');
            });
        } else if (result.isDenied) {

        }
    })
}


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

