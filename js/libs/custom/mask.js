define(
	[
		"backbone",
		"json2",
		"underscore",
		"jquery",
		"underscore.string"
	],
	function(){
		$(document).on("keypress", "input[data-mask]", function(e){		
			if(e.which < 32 || e.which > 126) return; // return if not printable

			var m = {};				
			m.self = $(this);	
			
			m.inputKey = String.fromCharCode(e.which);
			m.inputMask = m.self.data("mask");
			
			m.curValue = m.self.val();
			m.nextValue = m.curValue + m.inputKey;
			
			m.placeSpace = m.nextValue.length - 1;
			m.placeValue = m.nextValue;
			
			if (m.placeValue.length > m.inputMask.length) return; // return if mask finished (input longer than mask)
			if (m.inputMask.charAt(m.placeSpace) !== m.inputKey) return; // return if input key is same as mask
			
			m.placeMask = '';			
			while((m.inputMask.charAt(m.placeSpace) !== '_')){
				m.placeMask = m.placeMask + m.inputMask.charAt(m.placeSpace);
				m.placeSpace++;				
				$.log(m.placeMask);
				$.log(m.placeSpace);			
			}
			
			e.preventDefault();
			m.self.val(m.curValue + m.placeMask + m.inputKey);
		}); // on
	} // fn
); // define