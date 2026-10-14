import { test, expect } from "@playwright/test";

test("todos los espacios coinciden con el catálogo y reinician la tanda", async ({ page }) => {
  await page.goto("/");
  for (const [label, total] of [["Cocinas", 13], ["Oficinas", 5], ["Salones", 3], ["Placares", 3], ["Diseños 3D", 1], ["Todos", 24]] as const) {
    const filter = page.locator("#trabajos").getByRole("button", { name: new RegExp(`^${label}`) });
    await filter.click();
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#galeria-trabajos li")).toHaveCount(Math.min(total, 6));
    await expect(page.locator("#trabajos [role=status]")).toContainText(`Mostrando ${Math.min(total, 6)} de ${total}`);
  }
});

test("imágenes reservan espacio, priorizan portada y difieren galería", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#inicio img");
  await expect(hero).toHaveAttribute("loading", "eager");
  await expect(hero).toHaveAttribute("fetchpriority", "high");
  await expect(hero).toHaveAttribute("srcset", /640w/);
  for (const image of await page.locator("#galeria-trabajos img").all()) {
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).toHaveAttribute("sizes", /vw/);
  }
  expect(await hero.evaluate((img) => img.parentElement!.getBoundingClientRect().height)).toBeGreaterThan(100);
});

test("controles de teclado tienen foco visible y tamaños cómodos", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 850 });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Abrir menú" });
  await open.focus();
  await page.keyboard.press("Enter");
  const close = page.getByRole("button", { name: "Cerrar menú" });
  await expect(close).toBeFocused();
  await expect(close).toHaveCSS("outline-style", "solid");
  await expect(close).toHaveCSS("outline-width", "2px");
  const size = await close.boundingBox();
  expect(size!.width).toBeGreaterThanOrEqual(44);
  expect(size!.height).toBeGreaterThanOrEqual(44);
  await page.keyboard.press("Escape");
  await expect(open).toBeFocused();
});

test("textos secundarios conservan contraste AA", async ({ page }) => {
  await page.goto("/");
  const colors = await page.evaluate(() => {
    const read = (selector: string) => getComputedStyle(document.querySelector(selector)!).color;
    return { light: read("#inicio .text-tinta"), dark: read("#nosotros .text-humo") };
  });
  const luminance = (rgb: number[]) => rgb.map((v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  const contrast = (foreground: string, background: number[]) => {
    const a = luminance(foreground.match(/\d+/g)!.slice(0, 3).map(Number));
    const b = luminance(background);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  };
  expect(contrast(colors.light, [243, 236, 223])).toBeGreaterThanOrEqual(4.5);
  expect(contrast(colors.dark, [28, 26, 24])).toBeGreaterThanOrEqual(4.5);
});

test.describe("pantalla táctil horizontal", () => {
  test.use({ viewport: { width: 844, height: 390 }, hasTouch: true });
  test("visor cambia de imagen con deslizamiento", async ({ page }) => {
    await page.goto("/");
    await page.locator("#galeria-trabajos li button").first().click();
    const dialog = page.getByRole("dialog");
    const area = await dialog.locator("img").boundingBox();
    expect(area).not.toBeNull();
    const session = await page.context().newCDPSession(page);
    const x = area!.x + area!.width * 0.7;
    const y = area!.y + area!.height / 2;
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x - 120, y }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(dialog).toContainText("2 / 24");
    await expect(dialog.getByRole("button", { name: "Cerrar visor" })).toBeVisible();
    await dialog.getByRole("button", { name: "Quiero algo similar" }).click();
    await expect(page.locator("#f-proyecto")).toHaveValue("Módulo de anafe y campana");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
});
