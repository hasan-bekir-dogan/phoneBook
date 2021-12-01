
var counter = 0;

groupList();

function groupList(){
    var dataListHtml = $('#groupTableBody').html();

    $.ajax({
        url: "/groups",
        type: "GET",
        dataType:"json"
    }).done(function (response) {
        $data = response.data;
        $totalDataNumber = response.totalDataNumber;

        dataListHtml = '';

        for (i in $data){

            dataListHtml += ' <tr>\n' +
                '                    <td>'+$data[i]['name']+'</td>\n' +
                '                    <td class="transactionArea">\n' +
                '                        <div class="transactionSubArea">\n' +
                '                            <a class="editButton" href="/groups/'+$data[i]['id']+'">\n' +
                '                                <i class="fal fa-edit"></i> Edit\n' +
                '                            </a>\n' +
                '                            <button class="deleteButton" type=button onclick="deleteGroup('+$data[i]['id']+')">\n' +
                '                                <i class="far fa-trash-alt"></i> Delete\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                    </td>\n' +
                '                </tr> \n';
        }

        $('#totalDataNumber').html($totalDataNumber.toString()+" groups");
        $('#groupTableBody').html(dataListHtml);

    }).fail(function (response) {

        counter ++;

        if(counter <= 3){
            groupList();
        }
        else{
            $('#groupTableBody').html(dataListHtml);

            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'You must refresh the page!'
            })

            toastr.error('Something went wrong.');
        }

    });

}

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
                groupList();

                closeAjaxLoader();

                toastr.success('The group has been successfully deleted.');
            }).fail(function (response) {

                toastr.error('Something went wrong.');
            });
        } else if (result.isDenied) {

        }
    })
}

$('#searchGroup').on('keypress', function(e) {
    if(e.which == 13) {
        var searchWord = $('#searchGroup').val();
        searchWord = $.trim(searchWord);
        if(searchWord !== '' && searchWord !== ' ')
            search(searchWord);
    }
});
$('#searchGroup').on('input', function() {
    var searchWord = $('#searchGroup').val();
    searchWord = $.trim(searchWord);
    if(searchWord !== '' && searchWord !== ' ')
        search(searchWord);
});

function search(searchWord){
    let _token   = $('meta[name="csrf-token"]').attr('content');
    var dataListHtml = $('#groupTableBody').html();

    openAjaxLoader();

    $.ajax({
        url: "/group/search",
        type: "POST",
        data: {
            search_word : searchWord,
            _token : _token
        },
        dataType:"json"
    }).done(function (response) {
        $data = response.data;
        $totalDataNumber = response.totalDataNumber;

        dataListHtml = '';

        for (i in $data){

            dataListHtml += ' <tr>\n' +
                '                    <td>'+$data[i]['name']+'</td>\n' +
                '                    <td class="transactionArea">\n' +
                '                        <div class="transactionSubArea">\n' +
                '                            <a class="editButton" href="/groups/'+$data[i]['id']+'">\n' +
                '                                <i class="fal fa-edit"></i> Edit\n' +
                '                            </a>\n' +
                '                            <button class="deleteButton" type=button onclick="deleteGroup('+$data[i]['id']+')">\n' +
                '                                <i class="far fa-trash-alt"></i> Delete\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                    </td>\n' +
                '                </tr> \n';
        }

        $('#totalDataNumber').html($totalDataNumber.toString()+" groups");
        $('#groupTableBody').html(dataListHtml);

        closeAjaxLoader();
    }).fail(function (response) {

        counter ++;

        if(counter <= 3){
            search(searchWord);
        }
        else{
            $('#groupTableBody').html(dataListHtml);

            closeAjaxLoader();

            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'You must refresh the page!'
            })

            toastr.error('Something went wrong.');
        }

    });

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



