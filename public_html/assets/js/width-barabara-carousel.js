;(function($, window, document, undefined){

//document ready
$(function(){
	
	$window = $(window);
	
	$window.load( function() {
		
		$.each( $('.width-barabara-carousel'), function(){
			var $me = $(this),
					$list = $me.children('.list'),
					$item = $list.children('.item'),
					wbc = new WidthBarabaraCarousel();
			
			wbc.init({
				wrapper: $me,
				list: $list,
				item: $item,
				duration: 1000,
				easing: 'easeOutExpo'
			}).start();
			
		} );
		
	} );
	
});//document ready



function WidthBarabaraCarousel() {}

WidthBarabaraCarousel.prototype = {
	
	init: function( opt ) {
		console.time('init');
		
		var self = this;
		self.prm = {
			wrapper: '',
			list: '',
			item: '',
			duration: 500,
			easing: 'linear'
		}
		for(var key in opt) self.prm[key] = opt[key];
		
		self.$window = $(window);
		self.$document = $(document);
		self.$wrapper = self.prm.wrapper;
		self.$list = self.prm.list;
		self.$item = self.prm.item;
		self.$navPrev = self.$wrapper.find('.nav__prev');
		self.$navNext = self.$wrapper.find('.nav__next');
		
		self.wrapperWidth = parseInt( self.$wrapper.width() );
		self.wrapperWidthHalf = Math.floor( self.wrapperWidth / 2 );
		self.min = 0;
		self.max = self.$item.length - 1;
		self.current = self.min;
		
		self.gutter = self.getItemGutter();
		self.itemPrm = self.setItemParameter();
		
		//console.log( self.itemPrm );
		
		console.timeEnd('init');
		return self;
	},
	
	
	start: function() {
		var self = this;
		
		self.animation();
		self.setEvent();
		self.setKeyInput();
		
	},
	
	
	animation: function( opt ) {
		var self = this;
		var prm = {
			duration: self.prm.duration,
			easing: self.prm.easing
		}
		for(var key in opt) prm[key] = opt[key];
		
		var movePoint = self.itemPrm[ self.current ].centerPoint;
		
		self.$list.stop(true,false).animate({
			'marginLeft': movePoint
		}, prm.duration, prm.easing);
		
		//console.log('animation', self.current, movePoint);
	},
	
	
	setEvent: function() {
		var self = this;
		
		self.$navPrev.click( function() {
			self.toPrev();
			return false;
		} );
		
		self.$navNext.click( function() {
			self.toNext();
			return false;
		} );
	},
	
	
	setItemParameter: function() {
		var self = this,
				prm = [],
				total = parseInt( self.$list.css('marginLeft') ) * -1;
		
		$.each( self.$item, function() {
			var $me = $(this),
					index = self.$item.index(this),
					width = $me.width();
			prm[index] = {};
			prm[index].width = width;
			prm[index].widthHalf = Math.floor( width / 2 );
			prm[index].centerPoint = total - prm[index].widthHalf - self.gutter + self.wrapperWidthHalf;
			total -= width + self.gutter;
		} );
		
		console.log( total );
		
		return prm;
	},
	
	
	getItemGutter: function() {
		var self = this,
				left = parseInt( self.$item.css('margin-left') ),
				right = parseInt( self.$item.css('margin-right') ),
				gutter = left + right;
		return gutter;
	},
	
	
	setKeyInput: function() {
		var self = this;
		
		self.$window.keyup(function(e){
			//console.log(e.keyCode);
			switch( e.keyCode ) {
				case 37:
					self.toPrev();
					break;
				case 39:
					self.toNext();
					break;
			}
		});
	},
	
	
	toPrev: function() {
		var self = this;
		self.current = ( self.current <= self.min )? self.max : self.current - 1;
		self.animation();
	},
	
	toNext: function() {
		var self = this;
		self.current = ( self.current >= self.max )? self.min : self.current + 1;
		self.animation();
	}
	
}

})(jQuery, this, this.document);