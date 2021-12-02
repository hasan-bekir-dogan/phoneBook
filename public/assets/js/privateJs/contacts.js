
var counter = 0;

contactList();

function contactList(){
    var dataListHtml = $('#contactTableBody').html();

    $.ajax({
        url: "/contacts",
        type: "GET",
        dataType:"json"
    }).done(function (response) {
        $data = response.data;
        $totalDataNumber = response.totalDataNumber;

        dataListHtml = '';

        for (i in $data){

            dataListHtml += ' <tr>\n' +
                '                    <td style="vertical-align: middle"><img class="contactsPhoto" src="/'+$data[i]['profile_photo_path']+'" alt="Profile Photo"></td>\n' +
                '                    <td style="vertical-align: middle">'+$data[i]['name']+'</td>\n' +
                '                    <td style="vertical-align: middle" class="transactionArea">\n' +
                '                        <div class="transactionSubArea">\n' +
                '                            <a class="editButton" href="/contacts/'+$data[i]['id']+'">\n' +
                '                                <i class="fal fa-edit"></i> Edit\n' +
                '                            </a>\n' +
                '                            <button class="deleteButton" type=button onclick="deleteContact('+$data[i]['id']+')">\n' +
                '                                <i class="far fa-trash-alt"></i> Delete\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                    </td>\n' +
                '                </tr> \n';
        }

        $('#totalDataNumber').html($totalDataNumber.toString()+" contacts");
        $('#contactTableBody').html(dataListHtml);

    }).fail(function (response) {

        counter ++;

        if(counter <= 3){
            contactList();
        }
        else{
            $('#contactTableBody').html(dataListHtml);

            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'You must refresh the page!'
            })

            toastr.error('Something went wrong.');
        }

    });

}

function deleteContact(id){
    let _token   = $('meta[name="csrf-token"]').attr('content');

    Swal.fire({
        title: 'Do you want to delete the contact?',
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
                url: "/contacts/"+id.toString(),
                type:"DELETE",
                data:{
                    _token: _token
                },
                dataType:"json"
            }).done(function (response) {
                contactList();

                closeAjaxLoader();

                toastr.success('The contact has been successfully deleted.');
            }).fail(function (response) {

                toastr.error('Something went wrong.');
            });
        } else if (result.isDenied) {

        }
    })
}

$('#searchContact').on('keypress', function(e) {
    if(e.which == 13) {
        var searchWord = $('#searchContact').val();
        if(searchWord !== '') {
            searchWord = $.trim(searchWord);
            if (searchWord !== '' && searchWord !== ' ')
                search(searchWord);
        }
        else{
            search(searchWord);
        }
    }
});
$('#searchContact').on('input', function() {
    var searchWord = $('#searchContact').val();
    if(searchWord !== ''){
        searchWord = $.trim(searchWord);
        if(searchWord !== '' && searchWord !== ' ')
            search(searchWord);
    }
    else{
        search(searchWord);
    }
});

$('#filterGroup').on('change', function() {
    var filterGroupId = $('#filterGroup').val();
    filterGroup(filterGroupId);
});

$('#filterAlphabet').on('change', function() {
    var filterChar = $('#filterAlphabet').val();
    filterAlphabet(filterChar);
});

