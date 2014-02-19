/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    //document.addEventListener("bind", onDeviceBind,false); 
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    //onDeviceReady();
});



function onDeviceReady() {

    console.log("Ready");
   
    
    
    
    
    $(window).bind('pageshow resize orientationchange', function(e) { // resize page if needed
        maxHeight();
    });
   // $('div#index').on('touchmove', function(evt) { evt.preventDefault(); })
    doGlobalization('it_IT');
    
    $("#btnnews").click(function(e) { // refresh my location button
        
        var app = new MyApplication()
        app.paginanews();
    });
    
    $("#btninfo").click(function(e) { // refresh my location button
        
        var app = new MyApplication()
        app.paginainfo();
    });
    
    
    
    maxHeight();
    var app = new MyApplication();

}

function maxHeight() {

    var w = $(window).height();
    var cs = $('div[data-role="content"]');
    for (var i = 0, max = cs.length; i < max; i++) {
        var c = $(cs[i]);
        var h = $($('div[data-role="header"]')[i]).outerHeight(true);
        var f = $($('div[data-role="footer"]')[i]).outerHeight(true);
        var c_h = c.height();
        var c_oh = c.outerHeight(true);
        var c_new = w - h - f - c_oh + c_h;
        var total = h + f + c_oh;
        if (c_h < c.get(0).scrollHeight) {
            c.height(c.get(0).scrollHeight);
        } else {
            c.height(c_new);
        }
    }

}

function doGlobalization(lingua){
  $.i18n.properties({
    name: 'Messages',
    path: 'res/language/',
    mode: 'both',
    language: lingua,
    callback: function(){
      // Main page
      $('#titlePageApp').html(titlePageApp);
      $('#btnmyprofile').html(btnmyprofile);
      $('#btnallenamenti').html(btnallenamenti);
      $('#btntimers').html(btntimers);
      $('#btnvideo').html(btnvideo);
      $('#btnnews').html(btnnews);
      $('#btninfo').html(btninfo);
       $('#h2Home').html(h2Home);
       //Pagina News
      $('#titlePageAppNews').html(titlePageApp);
      $('#h2News').html(h2News);
      //Pagina Info
      $('#titlePageAppInfo').html(titlePageApp);
      $('#h2Info').html(h2Info);
     /* $('#msg_months').empty().append($.i18n.prop('msg_months'));
      $('#msg_days').empty().append($.i18n.prop('msg_days'));
      $('#msg_formats').empty().append($.i18n.prop('msg_formats'));
      $('#msg_icon').empty().append($.i18n.prop('msg_icon'));
      // Sub page heading
      $('#icon_heading').empty().append($.i18n.prop('msg_icon'));
      $('#months_heading').empty().append($.i18n.prop('msg_months'));
      $('#days_heading').empty().append($.i18n.prop('msg_days'));
      $('#formats_heading').empty().append($.i18n.prop('msg_formats'));
      $('#words_heading').empty().append($.i18n.prop('msg_words'));
      //Back buttons
      var items = $('a[data-rel="back"]');
      $.each(items, function(i){
        $(items[i]).empty().append($.i18n.prop('msg_previous'));
      });
      //Show locale by jQuery i18n plug-in
      $('#globalization_footer').empty().
        append($.i18n.prop('msg_footer') + $.i18n.browserLang());*/
    }
  });
};


