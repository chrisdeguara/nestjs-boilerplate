export class CurrencyPairExchangeRateDto {
    public constructor(private readonly _exchangeRate: number) {
    }

    public get exchangeRate(): number {
        return this._exchangeRate;
    }

    public toString(): string {
        return this._exchangeRate.toString();
    }
}