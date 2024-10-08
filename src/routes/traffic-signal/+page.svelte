<script lang="ts">
  let innerCircle: HTMLDivElement | null = null;
  let grow = $state(false);

  function scaleInnerCircle() {
    grow = true;

    setTimeout(function () {
      grow = false;
    }, 1000);
  }
</script>

<div class="circle-container">
  <div class="outer-circle"></div>
  <div class="inner-circle" class:grow bind:this={innerCircle}></div>
</div>
<button onclick={scaleInnerCircle}>Scale Inner Circle</button>

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="460"
   height="460"
   viewBox="46 46 121.70834 121.70834"
   version="1.1"
   id="svg8"
   inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)"
   sodipodi:docname="drawing.svg">
  <defs
     id="defs2" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="0.7"
     inkscape:cx="371.13735"
     inkscape:cy="278.39899"
     inkscape:document-units="mm"
     inkscape:current-layer="layer1"
     inkscape:document-rotation="0"
     showgrid="false"
     units="px"
     scale-x="1"
     viewbox-x="46"
     fit-margin-top="0"
     fit-margin-left="0"
     fit-margin-right="0"
     fit-margin-bottom="0"
     inkscape:window-width="1267"
     inkscape:window-height="1009"
     inkscape:window-x="564"
     inkscape:window-y="21"
     inkscape:window-maximized="0" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1">
    <path
       id="path835"
       style="fill:none;stroke:#000000;stroke-width:4.36399;stroke-linejoin:bevel"
       d="M 111.01562 221.87109 L 111.01562 223.15039 A 52.142854 54.28571 0 0 0 64.285156 277.14258 A 52.142854 54.28571 0 0 0 111.01562 331.13477 L 111.01562 332.69922 L 357.55664 332.69922 L 357.55664 331.41406 A 52.142854 54.28571 0 0 0 408.57227 277.14258 A 52.142854 54.28571 0 0 0 357.55664 222.86914 L 357.55664 221.87109 L 111.01562 221.87109 z "
       transform="matrix(0.26458333,0,0,0.26458333,46,46)" />
  </g>
</svg>


<style>
  :root {
    --outer-circle-radius: 200px;
    --inner-circle-radius: 140px;
  }

  .circle-container {
    width: calc(2 * var(--outer-circle-radius));
    height: calc(2 * var(--outer-circle-radius));
    border-radius: 50%;
    background-color: #f0f0f0;
    position: relative;
  }

  .outer-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(2 * var(--outer-circle-radius));
    height: calc(2 * var(--outer-circle-radius));
    border-radius: 50%;
    border: 13px solid #000;
  }

  .inner-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(2 * var(--inner-circle-radius));
    height: calc(2 * var(--inner-circle-radius));
    border-radius: 50%;
    border: 13px solid #000;
    transition: transform 200ms ease-in-out;
    transform-origin: center;
  }
  
  .inner-circle.grow {
    transform: scale(1.25);
  }
</style>
