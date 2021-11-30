function deleteData(data,system){
    if(system=='pages'){
        swal({
            title: "Are you sure you want to delete that?",
            type: "warning",
            showCancelButton: !0,
            cancelButtonText: "No!",
            confirmButtonText: "Yes, delete it!"
        }).then(function(e) {
            e.value && $.ajax({
                type: "GET",
                dataType: "json",
                url: "/control/system/ajax/general.php?system="+system+"&process=delete",
                data: {data:data},
                success: function(result) {
                    if(result['process']=='ok'){
                        $('#m_table_1').DataTable().ajax.reload();
                        swal({
                            title: "Gelöscht",
                            type: "success",
                            confirmButtonText: "schließen"
                        })
                    } else {
                        swal({
                            title: "Daten können nicht gelöscht werden!",
                            text: "Bitte wenden Sie sich an Ihren Softwareentwickler!",
                            type: "error",
                            confirmButtonText: "schließen"
                        })
                    }
                },
                error: function() {
                    swal({
                        title: "Daten können nicht gelöscht werden!",
                        text: "Bitte wenden Sie sich an Ihren Softwareentwickler!",
                        type: "error",
                        confirmButtonText: "schließen"
                    })
                }
            });
        })
    }
};
function deleteImg(system,filename,column,div,showdiv){

        swal({
            title: "Are you sure you want to delete that?",
            type: "warning",
            showCancelButton: !0,
            cancelButtonText: "No!",
            confirmButtonText: "Yes, delete it!"
        }).then(function(e) {
            e.value && $.ajax({
                type: "GET",
                dataType: "json",
                url: "/control/system/ajax/general.php?process=deleteimg&columnsystem="+system+"&filename="+filename+"&column="+column,
                success: function(result) {
                    if(result['process']=='ok'){
                        swal({
                            title: "Image deleted",
                            type: "success",
                            confirmButtonText: "Schließen"
                        })
                        $('#'+div).hide();$('#'+showdiv).show();
                    } else {
                        swal({
                            title: "Bild konnte nicht gelöscht werden!",
                            text: "Bitte wenden Sie sich an Ihren Softwareentwickler!",
                            type: "error",
                            confirmButtonText: "Schließen"
                        })
                    }
                },
                error: function() {
                    swal({
                        title: "Bild konnte nicht gelöscht werden!",
                        text: "Bitte wenden Sie sich an Ihren Softwareentwickler!",
                        type: "error",
                        confirmButtonText: "Schließen"
                    })
                }
            });
        });

};
function deleteCustomImg(table,column,dataid,filename,div,showdiv){

    swal({
        title: "Are you sure you want to delete that?",
        type: "warning",
        showCancelButton: !0,
        cancelButtonText: "No!",
        confirmButtonText: "Yes, delete it!"
    }).then(function(e) {
        e.value && $.ajax({
            type: "GET",
            dataType: "json",
            url: "/control/system/ajax/general.php?process=deletecustomimg&table="+table+"&filename="+filename+"&dataid="+dataid+"&column="+column,
            success: function(result) {
                if(result['process']=='ok'){
                    swal({
                        title: "Foto gelöscht",
                        type: "success",
                        confirmButtonText: "Schließen"
                    })
                    $('#'+div).hide();$('#'+showdiv).show();
                } else {
                    swal({
                        title: "Bild konnte nicht gelöscht werden!",
                        text: "Bitte wenden Sie sich an Ihren Softwareentwickler!",
                        type: "error",
                        confirmButtonText: "Schließen"
                    })
                }
            },
            error: function() {
                swal({
                    title: "Bild konnte nicht gelöscht werden!",
                    text: "Bitte wenden Sie sich an Ihren Softwareentwickler!",
                    type: "error",
                    confirmButtonText: "Schließen"
                })
            }
        });
    });

};
function deleteFile(system,fileid,column,div,showdiv){

    swal({
        title: "Are you sure you want to delete that?",
        type: "warning",
        showCancelButton: !0,
        cancelButtonText: "No!",
        confirmButtonText: "Yes, delete it!"
    }).then(function(e) {
        e.value && $.ajax({
            type: "GET",
            dataType: "json",
            url: "/control/system/ajax/general.php?process=deleteFile&columnsystem="+system+"&fileid="+fileid+"&column="+column,
            success: function(result) {
                if(result['process']=='ok'){
                    swal({
                        title: "Dosya Gelöscht",
                        type: "success",
                        confirmButtonText: "Schließen"
                    })
                    $('#'+div).hide();$('#'+showdiv).show();
                } else {
                    swal({
                        title: "Dosya Silinemedi !",
                        text: "Bitte wenden Sie sich an Ihren Softwareentwickler!",
                        type: "error",
                        confirmButtonText: "Schließen"
                    })
                }
            },
            error: function() {
                swal({
                    title: "Dosya Silinemedi !",
                    text: "Bitte wenden Sie sich an Ihren Softwareentwickler!",
                    type: "error",
                    confirmButtonText: "Schließen"
                })
            }
        });
    });

};
/*
function deleteBVData(data,system){

        swal({
            title: "Silmek İstediğinize Emin Misiniz ?",
            type: "warning",
            showCancelButton: !0,
            cancelButtonText: "Hayır!",
            confirmButtonText: "Evet, Sil!"
        }).then(function(e) {
            e.value && $.ajax({
                type: "GET",
                url: "/control/system.php?bvadmin="+system+"&process=delete",
                data: {data:data},
                success: function() {
                        swal({
                            title: "Gelöscht",
                            type: "success",
                            confirmButtonText: "Schließen"
                        });
                    $('#id'+data).hide(2000).remove();
                }
            });
        })

};*/

