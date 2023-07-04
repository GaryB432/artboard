<svelte:head>
  <title>artboard - blox</title>
</svelte:head>
<div class="masthead">
  <div class="navbar-brand">
    <div class="logo">
      <div class="logo-flp">
        <div class="wrap">
          <a href="/">
            <div class="front">
              <img
                alt="STLtoday.com"
                src="/blox/9b98b5bc-7564-11ec-9b25-e32a5add2fc1.webp"
              />
            </div>
            <div class="back">
              <img alt="Where your story lives" src="/blox/logo-tagline.webp" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .masthead {
    background-color: #000;
  }
  .logo-flp {
    position: relative;
    z-index: 1;
  }
  .masthead .logo-flp,
  .masthead .logo-flp .front,
  .masthead .logo-flp .back {
    width: 300px;
    height: 40px;
  }
  .navbar-brand .logo-flp,
  .navbar-brand .logo-flp .front,
  .navbar-brand .logo-flp .back {
    width: 200px;
    height: 30px;
  }
  .logo-flp .wrap {
    transition: 1.5s;
    position: relative;
    transform-style: preserve-3d;
  }
  .logo-flp .front,
  .logo-flp .back {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: 1.5s;
    transform-style: preserve-3d;
    position: absolute;
    top: 0;
    left: 0;
  }
  .logo-flp .front {
    z-index: 2;
    animation: flip-front 8s infinite;
  }
  .logo-flp .back,
  .navbar-brand .logo-flp .front {
    display: flex;
    align-items: center;
  }
  .logo-flp .back {
    transform: rotateX(180deg);
    animation: flip-back 8s infinite;
  }

  @keyframes flip-front {
    0%,
    40%,
    100% {
      transform: rotateX(0deg);
    }
    60%,
    80% {
      transform: rotateX(180deg);
    }
  }

  @keyframes flip-back {
    0%,
    40%,
    100% {
      transform: rotateX(180deg);
    }
    60%,
    80% {
      transform: rotateX(0deg);
    }
  }
</style>
