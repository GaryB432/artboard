<script lang="ts">
  import { ranger } from "$lib/utilities";

  const adjectives = [
    "abundant",
    "able",
    "achieving",
    "active",
    "adaptable",
    "admirable",
    "adventurous",
    "affectionate",
    "agreeable",
    "alert",
    "alive",
    "alluring",
    "ambitious",
    "amiable",
    "amused",
    "analytical",
    "angelic",
    "appreciative",
    "ardent",
    "aspiring",
    "assertive",
    "athletic",
    "attentive",
    "bold",
    "brilliant",
    "calm",
    "caring",
    "cautious",
    "charming",
    "cheerful",
    "clever",
    "cooperative",
    "creative",
    "curious",
    "decisive",
    "determined",
    "different",
    "dignified",
    "discreet",
    "dutiful",
    "dynamic",
    "earnest",
    "efficient",
    "elegant",
    "empathetic",
    "enthusiastic",
    "energetic",
    "enthusiastic",
    "equitable",
    "exciting",
    "expert",
    "fair",
    "faithful",
    "famous",
    "fashionable",
    "fearless",
    "generous",
    "gentle",
    "gifted",
    "good",
    "gracious",
    "happy",
    "hard-working",
    "helpful",
    "honest",
    "hopeful",
    "hospitable",
    "humorous",
    "idealistic",
    "imaginative",
    "impartial",
    "independent",
    "intelligent",
    "interesting",
    "inventive",
    "involved",
    "just",
    "kind",
    "knowledgeable",
    "loyal",
    "lovely",
    "magnificent",
    "majestic",
    "mature",
    "modest",
    "motivated",
    "musical",
    "natural",
    "neat",
    "nice",
    "noble",
    "optimistic",
    "organized",
    "passionate",
    "patient",
    "perfect",
    "persistent",
    "pleasant",
    "polite",
    "positive",
    "practical",
    "proactive",
    "productive",
    "punctual",
    "reliable",
    "respectful",
    "responsible",
    "romantic",
    "safe",
    "sassy",
    "sensitive",
    "sharp",
    "sincere",
    "sociable",
    "spiritual",
    "spontaneous",
    "strong",
    "successful",
    "sweet",
    "talented",
    "thankful",
    "thoughtful",
    "tidy",
    "trusting",
    "understanding",
    "unique",
    "upbeat",
    "valuable",
    "versatile",
    "victorious",
    "virtuous",
    "vivacious",
    "wise",
    "witty",
    "wonderful",
    "young",
  ];
  const nouns = [
    "ability",
    "abundance",
    "ache",
    "acid",
    "address",
    "adjective",
    "adventure",
    "advice",
    "affair",
    "aftermath",
    "age",
    "agent",
    "agreement",
    "air",
    "alarm",
    "alcohol",
    "algebra",
    "alien",
    "allergy",
    "alley",
    "amount",
    "amusement",
    "anger",
    "animal",
    "ankle",
    "answer",
    "ant",
    "anxiety",
    "apology",
    "apple",
    "appliance",
    "approval",
    "apricot",
    "arch",
    "argument",
    "arm",
    "army",
    "artichoke",
    "art",
    "artery",
    "artist",
    "ash",
    "ashes",
    "asymmetry",
    "atmosphere",
    "attack",
    "attempt",
    "attendance",
    "attraction",
    "aunt",
    "authority",
    "autumn",
  ];

  function rangeRandom(min: number, max: number): number {
    return Math.floor(ranger(min, max));
  }
  function rangeRandomFromZero(max: number): number {
    return rangeRandom(0, max);
  }
  function randomMember<T>(set: T[]): T {
    return set[rangeRandomFromZero(set.length - 1)];
  }
  let phrase = $state("");
  function typewritePhrase() {
    phrase = "";
    const n = `${randomMember(adjectives)} ${randomMember(nouns)}`;
    let spaces = 0;
    for (let c = 0; c < n.length; c++) {
      const ch = n.charAt(c);
      if (ch === " ") {
        spaces += 1;
      }
      setTimeout(
        () => {
          phrase = phrase.concat(ch);
        },
        100 * (c + spaces * 3),
      );
    }
  }
  typewritePhrase();
</script>

<div class="container">
  <div>
    {phrase}
  </div>
  <button onclick={typewritePhrase}>Type</button>
</div>

<style>
  .container {
    display: flex;
    border: 2px solid silver;
    justify-content: space-between;
    align-items: center;
    max-width: 30ch;
    font-size: 2rem;
    padding: 0.5rem;
    margin: 0.5rem;
  }
  button {
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 500;
    border-radius: 3px;
    padding: 0 16px;
    border-radius: 4px;
    color: #fff;
    background: #6200ee;
    line-height: 1.15;
    font-size: 14px;
    height: 36px;
    word-spacing: 0px;
    letter-spacing: 0.0892857143em;
    text-decoration: none;
    text-transform: uppercase;
    min-width: 64px;
    border: none;
    text-align: center;
    box-shadow:
      0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%),
      0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  button:hover {
    background: rgb(98, 0, 238);
    box-shadow:
      0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%),
      0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
</style>