function deleteBVData(data,system){

    swal({
        title: "Are you sure you want to delete that?",
        type: "warning",
        showCancelButton: !0,
        cancelButtonText: "No!",
        confirmButtonText: "Yes, delete it!"
    }).then(function(e) {
        e.value && $.ajax({
            type: "GET",
            url: "/control/system.php?bvadmin="+system+"&process=delete",
            data: {data:data},
            success: function() {
                swal({
                    title: "Gelöscht",
                    type: "success",
                    confirmButtonText: "Schließen"
                });
                $('#m_table_1').DataTable().ajax.reload();
                $('#id'+data).hide(2000).remove();
            }
        });
    })

};

function deleteCategoryCriteries(system,process,process2,id,categoryid){


    swal({
        title: "Are you sure you want to delete that?",
        type: "warning",
        showCancelButton: !0,
        cancelButtonText: "No!",
        confirmButtonText: "Yes, delete it!"
    }).then(function(e) {
        e.value && $.ajax({
            type: "GET",
            url: "/control/system.php?bvadmin="+system+"&process="+process+"&process2="+process2+"&id="+id+"&categoryid="+categoryid,
            success: function() {
                swal({
                    title: "Gelöscht",
                    type: "success",
                    confirmButtonText: "Schließen"
                });
                $('#id'+id).hide(2000).remove();
            }
        });
    })

};
function deleteKadroKisi(system,process,process2,id,categoryid){


    swal({
        title: "Are you sure you want to delete that?",
        type: "warning",
        showCancelButton: !0,
        cancelButtonText: "No!",
        confirmButtonText: "Yes, delete it!"
    }).then(function(e) {
        e.value && $.ajax({
            type: "GET",
            url: "/control/system.php?bvadmin="+system+"&process="+process+"&process2="+process2+"&id="+id+"&categoryid="+categoryid,
            success: function() {
                swal({
                    title: "Gelöscht",
                    type: "success",
                    confirmButtonText: "Schließen"
                });
                $('#id'+id).hide(2000).remove();
            }
        });
    })

};
function deleteImageGallery(imageid){

    swal({

        title: "Möchten Sie das Bild wirklich löschen?",
        type: "warning",
        showCancelButton: !0,
        cancelButtonText: "No!",
        confirmButtonText: "Yes, delete it!"
    }).then(function(e) {
        e.value && $.ajax({
            type: "GET",
            url: "/control/system.php?bvadmin=gallery&process=photos&process2=deleteimg&id="+imageid,
            success: function() {
                swal({
                    title: "Gelöscht",
                    type: "success",
                    confirmButtonText: "Schließen"
                });
                $('#id'+imageid).hide(2000).remove();
            }
        });
    })

};
function coverImage(id,gallery_id){

    swal({
        title: "Sind Sie sicher, dass Sie Kunst abdecken möchten?",
        type: "warning",
        showCancelButton: !0,
        cancelButtonText: "No!",
        confirmButtonText: "Yes, delete it!"
    }).then(function(e) {
        e.value && $.ajax({
            type: "GET",
            url: "/control/system.php?bvadmin=gallery&process=photos&process2=cover&id="+id+"&gallery_id="+gallery_id,
            success: function() {
                swal({
                    title: "Kapak Resmi Yapıldı.",
                    type: "success",
                    confirmButtonText: "Schließen"
                });
                $('span.cover').remove();
                $('#id'+id).append( "<span class=\"cover\">Kapak Resmi</span>" );
            }
        });
    })

};
$(document).ready( function () {


    // Slug Generate

/*    $( ".slug" ).change(function() {
        var text = $( ".slug" ).val();
        var module = $( ".slug" ).attr('rel');
        if(text.length > 0){
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "/control/system/ajax/general.php?seoyap=seoyap&text="+text+"&module="+module,
                success: function(data){
                   $('#slug').val(data["slug"]);
                }
            });
        }

    });
    $( "#slug" ).change(function() {
        var text = $( "#slug" ).val();
        if(text.length > 0){
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "/control/system/ajax/general.php?seoyap=seoyap&text="+text,
                success: function(data){
                    $('#slug').val(data["slug"]);
                }
            });
        }
    });*/



    $( ".slugdata" ).change(function() {
        var text = $( this ).val();
        var language = $( this ).attr('rel');

        if(text.length > 0){
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "/control/system/ajax/general.php?seoyap=sitemapurl&text="+text+"&language="+language,
                success: function(data){
                    $('.slug'+language).val(data["slug"]);
                }
            });
        }
    });

    $( ".slug" ).change(function() {
        var text = $( this ).val();
        var language = $( this ).attr('rel');
        if(text.length > 0){
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "/control/system/ajax/general.php?seoyap=seoyap&text="+text,
                success: function(data){
                    $('.slug'+language).val(data["slug"]);
                }
            });
        }
    });




    $( ".name_slug" ).change(function() {
        var text = $( this ).val();
        var language = $( this ).attr('rel');
        var sitemap_id = $( '#sitemap_id' ).val();
        if(text.length > 0){
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "/control/system/ajax/general.php?seoyap=pagesurl&text="+text+"&language="+language+"&sitemap_id="+sitemap_id,
                success: function(data){
                    $('.slug'+language).val(data["slug"]);
                }
            });
        }
    });


    $( ".name_slug_data" ).change(function() {
        var text = $( this ).val();
        var language = $( this ).attr('rel');
        if(text.length > 0){
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "/control/system/ajax/general.php?seoyap=pagesurl&text="+text,
                success: function(data){
                    $('.slug'+language).val(data["slug"]);
                }
            });
        }
    });


    // Kriter slug

    $( ".kriterdata" ).change(function() {
        var text = $( this ).val();
        var language = $( this ).attr('rel');
        var catid = $( this ).attr('data-id');

        if(text.length > 0){
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "/control/system/ajax/general.php?seoyap=kriterurl&text="+text+"&language="+language+"&catid="+catid,
                success: function(data){
                    $('.kriterslug'+language).val(data["slug"]);
                }
            });
        }
    });



    // Validate

    $("form").validate();

    $('.datepicker').datepicker();

    $( ".nav-tabs li:first-child > a" ).addClass('active');
    $( ".tab-content > div:first-child" ).addClass('active');
    $('[data-fancybox="gallery"]').fancybox({
        // Options will go here
    });
});