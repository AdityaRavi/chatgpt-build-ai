const canvas = document.getElementById("canvas");
const predictionTag = document.getElementById("prediction");
const displayCanvas = document.getElementById("display-canvas");
const resetButton = document.getElementById("reset-button");
canvas.width = 500
canvas.height = 500

displayCanvas.width = 28;
displayCanvas.height = 28;
const scaleX = displayCanvas.width / canvas.width
const scaleY = displayCanvas.height / canvas.height

const ctx = canvas.getContext("2d");
const displayCtx = displayCanvas.getContext("2d");

ctx.lineWidth = 50;
ctx.strokeStyle = "white";
ctx.fillStyle = "black";
ctx.lineCap = "round";
ctx.fillRect(0, 0, canvas.width, canvas.height);
let isDrawing = false;
let x = 0;
let y = 0;

displayCtx.fillStyle = "black";
displayCtx.strokeStyle = "white";
displayCtx.fillRect(0, 0, canvas.width, canvas.height);
displayCtx.scale(scaleX, scaleY)

const rect = canvas.getBoundingClientRect();

resetButton.addEventListener("click", e => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  displayCtx.clearRect(0, 0, canvas.width, canvas.height);
  displayCtx.fillStyle = "black";
  displayCtx.fillRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
});

canvas.addEventListener("mousemove", e => {
  if (!isDrawing) return;
  drawLine(x, y, e.clientX - rect.left, e.clientY - rect.top);
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
});

window.addEventListener("mouseup", e => {
  if (!isDrawing) return;
  isDrawing = false;
  displayCtx.drawImage(canvas, 0, 0);
  const tensor = tf.browser.fromPixels(displayCtx.canvas, 1)
    .expandDims(0)
    .div(255.0);

  const prediction = cnn.predict(tensor);
  const predictedClass = prediction.argMax(1).dataSync()[0];

  showPrediction(predictedClass)
});

function showPrediction(prediction) {
  predictionTag.innerHTML = `Prediction: ${prediction}`;
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function loadModel() {
  return new Promise((resolve, reject) => {
    tf.loadLayersModel('model/model.json').then(model => {
      resolve(model);
    }).catch(error => {
      reject(error);
    });
  });
}

loadModel().then((model) => {
  cnn = model
})
