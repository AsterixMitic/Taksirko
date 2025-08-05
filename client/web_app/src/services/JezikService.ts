

export function nazivJezikaNaSrpskom(iso639_2: string): string {
  const mapaJezika: Record<string, string> = {
    eng: "Engleski",
    srp: "Srpski",
    deu: "Nemački",
    ger: "Nemački",
    fra: "Francuski",
    fre: "Francuski",
    spa: "Španski",
    ita: "Italijanski",
    rus: "Ruski",
    zho: "Kineski",
    chi: "Kineski",
    jpn: "Japanski",
    ara: "Arapski",
    por: "Portugalski",
    tur: "Turski",
    nld: "Holandski",
    dut: "Holandski",
    hrv: "Hrvatski",
    bos: "Bosanski",
    slv: "Slovenački",
    hun: "Mađarski",
    ell: "Grčki",
    gre: "Grčki",
    kor: "Korejski"
  };

  const kod = iso639_2.toLowerCase();
  return mapaJezika[kod] || iso639_2;
}