const colors = [
  "#ff78df", //pink
  "#915a3c", //brown
  "#fcb438", //yellow
  "#1534a3", //dark blue
  "#bf1333", //red
  "#000000", //black
  "#6eba45" // green
];

const sounds = ["aaaa", "aargh", "aarrgh", "aarrgh", "ack", "achoo", "ak", "babrom", "bada", "ba-da-bam", "badow", "baff", "salump", "bam", "bammm", "bang", "bash", "ba-wrooo", "bawww", "bdlm", "dlmp", "bdmp", "beep", "dep", "dia-bom", "biff", "bing", "blaff", "blam", "blamma", "blang", "bi-eech", "bleed", "bleeed", "bilam", "bllom", "blm", "blodom", "blog", "blom", "bloo", "blop", "blouw", "birashh", "blug", "bot", "boing", "bom", "bong", "bonk", "boom", "boom-da-doom", "bop", "bounce", "boyng", "bradada", "brat", "brrrram", "brrt", "burble", "chomp", "chonk", "chop", "chsh", "chugalug", "clang", "clank", "clash", "clik", "clikety-cirrash", "coff", "crack", "crackle", "crak", "crash", "creak", "crunch", "cut", "dang-a-lang", "dangling", "dig", "ding", "dingdong", "dinggg", "dong", "doof", "drinnggg", "dzzzz", "dzzzzz", "ech", "eeeeeee", "eeeeek", "eep", "ert", "feh", "flink", "floom", "floosh", "foomf", "fooosh", "foosh", "froosh", "fsst", "fwadoom", "tweet", "gag", "gah", "gasp", "ge-boom", "gha", "ghaaaa", "gleh", "glig", "gik", "glook", "glub", "glug", "go gong", "gong", "goo", "gop", "gring", "grinngg", "grrr", "hack", "ha-ho", "hf", "hmf", "hnf", "honk", "hrf", "huf", "huh", "humph", "inng", "jab", "kaf", "kchow", "kchunk", "clak", "claket", "klakkety", "klek", "klink", "klink", "klomp", "klop", "kneek", "kortch", "kpow", "krak", "kree", "kreet", "krk", "krr-oomf", "kr-rumf", "krumf", "kruuugg", "ktak", "kweeg", "mf", "mff", "mhf", "nf", "nfs", "nggg", "ngs", "nok", "nyaaooo", "oof", "oop", "ooze", "oww", "paf", "plu", "plip", "ploosh", "pok", "poof", "poom", "poot", "pop", "pow", "stung", "stweeeenz", "punt", "rap", "rat", "rat-tat", "rattle", "ring", "room", "rowl", "rrinng", "r-rip", "rrip", "rrowr", "rrooaar", "runch", "schplivartz", "scree", "screech", "screee", "shmek", "skee", "skloorgle", "skntch", "skramm", "screech", "skrotch", "skwee", "skwee", "slam", "slap", "slap-ap-ap", "slash", "slep", "slosh", "smak", "smash", "smash", "smeeeeer", "smek", "smesh", "smooch", "snap", "snf", "snick", "sniff", "snuff", "sob", "spa-bam", "spla-poom", "splash", "splat", "splinter", "sploog", "sploosh", "splow", "splush", "splurt", "spong", "sponggg", "spung", "sput", "squeee", "srelikk", "stomp", "swish", "swok", "swop", "tap", "tat", "thud", "thunk", "tick", "tilt", "tinkle", "toot", "treee", "tromp", "trompitty", "tsk", "bsss", "bsssboom", "twang", "twee", "tweep", "twerp", "ugh", "ung", "vaaaagglum", "vash", "va-va-voom", "voof", "voom", "vroom", "vrrumm", "waa", "waaah", "waf", "wak", "wee", "weoooeeeoooee", "wham", "whap", "whirr", "whom", "whomp", "whom", "whoosh", "whuf", "wok", "woop", "wrraammmm", "wurf", "yap", "yappa", "yatata", "yayter", "peaaaa", "yeeeaaakk", "yhaaa", "yitti", "yoop", "yotter", "youch", "yyp", "zaaaa", "zap", "zeta", "zing", "zip", "zok", "zop", "zot", "zzap", "zzip", "zzz", "zzzz"];

