import { fetchGetTableDraw, fetchDelete } from "../fetch_data.js";
import { PATH } from "../../configUrl.js";

const ressource = {
  pathUpload: PATH.urlUploadImg,
  sizeSmall: "original",
};
const storeDraw = {
  drawList: [],
  drawId: 0,
  drawItem: {},
  drawOfComics: [],
};
const gridjs = new window.gridjs.Grid();

export function initView() {
  console.log("viewTest");

  document.getElementById("main").innerHTML = `<div id="d-collection">
        <div class="test-1">clique</div>
      </div>`;
  document.querySelector(".test-1").addEventListener("click", () => {
    go();
  });
}

async function go() {
  let data = {
    ok: "oui",
  };
  data = JSON.stringify(data);

  let formData = new FormData();

  formData.append("controller", "MediaController");
  formData.append("action", "testScaleMedia");
  formData.append("params", data);

  const req = await fetch(PATH.urlApi, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (req.ok === true) {
    return req.json();
  }
  throw new Error("nouvelle erreur lors de la creation");
}
