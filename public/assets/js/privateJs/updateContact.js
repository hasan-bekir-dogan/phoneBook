
var counter = 0;

var phoneCounter = 1;
var phoneIDArray = [];
var phoneDbIDArray = [];
var emailCounter = 1;
var emailIDArray = [];
var emailDbIDArray = [];
var addressCounter = 1;
var addressIDArray = [];
var addressDbIDArray = [];

var deletedPhotoControl = false;

$('#updateContactForm').on('submit', function (e) {

    e.preventDefault();

    if (phoneIDArray.length === 0) {
        e.stopImmediatePropagation();

        Swal.fire({
            icon: 'warning',
            title: 'Something went wrong!',
            text: 'You have to add at least one phone number!'
        })
    }
    else {

        let _token = $('meta[name="csrf-token"]').attr('content');

        $('#successMsg').hide();

        openAjaxLoader();

        var formData = new FormData(this);
        formData.append('phoneIds', phoneIDArray);
        formData.append('phoneDbIds', phoneDbIDArray);
        formData.append('emailIds', emailIDArray);
        formData.append('emailDbIds', emailDbIDArray);
        formData.append('addressIds', addressIDArray);
        formData.append('addressDbIds', addressDbIDArray);
        formData.append('deletedPhotoControl', deletedPhotoControl);

        $('#firstNameErrorMsg').text('');
        $('#lastNameErrorMsg').text('');
        $('#companyErrorMsg').text('');
        $('#birthdayErrorMsg').text('');
        $('#profilePhotoErrorMsg').text('');

        for (var k = 0; k < phoneIDArray.length; k++) {
            $('#phoneValueErrorMsg' + phoneIDArray[k].toString()).text('');
            $('#phoneLabelErrorMsg' + phoneIDArray[k].toString()).text('');
        }
        for (var j = 0; j < emailIDArray.length; j++) {
            $('#emailValueErrorMsg' + emailIDArray[j].toString()).text('');
            $('#emailLabelErrorMsg' + emailIDArray[j].toString()).text('');
        }
        for (var h = 0; h < addressIDArray.length; h++) {
            $('#addressValueErrorMsg' + addressIDArray[h].toString()).text('');
            $('#addressLabelErrorMsg' + addressIDArray[h].toString()).text('');
        }

        let id = $('#contactId').val();

        $.ajax({
            url: "/contacts/"+id.toString(),
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json"
        }).done(function (response) {

            closeAjaxLoader();

            $('#successMsg').show();

            toastr.success('The contact has been successfully created!');

            let timerInterval
            Swal.fire({
                title: 'You are redirected to the contact list page.',
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
                window.location.href = '/contacts';

                if (result.dismiss === Swal.DismissReason.timer) {
                }
            })

        }).fail(function (response) {

            closeAjaxLoader();

            $('#firstNameErrorMsg').text(response.responseJSON.errors.firstName);
            $('#lastNameErrorMsg').text(response.responseJSON.errors.lastName);
            $('#companyErrorMsg').text(response.responseJSON.errors.company);
            $('#birthdayErrorMsg').text(response.responseJSON.errors.birthday);
            $('#profilePhotoErrorMsg').text(response.responseJSON.errors.photo);

            for (var m = 0; m < phoneIDArray.length; m++) {
                $('#phoneValueErrorMsg' + phoneIDArray[m].toString()).text(response.responseJSON.errors['phoneValue' + phoneIDArray[m].toString()]);
                $('#phoneLabelErrorMsg' + phoneIDArray[m].toString()).text(response.responseJSON.errors['phoneLabel' + phoneIDArray[m].toString()]);
            }
            for (var i = 0; i < emailIDArray.length; i++) {
                $('#emailValueErrorMsg' + emailIDArray[i].toString()).text(response.responseJSON.errors['emailValue' + emailIDArray[i].toString()]);
                $('#emailLabelErrorMsg' + emailIDArray[i].toString()).text(response.responseJSON.errors['emailLabel' + emailIDArray[i].toString()]);
            }
            for (var p = 0; p < addressIDArray.length; p++) {
                $('#addressValueErrorMsg' + addressIDArray[p].toString()).text(response.responseJSON.errors['addressValue' + addressIDArray[p].toString()]);
                $('#addressLabelErrorMsg' + addressIDArray[p].toString()).text(response.responseJSON.errors['addressLabel' + addressIDArray[p].toString()]);
            }
        });

        e.stopImmediatePropagation();
    }
});

