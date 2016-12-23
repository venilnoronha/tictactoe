var Game = function() {

	this.board = [['-', '-', '-'],
		          ['-', '-', '-'],
		          ['-', '-', '-']];


	this.isTerminalState = function() {
		if (this.board[0][0] != '-' && this.board[0][0] == this.board[0][1] && this.board[0][1] == this.board[0][2]) {
			return true;
		}
		else if (this.board[1][0] != '-' && this.board[1][0] == this.board[1][1] && this.board[1][1] == this.board[1][2]) {
			return true;
		}
		else if (this.board[2][0] != '-' && this.board[2][0] == this.board[2][1] && this.board[2][1] == this.board[2][2]) {
			return true;
		}
		else if (this.board[0][0] != '-' && this.board[0][0] == this.board[1][0] && this.board[1][0] == this.board[2][0]) {
			return true;
		}
		else if (this.board[0][1] != '-' && this.board[0][1] == this.board[1][1] && this.board[1][1] == this.board[2][1]) {
			return true;
		}
		else if (this.board[0][2] != '-' && this.board[0][2] == this.board[1][2] && this.board[1][2] == this.board[2][2]) {
			return true;
		}
		else if (this.board[1][1] != '-' && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) {
			return true;
		}
		else if (this.board[0][2] != '-' && this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) {
			return true;
		}
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (this.board[i][j] == '-') {
					return false;
				}
			}
		}
		return true;
	};

	this.eval = function(player) {
		var winner = '-';
		var reason = [];
		if (this.board[0][0] != '-' && this.board[0][0] == this.board[0][1] && this.board[0][1] == this.board[0][2]) {
			winner = this.board[0][0];
			reason.push([0, 0]);
			reason.push([0, 1]);
			reason.push([0, 2]);
		}
		else if (this.board[1][0] != '-' && this.board[1][0] == this.board[1][1] && this.board[1][1] == this.board[1][2]) {
			winner = this.board[1][0];
			reason.push([1, 0]);
			reason.push([1, 1]);
			reason.push([1, 2]);
		}
		else if (this.board[2][0] != '-' && this.board[2][0] == this.board[2][1] && this.board[2][1] == this.board[2][2]) {
			winner = this.board[2][0];
			reason.push([2, 0]);
			reason.push([2, 1]);
			reason.push([2, 2]);
		}
		else if (this.board[0][0] != '-' && this.board[0][0] == this.board[1][0] && this.board[1][0] == this.board[2][0]) {
			winner = this.board[0][0];
			reason.push([0, 0]);
			reason.push([1, 0]);
			reason.push([2, 0]);
		}
		else if (this.board[0][1] != '-' && this.board[0][1] == this.board[1][1] && this.board[1][1] == this.board[2][1]) {
			winner = this.board[0][1];
			reason.push([0, 1]);
			reason.push([1, 1]);
			reason.push([2, 1]);
		}
		else if (this.board[0][2] != '-' && this.board[0][2] == this.board[1][2] && this.board[1][2] == this.board[2][2]) {
			winner = this.board[0][2];
			reason.push([0, 2]);
			reason.push([1, 2]);
			reason.push([2, 2]);
		}
		else if (this.board[0][0] != '-' && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) {
			winner = this.board[0][0];
			reason.push([0, 0]);
			reason.push([1, 1]);
			reason.push([2, 2]);
		}
		else if (this.board[0][2] != '-' && this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) {
			winner = this.board[0][2];
			reason.push([0, 2]);
			reason.push([1, 1]);
			reason.push([2, 0]);
		}
		var result = (winner == '-' ? -1 : (winner == player ? 100 : -100));
		return {
			result: result,
			reason: reason
		};
	};

};

