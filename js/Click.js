(function () {
    // 固定参数
    var config = {
      mobile: "false",
      text: ["❤"], //, "★", "✦", "☯", "☪", "❄", "❆", "☀", "༄", "♥", 
      fontSize: "30px",
      random: "false",
      fontFamily: "DFKai-sb",
    };
  
    const randomColor = function () {
      // 生成一個隨機的 RGB 顏色
      const r = Math.floor(Math.random() * 256); // 0 到 255
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
  
      // 將 RGB 轉換為十六進制顏色代碼
      const hexR = r.toString(16).padStart(2, "0"); // 轉換為兩位的十六進制，不足的補零
      const hexG = g.toString(16).padStart(2, "0");
      const hexB = b.toString(16).padStart(2, "0");
  
      // 拼接成十六進制顏色代碼
      return `#${hexR}${hexG}${hexB}`;
    };
  
    let aIdx = 0;
  
    function getRandomText() {
      const randomIndex = Math.floor(Math.random() * config.text.length);
      return config.text[randomIndex];
    }
  
    $(document).ready(function () {
      $("body").on("click", function (e) {
        const $span = $("<span>");
        const randomText = getRandomText();
        $span.text(randomText);
  
        const x = e.pageX;
        const y = e.pageY;
        let top = y - 30;
  
        $span.css({
          "z-index": 150,
          "top": top + "px",
          "left": (x - 10) + "px",
          "position": "absolute",
          "font-weight": "bold",
          "color": randomColor(),
          "cursor": "default",
          "font-size": config.fontSize || "inherit",
          "font-family": config.fontFamily,
          "word-break": "break-word"
        });
  
        $(this).append($span);
  
        // animation
        const initTime = new Date().getTime();
        let opacityValue = 1;
  
        function animate() {
          top--;
          opacityValue = opacityValue - 0.02;
          $span.css({
            "top": top + "px",
            "opacity": opacityValue
          });
  
          const newTime = new Date().getTime();
          const diff = newTime - initTime;
  
          if (diff < 600) {
            window.requestAnimationFrame(animate);
          } else {
            $span.remove();
          }
        }
  
        window.requestAnimationFrame(animate);
      });
  
      // 雪花
      let e = {
        flakeCount: 100,
        minDist: 150,
        color: "255, 255, 255",
        size: 2,
        speed: 0.5,
        opacity: 0.2,
        stepsize: 0.5,
      };
  
      const $canvas = $("<canvas>").attr("id", "snow");
      $canvas.css({
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
      });
      $("body").append($canvas);
  
      const ctx = $canvas[0].getContext("2d");
      const flakeCount = e.flakeCount;
      let a = -100,
        s = -100,
        d = [];
  
      $canvas[0].width = window.innerWidth;
      $canvas[0].height = window.innerHeight;
  
      function drawFlakes() {
        ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
        const minDist = e.minDist;
  
        for (let t = 0; t < flakeCount; t++) {
          let flake = d[t];
          const h = a,
            m = s,
            w = flake.x,
            c = flake.y,
            p = Math.sqrt((h - w) * (h - w) + (m - c) * (m - c));
  
          if (p < minDist) {
            const dx = (h - w) / p,
              dy = (m - c) / p,
              ddx = minDist / (p * p) / 2;
            flake.velX -= ddx * dx;
            flake.velY -= ddx * dy;
          } else {
            flake.velX *= 0.98;
            if (flake.velY < flake.speed && flake.speed - flake.velY > 0.01) {
              flake.velY += 0.01 * (flake.speed - flake.velY);
            }
            flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;
          }
  
          ctx.fillStyle = "rgba(" + e.color + ", " + flake.opacity + ")";
          flake.y += flake.velY;
          flake.x += flake.velX;
  
          if (flake.y >= $canvas[0].height || flake.y <= 0) {
            resetFlake(flake);
          }
  
          if (flake.x >= $canvas[0].width || flake.x <= 0) {
            resetFlake(flake);
          }
  
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size, 0, 2 * Math.PI);
          ctx.fill();
        }
  
        requestAnimationFrame(drawFlakes);
      }
  
      function resetFlake(flake) {
        flake.x = Math.floor(Math.random() * $canvas[0].width);
        flake.y = 0;
        flake.size = 3 * Math.random() + 2;
        flake.speed = 1 * Math.random() + 0.5;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = 0.5 * Math.random() + 0.3;
      }
  
      $(document).on("mousemove", function (e) {
        a = e.clientX;
        s = e.clientY;
      });
  
      $(window).on("resize", function () {
        $canvas[0].width = window.innerWidth;
        $canvas[0].height = window.innerHeight;
      });
  
      (function () {
        for (let t = 0; t < flakeCount; t++) {
          const t = Math.floor(Math.random() * $canvas[0].width),
            n = Math.floor(Math.random() * $canvas[0].height),
            o = 3 * Math.random() + e.size,
            a = 1 * Math.random() + e.speed,
            s = 0.5 * Math.random() + e.opacity;
          d.push({
            speed: a,
            velX: 0,
            velY: a,
            x: t,
            y: n,
            size: o,
            stepSize: (Math.random() / 30) * e.stepsize,
            step: 0,
            angle: 180,
            opacity: s,
          });
        }
        drawFlakes();
      })();
    });
  })();
  