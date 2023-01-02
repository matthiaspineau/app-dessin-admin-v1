/* ---------------------------------------------------
            Sidebar
------------------------------------------------------*/
function createSidebarList(items) {
    let html = '';
    let li = '';

    items.forEach(elt => {
        li += `<li class="sidebar-li" data-dock-sidebar-item="item" data-dock-sidebar-action="${elt.action}">${elt.content}</li>`
    });
    
    html += `<ul class="sidebar-ul">`
    html += li
    html += `</ul>`

    return html
}


/* ---------------------------------------------------
            
------------------------------------------------------*/
function getHtmlImage(item) {
    return `<img style="max-width:100%;height:auto;" src="${item.src}" alt="${item.alt}" />`
}