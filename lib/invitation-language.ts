export type InvitationLanguage = "ar" | "en";
export type InvitationSearchParams = Record<string,string|string[]|undefined>;
export function languageFromQuery(value:unknown):InvitationLanguage {
  return value === "en" ? "en" : "ar";
}
export function invitationMetadata(language:InvitationLanguage) {
  return {
    title:language==="ar"?"حسن علي جعفر | دعوة زفاف":"Hassan Ali Jaffer | Wedding Invitation",
    description:language==="ar"?"دعوة زفاف حسن علي جعفر · ٥ جمادى الأولى ١٤٤٨ هـ · الحسينية - قاعة المعالي":"Hassan Ali Jaffer’s wedding · 5 Jumada al-Awwal 1448 AH · Al Hussainiyah - Al Maali Hall",
  };
}
