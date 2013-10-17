;(function($){

	function RichSelect(elem, options){
		var self = this;

		self.$elem = $(elem);

		var defaults = {
			width : "16px"
		};

		self.options = $.extend({}, defaults, options);

		init();

		function init(){
			var rs = '';

			var selectedOption = self.$elem.find('option:selected').text();

			rs += '<div class="rs-select-wrapper">';
			rs += '<div class="rs-select-base">' + selectedOption + '</div>';
			rs += '<div class="rs-select-triangle"></div>';
			
			rs += '<ul class="rs-select">';
			var currentOptgroupLabel = '';
			for( var i = 0; i < self.$elem[0].options.length; i++ ){
				var opt = self.$elem[0].options[i];

				if( currentOptgroupLabel != '' && opt.parentNode.label != currentOptgroupLabel ){
					rs += '</ul>';
				}

				if( opt.parentNode.tagName == 'OPTGROUP' && opt.parentNode.label != currentOptgroupLabel ){
					currentOptgroupLabel = opt.parentNode.label;
					rs += '<li class="rs-optgroup"><ul><li class="rs-optgroup-content">';
					
					// we could also add data-html to add pure html
					var imgSrc = $(opt.parentNode).data('icon');
					if( imgSrc ){
						rs += '<img src="' + imgSrc + '" />';
					}
						
					rs += currentOptgroupLabel + '</li>';
				}
				
				rs += '<li class="rs-option" data-value="' + opt.value + '">' + opt.text + '</li>';
			}
			rs += '</ul></li></div>';

			self.$elem.hide().after(rs);
			self.$richselect = self.$elem.next("div.rs-select-wrapper");

			self.$richselect.on('click', 'li.rs-option', option_click_event);
			self.$richselect.on('click', 'li.rs-optgroup', optgroup_click_event);
			self.$richselect.on('click', '', select_click_event);
			self.$richselect.addClass(self.$elem.attr('class'));

			$('html').click(function() {
				self._close();
			});
		}

		self._close = function(){
				self.$richselect.removeClass('rs-select-open').find('ul.rs-select').hide();
		}

		self._open = function(){
				self.$richselect.addClass('rs-select-open').find('ul.rs-select').show();
		}

		function select_click_event(e){
			if( $(this).hasClass('rs-select-open') ){
				// add animate here for a smoother slide effect
				self._close();
			} else {
				$('.rs-select-open').click();
				self._open();
				e.stopPropagation();
			}
		}

		function option_click_event(){
			self.$elem.val($(this).data('value'));
			self.$richselect.find('.rs-select-base').html($(this).html());
			self.$elem.trigger('onchange');
		}

		function optgroup_click_event(e){
			if($(e.target).hasClass('rs-optgroup-content')){
				e.stopPropagation();
				return false;
			}
		}

		var API = {};
		API.select_click_event = select_click_event;
		return API;
	}

	$.fn.richselect = function(options){
		return this.each(function() {
      // prevent multiple instantiation
      if (!$(this).data('richselect'))
			$(this).data('richselect', new RichSelect(this, options));
		});
	};
})(jQuery);
