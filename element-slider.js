Polymer('element-slider', {
  counter: 0,
  touchDown: null,

  domReady: function() {
    this.children[0].setAttribute('active', '');
    this.eachSlide(function(slide) {
      slide.className += ' element-slider--slide';
    });
  },

  showCurrent: function() {
    var item = Math.abs(this.counter % this.children.length);
    this.eachSlide(function(slide) {
      slide.removeAttribute('active');
    });
    this.children[item].setAttribute('active', '');
  },

  next: function() {
    this.counter++;
    this.showCurrent();
  },

  prev: function() {
    this.counter--;
    this.showCurrent();
  },

  initTouch: function(evnt) {
    this.touchDown = evnt.touches[0];
  },

  touchMove: function(evnt) {
    if (!this.touchDown) return;

    var touchDown = this.touchDown,
    touchUp = evnt.touches[0];

    var diff = {
      x: touchDown.clientX - touchUp.clientX,
      y: touchDown.clientY - touchUp.clientY
    }

    // We're only tracking left/right swiping.
    if (Math.abs(diff.x) > Math.abs(diff.y)) {
      if (diff.x > 0) this.next();
      else this.prev();
    }

    this.touchDown = null;
  },

  eachSlide: function(callback) {
    [].forEach.call(this.children, callback);
  }
});
