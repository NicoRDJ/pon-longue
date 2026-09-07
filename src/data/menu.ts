export interface MenuItem {
  name_es: string;
  name_en: string;
  // Optional: omitted for spirits/shots/beers where the name (plus the
  // subcategory heading grouping it by type) already says everything —
  // keeps those lists compact instead of repeating boilerplate copy.
  desc_es?: string;
  desc_en?: string;
  price?: number;
  // Optional: path under /public once a real photo exists for this item
  // (e.g. "/carta/dama-de-pon.jpg"). Until then, MenuAccordion/MenuTeaser
  // render a branded placeholder in its place — set this and the photo
  // takes over automatically, no other code changes needed.
  image?: string;
  // Optional: groups items under a sub-heading within a category (e.g.
  // "Platos" separated into Entradas/Para Compartir/Fuertes) without
  // splitting it into its own accordion category.
  subcategory_es?: string;
  subcategory_en?: string;
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
        price: 52000,
      },
      {
        name_es: "Pacífico Sour",
        name_en: "Pacífico Sour",
        desc_es:
          "Viche del Pacífico colombiano convertido en un homenaje líquido: carácter, historia y espuma sedosa en cada sorbo.",
        desc_en:
          "Viche from Colombia's Pacific coast turned into a liquid tribute: character, history, and silky foam in every sip.",
        price: 42000,
      },
      {
        name_es: "Viche Tónic",
        name_en: "Viche Tónic",
        desc_es:
          "Viche herbal y fresco, con alma ancestral — el Pacífico colombiano sentido en una copa.",
        desc_en:
          "Herbal, fresh viche with an ancestral soul — Colombia's Pacific coast, felt in a glass.",
        price: 42000,
      },
      {
        name_es: "Viche Colada",
        name_en: "Viche Colada",
        desc_es:
          "Viche envuelto en dulzura tropical. Como una tarde de playa condensada en un solo trago.",
        desc_en:
          "Viche wrapped in tropical sweetness. Like a beach afternoon condensed into one drink.",
        price: 46000,
      },
      {
        name_es: "Black Lounge",
        name_en: "Black Lounge",
        desc_es: "Creación exclusiva de la casa P.O.N.",
        desc_en: "P.O.N.'s exclusive house creation.",
        price: 45000,
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
        price: 49000,
      },
      {
        name_es: "Old Fashioned",
        name_en: "Old Fashioned",
        desc_es:
          "Bourbon, tiempo y un toque de humo. El clásico que nunca pasa de moda.",
        desc_en:
          "Bourbon, time, and a touch of smoke. The classic that never goes out of style.",
        price: 49000,
      },
      {
        name_es: "Mezcalita",
        name_en: "Mezcalita",
        desc_es:
          "Mezcal ahumado y con carácter — para quienes buscan algo con más profundidad.",
        desc_en:
          "Smoky mezcal with character — for those looking for something with more depth.",
        price: 52000,
      },
      {
        name_es: "Dry Martini",
        name_en: "Dry Martini",
        desc_es:
          "Gin frío, directo y elegante. Sofisticación en su forma más pura.",
        desc_en:
          "Cold, direct, elegant gin. Sophistication in its purest form.",
        price: 49000,
      },
      {
        name_es: "Manhattan",
        name_en: "Manhattan",
        desc_es:
          "Whisky aterciopelado y con carácter, para las noches que se disfrutan despacio.",
        desc_en:
          "Velvety whiskey with character, for nights meant to be savored slowly.",
        price: 49000,
      },
      {
        name_es: "Espresso Martini",
        name_en: "Espresso Martini",
        desc_es:
          "Vodka con energía y elegancia en una sola copa — el impulso perfecto para que la noche siga.",
        desc_en:
          "Vodka with energy and elegance in one glass — the perfect lift to keep the night going.",
        price: 42000,
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
        price: 60000,
      },
      {
        name_es: "Tanqueray No. Ten",
        name_en: "Tanqueray No. Ten",
        desc_es:
          "Gin floral y suave, con un guiño cítrico que lo hace inconfundible.",
        desc_en:
          "Floral, smooth gin with a citrus wink that makes it unmistakable.",
        price: 65000,
      },
      {
        name_es: "Bombay Sapphire",
        name_en: "Bombay Sapphire",
        desc_es:
          "Gin aromático y equilibrado, para quienes disfrutan los detalles.",
        desc_en: "Aromatic, balanced gin, for those who savor the details.",
        price: 58000,
      },
      {
        name_es: "Monkey 47",
        name_en: "Monkey 47",
        desc_es:
          "Gin intenso y especiado — carácter puro para los paladares más exigentes.",
        desc_en:
          "Intense, spiced gin — pure character for the most demanding palates.",
        price: 86000,
      },
      {
        name_es: "Hendrick's",
        name_en: "Hendrick's",
        desc_es:
          "Gin fresco y floral, una experiencia sensorial distinta a cualquier otra.",
        desc_en: "Fresh, floral gin — a sensory experience unlike any other.",
        price: 68000,
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
        price: 46000,
      },
      {
        name_es: "Paloma",
        name_en: "Paloma",
        desc_es:
          "Tequila cítrico, burbujeante y refrescante — ideal para una noche ligera.",
        desc_en:
          "Citrusy, bubbly tequila — refreshing and light, ideal for an easy night.",
        price: 46000,
      },
      {
        name_es: "Mojito",
        name_en: "Mojito",
        desc_es:
          "Ron blanco con toda la frescura cubana de siempre — hierbabuena, cítricos y mucha frescura.",
        desc_en:
          "White rum with all the classic Cuban freshness — mint, citrus, and plenty of freshness.",
        price: 46000,
      },
      {
        name_es: "Cuba Libre",
        name_en: "Cuba Libre",
        desc_es: "Ron blanco, cola y un toque de limón — el clásico atemporal.",
        desc_en:
          "White rum, cola, and a splash of lime — the timeless classic.",
        price: 46000,
      },
      {
        name_es: "Daiquiri",
        name_en: "Daiquiri",
        desc_es:
          "Ron simple, cítrico y perfectamente balanceado — un clásico que nunca decepciona.",
        desc_en:
          "Simple, citrusy, perfectly balanced rum — a classic that never disappoints.",
        price: 46000,
      },
      {
        name_es: "Moscow Mule",
        name_en: "Moscow Mule",
        desc_es:
          "Vodka picante, cítrico y muy refrescante — servido en su icónico vaso de cobre.",
        desc_en:
          "Spicy, citrusy vodka, very refreshing — served in its iconic copper mug.",
        price: 46000,
      },
      {
        name_es: "Mezcal Mule",
        name_en: "Mezcal Mule",
        desc_es:
          "Mezcal picante, cítrico y muy refrescante, servido en su icónico vaso de cobre.",
        desc_en:
          "Spicy, citrusy mezcal, very refreshing, served in its iconic copper mug.",
        price: 54000,
      },
      {
        name_es: "Caipirinha",
        name_en: "Caipirinha",
        desc_es: "Cachaza directa y rústica, tal como se disfruta en Brasil.",
        desc_en:
          "Straightforward, rustic cachaça, just as it's enjoyed in Brazil.",
        price: 46000,
      },
      {
        name_es: "Caipiroska",
        name_en: "Caipiroska",
        desc_es:
          "Vodka fresco y frutal — la versión suave de la caipirinha clásica. Disponible en fresa o limón.",
        desc_en:
          "Fresh, fruity vodka — the smoother take on the classic caipirinha. Available in strawberry or lime.",
        price: 46000,
      },
      {
        name_es: "Tamarindón Splash",
        name_en: "Tamarindón Splash",
        desc_es: "Fusión frutal de tamarindo con un splash cítrico.",
        desc_en: "Fruity tamarind fusion with a citrus splash.",
        price: 42000,
      },
      {
        name_es: "Whisky Sour",
        name_en: "Whisky Sour",
        desc_es:
          "Whisky sedoso, cítrico y con carácter — el equilibrio entre lo dulce y lo fuerte.",
        desc_en:
          "Silky, citrusy whiskey with character — the balance between sweet and strong.",
        price: 49000,
      },
      {
        name_es: "New York Sour",
        name_en: "New York Sour",
        desc_es:
          "Whisky en su versión más elegante: la evolución del sour clásico con un toque final de vino tinto.",
        desc_en:
          "Whiskey in its most elegant form: the classic sour's evolution with a red wine float.",
        price: 49000,
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
        price: 35000,
      },
      {
        name_es: "Mimosa",
        name_en: "Mimosa",
        desc_es:
          "Prosecco simple, elegante y perfecto para brindar en cualquier momento.",
        desc_en: "Simple, elegant prosecco — perfect for a toast any time.",
        price: 35000,
      },
    ],
  },
  {
    id: "sangria",
    es: "Sangría",
    en: "Sangria",
    items: [
      {
        name_es: "Sangría Rosé",
        name_en: "Rosé Sangria",
        desc_es: "Vino rosado con frutas frescas de temporada.",
        desc_en: "Rosé wine with fresh seasonal fruit.",
        price: 39000,
        subcategory_es: "Copa",
        subcategory_en: "Glass",
      },
      {
        name_es: "Sangría Tinto",
        name_en: "Red Sangria",
        desc_es: "Vino tinto con frutas frescas de temporada.",
        desc_en: "Red wine with fresh seasonal fruit.",
        price: 39000,
        subcategory_es: "Copa",
        subcategory_en: "Glass",
      },
      {
        name_es: "Sangría Rosé",
        name_en: "Rosé Sangria",
        desc_es:
          "Vino rosado con frutas frescas de temporada — ideal para compartir.",
        desc_en: "Rosé wine with fresh seasonal fruit — ideal for sharing.",
        price: 180000,
        subcategory_es: "Jarra",
        subcategory_en: "Pitcher",
      },
      {
        name_es: "Sangría Tinto",
        name_en: "Red Sangria",
        desc_es:
          "Vino tinto con frutas frescas de temporada — ideal para compartir.",
        desc_en: "Red wine with fresh seasonal fruit — ideal for sharing.",
        price: 180000,
        subcategory_es: "Jarra",
        subcategory_en: "Pitcher",
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
        price: 29000,
      },
      {
        name_es: "Piña Colada sin Licor",
        name_en: "Piña Colada (Alcohol-Free)",
        desc_es:
          "Dulce, tropical y cremosa — un viaje al Caribe en cada sorbo, sin alcohol.",
        desc_en:
          "Sweet, tropical, and creamy — a trip to the Caribbean in every sip, alcohol-free.",
        price: 38000,
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
        price: 18000,
      },
      {
        name_es: "Hierbabuena",
        name_en: "Mint",
        desc_es:
          "Refrescante y aromática, con un toque herbal que despierta los sentidos.",
        desc_en:
          "Refreshing and aromatic, with an herbal touch that wakes up the senses.",
        price: 23000,
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
    id: "platos",
    es: "Platos",
    en: "Dishes",
    items: [
      {
        name_es: "Tartar de Atún",
        name_en: "Tuna Tartare",
        desc_es: "Atún aleta amarilla, aguacate, sésamo tostado y ají amarillo",
        desc_en: "Yellowfin tuna, avocado, toasted sesame, yellow chili",
        price: 62000,
        subcategory_es: "Para Compartir",
        subcategory_en: "To Share",
      },
      {
        name_es: "Croquetas de Costilla",
        name_en: "Short Rib Croquettes",
        desc_es: "Costilla desmechada, salsa BBQ de café y alioli ahumado",
        desc_en: "Braised short rib, coffee BBQ sauce, smoked aioli",
        price: 45000,
        subcategory_es: "Para Compartir",
        subcategory_en: "To Share",
      },
      {
        name_es: "Tabla de Quesos & Embutidos",
        name_en: "Cheese & Charcuterie Board",
        desc_es: "Selección premium, mermeladas de la casa y pan artesanal",
        desc_en: "Premium selection, house preserves, artisan bread",
        price: 78000,
        subcategory_es: "Para Compartir",
        subcategory_en: "To Share",
      },
      {
        name_es: "Camarones al Ajillo",
        name_en: "Garlic Shrimp",
        desc_es: "Camarones salteados, ajo confitado y pan tostado",
        desc_en: "Sautéed shrimp, confit garlic, toasted bread",
        price: 58000,
        subcategory_es: "Para Compartir",
        subcategory_en: "To Share",
      },
      {
        name_es: "Ceviche de Camarón",
        name_en: "Shrimp Ceviche",
        desc_es: "Camarón, leche de tigre cítrica, cebolla morada y cilantro",
        desc_en: "Shrimp, citrus leche de tigre, red onion, cilantro",
        price: 42000,
        subcategory_es: "Entradas y Ligeros",
        subcategory_en: "Starters & Light Bites",
      },
      {
        name_es: "Tostadas de Atún",
        name_en: "Tuna Tostadas",
        desc_es: "Atún sellado, aguacate, sésamo y alioli picante",
        desc_en: "Seared tuna, avocado, sesame, spicy aioli",
        price: 38000,
        subcategory_es: "Entradas y Ligeros",
        subcategory_en: "Starters & Light Bites",
      },
      {
        name_es: "Ensalada César con Pollo",
        name_en: "Chicken Caesar Salad",
        desc_es: "Pollo a la parrilla, parmesano, crocantes de tocineta",
        desc_en: "Grilled chicken, parmesan, bacon crisps",
        price: 34000,
        subcategory_es: "Entradas y Ligeros",
        subcategory_en: "Starters & Light Bites",
      },
      {
        name_es: "Hummus de la Casa",
        name_en: "House Hummus",
        desc_es: "Garbanzo, tahini, aceite de oliva y pan pita tostado",
        desc_en: "Chickpea, tahini, olive oil, toasted pita",
        price: 28000,
        subcategory_es: "Entradas y Ligeros",
        subcategory_en: "Starters & Light Bites",
      },
      {
        name_es: "Lomo Fino a la Parrilla",
        name_en: "Grilled Tenderloin",
        desc_es:
          "230g, puré de papa criolla, vegetales asados y salsa de vino tinto",
        desc_en: "230g, criolla potato purée, roasted vegetables, red wine jus",
        price: 98000,
        subcategory_es: "Platos Fuertes",
        subcategory_en: "Main Courses",
      },
      {
        name_es: "Risotto de Champiñones",
        name_en: "Wild Mushroom Risotto",
        desc_es: "Champiñones silvestres, parmesano añejo y aceite de trufa",
        desc_en: "Wild mushrooms, aged parmesan, truffle oil",
        price: 76000,
        subcategory_es: "Platos Fuertes",
        subcategory_en: "Main Courses",
      },
      {
        name_es: "Salmón a la Plancha",
        name_en: "Grilled Salmon",
        desc_es: "Salmón noruego, quinoa tricolor y beurre blanc",
        desc_en: "Norwegian salmon, tri-color quinoa, beurre blanc",
        price: 89000,
        subcategory_es: "Platos Fuertes",
        subcategory_en: "Main Courses",
      },
    ],
  },
  {
    id: "brunch",
    es: "Brunch",
    en: "Brunch",
    items: [
      {
        name_es: "Huevos Benedictinos",
        name_en: "Eggs Benedict",
        desc_es: "Muffin inglés, jamón serrano, huevo poché y salsa holandesa",
        desc_en: "English muffin, serrano ham, poached egg, hollandaise",
        price: 36000,
      },
      {
        name_es: "Pancakes de la Casa",
        name_en: "House Pancakes",
        desc_es: "Miel de maple, frutos rojos y mantequilla batida",
        desc_en: "Maple syrup, red berries, whipped butter",
        price: 28000,
      },
      {
        name_es: "Avocado Toast",
        name_en: "Avocado Toast",
        desc_es: "Pan de masa madre, aguacate, huevo poché y chili flakes",
        desc_en: "Sourdough, avocado, poached egg, chili flakes",
        price: 30000,
      },
      {
        name_es: "Bowl de Açaí",
        name_en: "Açaí Bowl",
        desc_es: "Açaí, granola artesanal, banano y frutos rojos",
        desc_en: "Açaí, house granola, banana, red berries",
        price: 26000,
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
    id: "shots",
    es: "Shots Premium (Selección)",
    en: "Premium Shots (Selection)",
    items: [
      {
        name_es: "Johnnie Walker Black Label",
        name_en: "Johnnie Walker Black Label",
        price: 28000,
        subcategory_es: "Whiskey",
        subcategory_en: "Whiskey",
      },
      {
        name_es: "The Macallan 12 Años Double Cask",
        name_en: "The Macallan 12 Years Double Cask",
        price: 58000,
        subcategory_es: "Whiskey",
        subcategory_en: "Whiskey",
      },
      {
        name_es: "Don Julio Blanco",
        name_en: "Don Julio Blanco",
        price: 45000,
        subcategory_es: "Tequila",
        subcategory_en: "Tequila",
      },
      {
        name_es: "Don Julio 70",
        name_en: "Don Julio 70",
        price: 79000,
        subcategory_es: "Tequila",
        subcategory_en: "Tequila",
      },
      {
        name_es: "Havana Club Especial",
        name_en: "Havana Club Especial",
        price: 26000,
        subcategory_es: "Ron",
        subcategory_en: "Rum",
      },
      {
        name_es: "Zacapa Centenario 23 Años",
        name_en: "Zacapa Centenario 23 Years",
        price: 55000,
        subcategory_es: "Ron",
        subcategory_en: "Rum",
      },
      {
        name_es: "Absolut Original",
        name_en: "Absolut Original",
        price: 25000,
        subcategory_es: "Vodka",
        subcategory_en: "Vodka",
      },
      {
        name_es: "Grey Goose Original",
        name_en: "Grey Goose Original",
        price: 40000,
        subcategory_es: "Vodka",
        subcategory_en: "Vodka",
      },
      {
        name_es: "Tanqueray London Dry",
        name_en: "Tanqueray London Dry",
        price: 45000,
        subcategory_es: "Ginebra",
        subcategory_en: "Gin",
      },
      {
        name_es: "Hendrick's",
        name_en: "Hendrick's",
        price: 55000,
        subcategory_es: "Ginebra",
        subcategory_en: "Gin",
      },
      {
        name_es: "Montelobos",
        name_en: "Montelobos",
        price: 42000,
        subcategory_es: "Mezcal",
        subcategory_en: "Mezcal",
      },
      {
        name_es: "400 Conejos",
        name_en: "400 Conejos",
        price: 65000,
        subcategory_es: "Mezcal",
        subcategory_en: "Mezcal",
      },
      {
        name_es: "Aguardiente Antioqueño Rojo",
        name_en: "Aguardiente Antioqueño Rojo",
        price: 15000,
        subcategory_es: "Aguardiente",
        subcategory_en: "Aguardiente",
      },
      {
        name_es: "Hennessy",
        name_en: "Hennessy",
        price: 45000,
        subcategory_es: "Cognac & Cremas",
        subcategory_en: "Cognac & Cream Liqueurs",
      },
      {
        name_es: "Baileys",
        name_en: "Baileys",
        price: 17000,
        subcategory_es: "Cognac & Cremas",
        subcategory_en: "Cognac & Cream Liqueurs",
      },
    ],
  },
  {
    id: "botellas",
    es: "Servicio de Botella (Selección)",
    en: "Bottle Service (Selection)",
    items: [
      {
        name_es: "Johnnie Walker Red Label",
        name_en: "Johnnie Walker Red Label",
        desc_es: "750 ml",
        desc_en: "750 ml",
        price: 340000,
        subcategory_es: "Whiskey",
        subcategory_en: "Whiskey",
      },
      {
        name_es: "Buchanan's 12 Años",
        name_en: "Buchanan's 12 Years",
        desc_es: "750 ml",
        desc_en: "750 ml",
        price: 480000,
        subcategory_es: "Whiskey",
        subcategory_en: "Whiskey",
      },
      {
        name_es: "The Macallan 12 Años Double Cask",
        name_en: "The Macallan 12 Years Double Cask",
        desc_es: "750 ml",
        desc_en: "750 ml",
        price: 780000,
        subcategory_es: "Whiskey",
        subcategory_en: "Whiskey",
      },
      {
        name_es: "Gran Centenario Reposado Plata",
        name_en: "Gran Centenario Reposado Plata",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 260000,
        subcategory_es: "Tequila",
        subcategory_en: "Tequila",
      },
      {
        name_es: "1800 Reposado",
        name_en: "1800 Reposado",
        desc_es: "750 ml",
        desc_en: "750 ml",
        price: 480000,
        subcategory_es: "Tequila",
        subcategory_en: "Tequila",
      },
      {
        name_es: "Don Julio 70",
        name_en: "Don Julio 70",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 890000,
        subcategory_es: "Tequila",
        subcategory_en: "Tequila",
      },
      {
        name_es: "Havana Club Especial",
        name_en: "Havana Club Especial",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 280000,
        subcategory_es: "Ron",
        subcategory_en: "Rum",
      },
      {
        name_es: "Ron Medellín 8 Años",
        name_en: "Ron Medellín 8 Years",
        desc_es: "750 ml",
        desc_en: "750 ml",
        price: 260000,
        subcategory_es: "Ron",
        subcategory_en: "Rum",
      },
      {
        name_es: "Zacapa Centenario 23 Años",
        name_en: "Zacapa Centenario 23 Years",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 870000,
        subcategory_es: "Ron",
        subcategory_en: "Rum",
      },
      {
        name_es: "Absolut Original",
        name_en: "Absolut Original",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 280000,
        subcategory_es: "Vodka",
        subcategory_en: "Vodka",
      },
      {
        name_es: "Grey Goose Original",
        name_en: "Grey Goose Original",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 550000,
        subcategory_es: "Vodka",
        subcategory_en: "Vodka",
      },
      {
        name_es: "Tanqueray London Dry",
        name_en: "Tanqueray London Dry",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 420000,
        subcategory_es: "Ginebra",
        subcategory_en: "Gin",
      },
      {
        name_es: "Bombay Sapphire",
        name_en: "Bombay Sapphire",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 480000,
        subcategory_es: "Ginebra",
        subcategory_en: "Gin",
      },
      {
        name_es: "Hendrick's",
        name_en: "Hendrick's",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 580000,
        subcategory_es: "Ginebra",
        subcategory_en: "Gin",
      },
      {
        name_es: "Mezcal Unión El Joven",
        name_en: "Mezcal Unión El Joven",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 430000,
        subcategory_es: "Mezcal",
        subcategory_en: "Mezcal",
      },
      {
        name_es: "Montelobos",
        name_en: "Montelobos",
        desc_es: "750 ml",
        desc_en: "750 ml",
        price: 530000,
        subcategory_es: "Mezcal",
        subcategory_en: "Mezcal",
      },
      {
        name_es: "Hennessy",
        name_en: "Hennessy",
        desc_es: "700 ml",
        desc_en: "700 ml",
        price: 600000,
        subcategory_es: "Cognac",
        subcategory_en: "Cognac",
      },
      {
        name_es: "Aguardiente Antioqueño Rojo",
        name_en: "Aguardiente Antioqueño Rojo",
        desc_es: "750 ml",
        desc_en: "750 ml",
        price: 180000,
        subcategory_es: "Aguardiente",
        subcategory_en: "Aguardiente",
      },
    ],
  },
  {
    id: "cervezas",
    es: "Cervezas",
    en: "Beers",
    items: [
      { name_es: "Club Colombia", name_en: "Club Colombia", price: 15000 },
      { name_es: "Corona", name_en: "Corona", price: 18000 },
      { name_es: "Stella Artois", name_en: "Stella Artois", price: 18000 },
      { name_es: "Michelob Ultra", name_en: "Michelob Ultra", price: 18000 },
      { name_es: "Duff", name_en: "Duff", price: 18000 },
      { name_es: "Schöfferhofer", name_en: "Schöfferhofer", price: 22000 },
      {
        name_es: "Estrella Galicia Especial",
        name_en: "Estrella Galicia Especial",
        price: 22000,
      },
      {
        name_es: "Erdinger Weissbier",
        name_en: "Erdinger Weissbier",
        price: 32000,
      },
      {
        name_es: "Innis & Gunn Caribbean Rum Cask",
        name_en: "Innis & Gunn Caribbean Rum Cask",
        price: 32000,
      },
    ],
  },
  {
    id: "bebidas",
    es: "Bebidas",
    en: "Soft Drinks",
    items: [
      { name_es: "Coca-Cola", name_en: "Coca-Cola", price: 10000 },
      { name_es: "Coca-Cola Zero", name_en: "Coca-Cola Zero", price: 10000 },
      { name_es: "Sprite", name_en: "Sprite", price: 10000 },
      { name_es: "Soda Bretaña", name_en: "Soda Bretaña", price: 10000 },
      { name_es: "Agua sin Gas", name_en: "Still Water", price: 10000 },
      { name_es: "Agua con Gas", name_en: "Sparkling Water", price: 10000 },
    ],
  },
  {
    id: "cafes",
    es: "Café",
    en: "Coffee",
    items: [
      { name_es: "Espresso", name_en: "Espresso", price: 7000 },
      { name_es: "Americano", name_en: "Americano", price: 8000 },
      { name_es: "Latte", name_en: "Latte", price: 12000 },
      { name_es: "Capuchino", name_en: "Cappuccino", price: 14000 },
      {
        name_es: "Capuchino Baileys",
        name_en: "Baileys Cappuccino",
        price: 25000,
      },
    ],
  },
];
