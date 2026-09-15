// Preview stories approved for layout review. Replace text and dates with real news,
// then set sample: false. Slugs define permanent static article URLs.
export const newsItems = [
  {
    slug: "a-second-life-for-industrial-heat",
    title: "A second life for industrial heat",
    date: "2026-09-15",
    displayDate: "September 15, 2026",
    category: "Perspective",
    sample: true,
    summary:
      "A closer look at the energy already moving through industry, and the opportunity to put more of it to work.",
    image: {
      src: "/assets/industry-chemical-1280.webp",
      thumbnail: "/assets/industry-chemical-640.webp",
      alt: "Pipes and towers at a chemical processing facility",
      position: "50% 42%",
      caption:
        "Industry context image from the supplied collection. This is not a Cardinal Volta installation.",
    },
    sections: [
      {
        id: "the-opportunity",
        title: "An opportunity already in motion",
        paragraphs: [
          "Heat is part of the work of industry. From processing materials to making everyday products, thermal energy supports operations all around us.",
          "Waste heat recovery asks a simple question: what could happen if more of that energy had another useful role? It is a starting point for thinking about resources already present in an industrial process.",
        ],
      },
      {
        id: "another-use",
        title: "Another use for the same energy",
        paragraphs: [
          "At Cardinal Volta, the focus is on developing technology that turns industrial waste heat into electricity. The Organic Rankine Cycle provides the foundation for this approach.",
          "The opportunity begins with understanding the heat source and the process around it. Temperature, availability and the needs of the site all shape the conversation.",
        ],
      },
      {
        id: "looking-ahead",
        title: "Looking ahead",
        paragraphs: [
          "This is a sample editorial story for the website preview. It does not announce a project, customer installation or measured performance result. Confirmed company news will replace this illustrative text.",
        ],
      },
    ],
  },
  {
    slug: "from-heat-to-electricity",
    title: "From heat to electricity",
    date: "2026-09-08",
    displayDate: "September 8, 2026",
    category: "Technology",
    sample: true,
    summary:
      "A simple introduction to the cycle behind waste heat recovery, from thermal energy to useful electrical power.",
    image: {
      src: "/assets/power-meter-800.webp",
      thumbnail: "/assets/power-meter-800.webp",
      alt: "Detail of a vintage analog voltage meter",
      position: "50% 50%",
      caption:
        "Illustrative voltage meter from the supplied collection. This is not Cardinal Volta equipment or performance data.",
    },
    sections: [
      {
        id: "recover",
        title: "Start with the heat",
        paragraphs: [
          "In an Organic Rankine Cycle, recovered heat transfers energy to a working fluid. This first step connects an industrial heat source to the cycle that follows.",
          "A clear explanation of the process helps make the connection between heat recovery and electricity generation easier to understand.",
        ],
      },
      {
        id: "generate",
        title: "Turn that energy into motion",
        paragraphs: [
          "The heated working fluid expands and drives an expander connected to a generator. The generator converts mechanical motion into electricity.",
          "After expansion, the fluid is condensed and pumped back through the loop. Heat transfer, expansion, condensation and pumping form a repeating cycle.",
        ],
      },
      {
        id: "in-practice",
        title: "From a principle to an application",
        paragraphs: [
          "A real application depends on the conditions of the heat source and the requirements of the site. This sample article describes the general principle; it does not state Cardinal Volta efficiency, output or deployment results.",
        ],
      },
    ],
  },
  {
    slug: "the-industries-behind-the-opportunity",
    title: "The industries behind the opportunity",
    date: "2026-09-01",
    displayDate: "September 1, 2026",
    category: "Industry",
    sample: true,
    summary:
      "Different materials, different processes. A shared reason to take a closer look at industrial heat.",
    image: {
      src: "/assets/industry-paper-1280.webp",
      thumbnail: "/assets/industry-paper-640.webp",
      alt: "Large roll of paper on an industrial production line",
      position: "50% 50%",
      caption:
        "Paper production context from the supplied collection. No customer or project relationship is implied.",
    },
    sections: [
      {
        id: "processes",
        title: "Look at the process",
        paragraphs: [
          "Chemicals, steel, cement, pulp and paper all belong to the industrial landscape that makes modern life possible. Each has its own production processes and energy needs.",
          "An industry name alone does not describe a heat recovery opportunity. The useful details come from understanding the individual process.",
        ],
      },
      {
        id: "questions",
        title: "Ask practical questions",
        paragraphs: [
          "Where is heat available? When is it available? How does that fit with the operation of the site? These questions help frame an initial conversation about recovery.",
          "The purpose of this sample story is to show how an industry article can combine a relevant photograph with a concise explanation.",
        ],
      },
      {
        id: "conversation",
        title: "Begin a conversation",
        paragraphs: [
          "Cardinal Volta welcomes conversations about industrial waste heat. This illustrative article does not describe a signed partnership, customer site or completed assessment.",
        ],
      },
    ],
  },
].map((item) => ({ ...item, url: `/news/${item.slug}/` }));
