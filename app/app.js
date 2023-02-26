window.addEventListener("DOMContentLoaded", (e) => {

    const app = document.getElementById('app')

    app.innerHTML = `
      <div class="dock-page">
          <div class="dock-banner bg-dark">
            <span>Administration - Toto dessin</span>
            <div class='d-none cls-store-data' data-store-draw-of-comics='{"items":[]}'></div>
          </div>

          <div class="dock-sidebar">
              <div class="sidebar-cat">Media</div>
              <ul class="sidebar-ul">
                  <li class="sidebar-li"><a href="#" class="r-link" data-view="viewDrawCollection">Media collection</a></li>
                  <li class="sidebar-li"><a href="#" class="r-link" data-view="viewFormDraw">Ajouter media</a></li>
              </ul>
              <div class="sidebar-cat">Groupes media</div>
              <ul class="sidebar-ul">
                <li class="sidebar-li"><a href="#" class="r-link" data-view="viewGroupMediaCollection">Group collection</a></li>
                <li class="sidebar-li"><a href="#" class="r-link" data-view="viewGroupMediaCreate">Ajouter groupe</a></li>
                <li class="sidebar-li"><a href="#" class="r-link" data-view="viewOrderMediaGroups">Editer information</a></li>
                <li class="sidebar-li"><a href="#" class="r-link" data-view="viewGroupMediaInformation">Editer media</a></li>
              </ul>
              <div class="sidebar-cat">Test</div>
              <ul class="sidebar-ul"><span></span>
                  <li class="sidebar-li"><a href="#" class="r-link" data-view="">Test</a></li>
              </ul>
          </div>
          <div id="main" class="dock-main">

          </div>
      </div>
    `




    for (const link of document.querySelectorAll(".r-link")) {
      link.addEventListener("click", e => {
        e.preventDefault();

        import('./js/'+ link.dataset.view + '.js')
          .then(module => {
            module.initView();
          })
          .catch(err => {
            console.error(err.message);
          });
      });
    }



});