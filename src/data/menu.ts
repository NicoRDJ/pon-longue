export interface MenuItem {
  name_es: string;
  name_en: string;
  desc_es: string;
  desc_en: string;
  // Optional: cocktail prices are still being confirmed with the owner.
  price?: number;
  // Optional: path under /public once a real photo exists for this item
  // (e.g. "/carta/dama-de-pon.jpg"). Until then, MenuAccordion/MenuTeaser
  // render a branded placeholder in its place — set this and the photo
  // takes over automatically, no other code changes needed.
  image?: string;
}

export interface MenuCategory {
  id: string;
  es: string;
  en: string;
  items: MenuItem[];
}

// PON Lounge's real cocktail list (from the house recipe book), ordered by
// priority: house creations first, then the most exclusive spirit-forward
// categories, down to non-alcoholic. Food/dessert/wine categories below are
// still sample content pending the client's real menu.
export const cocktailMenu: MenuCategory[] = [
  {
    id: "casa",
    es: "Cócteles de la Casa P.O.N",
    en: "P.O.N House Cocktails",
    items: [
      {
        name_es: "Dama de P.O.N",
        name_en: "Dama de P.O.N",
        desc_es:
          "Licor de almendras con una suavidad aromática y una elegancia que se queda. Un cierre especiado que invita a quedarse una copa más.",
        desc_en:
          "Almond liqueur with an aromatic softness and a lingering elegance. A spiced finish that invites one more glass.",
      },
      {
        name_es: "Pacífico Sour",
        name_en: "Pacífico Sour",
        desc_es:
          "Viche del Pacífico colombiano convertido en un homenaje líquido: carácter, historia y espuma sedosa en cada sorbo.",
        desc_en:
          "Viche from Colombia's Pacific coast turned into a liquid tribute: character, history, and silky foam in every sip.",
      },
      {
        name_es: "Viche Tónic",
        name_en: "Viche Tónic",
        desc_es:
          "Viche herbal y fresco, con alma ancestral — el Pacífico colombiano sentido en una copa.",
        desc_en:
          "Herbal, fresh viche with an ancestral soul — Colombia's Pacific coast, felt in a glass.",
      },
      {
        name_es: "Viche Colada",
        name_en: "Viche Colada",
        desc_es:
          "Viche envuelto en dulzura tropical. Como una tarde de playa condensada en un solo trago.",
        desc_en:
          "Viche wrapped in tropical sweetness. Like a beach afternoon condensed into one drink.",
      },
    ],
  },
  {
    id: "caracter",
    es: "Cócteles de Carácter",
    en: "Character Cocktails",
    items: [
      {
        name_es: "Negroni",
        name_en: "Negroni",
        desc_es:
          "Gin amargo, intenso y sin concesiones. Para quienes ya saben exactamente lo que quieren.",
        desc_en:
          "Bitter, intense gin with no compromises. For those who already know exactly what they want.",
      },
      {
        name_es: "Old Fashioned",
        name_en: "Old Fashioned",
        desc_es:
          "Bourbon, tiempo y un toque de humo. El clásico que nunca pasa de moda.",
        desc_en:
          "Bourbon, time, and a touch of smoke. The classic that never goes out of style.",
      },
      {
        name_es: "Mezcalita",
        name_en: "Mezcalita",
        desc_es:
          "Mezcal ahumado y con carácter — para quienes buscan algo con más profundidad.",
        desc_en:
          "Smoky mezcal with character — for those looking for something with more depth.",
      },
      {
        name_es: "Dry Martini",
        name_en: "Dry Martini",
        desc_es:
          "Gin frío, directo y elegante. Sofisticación en su forma más pura.",
        desc_en:
          "Cold, direct, elegant gin. Sophistication in its purest form.",
      },
      {
        name_es: "Manhattan",
        name_en: "Manhattan",
        desc_es:
          "Whisky aterciopelado y con carácter, para las noches que se disfrutan despacio.",
        desc_en:
          "Velvety whiskey with character, for nights meant to be savored slowly.",
      },
      {
        name_es: "Espresso Martini",
        name_en: "Espresso Martini",
        desc_es:
          "Vodka con energía y elegancia en una sola copa — el impulso perfecto para que la noche siga.",
        desc_en:
          "Vodka with energy and elegance in one glass — the perfect lift to keep the night going.",
      },
    ],
  },
  {
    id: "gintonics",
    es: "Gin Tonics",
    en: "Gin & Tonics",
    items: [
      {
        name_es: "Tanqueray London Dry",
        name_en: "Tanqueray London Dry",
        desc_es:
          "Gin botánico, seco y directo — el gin tonic clásico en su máxima expresión.",
        desc_en:
          "Botanical, dry gin, straight to the point — the classic gin & tonic at its best.",
      },
      {
        name_es: "Tanqueray No. Ten",
        name_en: "Tanqueray No. Ten",
        desc_es:
          "Gin floral y suave, con un guiño cítrico que lo hace inconfundible.",
        desc_en:
          "Floral, smooth gin with a citrus wink that makes it unmistakable.",
      },
      {
        name_es: "Bombay Sapphire",
        name_en: "Bombay Sapphire",
        desc_es:
          "Gin aromático y equilibrado, para quienes disfrutan los detalles.",
        desc_en: "Aromatic, balanced gin, for those who savor the details.",
      },
      {
        name_es: "Monkey 47",
        name_en: "Monkey 47",
        desc_es:
          "Gin intenso y especiado — carácter puro para los paladares más exigentes.",
        desc_en:
          "Intense, spiced gin — pure character for the most demanding palates.",
      },
      {
        name_es: "Hendrick's",
        name_en: "Hendrick's",
        desc_es:
          "Gin fresco y floral, una experiencia sensorial distinta a cualquier otra.",
        desc_en: "Fresh, floral gin — a sensory experience unlike any other.",
      },
    ],
  },
  {
    id: "citricos",
    es: "Cócteles Cítricos",
    en: "Citrus Cocktails",
    items: [
      {
        name_es: "Margarita",
        name_en: "Margarita",
        desc_es:
          "Tequila ácido, dulce y con un toque picante — el equilibrio perfecto en cada sorbo.",
        desc_en:
          "Sharp, sweet tequila with a hint of spice — perfect balance in every sip.",
      },
      {
        name_es: "Paloma",
        name_en: "Paloma",
        desc_es:
          "Tequila cítrico, burbujeante y refrescante — ideal para una noche ligera.",
        desc_en:
          "Citrusy, bubbly tequila — refreshing and light, ideal for an easy night.",
      },
      {
        name_es: "Mojito",
        name_en: "Mojito",
        desc_es:
          "Ron blanco con toda la frescura cubana de siempre — hierbabuena, cítricos y mucha frescura.",
        desc_en:
          "White rum with all the classic Cuban freshness — mint, citrus, and plenty of freshness.",
      },
      {
        name_es: "Daiquiri",
        name_en: "Daiquiri",
        desc_es:
          "Ron simple, cítrico y perfectamente balanceado — un clásico que nunca decepciona.",
        desc_en:
          "Simple, citrusy, perfectly balanced rum — a classic that never disappoints.",
      },
      {
        name_es: "Moscow Mule",
        name_en: "Moscow Mule",
        desc_es:
          "Vodka picante, cítrico y muy refrescante — servido en su icónico vaso de cobre.",
        desc_en:
          "Spicy, citrusy vodka, very refreshing — served in its iconic copper mug.",
      },
      {
        name_es: "Caipirinha",
        name_en: "Caipirinha",
        desc_es: "Cachaza directa y rústica, tal como se disfruta en Brasil.",
        desc_en:
          "Straightforward, rustic cachaça, just as it's enjoyed in Brazil.",
      },
      {
        name_es: "Caipiroska",
        name_en: "Caipiroska",
        desc_es:
          "Vodka fresco y frutal — la versión suave de la caipirinha clásica.",
        desc_en:
          "Fresh, fruity vodka — the smoother take on the classic caipirinha.",
      },
      {
        name_es: "Whisky Sour",
        name_en: "Whisky Sour",
        desc_es:
          "Whisky sedoso, cítrico y con carácter — el equilibrio entre lo dulce y lo fuerte.",
        desc_en:
          "Silky, citrusy whiskey with character — the balance between sweet and strong.",
      },
      {
        name_es: "New York Sour",
        name_en: "New York Sour",
        desc_es:
          "Whisky en su versión más elegante: la evolución del sour clásico con un toque final de vino tinto.",
        desc_en:
          "Whiskey in its most elegant form: the classic sour's evolution with a red wine float.",
      },
    ],
  },
  {
    id: "aperitivos",
    es: "Aperitivos",
    en: "Aperitifs",
    items: [
      {
        name_es: "Aperol Spritz",
        name_en: "Aperol Spritz",
        desc_es:
          "Aperol burbujeante con prosecco, ligero y color atardecer — el aperitivo italiano por excelencia.",
        desc_en:
          "Bubbly Aperol with prosecco, light and sunset-colored — the quintessential Italian aperitif.",
      },
      {
        name_es: "Mimosa",
        name_en: "Mimosa",
        desc_es:
          "Prosecco simple, elegante y perfecto para brindar en cualquier momento.",
        desc_en: "Simple, elegant prosecco — perfect for a toast any time.",
      },
    ],
  },
  {
    id: "sinlicor",
    es: "Cócteles Sin Licor",
    en: "Non-Alcoholic Cocktails",
    items: [
      {
        name_es: "Mojito sin Licor",
        name_en: "Mojito (Alcohol-Free)",
        desc_es:
          "Toda la frescura del mojito clásico, sin una gota de alcohol — hierbabuena, cítricos y mucha efervescencia.",
        desc_en:
          "All the freshness of the classic mojito, without a drop of alcohol — mint, citrus, and plenty of fizz.",
      },
      {
        name_es: "Piña Colada sin Licor",
        name_en: "Piña Colada (Alcohol-Free)",
        desc_es:
          "Dulce, tropical y cremosa — un viaje al Caribe en cada sorbo, sin alcohol.",
        desc_en:
          "Sweet, tropical, and creamy — a trip to the Caribbean in every sip, alcohol-free.",
      },
    ],
  },
  {
    id: "limonadas",
    es: "Limonadas",
    en: "Lemonades",
    items: [
      {
        name_es: "Natural",
        name_en: "Natural",
        desc_es:
          "Fresca, ácida y ligera — el respiro perfecto entre copa y copa.",
        desc_en:
          "Fresh, tart, and light — the perfect breather between drinks.",
      },
      {
        name_es: "Hierbabuena",
        name_en: "Mint",
        desc_es:
          "Refrescante y aromática, con un toque herbal que despierta los sentidos.",
        desc_en:
          "Refreshing and aromatic, with an herbal touch that wakes up the senses.",
      },
    ],
  },
];

