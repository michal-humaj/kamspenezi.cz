# Full Design Manual — kamspenezi.cz

> Poslední aktualizace: 15. 11. 2025. Jakákoli změna brandu nebo UI musí tuto verzi upravit jako první.

──────────────────────────────

## 1. Brand Positioning

- Seriózní, klidný, data-driven a důvěryhodný finanční poradce.  
- Inspirace: Wealthsimple, Wispr Flow, N26 (tone), Airbank clarity.  
- Design pilíře: calm/neutral/premium, editorial serif pro emoce, čistý sans pro UI, obrovský whitespace, minimum chromu, striktní scénářová semantika, nikdy playful/startup-cute, všechno dýchá.

──────────────────────────────

## 2. Typography

### 2.1 Typeface Stack
- **Headlines (H1–H3)**: Newsreader, optical size `opsz 36`, H1 weight 600–700, H2 weight 500. Pouze landing.  
- **Body & UI**: Figtree (400/500/600) pro kalkulačky, odstavce, labely, tlačítka, numeriku, tooltips, badgy, scénáře, tabulky.

### 2.2 Typo Scale (desktop → mobile přes clamp)
- **H1**: `font-size: clamp(44px, 6vw, 68px)`, line-height 1.1–1.15, max 12–15 slov.  
- **H2**: `clamp(34px, 4vw, 48px)`, line-height 1.2.  
- **Subtitle (hero)**: Figtree 18–20 px, line-height ~1.55, max 560 px, barva `text.default`.  
- **Body**: Figtree 16–18 px, line-height 1.55–1.65, max 620 px.  
- **Caption**: 14 px.  
- Žádné shadcn default typografie.

──────────────────────────────

## 3. Color System

### 3.1 Neutrals

| Token | Hex | Poznámka |
| --- | --- | --- |
| bg.page | #FAF9F7 | Globální pozadí |
| bg.alt | #F6F4F1 | Alternativní sekce |
| bg.card | #FFFFFF | Karty |
| bg.muted | #F0ECE7 | Metadata bloky |
| border.subtle | #E7E2DC | Default hranice |
| border.strong | #D5CFC8 | Silnější oddělení |
| border.input | #CFC9C2 | Inputs |
| text.default | #2A2724 | Primární text |
| text.secondary | #6B655E | Sekundární text |
| text.muted | #98928A | Potlačený text |

> Čistá bílá pouze pro `bg.card`.

### 3.2 Brand Accent

- `action.primaryBg` #1A1A1A (charcoal)  
- `action.primaryText` #FFFFFF  
- `action.secondaryBorder` #1A1A1A  
- Žádné jasné zelené, neon, gradienty, Tailwind barvy.

### 3.3 Scenario Colors (pouze scénářové kontexty)
- **Scenario A**: `scenarioA.main` #DDAF8E, `scenarioA.soft` #F4EAE2  
- **Scenario B**: `scenarioB.main` #9DB7FF, `scenarioB.soft` #E8EEFF  
- Povoleno jen pro badgy, graf série, markery, porovnávací karty.

### 3.4 Status Colors
- `error.main` #D64545  
- `warning.main` #D7A740  
- `info.main` #4A78D0  
- Použití: inputs, krátké text hinty. Žádné velké plochy.

──────────────────────────────

## 4. Spacing System

- **Desktop**: sekce top 120 px / bottom 96 px, speciální (hero, Pattern D) top 160 px.  
- **Mobile**: top 72 px, bottom 64 px.  
- **Interní**: card padding 32–40 px, comparison col gap 16–24 px, button vert 12–16 px, input vert 12 px.  
- Nikdy menší spacing.

──────────────────────────────

## 5. Layout Patterns (jediná povolená sada)

- **Pattern A – Hero**: min-height 85vh, `bg.page`, text max 560 px, H1 Newsreader, subtitle Figtree 18–20, CTA pod textem, comparison card vpravo (desktop) nebo pod (mobile), rozdělení 50/50 nebo 55/45.  
- **Pattern B – Standard section**: `bg.page`, spacing 120/96, H2 serif, text max 620 px, volitelná malá ikonka nad H2, žádné pill labely.  
- **Pattern C – Alt section**: `bg.alt`, stejné spacing, žádné scénářové barvy.  
- **Pattern D – Two-column feature**: top 160 px, text vlevo, ilustrace/karta vpravo.  
- **Pattern E – Narrow**: transparent background, padding 48 px top/bottom, pro metadata/disclaimers.  
- Cursor nesmí vymýšlet jiné layouty.