var TicTacToe = function(divId, whoIsDivId, resultDivId) {

	this.settings = {
		divId: divId,
		whoIsDivId: whoIsDivId,
		resultDivId: resultDivId,
		turn: 'X',
		systemKey: 'O',
		game: new Game()
	};

	this.init = function() {
		this._renderBoard();
		this._bindCellClicks();
		if (this._randomBoolean()) {
			this.settings.systemKey = 'X';
			this._playDelay();
		}
		this._renderWhoIs();
	};

	this._renderWhoIs = function() {
		var pc = this.settings.systemKey;
		var you = this._opponent(pc);
		document.getElementById(this.settings.whoIsDivId).innerHTML =
			"<span class=\"" + pc + "\">Computer: " + pc + "</span>&nbsp;&nbsp;" +
			"<span class=\"" + you + "\">You: " + you + "</span>";
	};

	this._renderBoard = function() {
		var b = this.settings.game.board;
		var html = "";
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				html += "<div class=\"cell " + (b[i][j] == '-' ? '' : b[i][j]) + "\" id=\"cell-" + i + "-" + j + "\">" + (b[i][j] == '-' ? '' : b[i][j]) + "</div>";
			}
		}
		document.getElementById(this.settings.divId).innerHTML = html;
	};

	this._bindCellClicks = function() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				var id = "cell-" + i + "-" + j;
				var cell = document.getElementById(id);
				this._bindCellClick(cell);
			}
		}
	};

	this._bindCellClick = function(cell) {
		var _this = this;
		cell.onclick = function() {
			_this._onClick(cell);
		};
	};

	this._unbindCellClicks = function() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				var id = "cell-" + i + "-" + j;
				var cell = document.getElementById(id);
				this._unbindCellClick(cell);
			}
		}
	};

	this._unbindCellClick = function(cell) {
		var _this = this;
		cell.onclick = undefined;
	};

	this._onClick = function(cell) {
		var tokens = cell.id.split('-');
		if (this.settings.game.board[tokens[1]][tokens[2]] != '-') {
			return;
		}
		this.settings.game.board[tokens[1]][tokens[2]] = this.settings.turn;
		this._renderBoard();
		this._bindCellClicks();
		this.settings.turn = this._opponent(this.settings.turn);
		this._playDelay();
	};

	this._randomBoolean = function() {
		return Math.random() >= 0.5;
	};

	this._playDelay = function() {	
		var _this = this;
		this._unbindCellClicks();
		setTimeout(function() {
			_this._play();
		}, 300);
	};

	this._play = function() {
		var move = this._maxAlphaBeta(this.settings.game, this.settings.systemKey, -1000, 1000);
		// var move = this._max(this.settings.game, this.settings.systemKey);
		var action = move.action;
		if (action != null) {
			console.log(move);
			this.settings.game.board[action.i][action.j] = this.settings.systemKey;
			this._renderBoard();
			this._bindCellClicks();
			this.settings.turn = this._opponent(this.settings.turn);
		}
		if (this.settings.game.isTerminalState()) {
			var decision = "Ooo.. That was tough..!!";
			var result = this.settings.game.eval(this.settings.systemKey);
			if (result.result == -100) {
				decision = "Congratulations..!!!";
				this._setBlinking(result.reason);
			}
			else if (result.result == 100) {
				decision = "Boooooooo.. You lose :P";
				this._setBlinking(result.reason);
			}
			document.getElementById(this.settings.resultDivId).innerHTML = decision;
			this._unbindCellClicks();
		}
	};

	this._setBlinking = function(cells) {
		for (var i = 0; i < cells.length; i++) {
			var id = "cell-" + cells[i][0] + "-" + cells[i][1];
			var cell = document.getElementById(id);
			cell.className += " blink";
		}
	};

	/*this._max = function(game, player) {
		var _this = this;
		if (game.isTerminalState()) {
			return {
				value: game.eval(this.settings.systemKey),
				action: null
			};
		}
		var bestMove = null;
		var v = -1000;
		var actions = this._generateActions(game, player);
		for (var i = 0; i < actions.length; i++) {
			var action = actions[i];
			var score = this._applyAction(game, player, action, true, function() {
				return _this._min(game, _this._opponent(player)).value;
			});
			if (score > v) {
				v = score;
				bestMove = action;
			}
		}
		return {
			value: v,
			action: bestMove
		};
	};

	this._min = function(game, player) {
		var _this = this;
		if (game.isTerminalState()) {
			return {
				value: game.eval(this.settings.systemKey),
				action: null
			};
		}
		var worstMove = null;
		var v = 1000;
		var actions = this._generateActions(game, player);
		for (var i = 0; i < actions.length; i++) {
			var action = actions[i];
			var score = this._applyAction(game, player, action, true, function() {
				return _this._max(game, _this._opponent(player)).value;
			});
			if (score < v) {
				v = score;
				worstMove = action;
			}
		}
		return {
			value: v,
			action: worstMove
		};
	};*/

	this._maxAlphaBeta = function(game, player, a, b) {
		var _this = this;
		if (game.isTerminalState()) {
			return {
				value: game.eval(this.settings.systemKey).result,
				action: null
			};
		}
		var bestMove = null;
		var v = -1000;
		var actions = this._generateActions(game, player);
		for (var i = 0; i < actions.length; i++) {
			var action = actions[i];
			var score = this._applyAction(game, player, action, true, function() {
				return _this._minAlphaBeta(game, _this._opponent(player), a, b).value;
			});
			if (score > v) {
				v = score;
				bestMove = action;
			}
			if (v >= b) {
				return {
					value: v,
					action: action
				};
			}
			a = Math.max(a, v);
		}
		return {
			value: v,
			action: bestMove
		};
	};

	this._minAlphaBeta = function(game, player, a, b) {
		var _this = this;
		if (game.isTerminalState()) {
			return {
				value: game.eval(this.settings.systemKey).result,
				action: null
			};
		}
		var worstMove = null;
		var v = 1000;
		var actions = this._generateActions(game, player);
		for (var i = 0; i < actions.length; i++) {
			var action = actions[i];
			var score = this._applyAction(game, player, action, true, function() {
				return _this._maxAlphaBeta(game, _this._opponent(player), a, b).value;
			});
			if (score < v) {
				v = score;
				worstMove = action;
			}
			if (v <= a) {
				return {
					value: v,
					action: action
				};
			}
			b = Math.min(b, v);
		}
		return {
			value: v,
			action: worstMove
		};
	};

	this._generateActions = function(game, player) {
		var actions = [];
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (game.board[i][j] == '-') {
					actions.push({
						i: i,
						j: j
					});
				}
			}
		}
		return actions;
	};

	this._applyAction = function(game, player, action, undo, callback) {
		var i = action.i;
		var j = action.j;
		game.board[i][j] = player;
		var score = -1;
		if (callback != null) {
			score = callback();
		}
		if (undo) {
			game.board[i][j] = '-';
		}
		return score;
	};

	this._opponent = function(player) {
		return player == 'X' ? 'O' : 'X';
	};

};