function showAlert(message, title) {
    if (window.navigator.notification) {
        window.navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}

function caricaFile(url,id_destination)
{
    
}
function openTesto(myid)
    {
        //console.log('entro');
        //showAlert(myid);
        //showAlert($('#testo_notizia_'+myid).html());
        
        $('#testo_notizia_'+myid).toggle();
          
    }

function goUrl(myLink)
{
    var tipodevice = device.platform;
    
    switch (tipodevice)
    {
        case 'Android':
            navigator.app.loadUrl(myLink, {openExternal : true});
            break;
        case 'iOS':
            window.open(myLink, '_system');
            break;
        case 'WinCE':
        case 'Win32NT':    
            window.open(myLink, '_system');
            break;    
            
    }
}

function MyApplication() {
    var self = this;
   
    //var connectionLess = ["undefinedAction", "about", "compass", "contacts", "addresses"];
    var forceConnectionCheck = ["paginanews", "directions", "showAddress"];
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI] = 'WiFi';
    states[Connection.CELL_2G] = 'Mobile';
    states[Connection.CELL_3G] = 'Mobile';
    states[Connection.CELL_4G] = 'Mobile';
    states[Connection.NONE] = 'No network';
    
    function hasConnection() {
        if (window.navigator.connection.type === Connection.NONE) {
            showAlert('Nessuna Connessione');
            return false;
        }
        return true;
    }
    this.showPhoneStatus = function() {
        showAlert(window.device.model + "(" + window.device.platform + " " + window.device.version + ")\nConnection: " + states[window.navigator.connection.type], "About");
    };
    
    
    this.route = function()
    {
        //var _h = window.location.hash || "#undefinedAction";
        //h è #idpagina
        //
        //showAlert(_h);
         var _h = window.location.hash || "#undefinedAction";
        var stop = _h.length;
        if (_h.indexOf("?") > 0) {
            stop = _h.indexOf("?") - 1;
        }
        _h = _h.substr(1, stop);
        $("#map").html("");
        $("#addressMap").html("");

        if (!checkOK(_h)) {
            showAlert("Internet connection is required", "No internet connection");
            return;
        }

        if (typeof this[_h] === "function") {
            this[_h]();
        } else {
            window.console.log("action function not found: " + _h);
        }
    }
    
    
    function checkOK(page) {
        if (hasConnection()) {
            return true;
        }

        if (forceConnectionCheck.indexOf(page) > 0 && !hasConnection()) {
            return false;
        }
        /*if (!hasConnection() && (connectionLess.indexOf(page) < 0)) {
            return false;
        }*/
        return true;
    }
    
    
    
    this.paginanews = function()
    {
        
//showAlert('notizie');
        //caricaFile("http://www.pician.it/crossfit/app/query_news.php","#elenco_notizie");
                $.ajax({
                url:"http://www.pician.it/crossfit/app/query_news.php",
                type:'POST',
                //data:term,
                dataType:'json',
                beforeSend:function()
                {
                    $.mobile.loading( 'show', {
                                    text: 'Loading',
                                    textVisible: true,
                                    theme: 'e',
                                    html: ""
                            });
                },
                success:function(data){
                     $.mobile.loading('hide');
                        $("#elenco_notizie").html("");
                        for(var i in data){
                            $("#elenco_notizie").append("<li onclick=\"openTesto('"+data[i]['id']+"');return false;\"  class='cont_notizia' >"+
                                                            "<a href='#' onclick=\"return false;\" class='titolo_notizia'>"+data[i]['nome']+"</a>"+
                                                            "<span class=\"data_notizia\">"+data[i]['quandodef']+"</span>"+
                                                           "<p data-role='content' id='testo_notizia_"+data[i]['id']+"' class='testo_notizia'>"+data[i]['testo']+"</p></li>");
                              //$("#elenco_notizie").append("<li class='cont_notizia'><a href='#'  class='titolo_notizia'>"+data[i]['nome']+"</a><p data-role='content' id='testo_notizia_"+data[i]['id']+"' class='testo_notizia'>"+data[i]['testo']+"</p></li>");
                             $("#testo_notizia_"+data[i]['id']).toggle(); 
                        }
                },
                error:function(jqXHR,text_status,strError){
                    showAlert('no connection');},
                    timeout:60000,
                
        });
       
    }
    
    
    this.paginainfo=function()
    {
        //showAlert('paginaInfo');
    }
    
    
    
    
    function init() {
       // showAlert('ok');
        self.route();
    }

    $(window).on('hashchange', function() {
        self.route();
    });

    init();
}