function search(searchWord){
    let _token   = $('meta[name="csrf-token"]').attr('content');
    var dataListHtml = $('#contactTableBody').html();

    openAjaxLoader();

    $.ajax({
        url: "/contact/search",
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
                '                    <td style="vertical-align: middle"><img class="contactsPhoto" src="/'+$data[i]['profile_photo_path']+'" alt="Profile Photo"></td>\n' +
                '                    <td style="vertical-align: middle">'+$data[i]['name']+'</td>\n' +
                '                    <td style="vertical-align: middle" class="transactionArea">\n' +
                '                        <div class="transactionSubArea">\n' +
                '                            <a class="editButton" href="/contacts/'+$data[i]['id']+'">\n' +
                '                                <i class="fal fa-edit"></i> Edit\n' +
                '                            </a>\n' +
                '                            <button class="deleteButton" type=button onclick="deleteContact('+$data[i]['id']+')">\n' +
                '                                <i class="far fa-trash-alt"></i> Delete\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                    </td>\n' +
                '                </tr> \n';
        }

        $('#totalDataNumber').html($totalDataNumber.toString()+" contacts");
        $('#contactTableBody').html(dataListHtml);

        $('#filterGroup').val(-1);
        $('#filterAlphabet').val(-1);

        closeAjaxLoader();
    }).fail(function (response) {

        counter ++;

        if(counter <= 3){
            search(searchWord);
        }
        else{
            $('#contactTableBody').html(dataListHtml);

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
function filterGroup(id){
    let _token   = $('meta[name="csrf-token"]').attr('content');
    var dataListHtml = $('#contactTableBody').html();

    openAjaxLoader();

    $.ajax({
        url: "/contact/filter/group",
        type: "POST",
        data: {
            id : id,
            _token : _token
        },
        dataType:"json"
    }).done(function (response) {
        $data = response.data;
        $totalDataNumber = response.totalDataNumber;

        dataListHtml = '';

        for (i in $data){

            dataListHtml += ' <tr>\n' +
                '                    <td style="vertical-align: middle"><img class="contactsPhoto" src="/'+$data[i]['profile_photo_path']+'" alt="Profile Photo"></td>\n' +
                '                    <td style="vertical-align: middle">'+$data[i]['name']+'</td>\n' +
                '                    <td style="vertical-align: middle" class="transactionArea">\n' +
                '                        <div class="transactionSubArea">\n' +
                '                            <a class="editButton" href="/contacts/'+$data[i]['id']+'">\n' +
                '                                <i class="fal fa-edit"></i> Edit\n' +
                '                            </a>\n' +
                '                            <button class="deleteButton" type=button onclick="deleteContact('+$data[i]['id']+')">\n' +
                '                                <i class="far fa-trash-alt"></i> Delete\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                    </td>\n' +
                '                </tr> \n';
        }

        $('#totalDataNumber').html($totalDataNumber.toString()+" contacts");
        $('#contactTableBody').html(dataListHtml);

        $('#searchContact').val('');
        $('#filterAlphabet').val(-1);

        closeAjaxLoader();
    }).fail(function (response) {

        counter ++;

        if(counter <= 3){
            filterGroup(id);
        }
        else{
            $('#contactTableBody').html(dataListHtml);

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
function filterAlphabet(val){
    let _token   = $('meta[name="csrf-token"]').attr('content');
    var dataListHtml = $('#contactTableBody').html();

    openAjaxLoader();

    $.ajax({
        url: "/contact/filter/char",
        type: "POST",
        data: {
            val : val,
            _token : _token
        },
        dataType:"json"
    }).done(function (response) {
        $data = response.data;
        $totalDataNumber = response.totalDataNumber;

        dataListHtml = '';

        for (i in $data){

            dataListHtml += ' <tr>\n' +
                '                    <td style="vertical-align: middle"><img class="contactsPhoto" src="/'+$data[i]['profile_photo_path']+'" alt="Profile Photo"></td>\n' +
                '                    <td style="vertical-align: middle">'+$data[i]['name']+'</td>\n' +
                '                    <td style="vertical-align: middle" class="transactionArea">\n' +
                '                        <div class="transactionSubArea">\n' +
                '                            <a class="editButton" href="/contacts/'+$data[i]['id']+'">\n' +
                '                                <i class="fal fa-edit"></i> Edit\n' +
                '                            </a>\n' +
                '                            <button class="deleteButton" type=button onclick="deleteContact('+$data[i]['id']+')">\n' +
                '                                <i class="far fa-trash-alt"></i> Delete\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                    </td>\n' +
                '                </tr> \n';
        }

        $('#totalDataNumber').html($totalDataNumber.toString()+" contacts");
        $('#contactTableBody').html(dataListHtml);

        $('#searchContact').val('');
        $('#filterGroup').val(-1);

        closeAjaxLoader();
    }).fail(function (response) {

        counter ++;

        if(counter <= 3){
            filterAlphabet(val);
        }
        else{
            $('#contactTableBody').html(dataListHtml);

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