// Sample food/dessert/wine menu — replace with PON Lounge's real menu when
// available. Kept as a typed data module (rather than hardcoded JSX) so it
// can later be swapped for a CMS/API fetch without touching the rendering
// components.
export const menu: MenuCategory[] = [
  {
    id: "compartir",
    es: "Para Compartir",
    en: "To Share",
    items: [
      {
        name_es: "Tartar de Atún",
        name_en: "Tuna Tartare",
        desc_es: "Atún aleta amarilla, aguacate, sésamo tostado y ají amarillo",
        desc_en: "Yellowfin tuna, avocado, toasted sesame, yellow chili",
        price: 62000,
      },
      {
        name_es: "Croquetas de Costilla",
        name_en: "Short Rib Croquettes",
        desc_es: "Costilla desmechada, salsa BBQ de café y alioli ahumado",
        desc_en: "Braised short rib, coffee BBQ sauce, smoked aioli",
        price: 45000,
      },
      {
        name_es: "Tabla de Quesos & Embutidos",
        name_en: "Cheese & Charcuterie Board",
        desc_es: "Selección premium, mermeladas de la casa y pan artesanal",
        desc_en: "Premium selection, house preserves, artisan bread",
        price: 78000,
      },
      {
        name_es: "Camarones al Ajillo",
        name_en: "Garlic Shrimp",
        desc_es: "Camarones salteados, ajo confitado y pan tostado",
        desc_en: "Sautéed shrimp, confit garlic, toasted bread",
        price: 58000,
      },
    ],
  },
  {
    id: "fuertes",
    es: "Platos Fuertes",
    en: "Main Courses",
    items: [
      {
        name_es: "Lomo Fino a la Parrilla",
        name_en: "Grilled Tenderloin",
        desc_es:
          "230g, puré de papa criolla, vegetales asados y salsa de vino tinto",
        desc_en: "230g, criolla potato purée, roasted vegetables, red wine jus",
        price: 98000,
      },
      {
        name_es: "Risotto de Champiñones",
        name_en: "Wild Mushroom Risotto",
        desc_es: "Champiñones silvestres, parmesano añejo y aceite de trufa",
        desc_en: "Wild mushrooms, aged parmesan, truffle oil",
        price: 76000,
      },
      {
        name_es: "Salmón a la Plancha",
        name_en: "Grilled Salmon",
        desc_es: "Salmón noruego, quinoa tricolor y beurre blanc",
        desc_en: "Norwegian salmon, tri-color quinoa, beurre blanc",
        price: 89000,
      },
    ],
  },
  {
    id: "postres",
    es: "Postres",
    en: "Desserts",
    items: [
      {
        name_es: "Volcán de Chocolate 70%",
        name_en: "70% Chocolate Lava Cake",
        desc_es: "Centro líquido, helado de vainilla y polvo de café",
        desc_en: "Molten center, vanilla ice cream, coffee dust",
        price: 32000,
      },
      {
        name_es: "Cheesecake de la Casa",
        name_en: "House Cheesecake",
        desc_es: "Base de galleta y coulis de frutos rojos",
        desc_en: "Cookie crust, red berry coulis",
        price: 30000,
      },
    ],
  },
  {
    id: "bar",
    es: "Vinos & Destilados",
    en: "Wine & Spirits",
    items: [
      {
        name_es: "Copa de Vino Tinto Reserva",
        name_en: "Reserve Red Wine (Glass)",
        desc_es: "Selección de bodegas internacionales",
        desc_en: "Curated international selection",
        price: 38000,
      },
      {
        name_es: "Whisky 18 Años",
        name_en: "18-Year Whisky",
        desc_es: "Servido solo, con hielo o en las rocas",
        desc_en: "Served neat, on the rocks, or with a splash",
        price: 65000,
      },
      {
        name_es: "Copa de Champagne",
        name_en: "Champagne Glass",
        desc_es: "Burbujas para celebrar cualquier ocasión",
        desc_en: "Bubbles to celebrate any occasion",
        price: 42000,
      },
    ],
  },
];
