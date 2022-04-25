let points = []
let order = []
let bestOrder = []
let len
let index = 0
let fps = 45

function setup() {
  colorMode("HSB")
  createCanvas(1024, 512)
  background(0)
  points.push(createVector(random(0, width), random(0, height)))
  order.push(points.length - 1)
  bestOrder = order.slice()
  frameRate(fps)
}

function draw() {
  background(0)
  strokeWeight(6)
  stroke(255)
  for(let i = 0; i < points.length; i++){
    point(points[i].x, points[i].y)
  }
  noFill()
  strokeWeight(1)
  beginShape()
  for(let i = 0; i < order.length; i++){
    vertex(points[order[i]].x, points[order[i]].y)
  }
  endShape()
  strokeWeight(3)
  beginShape()
  for(let i = 0; i < order.length; i++){
    vertex(points[bestOrder[i]].x, points[bestOrder[i]].y)
  }
  endShape()
  shuffleOrder()
  if(calcDist() < len){
    len = calcDist()
    bestOrder = order.slice()
  }
  let permut = factorial(points.length)
  let str = (index / permut) * 100
  let timeLeft = (permut - index) / (fps * 3/4)
  str = String(nf(str, 0, 2)) + "%, seconds left : " + String(nf(timeLeft, 0, 2)) 
  textSize(40)
  strokeWeight(2)
  fill(255)
  text(str, 40, 40)
}

function mousePressed(){
  points.push(createVector(mouseX, mouseY))
  order.push(points.length - 1)
  order.sort()
  len = calcDist()
  bestOrder = order.slice()
  index = 0
}

function shuffleOrder(){
  index++
  let x = -1;
  //https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  for(let i = 0; i < order.length - 1; i++){
    if(order[i] < order[i + 1]){
      if(i > x){
        x = i
      }
    }
  }
  if(x == -1 && points.length > 4){
    noLoop()
    print("done")
  }
  let y = -1
  for(let i = 0; i < order.length; i++){
    if(order[x] < order[i] && i > y){
      y = i
    }
  }
  swap(order, x, y)
  let endOfArray = order.splice(x + 1)
  endOfArray.reverse()
  order = order.concat(endOfArray)
}

function swap(arr, x, y){
  let n = arr[x]
  arr[x] = arr[y]
  arr[y] = n
}

function calcDist(){
  let sum = 0
  for(let i = 0; i < points.length - 1; i++){
    sum += dist(points[order[i]].x, points[order[i]].y, points[order[i + 1]].x, points[order[i + 1]].y)
  }
  return sum
}

function factorial(n){
  if(n == 1 || n == 0){
    return 1
  }
  return n * factorial(n - 1)
}