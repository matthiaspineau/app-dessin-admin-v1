window.addEventListener("DOMContentLoaded", (e) => {

    const app = document.getElementById('app')

    app.innerHTML = `
      <div class="dock-page">
          <div class="dock-banner bg-dark">
            <span>Administration - Toto dessin</span>
            <div class='d-none cls-store-data' data-store-draw-of-comics='{"items":[]}'></div>
          </div>

          <div class="dock-sidebar">
              <ul class="sidebar-ul">
                  <li class="sidebar-li"><a href="#" data-view="viewFormComics">page comics</a></li>
                  <li class="sidebar-li"><a href="#" data-view="viewDrawCollection">page draw collection</a></li>
                  <li class="sidebar-li"><a href="#" data-view="viewFormDraw">page draw form</a></li>
                  <li class="sidebar-li"><a href="#" data-view="viewTest">view test</a></li>
              <ul>
          </div>
          <div id="main" class="dock-main">

          </div>
      </div>
    `




    for (const link of document.querySelectorAll("a")) {
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