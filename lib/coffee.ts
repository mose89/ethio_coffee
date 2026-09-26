/**
 * What we supply: shared by the home page, "Our coffees" and the green coffee page.
 * Keep claims general and checkable. Profiles are typical, never promises for a lot.
 */

export const SUPPLY_TYPES = [
  {
    title: "Washing station lots",
    body: "Coffee from up to a thousand smallholder farms around one washing station. Distinctive regional character, new discoveries every season, and volume to match.",
  },
  {
    title: "Single farm lots",
    body: "One farm, one story. Transparent sourcing, consistent quality and a direct link between the price you pay and the premium the farmer receives.",
  },
  {
    title: "Estate coffee",
    body: "From a medium-size estate with its own washing station, with quality controlled from farm to shipment and direct, long-term trade.",
  },
  {
    title: "Commercial grades",
    body: "Grades 3 to 5, washed or natural, for blends and larger volumes, prepared and checked with the same care as our specialty lots.",
  },
] as const;

export const REGIONS = [
  { name: "Yirgacheffe", profile: "Washed coffees known for jasmine-like florals, citrus and a light, tea-like body. Naturals are intensely fruity." },
  { name: "Gedeb", profile: "High-grown coffees from the south of the Yirgacheffe area: bright, floral and clean, washed or natural." },
  { name: "Sidama", profile: "More body and sweetness: stone fruit, brown sugar and softer florals, with bright acidity in washed lots." },
  { name: "Guji", profile: "Fruit-forward naturals with berry and citrus notes, and elegant, floral washed coffees." },
  { name: "Limu", profile: "Clean washed coffees from the western highlands, with gentle acidity, floral and spice notes and rounded sweetness." },
  { name: "Jimma", profile: "A large western origin, mostly natural coffees. Widely used in commercial grades and blends, with higher grades too." },
] as const;

export const PROCESSES = [
  {
    title: "Washed",
    body: "The cherry is pulped, fermented and washed before the parchment dries on raised beds. Clean, bright and often floral in the cup.",
  },
  {
    title: "Natural",
    body: "Whole cherries dry in the sun on raised beds before hulling. Fruitier and heavier-bodied, the classic taste of southern and eastern Ethiopia.",
  },
  {
    title: "Other methods",
    body: "Honey, anaerobic and other experimental lots are produced in small volumes. Ask us what is available this season.",
  },
] as const;

export const GRADES = [
  { grade: "Grade 1", use: "Specialty", note: "The fewest defects and the highest cup scores. The top grade for washed and natural coffee." },
  { grade: "Grade 2", use: "Specialty", note: "Very few defects and a clean, distinctive cup. Often the best balance of quality and price." },
  { grade: "Grade 3", use: "Specialty or commercial", note: "Can reach specialty quality, especially naturals. Otherwise a high-quality commercial coffee." },
  { grade: "Grade 4", use: "Commercial", note: "Sound everyday coffee for blends and larger volumes." },
  { grade: "Grade 5", use: "Commercial", note: "The lowest export grade, for price-led blends." },
] as const;

export const SHIPPING_TERMS = [
  {
    term: "FOB Djibouti",
    mode: "Sea freight",
    body: "Our price covers the coffee loaded on board your vessel at the port of Djibouti, Ethiopia’s main export route. You arrange the sea freight onwards.",
  },
  {
    term: "FCA Addis Ababa Bole International Airport",
    mode: "Air freight",
    body: "We hand the coffee to your air carrier at Bole International Airport. Useful for smaller or urgent shipments, samples and roasted coffee.",
  },
  {
    term: "Freight arranged by us",
    mode: "Sea or air",
    body: "Prefer one price to your port or airport? We can book the freight and quote it together with the coffee.",
  },
] as const;
