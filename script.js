const translations = {
  en: {
    name: "WANG Xiangtian",
    subtitle: "This is my homepage.",
    nav_notes: "Notes",
    nav_about: "About me",
    nav_contact: "Contact me",
    nav_record: "Life record",
    notes_title: "Notes",
    notes_text: "Today I started my own homepage. (2026.02.27)",
    about_title: "About me",
    about_text:
      "I'm from Taizhou, Jiangsu, China. I studied Information Science in Ritsumeikan University (2022.04–2026.03). I'm now living in Kansai.",
    contact_title: "Contact me",
    email_label: "Email:",
    email_value: "adawongcool@email.com"
  },

  ja: {
    name: "王 相田（おう そうでん）",
    subtitle: "これは私のホームページです。",
    nav_notes: "ノート",
    nav_about: "自己紹介",
    nav_contact: "お問い合わせ",
    nav_record: "日常",
    notes_title: "ノート",
    notes_text: "本日、自分のホームページを作り始めました。（2026.02.27）",
    about_title: "自己紹介",
    about_text:
      "中国・江蘇省泰州市出身です。立命館大学情報理工学部で学びました（2022.04–2026.03）。現在は関西に住んでいます。",
    contact_title: "お問い合わせ",
    email_label: "メール：",
    email_value: "adawongcool@email.com"
  }
};

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = (lang === "en") ? "日本語" : "EN";

  document.documentElement.lang = lang;

  localStorage.setItem("lang", lang);
}

function toggleLanguage() {
  const current = localStorage.getItem("lang") || "en";
  const next = (current === "en") ? "ja" : "en";
  applyLanguage(next);
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang") || "en";
  applyLanguage(saved);

  const btn = document.getElementById("langBtn");
  if (btn) btn.addEventListener("click", toggleLanguage);
});