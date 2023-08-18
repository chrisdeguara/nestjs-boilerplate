export class CurrencyPairDto {

    constructor(public baseCurrency: string, public quoteCurrency: string) {
    }

    public toString(): string {
        return `Base: ${this.baseCurrency} / Quote: ${this.quoteCurrency})`;
    }
}