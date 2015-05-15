Polymer({
  is: 'element-slider',
  counter: 0,
  touchDown: null,
  listeners: {
    'next.tap': 'next',
    'prev.tap': 'prev',
    'wrap.track': 'touch'
  },

  ready: function() {
    this.$.wrap.children[0].setAttribute('active', '');
    this.eachSlide(function(slide) {
      slide.className += ' element-slider--slide';
    });
  },

  showCurrent: function() {
    var item = Math.abs(this.counter % this.$.wrap.children.length);
    this.eachSlide(function(slide) {
        slide.removeAttribute('active');
    });
    this.$.wrap.children[item].setAttribute('active', '');
  },

  next: function() {
    this.counter++;
    this.showCurrent();
  },

  prev: function() {
    this.counter--;
    this.showCurrent();
  },

  handleTouch: function(state, x, y) {
    switch (state) {
      case 'start':
        this.touchDown = { x: x, y: y };
        break;
      case 'end':
        var diff = {
          x: this.touchDown.x - x,
          y: this.touchDown.y - y
        }
        this.touchMove(diff);
        break;
    }

    this.touchDown = null;
  },

  touchMove: function(diff) {
    // We're only tracking left/right swiping.
    if (Math.abs(diff.x) > Math.abs(diff.y)) {
      if (diff.x > 0) this.next();
      else this.prev();
    }
  },

  eachSlide: function(callback) {
    [].forEach.call(this.$.wrap.children, callback);
  }
});