$('#profilePhoto').on('change', function() {
    imgPreview($(this)[0]);
});

$('#phoneAddButtonId').click(function(){
    addPhone();
});
$('#emailAddButtonId').click(function(){
    addEmail();
});
$('#addressAddButtonId').click(function(){
    addAddress();
});

$('#deleteContactButtonId').click(function(){
    var id = $('#contactId').val();
    deleteContact(id);
});

$(document).ready(function(){
    var id = $('#contactId').val();
    showOtherInformation(id);
});

// this function deletes the image. But, this function works before submit the form
function deleteImage (){

    Swal.fire({
        title: 'Do you want to remove the photo?',
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

            function FileListItems (files) {
                var b = new ClipboardEvent("").clipboardData || new DataTransfer()

                for (var i = 0, len = files.length; i<len; i++)
                    b.items.add(files[i])

                return b.files
            }

            var fileInput = $('#profilePhoto')[0];

            //After FileList converts to array, deleting item
            var imagesAray = Array.from($('#profilePhoto')[0].files);
            imagesAray.splice(0,1);

            $('#profilePhotoArea').prop('src', '/assets/images/profile-default-photo.png');
            $('#deleteProfilePhotoCross').remove();
            $('#editPhotoButton').html('Add Photo');
            deletedPhotoControl = true;

            //update FileList
            fileInput.files = new FileListItems(imagesAray)

            closeAjaxLoader();

            toastr.success('The photo has been successfully removed.');

        } else if (result.isDenied) {

        }
    })

}

// this method delete contact.
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
                closeAjaxLoader();

                toastr.success('The contact has been successfully deleted.');

                let timerInterval
                Swal.fire({
                    title: 'You are redirected to the contact list page.',
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
                    window.location.href = '/contacts';

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

// this method preview the images that uploaded
function imgPreview(input) {
    if (input.files && input.files[0]) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            $('#profilePhotoArea').prop('src', event.target.result);

            var deleteImageButtonHtml = ' <a id="deleteProfilePhotoCross" class="deleteImageButton" href="javascript:void(0)" onclick="deleteImage()" title="Delete Photo"> ' +
                '                             <i class="fal fa-times"></i> ' +
                '                         </a> \n';

            $($.parseHTML(deleteImageButtonHtml)).appendTo('.chooseImagesSection');
            $('#editPhotoButton').html('Update Photo');
            deletedPhotoControl = false;
        };
        fileReader.readAsDataURL(input.files[0]);
    }
}

