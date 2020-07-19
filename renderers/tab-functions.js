//window.$ = window.jQuery = require('jQuery');
//var $ = window.jQuery = require('jQuery');
//require('jquery-ui')

var $ = jQuery = require('jquery')
require('jquery-ui-dist/jquery-ui')

let workingDirectory = remote.getGlobal('projectManager').workingDirectory

var tabTitle = "";
    tabTemplate = "<li class='tab-li'>\
                        <a class='li-a' href='#{href}'>#{title}</a>\
                        <span class='ui-icon ui-icon-close' role='presentation'>\
                            <img src='../resources/imgs/remove_tab.png' style='width:10px; height:10px;'>\
                        </span>\
                    </li>",
    tabCounter = 2;

var tabContent = "<div class='working-menu'>\
                    <div class='tab-image' id='tab-image-area'></div>\
                    <div class='bottom-menu'>\
                        <div class='bottom-buttons' id='default-bottom'>\
                            <button id='zoom-in-button'>zoom in</button>\
                            <button id='zoom-out-button'>zoom out</button>\
                            <button id='undo-button'>undo</button>\
                            <button id='redo-button'>redo</button>\
                            <button id='prev-button'>prev</button>\
                            <button id='next-button'>next</button>\
                        </div>\
                    </div>\
                </div>\
                <div class='right-menu'>\
                    <h1 class = 'label-tit' style='text-align:center;'>Label</h1>\
                    <div class = 'label-list'></div>\
                    <button id='add-label' class ='add-label'>Add Label</button>\
                </div>";





function openTab(thumbnailId){
    console.log(thumbnailId);
    tabTitle = "" + thumbnailId;

    $("#all-imgs").css("display", "none");
    $("#tab-area").css("display", "block");



    var tabs = $( "#tab-area" ).tabs();
    var tabList = $('#tab-list');

    var title = tabTitle || "Tab " + tabCounter,
        id = "tabs-" + thumbnailId,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{title\}/g, title ) ),
        tabContentHtml = tabContent || "Tab " + tabCounter + " content.";
    
    
    tabs.find("#tab-list").append(li);
    //tabs.find( ".ui-tabs-nav" ).append( li );
    tabs.append( "<div class='tab-menu' id='" + id + "'>" + tabContentHtml + "</div>" );
    tabs.tabs( "refresh" );
    tabCounter++;

    // Close icon: removing the tab on click
    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });




}



module.exports = { openTab };