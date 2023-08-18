export class CurrencyPairExchangeRateDto {
    public constructor(private readonly _exchangeRate: number) {
    }

    public toString(): string {
        return this._exchangeRate.toString();
    }
}