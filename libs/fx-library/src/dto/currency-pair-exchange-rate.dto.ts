export class CurrencyPairExchangeRateDto {
    public constructor(private readonly exchangeRate: number) {
    }

    public toString(): string {
        return this.exchangeRate.toString();
    }
}