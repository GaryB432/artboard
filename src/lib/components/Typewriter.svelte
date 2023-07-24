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
  let phrase = "";
  function typewritePhrase() {
    phrase = "";
    const n = `${randomMember(adjectives)} ${randomMember(nouns)}`;
    for (let c = 0; c < n.length; c++) {
      setTimeout(() => {
        phrase = phrase.concat(n.charAt(c));
      }, 100 * c);
    }
  }
  typewritePhrase();
</script>

<div class="container">
  <span>
    {phrase}
  </span>
  <button on:click={typewritePhrase}>Type</button>
</div>

<style>
  .container {
    display: inline-block;
    border: 2px solid silver;
  }
  button {
    all: revert;
  }
</style>
