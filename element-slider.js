Polymer({
  is: 'element-slider',
  counter: 0,
  position: 1,
  touchDown: null,
  listeners:{
    'next.tap':'next', 
    'prev.tap':'prev', 
  },
  
  ready: function() {
    this.$.wrap.children[0].setAttribute('active', '');
    this.eachSlide(function(slide) {
      slide.className += ' element-slider--slide';
    });
    this.showSlidePosition();
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
    this.position++;
    this.showCurrent();
    this.showSlidePosition();
  },

  prev: function() {
    var arrayLength = this.$.wrap.children.length;
    if(this.counter <= 0){
        this.counter = arrayLength;
    }
    this.counter--;
    this.position--;
    this.showCurrent();
    this.showSlidePosition();
  },

  eachSlide: function(callback) {
    [].forEach.call(this.$.wrap.children, callback);
  },

  showSlidePosition: function(){
    if(this.position == 0){
        this.position = this.$.wrap.children.length;
    }
    else if(this.position > this.$.wrap.children.length){
        this.position = 1;
    }
    this.$.counter.innerHTML = this.position + '/' + this.$.wrap.children.length;
  }
});