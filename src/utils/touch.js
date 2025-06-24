var canMove = false;
var startY = 0;
var moveY = 0;
var isReachTop = false;
var isReachBottom = false;
function touchHandler(event) {
  switch (event.type) {
    case "touchstart":
      onTouchStart(event);
      break;
    case "touchmove":
      onTouchMove(event);
      break;
    case "touchend":
    case "touchcancel":
      onTouchEnd(event);
      break;
  }
  //   return false;
}

function onTouchStart(event) {
  var instance = event.instance;
  var dataset = instance.getDataset();
  var scrollTop = dataset.scrolltop;
  canMove = scrollTop == 0;
  var touch = event.touches[0] || event.changedTouches[0];
  startY = touch.clientY;
  moveY = 0;
}

function onTouchMove(event) {
  console.log(event)
  if (!canMove) return;
  var touch = event.touches[0] || event.changedTouches[0];
  var clientY = touch.clientY;
  if (clientY < startY) return;
  var distance = clientY - startY;
  console.log(distance);
  event.instance.setStyle({
    transform: "translateY(" + distance + "px)"
  });
}

function onTouchEnd(event) {
  if (!canMove) return;
  event.instance.setStyle({
    transform: "translateY(0px)",
    transition: "transform 0.5s ease"
  });
}
//#ifdef MP-WEIXIN
module.exports = {
  touchevent: touchHandler
}
//#endif
//#ifndef MP-WEIXIN
export default {
  touchevent: touchHandler
}
//#endif