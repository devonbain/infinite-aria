const colors = [
  "#ff78df", //pink
  "#915a3c", //brown
  "#fcb438", //yellow
  "#1534a3", //dark blue
  "#bf1333", //red
  "#000000", //black
  "#6eba45" // green
];

let texts;

async function loadFiles() {
  fetch('data/texts.txt')
  .then(response => response.text())
  .then((data) => {
    texts = data.split(/\n/);
    makeAria();
    infiniteAria();
  })
}

function randomText() {
  let randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

function randomInt(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function makeAria() {
  let canvas = document.createElement("CANVAS");
  canvas.height = document.getElementById("canvas-container").clientHeight;
  canvas.width = 5000;
  document.getElementById("canvas-container").appendChild(canvas);

  // Make random line
  let margin = 0.1;
  let maxPathHeight = canvas.height * (1-margin);
  let minPathHeight = canvas.height * margin;
  let xSpace = 50;

  var context = canvas.getContext("2d");
  context.lineCap = "round";
  context.lineJoin = "round";

  var xIndex = 50;

  // Load font
  var myFont = new FontFace('myFont', 'url(assets/moinho_1.otf)');

  myFont.load().then(function(font){

    document.fonts.add(font);
    context.font = "20px myFont";
    context.textAlign = "left";

    while (xIndex < 5000) {

      // Number of points in the path
      let numberOfPoints = randomInt(8, 3);

      let randomHeights = [];
      for (var j = 0; j < numberOfPoints; j++) {
        randomHeights.push(randomInt(maxPathHeight, minPathHeight));
      }

      if (xIndex + (randomHeights.length * 50) < 5000) {
        context.strokeStyle = colors[randomInt(colors.length, 0)];
        context.lineWidth = randomInt(15, 2);
        context.beginPath();
        context.moveTo(xIndex, randomHeights[0]);
        for (var j = 1; j < randomHeights.length; j++) {
          xIndex += 50;
          context.quadraticCurveTo(
            xIndex-25,
            (randomInt(Math.max(...randomHeights), Math.min(...randomHeights))),
            xIndex,
            randomHeights[j]);
        }
        context.stroke();

        var text = randomText();
        if (text.split(" ").length > 5) {
          // If text is too long, split into lines
          var textArr = [];
          text = text.split(" ");
          for (var k = 0; k < text.length % 5; k++) {
            textArr.push(text.slice(k*5,(k+1)*5).join(" "));
          }
          if (randomHeights.length < 5) {
            // Short line: only use first 5 words
            context.fillText(textArr[0], xIndex-(50*(randomHeights.length-1)), Math.max(...randomHeights) + 20);
          } else {
            for (var k = 0; k < textArr.length; k++) {
              context.fillText(textArr[k], xIndex-(50*(randomHeights.length-1)), Math.max(...randomHeights) + (20*(k+1)));
            }
          }
        } else {
          context.fillText(text, xIndex-(50*(randomHeights.length-1)), Math.max(...randomHeights) + 20);
        }

        xIndex += 200;
      }

    }
  });
}

function infiniteAria() {
  makeAria();
  document.getElementsByTagName("canvas")[0].classList.add("animated");
    setTimeout(() => {
      document.getElementsByTagName("canvas")[0].remove();
      document.getElementsByTagName("canvas")[0].classList.add("animated");
      infiniteAria();
    }, 90000);
}
