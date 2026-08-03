export interface Supplier {
  shop: string
  url: string
}

export interface BomRegion {
  id: string
  button: string
  badge: string
  symbol: string
  note: string
  supplier: Supplier
}

export interface BomPart {
  part: string
  spec: string
  prices: Record<string, number>
  supplier?: Record<string, Supplier>
}

export const REGIONS: BomRegion[] = [
  {
    id: 'us',
    button: 'United States',
    badge: 'USD $',
    symbol: '$',
    note: 'Prices in USD, excl. sales tax. Panel ships from CN, 2–3 weeks.',
    supplier: { shop: 'Mouser', url: 'https://www.mouser.com' },
  },
  {
    id: 'eu',
    button: 'Europe',
    badge: 'EUR €',
    symbol: '€',
    note: 'Prices in EUR, excl. VAT. Reichelt and Elecrow EU stock most parts.',
    supplier: { shop: 'Reichelt', url: 'https://www.reichelt.de' },
  },
  {
    id: 'uk',
    button: 'United Kingdom',
    badge: 'GBP £',
    symbol: '£',
    note: 'Prices in GBP, excl. VAT. Pimoroni carries the panel and transceiver.',
    supplier: { shop: 'Pimoroni', url: 'https://shop.pimoroni.com' },
  },
  {
    id: 'ch',
    button: 'Switzerland',
    badge: 'CHF',
    symbol: 'CHF ',
    note: 'Prices in CHF, excl. VAT. Distrelec ships next-day within CH.',
    supplier: { shop: 'Distrelec', url: 'https://www.distrelec.ch' },
  },
]

const panel: Record<string, Supplier> = {
  us: { shop: 'AliExpress', url: 'https://www.aliexpress.com' },
  eu: { shop: 'Elecrow', url: 'https://www.elecrow.com' },
  uk: { shop: 'Pimoroni', url: 'https://shop.pimoroni.com' },
  ch: { shop: 'Distrelec', url: 'https://www.distrelec.ch' },
}

export const CORE: BomPart[] = [
  {
    part: 'Elecrow CrowPanel 2.8″',
    spec: 'ESP32-WROOM · ILI9341 SPI · XPT2046 touch',
    prices: { us: 33, eu: 34, uk: 30, ch: 32 },
    supplier: panel,
  },
  {
    part: 'NXP TJA1051T/3 breakout',
    spec: '3.3 V CAN transceiver',
    prices: { us: 4, eu: 4, uk: 4, ch: 5 },
  },
  {
    part: 'OBD-II to DB9 cable',
    spec: 'vehicle CAN tap',
    prices: { us: 9, eu: 9, uk: 8, ch: 10 },
  },
  {
    part: 'Dupont + JST wire kit',
    spec: 'jumpers and crimps',
    prices: { us: 6, eu: 6, uk: 5, ch: 7 },
  },
  {
    part: 'USB-C 5 V supply',
    spec: '1 A bench power',
    prices: { us: 7, eu: 7, uk: 6, ch: 8 },
  },
  {
    part: '120 Ω terminators ×2',
    spec: 'bus termination, if needed',
    prices: { us: 1, eu: 1, uk: 1, ch: 2 },
  },
  {
    part: 'Printed bezel',
    spec: '2.8″ panel mount',
    prices: { us: 6, eu: 6, uk: 5, ch: 7 },
  },
]

export const EXTRAS: BomPart[] = [
  {
    part: 'OBD-II Y-splitter',
    spec: 'keep the port usable',
    prices: { us: 12, eu: 12, uk: 10, ch: 13 },
  },
  {
    part: 'Dashboard pod',
    spec: 'A-pillar or dash-top mount',
    prices: { us: 18, eu: 18, uk: 16, ch: 20 },
  },
  {
    part: 'Inline fuse tap',
    spec: 'add-a-circuit, 3 A',
    prices: { us: 6, eu: 6, uk: 5, ch: 7 },
  },
  {
    part: 'Panel-mount USB-C',
    spec: 'bulkhead extension',
    prices: { us: 5, eu: 5, uk: 4, ch: 6 },
  },
]

export const supplierFor = (part: BomPart, region: BomRegion): Supplier =>
  part.supplier?.[region.id] ?? region.supplier

export const sumPrices = (parts: BomPart[], regionId: string): number =>
  parts.reduce((total, part) => total + (part.prices[regionId] ?? 0), 0)

export const formatPrice = (amount: number, region: BomRegion): string =>
  `${region.symbol}${amount}`
