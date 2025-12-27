/**
 * Shared FAQ data used by both the visual FAQ section and the FAQ schema
 * This ensures the displayed FAQs match the structured data for Google
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Jak moc jsou tyhle výpočty přesné",
    answer:
      "Sto procent jistoty ti nedá žádný model. Pracujeme s realistickými odhady a simulací mnoha možných budoucností. Cílem není trefit přesné číslo, ale ukázat, jaký je rozdíl mezi scénáři při rozumných předpokladech.",
  },
  {
    question: "Počítáte s inflací",
    answer:
      "Ano. Náklady na bydlení i některé další položky rostou v čase podle inflace. Ve výsledku ukazujeme hodnotu majetku v nominálních korunách, aby se ti to lépe četlo. V metodice najdeš i možnost pracovat s hodnotami očištěnými o inflaci.",
  },
  {
    question: "Jaké investice předpokládáte",
    answer:
      "Model předpokládá dlouhodobé investování do široce diverzifikovaných globálních akciových fondů podle tržní kapitalizace. Nekopíruje konkrétní produkt žádného poskytovatele, jde o obecný model výnosu globálního akciového trhu.",
  },
  {
    question: "Zohledňujete daně",
    answer:
      "Zohledňujeme daně tam, kde dávají při typickém použití smysl. U investic počítáme s dlouhodobým horizontem, kde v Česku často platí daňové osvobození po splnění časového testu. U nemovitostí zohledňujeme poplatky při prodeji. Detail najdeš v metodice.",
  },
];

