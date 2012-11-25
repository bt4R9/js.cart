/*
* @Dependences
* Jquery
* Jquery.cookie
* json2
*/
;(function(window, $, undefined) {
	var Cart = function() {
		this._key = '_cart';

		this.add = function(id, amount) {
			var state = this.__getState();
			var amount = +amount;
			if (state && id && this.__isNumber(amount)) {
				var id = id.toString();
				
				if (state.hasOwnProperty(id)) {
					var val = +state[id][0];
					state[id][0] = val + amount;
				} else {
					state[id] = [amount, 1];
				}
				
				if (this.__setState(state)) {
					return state[id];
				}
			}
			return false;
		}

		this.reduce = function(id, amount) {
			var state = this.__getState();
			var amount = +amount;
			if (state && id && this.__isNumber(amount) && state.hasOwnProperty(id)) {
				var id = id.toString();
				var val = +state[id][0];
				
				state[id][0] = (val - amount >= 1) ? state[id][0] - amount : 1;
				
				if (this.__setState(state)) {
					return state[id];
				}
			}
			return false;
		}
		
		this.get = function(id) {
			var state = this.__getState();
			id = id.toString();
			
			if (state && id && state.hasOwnProperty(id)) {
				return state[id];
			}
			
			return false;
		}

		this.set = function(id, amount, price) {
			var state = this.__getState();
			var id = id.toString();
			var amount = +amount;
			var price = +price;
			if (state && id && this.__isNumber(amount)) {
				if (state.hasOwnProperty(id)) {
					state[id][0] = amount;
					if (price && this.__isNumber(price)) {
						state[id][1] = +price;
					} else {
						state[id][1] = 1;
					}
				} else {
					state[id] = [amount];
					if (price && this.__isNumber(price)) {
						state[id][1] = +price;
					} else {
						state[id][1] = 1;
					}
				}
				if (this.__setState(state)) {
					return state[id];
				}
			}
			return false;
		}

		this.setPrice = function(id, price) {
			var state = this.__getState();
			var id = id.toString();
			var price = +price;
			if (state && id && this.__isNumber(price) && state.hasOwnProperty(id)) {
				state[id][1] = +price;
				if (this.__setState(state)) {
					return state[id];
				}
			}
			return false;
		}
		
		this.remove = function(id) {
			var state = this.__getState();
			var id = id.toString();
			
			if (state && id) {
				delete state[id];
				
				if (this.__setState(state)) {
					return true;
				}
			}
			
			return false;
		}
			
		this.currentState = function() {
			var state = this.__getState();
			if (!$.isEmptyObject(state)) {
				return state;
			} else {
				return false;
			}
		}
		
		this.purge = function() {
			return this.__setState({});
		}
		
		this.getSumById = function(id) {
			var state = this.__getState();
			if (state && state.hasOwnProperty(id)) {
				return +state[id][0] * +state[id][1];
			} else {
				return false;
			}
		}
	};
	
	$.extend(Cart.prototype, {
		_totalSum: 0,
		__setState: function(state) {
			try {
				var stateString = JSON.stringify(state);
				$.cookie(this._key, stateString, { expires: 30 });
				this.__recount();
				return true;
			} catch(e) {
				throw new Error(e);
				return false;
			}
		},
		__getState: function() {
			try {
				var state = JSON.parse($.cookie(this._key));
				if (!state) {
					state = {};
				}
				return state;
			} catch(e) {
				throw new Error(e);
				return false;
			}
		},
		__recount: function() {
			var state = this.__getState();
			if (state) {
				var sum = 0;
				for (var key in state) {
					if (state.hasOwnProperty(key)) {
						var item = state[key];
						sum+= +item[0] * +item[1];
					}
				}
				this._totalSum = sum;
				return true;
			} else {
				return false;
			}
		},
		__isNumber: function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
	});
	
	window.cart = new Cart();
	window.cart.__recount();
	
})(window, jQuery);