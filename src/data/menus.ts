/**
 * ============================================================
 *  MENU DATA — Edit this file to update menus across the site
 * ============================================================
 *
 *  HOW TO EDIT:
 *
 *  1. Each menu item has two fields:
 *       name:        The dish name shown as a heading
 *       description: A short description shown below it
 *
 *  2. Catering menus are organized by category tabs:
 *       "Appetizers", "Mains", "Desserts", "Beverages"
 *       — You can rename, add, or remove categories freely.
 *       — Just add/remove objects from the arrays below.
 *
 *  3. Pizza menu is a flat list (no categories).
 *
 *  4. After editing, run `npm run dev` to preview your changes
 *     or `npm run build` to verify everything compiles.
 *
 *  EXAMPLE — Adding a new appetizer:
 *     { name: "Your Dish Name", description: "Brief description of the dish" },
 *
 *  EXAMPLE — Adding a new category to catering:
 *     { category: "Sides", items: [ { name: "...", description: "..." } ] },
 *
 * ============================================================
 */

export interface MenuItem {
  name: string;
  description: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export const cateringMenus: MenuCategory[] = [
  {
    category: "Appetizers",
    items: [
      { name: "Truffle Arancini", description: "Crispy risotto balls with black truffle and parmesan cream" },
      { name: "Tuna Tartare", description: "Yellowfin tuna, avocado mousse, citrus ponzu, wonton crisps" },
      { name: "Burrata & Heirloom Tomato", description: "Creamy burrata, vine-ripened tomatoes, basil oil, aged balsamic" },
      { name: "Beef Carpaccio", description: "Thinly sliced filet mignon, arugula, shaved parmesan, caper aioli" },
      { name: "Shrimp Cocktail Tower", description: "Jumbo shrimp, classic cocktail sauce, lemon, mignonette" },
      { name: "Fig & Prosciutto Crostini", description: "Whipped ricotta, honey drizzle, microgreens on toasted sourdough" },
    ],
  },
  {
    category: "Mains",
    items: [
      { name: "Pan-Seared Salmon", description: "Atlantic salmon, lemon beurre blanc, roasted asparagus, fingerling potatoes" },
      { name: "Braised Short Ribs", description: "Red wine-braised beef short ribs, creamy polenta, gremolata" },
      { name: "Herb-Crusted Rack of Lamb", description: "New Zealand lamb, mint chimichurri, roasted root vegetables" },
      { name: "Lobster Risotto", description: "Maine lobster, saffron risotto, mascarpone, fresh herbs" },
      { name: "Chicken Milanese", description: "Golden-crusted chicken breast, arugula salad, cherry tomatoes, lemon" },
      { name: "Wild Mushroom Ravioli", description: "House-made pasta, porcini cream sauce, truffle oil, pecorino" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Tiramisu", description: "Classic Italian layered espresso mascarpone, cocoa dusted" },
      { name: "Creme Brulee", description: "Tahitian vanilla custard, caramelized sugar, fresh berries" },
      { name: "Chocolate Fondant", description: "Warm dark chocolate cake, molten center, vanilla gelato" },
      { name: "Cannoli Station", description: "Fresh-filled ricotta cannoli with chocolate chips, pistachios" },
      { name: "Seasonal Fruit Tart", description: "Buttery pastry shell, pastry cream, glazed seasonal fruits" },
    ],
  },
  {
    category: "Beverages",
    items: [
      { name: "Signature Cocktails", description: "Customized cocktail menu tailored to your event theme" },
      { name: "Wine Service", description: "Curated selection of Italian and domestic wines" },
      { name: "Craft Mocktails", description: "Fresh-pressed juices, herbs, sparkling water creations" },
      { name: "Espresso Bar", description: "Full-service espresso station with barista" },
      { name: "Artisan Lemonade", description: "House-made with fresh lemons, lavender, or berry infusions" },
    ],
  },
];

export const pizzaMenu: MenuItem[] = [
  { name: "Margherita Classica", description: "San Marzano tomatoes, fresh mozzarella, basil, olive oil" },
  { name: "Pepperoni & Honey", description: "Cup-and-char pepperoni, mozzarella, hot honey drizzle" },
  { name: "Truffle Mushroom", description: "Wild mushroom medley, fontina, truffle oil, fresh thyme" },
  { name: "Prosciutto & Arugula", description: "Prosciutto di Parma, arugula, shaved parmesan, lemon" },
  { name: "BBQ Chicken", description: "Smoked chicken, red onion, cilantro, house BBQ sauce" },
  { name: "Spicy Sausage", description: "Italian sausage, roasted peppers, caramelized onions, chili flakes" },
  { name: "Quattro Formaggi", description: "Mozzarella, gorgonzola, fontina, pecorino romano" },
  { name: "Seasonal Special", description: "Chef's rotating creation with seasonal ingredients" },
];
