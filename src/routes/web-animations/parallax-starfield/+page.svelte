<script lang="ts">
  // import Layer from "./components/Layer.svelte";
  import LayerPanel from "./components/Layer.svelte";
  import StarPanel from "./components/Star.svelte";
  import { Layer, Star } from "./shared";
  var layerCount = 5;
  var starCount = 100;
  // var universe = document.getElementById("universe");

  let universe: HTMLElement | null = $state(null);
  // let layerComponents: LayerPanel[] = $state([]);
  let layers: Layer[] = $state([]);

  // var w = window;
  // var d = document;
  // var e = d.documentElement;
  // var g = d.getElementsByTagName("body")[0];
  // var width = w.innerWidth || e.clientWidth || g.clientWidth;
  // var height = w.innerHeight || e.clientHeight || g.clientHeight;
  for (var l = 0; l < layerCount; ++l) {
    //   var layer = document.createElement("div");
    const layer = new Layer();
    // layers.push(new Layer());
    //   layer.setAttribute("id", "layer" + l);
    //   layer.setAttribute("class", "starfield");
    //   universe.appendChild(layer);
    for (var i = 0; i < starCount; ++i) {
      // var xpos = Math.round(Math.random() * width);
      // var ypos = Math.round(Math.random() * height);
      for (var s = 0; s < 2; ++s) {
        //       var star = document.createElement("div");
        const star = new Star();
        //       star.setAttribute("class", "star" + l);
        //       star.style.webkitTransform =
        //         "translate(" + (xpos + s * width) + "px, " + ypos + "px)";
        //       star.style.transform =
        //         "translate(" + (xpos + s * width) + "px, " + ypos + "px)";
        //       star.style.backgroundColor = "white"; //rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ')';
        //       layer.appendChild(star);
        console.log(star);
        layer.stars.push(star);
      }
      layers.push(layer)
    }
    //   layer.animate(
    //     [
    //       { transform: "translate3d(0, 0, 0)" },
    //       { transform: "translate3d(-" + width + "px, 0, 0)" },
    //     ],
    //     { duration: Math.pow(2, layerCount - l) * 1000, iterations: Infinity },
    //   );
  }
</script>

<div bind:this={universe} id="xxxxx-universe">
  {#each layers as layer}
  {layer.stars.length}
    <LayerPanel {...layer}></LayerPanel>
  {/each}
</div>

