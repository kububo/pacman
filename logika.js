let width = 5;
let height = 5;
let size = 80;
let font = 40;
let energy = 20;
let ghost;
var policka = [
  ["", ["zed", 10], "", ["zed", 15], ""],
  ["poklad", "", ["jidlo", 15], "", ""],
  [["bomba", 7], "", "", "", ""],
  ["", ["bomba", 13], "", ["jidlo", 15], ""],
  ["", "", "", "", ""]];
var player = [0, 4];

function preload() {
  ghost = loadImage("/ghost.png");
}

function setup() {
  createCanvas(width*size,height*size+50);
}

function draw() {
  background(0);
  textSize(font)
  //nákres pole
  for (var i = 0; i < width*size; i+=size) {
    strokeWeight(0.5);
    stroke(0);
    line(i,0,i,width*size);
  }
  for (var i = 0; i < height*size; i+=size) {
    strokeWeight(0.5);
    stroke(0);
    line(0,i,height*size,i);
  }
  for (var i = 0; i < policka.length; i++) {
    for (var z = 0; z < policka[i].length; z++) {
      if(policka[i][z][0] === "zed")
        fill(255, 0, 0);
      else if(policka[i][z][0] === "jidlo")
        fill(0, 255, 0);
      else if(policka[i][z][0] === "bomba")
        fill(0);
      else if(policka[i][z] === "poklad")
        fill(255, 255, 0);
      else
        fill(255);

      rect(z*size,i*size,size,size);

      fill(255);
      if((policka[i][z] !== "") && (policka[i][z] !== "poklad"))
        text(policka[i][z][1],z*size+15,i*size+15,size,size);
      rectMode(CORNER);
    }
  }
  image(ghost,player[0]*size,player[1]*size,size,size);

  textSize(32);
  fill(255);
  text("Energie:" + energy,10,height*size+40);
}

function keyPressed() {
  let moved = true;

  switch (keyCode) {
    case UP_ARROW:
      if(player[1] > 0)
        player[1] += -1;
      break;
    case DOWN_ARROW:
      if(player[1] < height-1)
        player[1] += 1;
      break;
    case LEFT_ARROW:
      if(player[0] > 0)
        player[0] += -1;
      break;
    case RIGHT_ARROW:
      if(player[0] < width-1)
        player[0] += 1;
      break;
    default:
      moved = false;
      break;
    }
    if(moved) {
      energy += -1;
      if(policka[player[1]][player[0]] === "poklad") {
        alert("Vyhráli jste!");
        location.reload();
      } else if(policka[player[1]][player[0]][0] === "zed") {
        energy += -policka[player[1]][player[0]][1];
      } else if(policka[player[1]][player[0]][0] === "jidlo") {
        energy += policka[player[1]][player[0]][1];
        policka[player[1]][player[0]] = "";
      } else if(policka[player[1]][player[0]][0] === "bomba") {
        energy += -policka[player[1]][player[0]][1];
        policka[player[1]][player[0]] = "";
      }

      if(energy <= 0) {
        alert("Prohráli jste!");
        location.reload();
      }
    }
  return false;
}