──────────────────────────────

## 6. Components

### 6.1 Buttons
- Primary: `action.primaryBg`, bílý text, radius 9999 px, padding 12–16 / 22–28, Figtree 500, bez ikon (pokud nejsou nutné).  
- Secondary: bílý podklad, 1 px `action.secondaryBorder`, stejné proporce.  
- Žádná jiná varianta.

### 6.2 Inputs
- `bg.card`, border 1 px `border.input`, radius 8 px, padding 12 px.  
- Label 14–15 px, `text.secondary`.  
- Focus ring: outline 2 px #4A78D0.

### 6.3 Slidery
- Track 4 px, aktivní `action.primaryBg`, neaktivní `border.subtle`.  
- Thumb 20–24 px kruh s tenkým bílým okrajem.  
- Vždy spárován s numerickým inputem.  
- Nikdy scénářové barvy.

### 6.4 Cards
- Hero comparison card: `bg.card`, border 1 px `border.subtle`, radius 20 px, padding 32–40 px, bez stínu, dvousloupec se scénářovými badge/markery.

### 6.5 Scenario badge
- Pilulka s `scenarioA.soft` / `scenarioB.soft`, dot = `scenarioA.main` / `scenarioB.main`, Figtree 500, používá se jen v porovnáních/grafech.

### 6.6 Chips
- Pouze neutrální (`bg.muted`, text.secondary, bez border, 12 px text). Jen metadata.

──────────────────────────────

## 7. Iconography

- Lucide, stroke 1.75–2 px, round caps, barva `text.secondary`, velikost 20–24 px.  
- Nikdy barevné scénářem.  
- Ikony uvnitř CTA jen při jasném významu.

──────────────────────────────

## 8. Illustration Style

- Soft 3D editorial (Wealthsimple). Teplé neutrální pozadí, minimum objektů, žádné postavy, žádné gradienty, měkké stíny, velký negative space.  
- Scénářové akcenty jen u vizuálního porovnání dvou cest.  
- **Nano Banana prompt**:  
  ```
  Soft 3D financial illustration, warm neutral background, minimal geometry, Wealthsimple style, gentle shadows, muted palette, no text, no people, lots of negative space, terracotta and slate-blue accents only for scenario objects.
  ```

──────────────────────────────

## 9. Charts

- Série = `scenarioA.main` + `scenarioB.main`.  
- Background bílý, grid = `border.subtle` na 30 % opacity, osa = `text.secondary`, bar radius 6 px.  
- Legenda = scenario badge, žádné pill.

──────────────────────────────

## 10. Forbidden Items

- Pills jako sekční nadpisy.  
- Tailwind gradienty, default shadcn shadows/cards, tailwind ringy mimo focus.  
- Jasné barvy, emoji, outline button mimo sekundární CTA.  
- Scénářové barvy jako background sekcí.  
- Více než jedna ilustrace v sekci.  
- Auto-generated section labels.  
- Zelené highlighty, startup-cute prvky.

──────────────────────────────

## 11. Bydlení Landing – doporučený flow

1. Hero (Pattern A) – serif H1, velký subtitle, černé CTA, comparison card vpravo, min-height 85vh.  
2. „Proč téhle kalkulačce můžeš věřit“ – Pattern B, dvousloupec.  
3. „Nájem není vyhazování peněz“ – Pattern C (`bg.alt`).  
4. „Jak kalkulačka funguje“ – Pattern D (text + ilustrace/karta).  
5. „Transparentní vzorce“ – Pattern E (metadata, sekundární CTA).

──────────────────────────────

## 12. Implementační pokyny

- Tailwind `theme.extend` musí obsahovat všechny výše uvedené tokeny (fonts, colors, spacing, radii, stíny).  
- Nikdy nepoužívat custom hex mimo definované proměnné.  
- shadcn komponenty se musí upravit, aby odpovídaly těmto pravidlům (žádné default varianty).  
- ScenarioBadge žije v `@/components/ui/scenario-badge` a musí používat nové barvy.  
- Každá nová sekce/komponenta vybírá Pattern A–E; cokoliv mimo potřebuje schválení.

──────────────────────────────

Manual complete.

