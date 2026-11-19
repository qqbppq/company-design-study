/*
 * サイト全体の編集用ファイルです。文字・写真・リンク・色をここで変更できます。
 * 文字は引用符の内側を書き換えます。改行は \n を使います。
 * サンプルの人物・文章は架空です。メールアドレスは未設定です。
 * editor.html では主要項目を画面から変更してこのファイルをダウンロードできます。
 */
window.SITE_CONFIG = {
  version: 1,
  language: "en",
  brand: {name: "Your Company", suffix: "Studio", short: "YC", logo: "", title: "Your Company — Design Study", description: "A space for ambitious ideas, thoughtful work and new possibilities."},
  // 色の変更はこの値だけで全ページに反映されます。
  theme: {ink: "#252b28", muted: "#747b77", paper: "#ffffff", panel: "#f6f7f6", mint: "#e7fce6", ice: "#e5f5ff", accent: "#38b9a8", dark: "#272b29", imageHue: 0},
  motion: {enabled: true},
  // デザイン確認中は true のままにしてください。公開用の自社サイトへ変更後に見直します。
  study: {enabled: true, label: "DESIGN STUDY · 非公式サンプル", text: "Isomorphic Labs のレイアウトを参考に、独自のコード・文章・画像で制作した学習用デザインサンプルです。同社との関係・提携はありません。人物は生成した仮画像で、実在の社員を表していません。このサイトには情報収集フォームやアクセス解析を設置していません。", reference: "https://www.isomorphiclabs.com/"},
  labels: {menu: "Menu", close: "Close", viewAll: "View all", latest: "Latest from YC", moreNews: "More news", contact: "Contact us", info: "Info", back: "Back to news", readMore: "Read more", readLess: "Read less", photo: "Sample portrait"},
  navigation: [
    {label: "Our team", href: "./page.html?view=team"},
    {label: "Our work", href: "./page.html?view=work"},
    {label: "Partnerships", href: "./page.html?view=partnerships"},
    {label: "Careers", children: [
      {label: "Life here", href: "./page.html?view=culture"},
      {label: "Work with us", href: "./page.html?view=careers"},
      {label: "Opportunities", href: "./page.html?view=opportunities"}
    ]},
    {label: "News", href: "./page.html?view=news"}
  ],
  home: {
    hero: {title: "Shape\nwhat’s next", description: "A place for ambitious ideas. Bringing different perspectives together to turn possibility into meaningful, lasting change.", button: "Explore our work", href: "./page.html?view=work", image: "./assets/molecular-hero.webp", imageAlt: "An abstract turquoise and white molecular sculpture with a pink ribbon", video: ""},
    intro: {eyebrow: "An engine for possibility", paragraphs: [
      "Progress begins with a different question. With curiosity, collaboration and the space to explore ideas that have not been tried before.",
      "We bring creative thinking and thoughtful execution into the same conversation.",
      "From the first insight to the finished work, our approach connects people, perspectives and possibilities. It is a way of working built around the value of looking again.",
      "A new chapter starts with a shared ambition."
    ], button: "Explore our partnerships", href: "./page.html?view=partnerships", image: "", video: ""},
    quote: {text: "The best ideas do more than offer an answer. They change the way we see a question, open up a conversation, and help us imagine a future worth building together.", name: "Your founder’s name", role: "Founder · sample content", image: "./assets/portraits.webp", diptych: true, position: "left"},
    mission: {eyebrow: "Our mission", title: "The thinking behind the work", paragraphs: [
      "Every meaningful project starts with a simple belief: things can be different. A familiar challenge can become an opportunity when we approach it with an open mind.",
      "We create space for different disciplines to meet, for careful questions to be asked, and for ideas to develop through collaboration.",
      "Our work is shaped by the people it is for. Their ambitions give it direction. Their experience helps us understand what matters."
    ], image: "./assets/molecular-hero.webp", expand: "Read the whole mission"},
    centeredQuote: {text: "When we connect different ways of thinking, a new perspective becomes possible. That is where the most interesting work begins.", name: "Your team member’s name", role: "Creative lead · sample content", image: "./assets/portraits.webp", diptych: true, position: "right"},
    story: {firstLabel: "The meaning behind our name", firstText: "Use this space to tell the story of your company. What brought you together? What do you believe? What is the idea that connects your team and the work you want to do?", secondLabel: "A different starting point", paragraphs: [
      "Every company has a beginning. A question, a conversation, a moment when something new starts to feel possible.",
      "This is a place to explain your own approach, in your own words. Connect the things you do with the reasons you do them.",
      "Replace this sample copy with your story, your services and the difference you want to make."
    ], button: "Our approach", href: "./page.html?view=work", image: "./assets/molecular-hero.webp", video: ""},
    teamQuote: {text: "Great work happens when we stay curious about one another: bringing what we know, and making room for what we can learn.", name: "Your colleague’s name", role: "Team member · sample content", link: "Meet the people behind the work", href: "./page.html?view=team"},
    cta: {title: "Towards a future\nwith more possibilities\nfor all of us.", button: "Work with us", href: "./page.html?view=careers", image: "./assets/molecular-hero.webp"},
    cards: [
      {label: "Leadership", title: "Meet the people shaping our direction", href: "./page.html?view=team"},
      {label: "Culture", title: "Different perspectives. Shared ambition.", href: "./page.html?view=culture"},
      {label: "Our story", title: "From a first idea to a new way of working", href: "./page.html?view=work"},
      {label: "The work", title: "Bring your curiosity to something new", href: "./page.html?view=careers"}
    ]
  },
  pages: {
    team: {eyebrow: "Our team", title: "Different minds.\nA shared direction.", lead: "The people behind a company make its work possible. Introduce your team and the perspectives they bring.", body: ["This is a sample team page. Replace the names, roles and portraits with approved information about your own team."], people: [{name: "Team member", role: "Founder · sample", image: "./assets/portraits.webp", diptych: true, position: "left"},{name: "Team member", role: "Creative lead · sample", image: "./assets/portraits.webp", diptych: true, position: "right"}]},
    work: {eyebrow: "Our work", title: "An approach built\naround possibility.", lead: "A clear idea. A thoughtful process. Work that moves things forward.", image: "./assets/molecular-hero.webp", sections: [{title: "A shared starting point",text: "Explain how you understand a client’s challenge and define the direction of a project."},{title: "From idea to action",text: "Describe your services and how your team brings ideas to life."},{title: "Learning as we go",text: "Show how you evaluate your work, learn from it and continue to improve."}]},
    partnerships: {eyebrow: "Partnerships", title: "Better possibilities,\nbuilt together.", lead: "Use this page to introduce the kinds of partnerships your company is looking for.", body: ["Add your collaboration approach, project examples and the value you can bring to a partnership.","Partner logos, client names and results should be added only when they are approved for publication."], contact: true},
    culture: {eyebrow: "Life here", title: "Stay curious.\nMake room for others.", lead: "Your culture is the way you work together every day.", sections: [{title: "Different perspectives",text: "Describe how people with different experiences collaborate in your team."},{title: "Space to grow",text: "Explain how learning, feedback and experimentation fit into the work."},{title: "Shared purpose",text: "Tell visitors what brings your team together."}]},
    careers: {eyebrow: "Work with us", title: "Bring your perspective.\nBuild what comes next.", lead: "Introduce your company’s working style, team and opportunities.", body: ["This is a sample careers page. Add your actual recruitment information before publishing it as a live company page."], button: "View opportunities", href: "./page.html?view=opportunities"},
    opportunities: {eyebrow: "Opportunities", title: "Make your\nnext move.", lead: "Recruitment information will appear here when it is ready.", body: ["No roles have been added to this template. Replace this message with your real vacancies or link to your recruitment platform."]},
    news: {eyebrow: "Latest", title: "News & perspectives", lead: "Updates, ideas and stories from your company."},
    privacy: {eyebrow: "Information", title: "About this sample", lead: "This is a design study, with placeholder content.", body: ["This sample does not include analytics, advertising cookies, forms, login or payment functionality.","Hosting providers may keep server logs. Replace this page with your company’s own privacy notice when you add actual services or data collection.","Any preferences used by the editing tool are kept in memory while you edit. They are not sent to a server."]},
    terms: {eyebrow: "Information", title: "Design study notes", lead: "An independent layout study inspired by Isomorphic Labs.", body: ["This website is not affiliated with, endorsed by or operated by Isomorphic Labs. It has been written independently for educational design study.","The copy is placeholder text. The imagery is generated artwork and fictional portrait photography. The original company’s logo, source code, photography, videos and commercial fonts have not been included.","The study reproduces the broad layout and interactions of the reference homepage. It is not an exact copy of every pixel, animation or inner page."]}
  },
  news: [
    {id: "new-chapter", category: "Announcement", title: "A new chapter for our company", date: "Sample news", image: "./assets/molecular-hero.webp", body: ["This is a sample announcement for checking the layout. Replace it with a real company update before using the site publicly as your company’s website.","You can change the title, category, image and article text in site.config.js."]},
    {id: "shared-possibilities", category: "Perspective", title: "Finding new possibilities through collaboration", date: "Sample news", image: "./assets/molecular-hero.webp", body: ["This placeholder article shows how a longer story will look. Use it for an interview, a project story or a thoughtful company update."]},
    {id: "first-ideas", category: "Inside the studio", title: "A space for our next ideas to take shape", date: "Sample news", image: "./assets/molecular-hero.webp", body: ["Share a glimpse of your team, your process or the environment in which you work. This text is a sample and does not describe an actual event."]}
  ],
  footer: {
    copyright: "YOUR COMPANY",
    email: "",
    pressEmail: "",
    partnerEmail: "",
    emptyContact: "Contact details coming soon",
    links: [{label: "Home", href: "./index.html"},{label: "Life here", href: "./page.html?view=culture"},{label: "Our team", href: "./page.html?view=team"},{label: "Work with us", href: "./page.html?view=careers"},{label: "Our work", href: "./page.html?view=work"},{label: "Opportunities", href: "./page.html?view=opportunities"},{label: "Partnerships", href: "./page.html?view=partnerships"},{label: "News", href: "./page.html?view=news"}],
    socials: [],
    info: [{label: "Privacy notice", href: "./page.html?view=privacy"},{label: "Design study notes", href: "./page.html?view=terms"}]
  }
};
