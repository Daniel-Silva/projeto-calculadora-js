class CalcController {
	constructor() {
		this._lastOperator = '';
		this._lastNumber = '';
		this._operation = [];
		this._locale = 'pt-BR';
		this._displayOperation = document.querySelector('#operator');
		this._display = document.querySelector('#display');
		this._date = document.querySelector('#date');
		this._time = document.querySelector('#time');
		this._currentDate;
		this.initialize();
		this.eventBtn();
		this.initKeyboar();
	}

	/**
     * Methods GETTER AND SETTER
     */
	get displayDate() {
		return this._date.innerHTML;
	}

	set displayDate(value) {
		this._date.innerHTML = value;
	}

	get displayTime() {
		return this._time.innerHTML;
	}

	set displayTime(value) {
		this._time.innerHTML = value;
	}

	get display() {
		return this._display.innerHTML;
	}

	set display(value) {
		if (value.toString().length > 10) {
			this._lastOperator = '';
			this._lastNumber = '';
			this._operation = [];
			this.setError();
			return false;
		}
		this._display.innerHTML = value;
	}

	get currentDate() {
		return new Date();
	}

	set currentDate(date) {
		this._currentDate = date;
	}

	/**
     * Other Methods
     */
	initialize() {
		this.setDisplayDateTime();
		setInterval(() => {
			this.setDisplayDateTime();
		}, 1000);
		this.setLastNumberToDisplay();
	}

	addEventListenerAll(element, events, callback) {
		events.split(' ').forEach((event) => {
			element.addEventListener(event, callback, false);
		});
	}

	clearAll() {
		this._operation = [];
		this._lastNumber = '';
		this._lastOperator = '';
		this.setLastNumberToDisplay();
		this.setDisplayOperation();
	}

	clearEntry() {
		this._operation.pop();
		this.setLastNumberToDisplay();
		this.setDisplayOperation();
	}

	getLastOperation() {
		return this._operation[this._operation.length - 1];
	}

	getResult() {
		try {
			return eval(this._operation.join(''));
		} catch (e) {
			setTimeout(() => {
				this.setError();
			}, 1);
		}
	}

	getLastItem(isOperator = true) {
		let lastItem;
		for (let i = this._operation.length - 1; i >= 0; i--) {
			if (this.isOperator(this._operation[i]) == isOperator) {
				lastItem = this._operation[i];
				break;
			}
		}
		if (!lastItem) {
			lastItem = isOperator ? this._lastOperator : this._lastNumber;
		}
		return lastItem;
	}

	setError() {
		this.display = 'Error';
	}

	setDisplayDateTime() {
		this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
		this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}

	setDisplayOperation() {
		this._displayOperation.innerHTML = this._operation.join(' ');
	}

	setLastOperation(value) {
		this._operation[this._operation.length - 1] = value;
	}

	setLastNumberToDisplay() {
		let lastNumber = this.getLastItem(false);
		if (!lastNumber) {
			lastNumber = 0;
		}
		this.display = lastNumber;
	}

	isOperator(value) {
		return [ '+', '-', '*', '%', '/' ].indexOf(value) > -1;
	}

	pushOperation(value) {
		this._operation.push(value);
		if (this._operation.length > 3) {
			this.calc();
		}
	}

	calc() {
		let last = '';
		this._lastOperator = this.getLastItem(true);

		if (this._operation.length < 3) {
			let firstItem = this._operation[0];
			this._operation = [ firstItem, this._lastOperator, this._lastNumber ];
		}

		if (this._operation.length > 3) {
			last = this._operation.pop();
			this._lastNumber = this.getResult();
		} else if (this._operation.length == 3) {
			this._lastNumber = this.getLastItem(false);
		}

		let result = this.getResult();
		if (last == '%') {
			result /= 100;
			this._operation = [ result ];
		} else {
			this._operation = [ result ];
			if (last) {
				this._operation.push(last);
			}
		}

		this.setLastNumberToDisplay();
	}

	initKeyboar() {
		document.addEventListener('keyup', (e) => {
			switch (e.key) {
				case 'Escape':
					this.clearAll();
					break;
				case 'Backspace':
					this.clearEntry();
					break;
				case '+':
				case '-':
				case '/':
				case '*':
				case '%':
					this.addOperation(e.key);
					break;
				case ',':
				case '.':
					this.addDot();
					break;
				case 'Enter':
				case '=':
					this.calc();
					break;
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					this.addOperation(parseInt(e.key));
					break;
			}
		});
	}

	addDot() {
		let lastOperation = this.getLastOperation();
		if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) {
			return;
		}
		if (this.isOperator(lastOperation) || !lastOperation) {
			this.pushOperation('0.');
		} else {
			this.setLastOperation(lastOperation.toString() + '.');
		}
		this.setLastNumberToDisplay();
	}

	addOperation(value) {
		if (isNaN(this.getLastOperation())) {
			if (this.isOperator(value)) {
				this.setLastOperation(value);
			} else {
				this.pushOperation(value);
				this.setLastNumberToDisplay();
			}
		} else {
			if (this.isOperator(value)) {
				this.pushOperation(value);
			} else {
				let newValue = this.getLastOperation().toString() + value.toString();
				this.setLastOperation(newValue);
				this.setLastNumberToDisplay();
			}
		}

		this.setDisplayOperation();
	}

	execBtn(value) {
		switch (value) {
			case 'ac':
				this.clearAll();
				break;
			case 'ce':
				this.clearEntry();
				break;
			case 'sum':
				this.addOperation('+');
				break;
			case 'subtraction':
				this.addOperation('-');
				break;
			case 'division':
				this.addOperation('/');
				break;
			case 'multiplication':
				this.addOperation('*');
				break;
			case 'porcent':
				this.addOperation('%');
				break;
			case 'dot':
				this.addDot();
				break;
			case 'equal':
				this.calc();
				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				this.addOperation(parseInt(value));
				break;

			default:
				this.setError();
				break;
		}
	}

	eventBtn() {
		let buttons = document.querySelectorAll('#buttons > rect, #buttons > path, #parts > g');
		buttons.forEach((btn, index) => {
			this.addEventListenerAll(btn, 'click drag', (event) => {
				const btnValue = btn.className.baseVal.replace('btn-', '');
				this.execBtn(btnValue);
			});
		});
	}
}