let texts; // stores each line of text as strings
let texts_obj = {} // stores lines of text grouped by length

async function loadFiles() {
  fetch('data/texts.txt')
    .then(response => response.text())
    .then((data) => {
      texts = data.split(/\n/);

      // Group texts by number of words
      texts.map((t) => {
        t = t.split(" ");
        length = t.length.toString();
        if (Object.keys(texts_obj).indexOf(length) == -1) {
          texts_obj[length] = [
            [t]
          ];
        } else {
          texts_obj[length].push([t]);
        }
      });
      texts_obj["2"].concat(texts_obj["1"]);

      makeAria();
      infiniteAria();

    })
}


function makeAria() {
  let canvas = document.createElement("CANVAS");
  canvas.height = document.getElementById("canvas-container").clientHeight;
  canvas.width = 5000;
  document.getElementById("canvas-container").appendChild(canvas);

  let margin = 0.1; // % boundary on the canvas
  let maxPathHeight = canvas.height * (1 - margin);
  let minPathHeight = canvas.height * margin;
  let xSpace = 50; // space between each point

  var context = canvas.getContext("2d");
  context.lineCap = "round";
  context.lineJoin = "round";

  var xIndex = 50;

  // Load font
  var myFont = new FontFace('myFont', 'url(assets/moinho_1.otf)');

  myFont.load().then(function(font) {

    document.fonts.add(font);
    context.font = "20px myFont";
    context.textAlign = "left";

    while (xIndex < 5000) {

      if (Math.random() > 0.25) { // 75% probability to draw a line; 25% to write a sound effect

        // Number of points in the path
        let numberOfPoints = randomInt(9, 2);

        let randomHeights = [];
        for (var j = 0; j < numberOfPoints; j++) {
          randomHeights.push(randomInt(maxPathHeight, minPathHeight));
        }

        if (xIndex + (randomHeights.length * 50) < 5000) { // We're not going past the boundary of the canvas
          // Draw the line
          context.strokeStyle = colors[randomInt(colors.length, 0)];
          context.lineWidth = randomInt(15, 2);
          context.beginPath();
          context.moveTo(xIndex, randomHeights[0]);
          for (var j = 1; j < randomHeights.length; j++) {
            xIndex += 50;
            context.quadraticCurveTo(
              xIndex - 25,
              (randomInt(Math.max(...randomHeights), Math.min(...randomHeights))),
              xIndex,
              randomHeights[j]);
          }
          context.stroke();

          // Write the text
          var text = randomTextByLength(randomHeights.length);
          context.fillText(text, xIndex - (50 * (randomHeights.length - 1)), Math.max(...randomHeights) + 20);

          xIndex += 200;
        } else {
          // We reached the end of the canvas
          break;
        }
      } else {
        // Write a sound effect
        context.font = "40px myFont";
        var randomSound = sounds[randomInt(sounds.length, 0)];
        context.fillText(randomSound, xIndex, randomInt(maxPathHeight, minPathHeight));
        context.font = "20px myFont";
        xIndex += 200;
      }
    }

  });
}

function infiniteAria() {
  makeAria();
  document.getElementsByTagName("canvas")[0].classList.add("animated");
  setTimeout(() => {
    // Repeat every 90 seconds
    document.getElementsByTagName("canvas")[0].remove(); // remove the old canvas that is now out of view
    document.getElementsByTagName("canvas")[0].classList.add("animated");
    infiniteAria();
  }, 90000);
}


/*-- Helper Functions --*/

function randomText() {
  // Get a random text of any length
  let randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

function randomTextByLength(length) {
  // Get a random text of a specific number of words
  let texts_subset = texts_obj[length.toString()];
  let randomIndex = Math.floor(Math.random() * texts_subset.length);
  return texts_subset[randomIndex][0].join(" ");
}

function randomInt(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
