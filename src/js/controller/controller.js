class CalcController {
	constructor() {
		this._locale = 'pt-BR';
		this._display = document.querySelector('#display');
		this._date = document.querySelector('#date');
		this._time = document.querySelector('#time');
		this._currentDate;
		this.initialize();
		this.eventBtn();
	}

	/**
     * Other Methods
     */
	initialize() {
		this.setDisplayDateTime();
		setInterval(() => {
			this.setDisplayDateTime();
		}, 1000);
	}

	eventBtn() {
		let buttons = document.querySelectorAll('#buttons > rect, #buttons > path, #parts > g');
		buttons.forEach((btn, index) => {
			btn.addEventListener('click', (event) => {
				console.log(btn.className.baseVal.replace('btn-', ''));
			});
		});
	}

	setDisplayDateTime() {
		this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
		this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
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
		this._display.innerHTML = value;
	}

	get currentDate() {
		return new Date();
	}

	set currentDate(date) {
		this._currentDate = date;
	}
}
