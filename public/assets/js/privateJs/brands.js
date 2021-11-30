


brandList();

function brandList() {
    $(function () {
        let _token = $('meta[name="csrf-token"]').attr('content');

        var table = $('#brandTable').DataTable({
            processing: true,
            serverSide: true,
            pageLength: 10,
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            ajax: {
                url: "/admin/showBrands",
                type: "POST",
                data: {
                    _token: _token
                },
                dataType: "json"
            },
            columns: [
                {data: 'id', name: 'id'},
                {data: 'name', name: 'name'},
                {data: 'created_at', name: 'created_at'},
                {data: 'transaction', name: 'transaction', orderable: false, searchable: false},
            ]
        });
    });
}



$(document).on('click', '.deleteButton', function (){
    let id = $(this).attr('data-id');
    deleteBrand(id);
});

function deleteBrand(brandId){
    let _token   = $('meta[name="csrf-token"]').attr('content');

    Swal.fire({
        title: 'Do you want to delete the brand?',
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
                url: "/admin/deleteBrand",
                type:"POST",
                data:{
                    brandId: brandId,
                    _token: _token
                },
                dataType:"json"
            }).done(function (response) {

                $('#brandTable').DataTable().clear().destroy();

                brandList();

                closeAjaxLoader();

                toastr.success('The brand has been successfully deleted.');



            }).fail(function (response) {

                closeAjaxLoader();

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