// this method add new phone
function addPhone(){

    var newPhoneHtml = ' <div id="phone'+phoneCounter+'" class="form-group addedFormGroups">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-lg-3">\n' +
        '                            <label for="phoneLabelForm'+phoneCounter+'">Label Name <span>*</span></label>\n' +
        '                            <select name="phoneLabel'+phoneCounter+'" id="phoneLabelForm'+phoneCounter+'" class="form-control">\n' +
        '                                <option value="0" disabled selected>Select Label Name</option>\n' +
        '                                <option value="1">Mobile</option>\n' +
        '                                <option value="2">Home</option>\n' +
        '                                <option value="3">Work</option>\n' +
        '                                <option value="4">School</option>\n' +
        '                                <option value="5">Fax</option>\n' +
        '                                <option value="6">Other</option>\n' +
        '                            </select>\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="phoneLabelErrorMsg'+phoneCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-8">\n' +
        '                            <label for="phoneValueForm'+phoneCounter+'">Value <span>*</span></label>\n' +
        '                            <input type="text" name="phoneValue'+phoneCounter+'" id="phoneValueForm'+phoneCounter+'" class="form-control">\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="phoneValueErrorMsg'+phoneCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-1">' +
        '                            <div class="deleteBtnArea">' +
        '                                <a href="javascript:void(0)" onclick="deletePhone('+phoneCounter+')" title="Delete Phone">' +
        '                                    <i class="fas fa-trash-alt"></i>' +
        '                                </a>' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div> \n';

    $($.parseHTML(newPhoneHtml)).insertBefore('#phonesAddButtonArea');

    phoneIDArray.push(phoneCounter);

    phoneCounter ++;
}
// this method add new email
function addEmail(){

    var newEmailHtml = ' <div id="email'+emailCounter+'" class="form-group addedFormGroups">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-lg-3">\n' +
        '                            <label for="emailLabelForm'+emailCounter+'">Label Name <span>*</span></label>\n' +
        '                            <select name="emailLabel'+emailCounter+'" id="emailLabelForm'+emailCounter+'" class="form-control">\n' +
        '                                <option value="0" disabled selected>Select Label Name</option>\n' +
        '                                <option value="2">Home</option>\n' +
        '                                <option value="3">Work</option>\n' +
        '                                <option value="4">School</option>\n' +
        '                                <option value="6">Other</option>\n' +
        '                            </select>\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="emailLabelErrorMsg'+emailCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-8">\n' +
        '                            <label for="emailValueForm'+emailCounter+'">Value <span>*</span></label>\n' +
        '                            <input type="text" name="emailValue'+emailCounter+'" id="emailValueForm'+emailCounter+'" class="form-control">\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="emailValueErrorMsg'+emailCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-1">' +
        '                            <div class="deleteBtnArea">' +
        '                                <a href="javascript:void(0)" onclick="deleteEmail('+emailCounter+')" title="Delete Email">' +
        '                                    <i class="fas fa-trash-alt"></i>' +
        '                                </a>' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div> \n';

    $($.parseHTML(newEmailHtml)).insertBefore('#emailsAddButtonArea');

    emailIDArray.push(emailCounter);

    emailCounter ++;
}
// this method add new address
function addAddress(){

    var newAddressHtml = ' <div id="address'+addressCounter+'" class="form-group addedFormGroups">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-lg-3">\n' +
        '                            <label for="addressLabelForm'+addressCounter+'">Label Name <span>*</span></label>\n' +
        '                            <select name="addressLabel'+addressCounter+'" id="addressLabelForm'+addressCounter+'" class="form-control">\n' +
        '                                <option value="0" disabled selected>Select Label Name</option>\n' +
        '                                <option value="2">Home</option>\n' +
        '                                <option value="3">Work</option>\n' +
        '                                <option value="4">School</option>\n' +
        '                                <option value="6">Other</option>\n' +
        '                            </select>\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="addressLabelErrorMsg'+addressCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-8">\n' +
        '                            <label for="addressValueForm'+addressCounter+'">Value <span>*</span></label>\n' +
        '                            <textarea name="addressValue'+addressCounter+'" id="addressValueForm'+addressCounter+'" class="form-control"></textarea>\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="addressValueErrorMsg'+addressCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-1">' +
        '                            <div class="deleteBtnArea">' +
        '                                <a href="javascript:void(0)" onclick="deleteAddress('+addressCounter+')" title="Delete Address">' +
        '                                    <i class="fas fa-trash-alt"></i>' +
        '                                </a>' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div> \n';

    $($.parseHTML(newAddressHtml)).insertBefore('#addressesAddButtonArea');

    addressIDArray.push(addressCounter);

    addressCounter ++;
}

