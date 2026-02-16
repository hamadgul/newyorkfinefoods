# How to Edit Menus

All menu data lives in a single file:

```
src/data/menus.ts
```

Open it in any text editor (VS Code, etc.) and follow the instructions below.

---

## Catering Menu

The catering menu is organized into **tabbed categories** (Appetizers, Mains, Desserts, Beverages). Each category has a list of items.

### Add a new dish

Find the category you want (e.g. `"Appetizers"`) and add a new line inside its `items` array:

```ts
{ name: "Your Dish Name", description: "Short description of ingredients/style" },
```

### Remove a dish

Delete the entire `{ name: "...", description: "..." },` line for that dish.

### Add a new category

Add a new object to the `cateringMenus` array:

```ts
{
  category: "Sides",
  items: [
    { name: "Truffle Fries", description: "Hand-cut fries, truffle oil, parmesan" },
  ],
},
```

### Rename a category

Change the `category` string (e.g. `"Appetizers"` → `"Starters"`). It automatically updates the tab label on the website.

---

## Pizza Truck Menu

The pizza menu is a flat list — no categories. Each item works the same way:

```ts
{ name: "Pizza Name", description: "Ingredients and description" },
```

Just add, edit, or remove lines from the `pizzaMenu` array.

---

## After Making Changes

1. Run `npm run dev` to preview locally at http://localhost:3000
2. Check the **Catering** page (`/catering`) and **Pizza Trucks** page (`/pizza-trucks`)
3. When you're happy, run `npm run build` to verify no errors
4. Deploy (push to GitHub → Vercel auto-deploys)

---

## File Quick Reference

| What               | Where                          |
|---------------------|-------------------------------|
| All menu items      | `src/data/menus.ts`           |
| Catering page       | `src/app/catering/page.tsx`   |
| Pizza Trucks page   | `src/app/pizza-trucks/page.tsx` |
| Menu display component | `src/components/sections/menu-section.tsx` |
| Testimonials        | `src/data/testimonials.ts`    |
| Team members        | `src/data/team.ts`            |
| Event types         | `src/data/events.ts`          |
| Contact info        | `src/lib/constants.ts`        |
