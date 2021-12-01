

function ajaxLoader(){
    var ajaxLoaderHtml = '';

    ajaxLoaderHtml += ' <div class="ajaxLoaderBaseArea">\n' +
        '                   <div class="holder">\n' +
        '                       <div class="loader">\n' +
        '                           <div></div>\n' +
        '                           <div></div>\n' +
        '                           <div></div>\n' +
        '                       </div>\n' +
        '                   </div>\n' +
        '               </div> \n';

    return ajaxLoaderHtml;
}

function ajaxLoaderAllScreen(){
    var ajaxLoaderAllScreenHtml = '';

    var lang = $('html').attr('lang');

    var title = '';
    var text = '';

    if(lang === 'en'){
        title = 'Your transaction is being processed.';
        text = 'Please wait...';
    }
    else {
        title = 'İşleminiz gerçekleştiriliyor.';
        text = 'Lütfen bekleyiniz...';
    }

    ajaxLoaderAllScreenHtml += ' <div class="ajaxLoaderAllScreen">\n' +
        '                            <div class="ajaxLoaderSubArea">\n' +
        '                                <div class="loader-wrapper">\n' +
        '                                    <div id="floatingBarsG">\n' +
        '                                        <div class="blockG" id="rotateG_01"></div>\n' +
        '                                        <div class="blockG" id="rotateG_02"></div>\n' +
        '                                        <div class="blockG" id="rotateG_03"></div>\n' +
        '                                        <div class="blockG" id="rotateG_04"></div>\n' +
        '                                        <div class="blockG" id="rotateG_05"></div>\n' +
        '                                        <div class="blockG" id="rotateG_06"></div>\n' +
        '                                        <div class="blockG" id="rotateG_07"></div>\n' +
        '                                        <div class="blockG" id="rotateG_08"></div>\n' +
        '                                        <div class="blockG" id="rotateG_09"></div>\n' +
        '                                        <div class="blockG" id="rotateG_10"></div>\n' +
        '                                        <div class="blockG" id="rotateG_11"></div>\n' +
        '                                        <div class="blockG" id="rotateG_12"></div>\n' +
        '                                    </div>\n' +
        '                                    <span class="indicator-title">'+title+'</span>\n' +
        '                                    <span class="indicator-text">'+text+'</span>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div> \n';

    return ajaxLoaderAllScreenHtml;
}

function spinAjaxLoader(){
    var spinAjaxLoaderHtml = '';

    spinAjaxLoaderHtml += ' <div class="loadingHeadArea"> \n' +
        '                       <div class="loading-wrap">\n' +
        '                           <div class="loading-hole">&nbsp;</div>\n' +
        '                       </div> \n' +
        '                   </div> \n';

    return spinAjaxLoaderHtml;
}