// this method show phones, emails and addresses that records in db
function showOtherInformation(id){

    $.ajax({
        url: "/contact/show/other-information/"+id.toString(),
        type: "GET",
        dataType: "json"
    }).done(function (response) {
        var phones = response.phones;
        var emails = response.emails;
        var addresses = response.addresses;
        var phoneHtml = phonesHtmlFunction();
        var emailHtml = emailsHtmlFunction();
        var addressHtml = addressesHtmlFunction();

        function phonesHtmlFunction() {
            var newPhoneHtml = '';

            for (i in phones) {

                newPhoneHtml += ' <div id="phone' + phones[i]['id'] + '" class="form-group addedFormGroups">\n' +
                    '                    <div class="row">\n' +
                    '                        <div class="col-lg-3">\n' +
                    '                            <label for="phoneLabelForm' + phones[i]['id'] + '">Label Name <span>*</span></label>\n' +
                    '                            <select name="phoneLabel' + phones[i]['id'] + '" id="phoneLabelForm' + phones[i]['id'] + '" class="form-control">\n' +
                    '                                <option value="0" disabled>Select Label Name</option>\n';

                if (phones[i]['label_name_id'] === 1)
                    newPhoneHtml += ' <option selected value="1">Mobile</option>\n';
                else
                    newPhoneHtml += ' <option value="1">Mobile</option>\n';

                if (phones[i]['label_name_id'] === 2)
                    newPhoneHtml += ' <option selected value="2">Home</option>\n';
                else
                    newPhoneHtml += ' <option value="2">Home</option>\n';

                if (phones[i]['label_name_id'] === 3)
                    newPhoneHtml += ' <option selected value="3">Work</option>\n';
                else
                    newPhoneHtml += ' <option value="3">Work</option>\n';

                if (phones[i]['label_name_id'] === 4)
                    newPhoneHtml += ' <option selected value="4">School</option>\n';
                else
                    newPhoneHtml += ' <option value="4">School</option>\n';

                if (phones[i]['label_name_id'] === 5)
                    newPhoneHtml += ' <option selected value="5">Fax</option>\n';
                else
                    newPhoneHtml += ' <option value="5">Fax</option>\n';

                if (phones[i]['label_name_id'] === 6)
                    newPhoneHtml += ' <option selected value="6">Other</option>\n';
                else
                    newPhoneHtml += ' <option value="6">Other</option>\n';

                newPhoneHtml += '                </select>\n' +
                    '                            <div class="errorMessageArea">\n' +
                    '                                <span class="text-danger" id="phoneLabelErrorMsg' + phones[i]['id'] + '"></span>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-lg-8">\n' +
                    '                            <label for="phoneValueForm' + phones[i]['id'] + '">Value <span>*</span></label>\n' +
                    '                            <input type="text" name="phoneValue' + phones[i]['id'] + '" id="phoneValueForm' + phones[i]['id'] + '" class="form-control" value="' + phones[i]['phone'] + '">\n' +
                    '                            <div class="errorMessageArea">\n' +
                    '                                <span class="text-danger" id="phoneValueErrorMsg' + phones[i]['id'] + '"></span>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-lg-1">' +
                    '                            <div class="deleteBtnArea">' +
                    '                                <a href="javascript:void(0)" onclick="deletePhone(' + phones[i]['id'] + ')" title="Delete Phone">' +
                    '                                    <i class="fas fa-trash-alt"></i>' +
                    '                                </a>' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div> \n';

                phoneIDArray.push(phones[i]['id']);
                phoneDbIDArray.push(phones[i]['id']);

                phoneCounter = phones[i]['id'] + 1;
            }

            return newPhoneHtml;
        }
        function emailsHtmlFunction() {
            var newEmailHtml = '';

            for (i in emails) {

                newEmailHtml += ' <div id="email' + emails[i]['id'] + '" class="form-group addedFormGroups">\n' +
                    '                    <div class="row">\n' +
                    '                        <div class="col-lg-3">\n' +
                    '                            <label for="emailLabelForm' + emails[i]['id'] + '">Label Name <span>*</span></label>\n' +
                    '                            <select name="emailLabel' + emails[i]['id'] + '" id="emailLabelForm' + emails[i]['id'] + '" class="form-control">\n' +
                    '                                <option value="0" disabled>Select Label Name</option>\n';

                if (emails[i]['label_name_id'] === 2)
                    newEmailHtml += ' <option selected value="2">Home</option>\n';
                else
                    newEmailHtml += ' <option value="2">Home</option>\n';

                if (emails[i]['label_name_id'] === 3)
                    newEmailHtml += ' <option selected value="3">Work</option>\n';
                else
                    newEmailHtml += ' <option value="3">Work</option>\n';

                if (emails[i]['label_name_id'] === 4)
                    newEmailHtml += ' <option selected value="4">School</option>\n';
                else
                    newEmailHtml += ' <option value="4">School</option>\n';

                if (emails[i]['label_name_id'] === 6)
                    newEmailHtml += ' <option selected value="6">Other</option>\n';
                else
                    newEmailHtml += ' <option value="6">Other</option>\n';

                newEmailHtml += '                </select>\n' +
                    '                            <div class="errorMessageArea">\n' +
                    '                                <span class="text-danger" id="emailLabelErrorMsg' + emails[i]['id'] + '"></span>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-lg-8">\n' +
                    '                            <label for="emailValueForm' + emails[i]['id'] + '">Value <span>*</span></label>\n' +
                    '                            <input type="text" name="emailValue' + emails[i]['id'] + '" id="emailValueForm' + emails[i]['id'] + '" class="form-control" value="' + emails[i]['email'] + '">\n' +
                    '                            <div class="errorMessageArea">\n' +
                    '                                <span class="text-danger" id="emailValueErrorMsg' + emails[i]['id'] + '"></span>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-lg-1">' +
                    '                            <div class="deleteBtnArea">' +
                    '                                <a href="javascript:void(0)" onclick="deleteEmail(' + emails[i]['id'] + ')" title="Delete Email">' +
                    '                                    <i class="fas fa-trash-alt"></i>' +
                    '                                </a>' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div> \n';

                emailIDArray.push(emails[i]['id']);
                emailDbIDArray.push(emails[i]['id']);

                emailCounter = emails[i]['id'] + 1;
            }

            return newEmailHtml;
        }
        function addressesHtmlFunction() {
            var newAddressHtml = '';

            for (i in addresses) {

                newAddressHtml += ' <div id="address' + addresses[i]['id'] + '" class="form-group addedFormGroups">\n' +
                    '                    <div class="row">\n' +
                    '                        <div class="col-lg-3">\n' +
                    '                            <label for="addressLabelForm' + addresses[i]['id'] + '">Label Name <span>*</span></label>\n' +
                    '                            <select name="addressLabel' + addresses[i]['id'] + '" id="addressLabelForm' + addresses[i]['id'] + '" class="form-control">\n' +
                    '                                <option value="0" disabled>Select Label Name</option>\n';

                if (addresses[i]['label_name_id'] === 2)
                    newAddressHtml += ' <option selected value="2">Home</option>\n';
                else
                    newAddressHtml += ' <option value="2">Home</option>\n';

                if (addresses[i]['label_name_id'] === 3)
                    newAddressHtml += ' <option selected value="3">Work</option>\n';
                else
                    newAddressHtml += ' <option value="3">Work</option>\n';

                if (addresses[i]['label_name_id'] === 4)
                    newAddressHtml += ' <option selected value="4">School</option>\n';
                else
                    newAddressHtml += ' <option value="4">School</option>\n';

                if (addresses[i]['label_name_id'] === 6)
                    newAddressHtml += ' <option selected value="6">Other</option>\n';
                else
                    newAddressHtml += ' <option value="6">Other</option>\n';

                newAddressHtml += '                </select>\n' +
                    '                            <div class="errorMessageArea">\n' +
                    '                                <span class="text-danger" id="addressLabelErrorMsg' + addresses[i]['id'] + '"></span>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-lg-8">\n' +
                    '                            <label for="addressValueForm' + addresses[i]['id'] + '">Value <span>*</span></label>\n' +
                    '                            <textarea name="addressValue' + addresses[i]['id'] + '" id="addressValueForm' + addresses[i]['id'] + '" class="form-control">'+addresses[i]['address']+'</textarea>\n' +
                    '                            <div class="errorMessageArea">\n' +
                    '                                <span class="text-danger" id="addressValueErrorMsg' + addresses[i]['id'] + '"></span>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-lg-1">' +
                    '                            <div class="deleteBtnArea">' +
                    '                                <a href="javascript:void(0)" onclick="deleteAddress(' + addresses[i]['id'] + ')" title="Delete Address">' +
                    '                                    <i class="fas fa-trash-alt"></i>' +
                    '                                </a>' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div> \n';

                addressIDArray.push(addresses[i]['id']);
                addressDbIDArray.push(addresses[i]['id']);

                addressCounter = addresses[i]['id'] + 1;
            }

            return newAddressHtml;
        }

        $($.parseHTML(phoneHtml)).insertBefore('#phonesAddButtonArea');
        $($.parseHTML(emailHtml)).insertBefore('#emailsAddButtonArea');
        $($.parseHTML(addressHtml)).insertBefore('#addressesAddButtonArea');


    }).fail(function (response) {

        counter ++;

        if(counter <= 3){
            showOtherInformation(id);
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'You must refresh the page!'
            })

            toastr.error('Something went wrong.');
        }

    });

}

// this method delete the phone
function deletePhone(id){
    Swal.fire({
        title: 'Do you want to remove the phone number?',
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

            $('#phone'+id.toString()).remove();

            const index = phoneIDArray.indexOf(id);
            phoneIDArray.splice(index, 1);

            closeAjaxLoader();

            toastr.success('The phone number has been successfully removed.');

        } else if (result.isDenied) {

        }
    })
}
// this method delete the email
function deleteEmail(id){
    Swal.fire({
        title: 'Do you want to remove the email address?',
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

            $('#email'+id.toString()).remove();

            const index = emailIDArray.indexOf(id);
            emailIDArray.splice(index, 1);

            closeAjaxLoader();

            toastr.success('The email address has been successfully removed.');

        } else if (result.isDenied) {

        }
    })
}
// this method delete the address
function deleteAddress(id){
    Swal.fire({
        title: 'Do you want to remove the address?',
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

            $('#address'+id.toString()).remove();

            const index = addressIDArray.indexOf(id);
            addressIDArray.splice(index, 1);

            closeAjaxLoader();

            toastr.success('The address has been successfully removed.');

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

