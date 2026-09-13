export interface MenuItem {
  name_es: string;
  name_en: string;
  desc_es: string;
  desc_en: string;
  // Optional: absent while a price is still pending confirmation with the
  // owner — MenuAccordion simply omits the price badge until it's set.
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
        desc_es:
          "El trago insignia de la casa en su versión más oscura y envolvente — carácter puro de PON Lounge.",
        desc_en:
          "The house's signature drink in its darkest, most immersive form — pure PON Lounge character.",
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
        name_es: "Cuba Libre",
        name_en: "Cuba Libre",
        desc_es:
          "Ron y cola con un toque de limón — el clásico caribeño directo y sin complicaciones.",
        desc_en:
          "Rum and cola with a splash of lime — the straightforward Caribbean classic.",
        price: 46000,
      },
      {
        name_es: "Mezcal Mule",
        name_en: "Mezcal Mule",
        desc_es:
          "Mezcal picante, cítrico y muy refrescante — servido en su icónico vaso de cobre.",
        desc_en:
          "Spicy, citrusy mezcal, very refreshing — served in its iconic copper mug.",
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
        name_es: "Caipiroska Fresa",
        name_en: "Strawberry Caipiroska",
        desc_es:
          "Vodka fresco y frutal con fresa — la versión suave de la caipirinha clásica.",
        desc_en:
          "Fresh, fruity vodka with strawberry — the smoother take on the classic caipirinha.",
        price: 46000,
      },
      {
        name_es: "Caipiroska Limón",
        name_en: "Lime Caipiroska",
        desc_es:
          "Vodka fresco y cítrico con limón adicionado — la versión suave de la caipirinha clásica.",
        desc_en:
          "Fresh, citrusy vodka with added lime — the smoother take on the classic caipirinha.",
        price: 46000,
      },
      {
        name_es: "Tamarindón Splash",
        name_en: "Tamarindón Splash",
        desc_es:
          "Trago tropical de tamarindo con un splash refrescante — dulce, ácido y con carácter.",
        desc_en:
          "Tropical tamarind drink with a refreshing splash — sweet, tart, and full of character.",
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
      {
        name_es: "Limoncello Spritz",
        name_en: "Limoncello Spritz",
        desc_es:
          "Limoncello italiano con burbujas y un toque cítrico intenso — fresco, dulce y con carácter mediterráneo.",
        desc_en:
          "Italian limoncello with bubbles and a bright citrus kick — fresh, sweet, and full of Mediterranean character.",
        price: 46000,
      },
      {
        name_es: "Copa de Sangría Tinto",
        name_en: "Red Sangria (Glass)",
        desc_es:
          "Vino tinto macerado con frutas — la copa clásica para compartir el momento.",
        desc_en:
          "Red wine steeped with fruit — the classic glass to share the moment.",
        price: 39000,
        subcategory_es: "Sangría",
        subcategory_en: "Sangria",
      },
      {
        name_es: "Copa de Sangría Rosé",
        name_en: "Rosé Sangria (Glass)",
        desc_es:
          "Vino rosé macerado con frutas — ligera, fresca y fácil de disfrutar.",
        desc_en:
          "Rosé wine steeped with fruit — light, fresh, and easy to enjoy.",
        price: 39000,
        subcategory_es: "Sangría",
        subcategory_en: "Sangria",
      },
      {
        name_es: "Jarra de Sangría Tinto",
        name_en: "Red Sangria (Pitcher)",
        desc_es:
          "La misma sangría tinto, en formato jarra para compartir en grupo.",
        desc_en: "The same red sangria, in a pitcher to share with the table.",
        price: 180000,
        subcategory_es: "Sangría",
        subcategory_en: "Sangria",
      },
      {
        name_es: "Jarra de Sangría Rosé",
        name_en: "Rosé Sangria (Pitcher)",
        desc_es:
          "La misma sangría rosé, en formato jarra para compartir en grupo.",
        desc_en: "The same rosé sangria, in a pitcher to share with the table.",
        price: 180000,
        subcategory_es: "Sangría",
        subcategory_en: "Sangria",
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
      {
        name_es: "Moscow Mule sin Licor",
        name_en: "Moscow Mule (Alcohol-Free)",
        desc_es:
          "Toda la chispa picante y cítrica del Moscow Mule clásico, sin una gota de alcohol — servido en su vaso de cobre.",
        desc_en:
          "All the spicy, citrusy kick of the classic Moscow Mule, without a drop of alcohol — served in its copper mug.",
        price: 33000,
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
    id: "licores",
    es: "Licores, Vinos y Bebidas",
    en: "Spirits, Wine & Beverages",
    items: [
      {
        name_es: "Copa de Vino Tinto Reserva",
        name_en: "Reserve Red Wine (Glass)",
        desc_es: "Selección de bodegas internacionales",
        desc_en: "Curated international selection",
        price: 38000,
      },
      {
        name_es: "Copa de Champagne",
        name_en: "Champagne Glass",
        desc_es: "Burbujas para celebrar cualquier ocasión",
        desc_en: "Bubbles to celebrate any occasion",
        price: 42000,
      },
      {
        name_es: "J.W Red Label",
        name_en: "J.W Red Label",
        desc_es: "Blended escocés, servido solo, con hielo o en las rocas",
        desc_en: "Blended Scotch, served neat, on the rocks, or with a splash",
        price: 40000,
      },
      {
        // Mismo precio que J.W Red Label por instrucción explícita del
        // cliente — son dos ítems distintos, no uno reemplaza al otro.
        name_es: "J.W Black Label",
        name_en: "J.W Black Label",
        desc_es: "Blended escocés, servido solo, con hielo o en las rocas",
        desc_en: "Blended Scotch, served neat, on the rocks, or with a splash",
        price: 40000,
      },
      {
        name_es: "Ron Añejo 7 Años",
        name_en: "7-Year Aged Rum",
        desc_es: "Ron colombiano añejado, notas a caramelo y roble",
        desc_en: "Colombian aged rum, caramel and oak notes",
        price: 38000,
      },
      {
        name_es: "Tequila Reposado",
        name_en: "Reposado Tequila",
        desc_es: "100% agave, añejado en barrica, servido en caballito",
        desc_en: "100% agave, barrel-aged, served in a caballito shot",
        price: 40000,
      },
      {
        name_es: "Vodka Premium",
        name_en: "Premium Vodka",
        desc_es: "Destilación múltiple, servido helado",
        desc_en: "Multiple-distilled, served ice cold",
        price: 36000,
      },
      {
        name_es: "Mezcal Artesanal",
        name_en: "Artisanal Mezcal",
        desc_es: "Ahumado, servido solo con naranja y sal de gusano",
        desc_en: "Smoky, served neat with orange and worm salt",
        price: 44000,
      },

      // --- Shots — pendiente confirmar precio salvo donde se indica ---
      {
        name_es: "Jameson",
        name_en: "Jameson",
        desc_es:
          "Whisky irlandés suave y versátil — el clásico infalible, solo o en las rocas.",
        desc_en:
          "Smooth, versatile Irish whiskey — the reliable classic, neat or on the rocks.",
        subcategory_es: "Shots",
        subcategory_en: "Shots",
      },
      {
        name_es: "J.W Blue Label",
        name_en: "J.W Blue Label",
        desc_es:
          "La cumbre de Johnnie Walker: blend ultra premium, sedoso y complejo.",
        desc_en:
          "The pinnacle of Johnnie Walker: an ultra-premium blend, silky and complex.",
        subcategory_es: "Shots",
        subcategory_en: "Shots",
      },
      {
        name_es: "Gran Centenario Reposado",
        name_en: "Gran Centenario Reposado",
        desc_es:
          "Tequila 100% agave reposado en barrica, suave y con notas a vainilla y roble.",
        desc_en:
          "100% agave tequila, barrel-rested, smooth with notes of vanilla and oak.",
        price: 28000,
        subcategory_es: "Shots",
        subcategory_en: "Shots",
      },
      {
        name_es: "Gran Centenario Plata",
        name_en: "Gran Centenario Plata",
        desc_es: "Tequila 100% agave sin añejar — puro, fresco y directo.",
        desc_en:
          "100% agave tequila, unaged — pure, fresh, and straightforward.",
        price: 25000,
        subcategory_es: "Shots",
        subcategory_en: "Shots",
      },
      {
        name_es: "Clase Azul Reposado",
        name_en: "Clase Azul Reposado",
        desc_es:
          "Tequila premium en su icónica botella de cerámica pintada a mano; reposado suave y elegante.",
        desc_en:
          "Premium tequila in its iconic hand-painted ceramic bottle; smooth, elegant reposado.",
        subcategory_es: "Shots",
        subcategory_en: "Shots",
      },
      {
        name_es: "Disaronno",
        name_en: "Disaronno",
        desc_es:
          "Licor italiano de almendras, dulce y aromático — solo, en las rocas o en cóctel.",
        desc_en:
          "Italian almond liqueur, sweet and aromatic — neat, on the rocks, or in a cocktail.",
        subcategory_es: "Shots",
        subcategory_en: "Shots",
      },
      {
        name_es: "Flor de Caña 12 Años",
        name_en: "Flor de Caña 12 Years",
        desc_es:
          "Ron nicaragüense añejado 12 años, notas a caramelo, roble y especias.",
        desc_en:
          "Nicaraguan rum aged 12 years, notes of caramel, oak, and spice.",
        subcategory_es: "Shots",
        subcategory_en: "Shots",
      },
      {
        name_es: "Buchanan's Pineapple",
        name_en: "Buchanan's Pineapple",
        desc_es:
          "Whisky escocés con infusión de piña — dulce, tropical y fácil de tomar.",
        desc_en:
          "Scotch whisky infused with pineapple — sweet, tropical, and easy-drinking.",
        subcategory_es: "Shots",
        subcategory_en: "Shots",
      },
      {
        name_es: "Viche Curao del Río",
        name_en: "Viche Curao del Río",
        desc_es:
          "Viche del Pacífico colombiano curado con frutas y hierbas de la región — historia y tradición en cada trago.",
        desc_en:
          "Pacific-coast Colombian viche cured with regional fruits and herbs — history and tradition in every pour.",
        subcategory_es: "Shots",
        subcategory_en: "Shots",
      },

      // --- Botellas — pendiente confirmar precio salvo donde se indica ---
      {
        name_es: "Jägermeister",
        name_en: "Jägermeister",
        desc_es:
          "Licor de hierbas alemán, intenso y con carácter — el infaltable de la noche.",
        desc_en:
          "German herbal liqueur, bold and full of character — a night-out staple.",
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },
      {
        name_es: "Jameson",
        name_en: "Jameson",
        desc_es:
          "Whisky irlandés suave y versátil — el clásico infalible, solo o en las rocas.",
        desc_en:
          "Smooth, versatile Irish whiskey — the reliable classic, neat or on the rocks.",
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },
      {
        name_es: "J.W Blue Label",
        name_en: "J.W Blue Label",
        desc_es:
          "La cumbre de Johnnie Walker: blend ultra premium, sedoso y complejo.",
        desc_en:
          "The pinnacle of Johnnie Walker: an ultra-premium blend, silky and complex.",
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },
      {
        name_es: "Gran Centenario Reposado",
        name_en: "Gran Centenario Reposado",
        desc_es:
          "Tequila 100% agave reposado en barrica, suave y con notas a vainilla y roble.",
        desc_en:
          "100% agave tequila, barrel-rested, smooth with notes of vanilla and oak.",
        price: 280000,
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },
      {
        name_es: "Gran Centenario Plata",
        name_en: "Gran Centenario Plata",
        desc_es: "Tequila 100% agave sin añejar — puro, fresco y directo.",
        desc_en:
          "100% agave tequila, unaged — pure, fresh, and straightforward.",
        price: 260000,
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },
      {
        name_es: "Clase Azul Reposado",
        name_en: "Clase Azul Reposado",
        desc_es:
          "Tequila premium en su icónica botella de cerámica pintada a mano; reposado suave y elegante.",
        desc_en:
          "Premium tequila in its iconic hand-painted ceramic bottle; smooth, elegant reposado.",
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },
      {
        name_es: "Disaronno",
        name_en: "Disaronno",
        desc_es:
          "Licor italiano de almendras, dulce y aromático — solo, en las rocas o en cóctel.",
        desc_en:
          "Italian almond liqueur, sweet and aromatic — neat, on the rocks, or in a cocktail.",
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },
      {
        name_es: "Flor de Caña 12 Años",
        name_en: "Flor de Caña 12 Years",
        desc_es:
          "Ron nicaragüense añejado 12 años, notas a caramelo, roble y especias.",
        desc_en:
          "Nicaraguan rum aged 12 years, notes of caramel, oak, and spice.",
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },
      {
        name_es: "Buchanan's Pineapple",
        name_en: "Buchanan's Pineapple",
        desc_es:
          "Whisky escocés con infusión de piña — dulce, tropical y fácil de tomar.",
        desc_en:
          "Scotch whisky infused with pineapple — sweet, tropical, and easy-drinking.",
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },
      {
        name_es: "Viche Curao del Río",
        name_en: "Viche Curao del Río",
        desc_es:
          "Viche del Pacífico colombiano curado con frutas y hierbas de la región — historia y tradición en cada trago.",
        desc_en:
          "Pacific-coast Colombian viche cured with regional fruits and herbs — history and tradition in every pour.",
        subcategory_es: "Botellas",
        subcategory_en: "Bottles",
      },

      // --- Media botella — pendiente confirmar precio ---
      {
        name_es: "Jägermeister",
        name_en: "Jägermeister",
        desc_es:
          "Licor de hierbas alemán, intenso y con carácter — el infaltable de la noche.",
        desc_en:
          "German herbal liqueur, bold and full of character — a night-out staple.",
        subcategory_es: "Media Botella",
        subcategory_en: "Half Bottle",
      },
      {
        name_es: "Viche Curao del Río",
        name_en: "Viche Curao del Río",
        desc_es:
          "Viche del Pacífico colombiano curado con frutas y hierbas de la región — historia y tradición en cada trago.",
        desc_en:
          "Pacific-coast Colombian viche cured with regional fruits and herbs — history and tradition in every pour.",
        subcategory_es: "Media Botella",
        subcategory_en: "Half Bottle",
      },

      // --- Bebidas y mixers — pendiente confirmar precio ---
      {
        name_es: "Red Bull",
        name_en: "Red Bull",
        desc_es: "Energizante para acompañar tu trago.",
        desc_en: "Energy drink to mix with your spirit.",
        subcategory_es: "Bebidas y Mixers",
        subcategory_en: "Mixers & Soft Drinks",
      },
      {
        name_es: "Gatorade",
        name_en: "Gatorade",
        desc_es: "Bebida hidratante, ideal para refrescar entre tragos.",
        desc_en: "Sports drink, great for refreshing between rounds.",
        subcategory_es: "Bebidas y Mixers",
        subcategory_en: "Mixers & Soft Drinks",
      },
      {
        name_es: "Canada Dry",
        name_en: "Canada Dry",
        desc_es: "Ginger ale burbujeante, el mixer clásico para whisky y ron.",
        desc_en: "Bubbly ginger ale, the classic mixer for whisky and rum.",
        subcategory_es: "Bebidas y Mixers",
        subcategory_en: "Mixers & Soft Drinks",
      },
      {
        name_es: "Servicio de Michelada",
        name_en: "Michelada Service",
        desc_es:
          "Preparación michelada para tu cerveza — sal, limón y salsas de la casa.",
        desc_en: "Michelada prep for your beer — salt, lime, and house sauces.",
        price: 5000,
        subcategory_es: "Bebidas y Mixers",
        subcategory_en: "Mixers & Soft Drinks",
      },

      // --- Café ---
      {
        name_es: "Café Espresso",
        name_en: "Espresso",
        desc_es: "Café espresso intenso y concentrado, tal como debe ser.",
        desc_en: "Bold, concentrated espresso, exactly as it should be.",
        price: 7000,
        subcategory_es: "Café",
        subcategory_en: "Coffee",
      },
      {
        name_es: "Café Americano",
        name_en: "Americano",
        desc_es: "Espresso alargado con agua caliente — suave y aromático.",
        desc_en: "Espresso lengthened with hot water — smooth and aromatic.",
        price: 8000,
        subcategory_es: "Café",
        subcategory_en: "Coffee",
      },
      {
        name_es: "Café Latte",
        name_en: "Latte",
        desc_es: "Espresso con leche vaporizada — cremoso y equilibrado.",
        desc_en: "Espresso with steamed milk — creamy and balanced.",
        price: 12000,
        subcategory_es: "Café",
        subcategory_en: "Coffee",
      },
      {
        name_es: "Café Capuchino",
        name_en: "Cappuccino",
        desc_es:
          "Espresso, leche vaporizada y espuma en proporciones clásicas.",
        desc_en: "Espresso, steamed milk, and foam in classic proportions.",
        price: 14000,
        subcategory_es: "Café",
        subcategory_en: "Coffee",
      },
      {
        name_es: "Café Capuchino Baileys",
        name_en: "Baileys Cappuccino",
        desc_es: "Capuchino clásico con un toque de crema de whiskey Baileys.",
        desc_en: "Classic cappuccino with a splash of Baileys Irish cream.",
        price: 25000,
        subcategory_es: "Café",
        subcategory_en: "Coffee",
      },

      // --- Cold Brew — pendiente confirmar precio ---
      {
        name_es: "Cold Brew",
        name_en: "Cold Brew",
        desc_es: "Café frío de extracción lenta, suave e intenso en sabor.",
        desc_en: "Slow-extracted cold brew coffee, smooth and full-flavored.",
        subcategory_es: "Café",
        subcategory_en: "Coffee",
      },
      {
        name_es: "Cold Brew Latte",
        name_en: "Cold Brew Latte",
        desc_es:
          "Cold brew con un toque cremoso de leche — suave y equilibrado.",
        desc_en: "Cold brew with a creamy touch of milk — smooth and balanced.",
        subcategory_es: "Café",
        subcategory_en: "Coffee",
      },
      {
        name_es: "Cold Brew Soda",
        name_en: "Cold Brew Soda",
        desc_es:
          "Cold brew refrescado con soda — ligero, burbujeante y con toda la fuerza del café.",
        desc_en:
          "Cold brew topped with soda — light, fizzy, and full of coffee kick.",
        subcategory_es: "Café",
        subcategory_en: "Coffee",
      },
      {
        name_es: "Cold Brew Naranja",
        name_en: "Orange Cold Brew",
        desc_es:
          "Cold brew con un giro cítrico de naranja — combinación inesperada y refrescante.",
        desc_en:
          "Cold brew with a citrusy orange twist — an unexpected, refreshing combo.",
        subcategory_es: "Café",
        subcategory_en: "Coffee",
      },
    ],
  },
];
