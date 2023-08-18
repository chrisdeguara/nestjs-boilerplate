export class CurrencyPairDto {

    constructor(private _baseCurrency: string, private _quoteCurrency: string) {
    }

    public get baseCurrency(): string {
        return this._baseCurrency;
    }

    public get quoteCurrency(): string {
        return this._quoteCurrency;
    }

    public set baseCurrency(value: string) {
        this._baseCurrency = value;
    }

    public set quoteCurrrency(value: string) {
        this._quoteCurrency = value;
    }

    public sanitizeBaseCurrency(): void {
        this.baseCurrency.trim().toUpperCase();
    }

    public sanitizeQuoteCurrency(): void{
        this.quoteCurrency.trim().toUpperCase();
    }

    public toString(): string {
        return `Base: ${this.baseCurrency} / Quote: ${this.quoteCurrency})`;
    }
}