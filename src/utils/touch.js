var canMove = false;
var startY = 0;
var direction = "y";
var isReachTop = false;
var isReachBottom = false;

function touchHandler(event, parent) {
  // console.log(parent.getComputedStyle()['height'])
  // console.log(parent.getBoundingClientRect())

  switch (event.type) {
    case "touchstart":
      onTouchStart(event, parent);
      break;
    case "touchmove":
      onTouchMove(event, parent);
      break;
    case "touchend":
    case "touchcancel":
      onTouchEnd(event, parent);
      break;
  }
}

function onTouchStart(event, parent) {
  var instance = event.instance;
  var dataset = instance.getDataset();
  var scrollTop = dataset.scrolltop;
  canMove = scrollTop == 0;
  var touch = event.touches[0] || event.changedTouches[0];
  startY = touch.clientY;
}

function onTouchMove(event, parent) {
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

function onTouchEnd(event, parent) {
  if (!canMove) return;
  event.instance.setStyle({
    transform: "translateY(0px)",
    transition: "transform 0.5s ease"
  });
}
//#ifdef MP-WEIXIN
module.exports = {
  touchevent: touchHandler
};
//#endif
//#ifndef MP-WEIXIN
export default {
  touchevent: touchHandler
};
//#endif
