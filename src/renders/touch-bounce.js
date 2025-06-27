var startY = 0;
var direction = "y";
var isReachTop = false;
var isReachBottom = false;

function touchHandler(event) {
  // console.log(parent.getBoundingClientRect())
  // console.log(parent.getComputedStyle()['height'])
  // console.log(parent.getBoundingClientRect())

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
}

function onTouchStart(event) {
  var instance = event.instance;
  var dataset = instance.getDataset();
  var top = Math.ceil(dataset.top);
  var bottom = Math.ceil(dataset.bottom);
  var rect = instance.getBoundingClientRect();
  isReachTop = Math.floor(rect.top) <= top;
  isReachBottom = Math.floor(rect.bottom) <= bottom;
  
  var touch = event.touches[0] || event.changedTouches[0];
  startY = touch.clientY;
}

function onTouchMove(event) {
  if (!isReachTop && !isReachBottom) return;
  var touch = event.touches[0] || event.changedTouches[0];
  var clientY = touch.clientY;
  if ((clientY > startY && isReachTop) || (clientY < startY && isReachBottom)) {
    var distance = clientY - startY;
    event.instance.setStyle({
      transform: "translateY(" + distance + "px)"
    });
  }
}

function onTouchEnd(event) {
  if (!isReachTop && !isReachBottom) return;
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
