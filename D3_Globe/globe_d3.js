// TITRE
function _1(md) {
  return md`# LES SUISSES AUTOUR DU GLOBE`;
}
function _2(html) {
  return html`<div id="map" style="width: 100%;"></div>`;
}
function _world_json(FileAttachment) {
  return FileAttachment("world.json");
}

/////////////////////////////////////////////////////////////////////////
async function _4(d3, world_json) {
  let width = d3.select("#map").node().getBoundingClientRect().width;
  let height = 400;
  const sensitivity = 75;

  let projection = d3
    .geoOrthographic()
    .scale(250)
    .center([0, 0])
    .rotate([0, -30])
    .translate([width / 2, height / 2]);

  const initialScale = projection.scale();
  let path = d3.geoPath().projection(projection);

  let svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none");


    var circle = svg.select("circle");

    // MER + DEGRADE: 
    var gradient = svg
      .append("defs")
      .append("radialGradient")
      .attr("id", "gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")
      .attr("fx", "50%")
      .attr("fy", "50%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#685544");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "black");
    circle.style("fill", "url(#gradient)");

  let globe = svg
    .append("circle")
    .attr("fill", "#020b26")
    .attr("stroke", "#000")
    .attr("stroke-width", "0.2")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", initialScale)
    .style("fill", "url(#gradient)")

  //////////////////////////////////////////////////////////

    
  // ROTATION AVEc LA SOURI
  svg
    .call(
      d3.drag().on("drag", () => {
        const rotate = projection.rotate();
        const k = sensitivity / projection.scale();
        projection.rotate([
          rotate[0] + d3.event.dx * k,
          rotate[1] - d3.event.dy * k,
        ]);
        path = d3.geoPath().projection(projection);
        svg.selectAll("path").attr("d", path);
      })
    )

  ///////////////////////////////////////////////////////

  // ZOOM AVEC LA SOURIS
    .call(
      d3.zoom().on("zoom", () => {
        if (d3.event.transform.k > 0.3) {
          projection.scale(initialScale * d3.event.transform.k);
          path = d3.geoPath().projection(projection);
          svg.selectAll("path").attr("d", path);
          globe.attr("r", projection.scale());
        } else {
          d3.event.transform.k = 0.3;
        }
      })
    );

  let map = svg.append("g");

  let data = await world_json.json();
  ////////////////////////////////////////////////////////

  // ICI C'EST LA TERRE : 
  map
    .append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("class", (d) => "country_" + d.properties.name.replace(" ", "_"))
    .attr("d", path)
    .attr("fill", "#4a6157")
    .style("opacity", 0.5)
    .style("stroke", "#2f4036")
    .style("stroke-width", 0.6);

/////////////////////////////////////////////////////////
  //ROTATION AUTOMATIQUE
  d3.timer(function (elapsed) {
    const rotate = projection.rotate();
    const k = sensitivity / projection.scale();
    projection.rotate([rotate[0] - 1 * k, rotate[1]]);
    path = d3.geoPath().projection(projection);
    svg.selectAll("path").attr("d", path);
  }, 500);
///////////////////////////////////////////////////
 }

function _d3(require) {
  return require("https://d3js.org/d3.v4.min.js");
}




export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() {
    return this.url;
  }
  const fileAttachments = new Map([
    [
      "world.json",
      {
        url: new URL(
          "./files/listePays.json",
          import.meta.url
        ),
        mimeType: "application/json",
        toString,
      },
    ],
  ]);
  main.builtin(
    "FileAttachment",
    runtime.fileAttachments((name) => fileAttachments.get(name))
  );
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html"], _2);
  main
    .variable(observer("world_json"))
    .define("world_json", ["FileAttachment"], _world_json);
  main.variable(observer()).define(["d3", "world_json"], _4);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
