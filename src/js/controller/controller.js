class CalcController {
    constructor() {
        this._displayCalc = '0'
        this._actualDate;
    }

    /**
     * Métodos GETTER AND SETTER
     */
    get displayCalc() {
        return this._displayCalc
    }

    set displayCalc(value) {
        this._displayCalc = value 
    }

    get actualDate() {
        return this._actualDate
    }

    set actualDate(date) {
        this._actualDate = date;
    }
}