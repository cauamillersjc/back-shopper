export interface IPriceVariation {
    highestLimit: number,
    lowestLimit: number,
}

export const calculatePriceVariation = (price: number): IPriceVariation => {
    // Define os limites de 10%
    // Arrendonda as casas decimais para cima, afim de evitar conflito por conta de decimos
    let highestLimit = Math.ceil((price * 1.10) * 100) / 100
    let lowestLimit = Math.ceil((price * 0.90) * 100) / 100

    const priceVariation: IPriceVariation = { highestLimit: highestLimit, lowestLimit: lowestLimit }

    return priceVariation
}