import { test, expect, type Page } from "@playwright/test";

const browserErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(async ({ page }) => { expect(browserErrors.get(page)).toEqual([]); });

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
async function anchorVisible(page: Page, id: string) {
  await expect.poll(() => page.locator(id).evaluate((el) => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(72);
  await expect.poll(() => page.locator(id).evaluate((el) => el.getBoundingClientRect().top)).toBeLessThan(250);
}
async function interceptWhatsApp(page: Page) {
  await page.evaluate(() => {
    const target = window as typeof window & { openedUrl?: string };
    window.open = (url) => { target.openedUrl = String(url); return null; };
  });
}

for (const width of [320, 390, 768, 1024, 1440]) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 850 } });
    test.beforeEach(async ({ page }) => { await page.goto("/"); await expect(page.locator("h1")).toBeVisible(); });
    test.afterEach(async ({ page }) => { await noOverflow(page); });

    test("presupuesto y anclas conservan títulos visibles", async ({ page }) => {
      for (const link of await page.getByRole("link", { name: "Pedir presupuesto", exact: true }).all()) await expect(link).toHaveAttribute("href", "#presupuesto");
      await page.locator("#inicio").getByRole("link", { name: "Pedir presupuesto", exact: true }).click();
      await anchorVisible(page, "#presupuesto-titulo");
      await page.locator("footer").getByRole("link", { name: "Volver arriba" }).click();
      await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
    });

    test("filtros y carga progresiva actualizan cantidades y foco", async ({ page }) => {
      const gallery = page.locator("#trabajos");
      await expect(gallery.getByRole("status")).toContainText("Mostrando 6 de 24 trabajos reales");
      for (const count of [12, 18, 24]) {
        const next = page.locator("#galeria-trabajos li button").count();
        const previous = await next;
        await gallery.getByRole("button", { name: /Mostrar más/ }).click();
        await expect(page.locator("#galeria-trabajos li")).toHaveCount(count);
        await expect(page.locator("#galeria-trabajos li button").nth(previous)).toBeFocused();
        await expect(gallery.getByRole("status")).toContainText(`Mostrando ${count} de 24`);
      }
      await expect(gallery.getByRole("button", { name: /Mostrar más/ })).toHaveCount(0);
      await gallery.getByRole("button", { name: /^Oficinas/ }).click();
      await expect(gallery.getByRole("status")).toContainText("Mostrando 5 de 5");
      await expect(page.locator("#galeria-trabajos li")).toHaveCount(5);
      await gallery.getByRole("button", { name: /^Todos/ }).click();
      await expect(page.locator("#galeria-trabajos li")).toHaveCount(6);
      await gallery.getByRole("button", { name: /^Diseños 3D/ }).click();
      await expect(gallery.getByRole("status")).toContainText("Mostrando 1 de 1 diseños 3D");
      await expect(page.locator("#galeria-trabajos li")).toHaveCount(1);
      await expect(page.locator("#galeria-trabajos")).toContainText("Diseño 3D");
    });

    test("visor contiene foco, navega el filtro y restaura el foco", async ({ page }) => {
      await page.locator("#trabajos").getByRole("button", { name: /^Oficinas/ }).click();
      const opener = page.locator("#galeria-trabajos li button").first();
      await opener.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog.getByRole("button", { name: "Cerrar visor" })).toBeFocused();
      await expect(dialog).toContainText("1 / 5");
      await page.keyboard.press("ArrowRight");
      await expect(dialog).toContainText("2 / 5");
      await page.keyboard.press("ArrowLeft");
      await expect(dialog).toContainText("1 / 5");
      await dialog.getByRole("button", { name: "Foto anterior" }).click();
      await expect(dialog).toContainText("5 / 5");
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press(i < 4 ? "Tab" : "Shift+Tab");
        expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
      }
      expect(await page.locator("#f-nombre").evaluate((input) => { (input as HTMLElement).focus(); return document.activeElement === input; })).toBe(false);
      await expect(dialog.locator("img")).toHaveCSS("object-fit", "contain");
      await expect(dialog.locator("img")).toHaveAttribute("alt", /.+/);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
    });

    test("referencia de proyecto es editable y no borra el borrador", async ({ page }) => {
      await page.locator("#f-nombre").fill("Facundo");
      await page.locator("#f-mensaje").fill("Necesito guardado para libros.");
      await page.locator("#f-medidas").fill("3 m × 2,40 m");
      await page.locator("#f-espacio").selectOption("Placard / vestidor");
      await page.locator("#galeria-trabajos li button").first().click();
      await page.getByRole("dialog").getByRole("button", { name: "Quiero algo similar" }).click();
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(page.locator("#f-proyecto")).toBeFocused();
      await expect(page.locator("#f-proyecto")).toHaveValue("Escritorio directorio");
      await expect(page.locator("#f-mensaje")).toHaveValue("Necesito guardado para libros.");
      await expect(page.locator("#f-nombre")).toHaveValue("Facundo");
      await expect(page.locator("#f-medidas")).toHaveValue("3 m × 2,40 m");
      await expect(page.locator("#f-espacio")).toHaveValue("Placard / vestidor");
      await page.locator("#f-proyecto").fill("Escritorio con más estantes");
      await interceptWhatsApp(page);
      await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
      const url = new URL(await page.evaluate(() => (window as typeof window & { openedUrl: string }).openedUrl));
      expect(url.pathname).toBe("/595982170272");
      expect(url.searchParams.get("text")).toContain("• Proyecto de referencia: Escritorio con más estantes");
      expect(url.searchParams.get("text")).toContain("• Mensaje: Necesito guardado para libros.");
      await expect(page.locator("#presupuesto [role=status]")).toContainText("Mensaje preparado");
    });

    test("errores específicos conservan campos y mensaje de WhatsApp", async ({ page }) => {
      await interceptWhatsApp(page);
      await page.locator("#f-mensaje").fill("Quiero una cocina clara & práctica.\nCon cajones.");
      await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
      await expect(page.locator("#f-nombre")).toBeFocused();
      await expect(page.locator("#f-nombre")).toHaveAttribute("aria-invalid", "true");
      await expect(page.locator("#f-nombre")).toHaveAttribute("aria-describedby", /nombre-error/);
      await expect(page.locator("#nombre-error")).toContainText("Escribí tu nombre");
      await expect(page.locator("#espacio-error")).toContainText("Elegí el tipo");
      await expect(page.locator("#f-mensaje")).toHaveValue("Quiero una cocina clara & práctica.\nCon cajones.");
      expect(await page.evaluate(() => (window as typeof window & { openedUrl?: string }).openedUrl)).toBeUndefined();
      await page.locator("#f-nombre").fill("   ");
      await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
      await expect(page.locator("#f-nombre")).toBeFocused();
      await page.locator("#f-nombre").fill("  José Pérez  ");
      await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
      await expect(page.locator("#f-espacio")).toBeFocused();
      await page.locator("#f-espacio").selectOption("Cocina");
      await page.locator("#f-contacto").selectOption("595992948128");
      await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
      const url = new URL(await page.evaluate(() => (window as typeof window & { openedUrl: string }).openedUrl));
      expect(url.origin).toBe("https://wa.me");
      expect(url.pathname).toBe("/595992948128");
      expect(url.searchParams.get("text")).toContain("• Nombre: José Pérez");
      expect(url.searchParams.get("text")).toContain("• Espacio: Cocina");
      expect(url.searchParams.get("text")).toContain("Quiero una cocina clara & práctica.\nCon cajones.");
      await expect(page.locator("#presupuesto [role=status]")).not.toContainText("consulta enviada");
      await expect(page.locator("#f-nombre")).toHaveValue("  José Pérez  ");
    });

    test("menú navega, cierra y funciona en pantallas bajas", async ({ page }) => {
      test.skip(width >= 1024, "Menú de escritorio en este ancho");
      await page.setViewportSize({ width, height: 360 });
      const toggle = page.getByRole("button", { name: "Abrir menú" });
      await toggle.click();
      const menu = page.getByRole("dialog", { name: "Menú", exact: true });
      await expect(menu).toBeVisible();
      await expect(menu.getByRole("button", { name: "Cerrar menú" })).toBeFocused();
      for (let i = 0; i < 12; i++) {
        await page.keyboard.press("Tab");
        expect(await menu.evaluate((d) => d.contains(document.activeElement))).toBe(true);
      }
      await page.keyboard.press("Escape");
      await expect(menu).toHaveCount(0);
      await expect(toggle).toBeFocused();
      await toggle.click();
      await menu.getByRole("link", { name: "Presupuesto", exact: true }).click();
      await expect(menu).toHaveCount(0);
      await anchorVisible(page, "#presupuesto-titulo");
      await toggle.click();
      await menu.getByRole("button", { name: "Cerrar menú" }).click();
      await expect(toggle).toBeFocused();
    });
  });
}

test("movimiento reducido mantiene contenido e imágenes visibles", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#inicio").getByRole("link", { name: "Ver trabajos" }).click();
  await anchorVisible(page, "#trabajos-titulo");
  for (const id of ["#nosotros-titulo", "#proceso-titulo", "#presupuesto-titulo"]) await expect(page.locator(id)).toHaveCSS("opacity", "1");
  await expect(page.locator("#ventajas li")).toHaveCount(4);
  await page.locator("#galeria-trabajos li button").first().click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await noOverflow(page);
});

test("el render conserva su contexto y la imagen principal carga", async ({ page }) => {
  await page.goto("/");
  await expect.poll(() => page.locator("#inicio img").evaluate((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
  await page.locator("#trabajos").getByRole("button", { name: /^Diseños 3D/ }).click();
  await page.locator("#galeria-trabajos button").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("Diseño 3D · Propuesta");
  await expect(dialog.getByRole("button", { name: "Foto siguiente" })).toHaveCount(0);
  await dialog.getByRole("button", { name: "Quiero algo similar" }).click();
  await expect(page.locator("#f-proyecto")).toHaveValue("Cocina con isla integrada (Diseño 3D)");
  await expect(page.locator("#f-espacio")).toHaveValue("Cocina");
});
