export interface MenuItem {
  name_es: string;
  name_en: string;
  desc_es: string;
  desc_en: string;
  price: number;
}

export interface MenuCategory {
  id: string;
  es: string;
  en: string;
  items: MenuItem[];
}

// Sample menu — replace with PON Lounge's real menu when available.
// Kept as a typed data module (rather than hardcoded JSX) so it can later
// be swapped for a CMS/API fetch without touching the rendering components.
export const menu: MenuCategory[] = [
  {
    id: "cocteles",
    es: "Cócteles de Autor",
    en: "Signature Cocktails",
    items: [
      {
        name_es: "Old Fashioned de la Casa",
        name_en: "House Old Fashioned",
        desc_es:
          "Whisky reposado, azúcar quemada, bitter de naranja y ralladura de cacao",
        desc_en: "Aged whisky, charred sugar, orange bitters, cocoa zest",
        price: 48000,
      },
      {
        name_es: "Golden Martini",
        name_en: "Golden Martini",
        desc_es: "Vodka premium, licor de flor de saúco y un toque cítrico",
        desc_en: "Premium vodka, elderflower liqueur, a citrus touch",
        price: 46000,
      },
      {
        name_es: "Negroni Especial",
        name_en: "Special Negroni",
        desc_es: "Gin, vermut rosso, Campari y twist de naranja",
        desc_en: "Gin, sweet vermouth, Campari, orange twist",
        price: 44000,
      },
      {
        name_es: "Espresso Signature",
        name_en: "Espresso Signature",
        desc_es: "Vodka, espresso, licor de café y espuma cremosa",
        desc_en: "Vodka, espresso, coffee liqueur, creamy foam",
        price: 45000,
      },
    ],
  },
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
