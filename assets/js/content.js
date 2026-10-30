/* ==========================================================================
   Portfolio content
   Edit the data below to update projects and assignments. Every list on the
   site (project showcase, assignment overview, assignment pages and the
   navigation dropdown) is built from it.
   Paths are relative to the site root, e.g. "assets/img/screenshots/app.webp".
   ========================================================================== */

window.PORTFOLIO = {
  /* Projects (skills-projects.html), numbered in this order. Optional fields can
     be left out or left empty; they are then not shown.
       title         project name
       period        e.g. "April - August 2026", shown above the title
       category      e.g. "Web Development Project", shown below the title
       description   one paragraph (a string) or several (a list of strings)
       techGroups    technologies grouped by role:
                       [{ label: "Development", items: ["Laravel", "HTML"] }]
       tech          simpler alternative to techGroups: ["Python", "Flask"];
                       with neither, "Tech stack: to be added" is shown
       highlights    optional short points shown as "Technical highlights"
       workflow      optional list of steps shown as "Workflow"
       workflowNote  optional sentence under the workflow
       image         screenshot path, e.g. "assets/img/screenshots/app.png";
                       empty shows the "Project preview" placeholder
       imageAlt      description of the screenshot
       imageWidth, imageHeight
                     the screenshot's size in pixels, so the page keeps its
                       place while it loads (it is never shown larger)
       repo, demo    full URLs; leave "" to hide the link
       placeholder   true shows the "Project details coming soon" label */
  projects: [
    {
      title: 'JogjaTouch',
      period: 'April - August 2026',
      category: 'Web Development Project',
      description: [
        'JogjaTouch is a web development project focused on building a digital presence for a technology and creative service provider in Yogyakarta. The website showcases its range of services, including computer hardware solutions, system maintenance, graphic design, and printing services.',
        'Developed using Laravel, the platform combines a user-facing website with an administrative system to support content and data management. The project also involved interface design, collaborative development, testing, and deployment.',
      ],
      techGroups: [
        { label: 'Development', items: ['Laravel', 'HTML', 'CSS', 'JavaScript'] },
        { label: 'Data & Administration', items: ['MySQL', 'Filament'] },
        { label: 'Design & Collaboration', items: ['Figma', 'Visual Studio Code', 'Git', 'GitHub'] },
        { label: 'Testing & Deployment', items: ['Playwright', 'Google PageSpeed Insights', 'cPanel', 'Hosting', 'Domain'] },
      ],
      image: 'assets/img/screenshots/jogja_touch_hero.png',
      imageAlt: 'JogjaTouch website homepage showcasing technology and creative services.',
      imageWidth: 529,
      imageHeight: 253,
      repo: '',
      demo: '',
      placeholder: false,
    },
    {
      title: 'CafeBot',
      period: 'July 2026',
      category: 'Natural Language Processing',
      description: [
        'CafeBot is an NLP-based chatbot project developed as part of a Natural Language Processing practical assignment. It combines intent classification using an MLPClassifier with pretrained Indonesian FastText word embeddings to understand user messages and support conversational interactions.',
        'The system also features dynamic menu recommendations and an interactive ordering workflow. Its architecture integrates a Laravel web application with a separate FastAPI service for machine learning inference. All model inference runs locally without relying on paid third-party LLM APIs.',
      ],
      highlights: [
        'CafeBot uses a hybrid architecture in which Laravel handles the web application and communicates with a separate FastAPI service for machine learning inference.',
        'The trained model is loaded locally and used for prediction without calling external paid LLM APIs.',
      ],
      techGroups: [
        { label: 'Machine Learning & NLP', items: ['Scikit-Learn', 'MLPClassifier', 'FastText', 'compress-fasttext', 'NumPy'] },
        { label: 'Data Processing & Storage', items: ['Pandas', 'Pickle', 'JSON', 'CSV'] },
        { label: 'Backend', items: ['Python', 'FastAPI', 'Uvicorn', 'Laravel', 'PHP'] },
        { label: 'Frontend', items: ['Blade', 'Vanilla JavaScript', 'CSS Custom Properties'] },
        { label: 'Development Tools', items: ['Jupyter Notebook', 'Google Colab', 'Visual Studio Code', 'Claude Code', 'Conda'] },
      ],
      image: 'assets/img/screenshots/cafebot_nlp.png',
      imageAlt: 'CafeBot chatbot interface showing an interactive cafe ordering conversation.',
      imageWidth: 1600,
      imageHeight: 723,
      repo: '',
      demo: '',
      placeholder: false,
    },
    {
      title: 'Olist E-Commerce Analytics',
      period: 'October 2026',
      category: 'Data Science & Analytics',
      description: [
        'Olist E-Commerce Analytics is a data science project developed as part of the Dicoding Asah Data Science cohort. The project analyzes public e-commerce transaction data from Olist, a Brazilian marketplace, covering the period from 2016 to 2018.',
        'The analysis involves data wrangling, exploratory data analysis (EDA), monthly sales and payment trends, delivery performance, review scores, and customer segmentation using RFM analysis. The results are presented through an interactive Streamlit dashboard featuring key performance indicators, dynamic filters, and data visualizations.',
      ],
      workflow: ['Data Wrangling & Cleaning', 'Exploratory Data Analysis', 'Data Export to CSV', 'Interactive Dashboard Development'],
      workflowNote: 'The notebook Proyek_Analisis_Data.ipynb processes and analyses the dataset, while dashboard.py uses main_data.csv to present the results interactively.',
      techGroups: [
        { label: 'Data Analysis', items: ['Python', 'Jupyter Notebook', 'Pandas', 'NumPy'] },
        { label: 'Data Visualization', items: ['Matplotlib', 'Seaborn', 'Plotly'] },
        { label: 'Dashboard Development', items: ['Streamlit', 'HTML', 'CSS'] },
        { label: 'Data Format', items: ['CSV'] },
      ],
      image: 'assets/img/screenshots/streamlit_olist.png',
      imageAlt: 'Interactive Olist e-commerce analytics dashboard showing sales trends and business performance indicators.',
      imageWidth: 1917,
      imageHeight: 908,
      repo: '',
      demo: '',
      placeholder: false,
    },
  ],

  /* Assignments (assignments/). Each entry needs its own page: copy
     assignments/assignment-1.html, rename it to the slug and change
     data-assignment on <main>. Optional fields can be left out.
       id           short code shown in the UI, e.g. "A1"
       slug         page file name without .html
       title, summary
       subtitle     optional line under the title, e.g. the full title of a report
       info         optional facts shown under the summary:
                      [{ label: "Platform", value: "Shopee" },
                       { label: "Link", value: "shop.example", href: "https://..." }]
       outline      optional parts of the assignment:
                      { label: "Report structure",
                        items: [{ marker: "A", title: "Introduction", text: "..." }] }
                      an item can also have meta: [{ label: "Authors", value: "..." }],
                      several paragraphs (text: ["...", "..."]), lang: "id"
                      for a title in another language and a link:
                      { label: "View paper (PDF)", href: "https://..." }
       closing      optional closing note after the content:
                      { label: "Research focus", text: "..." }
       video        optional video area: { youtube: "", src: "", poster: "", caption: "" }
                      youtube  a YouTube link, src a video file such as
                      "assignments/files/video.mp4"; with neither, "Video coming soon"
       document     optional PDF shown on the page with View and Download links:
                      { src: "assignments/files/report.pdf", title: "..." }
                      fullPage: true shapes the viewer like a portrait page,
                      with the page fitted to its width (scroll for the next
                      page); a document that is the only content sits beside
                      the summary on wide screens
       content      paragraphs (strings); with no content and no outline,
                      "Assignment content will be added soon." is shown
       images       [{ src: "assets/img/...", alt: "...", caption: "" }]
       links        [{ label: "Report (PDF)", href: "assets/files/report.pdf" }],
                      shown as "Files & links" under the summary
       placeholder  true shows the "Assignment details coming soon" label */
  assignments: [
    {
      id: 'A1',
      slug: 'assignment-1',
      title: 'Self-Introduction',
      summary: 'A self-introduction video presenting my personal background, academic journey, current activities, and future aspirations as an Informatics student. The video highlights who I am, what I am currently working on during this semester, and the goals I hope to achieve in the coming years.',
      video: {
        youtube: '',
        src: '',
        poster: '',
        caption: 'The self-introduction video will be available here soon.',
      },
      outline: {
        label: 'Assignment sections',
        items: [
          { marker: '01', title: 'Personal Introduction', text: 'An introduction to my personal background and identity as an Informatics student.' },
          { marker: '02', title: 'Current Academic Activities', text: 'An overview of my academic activities, learning experiences, and projects during the current semester.' },
          { marker: '03', title: 'Future Plans', text: 'A brief explanation of my future aspirations, academic goals, and plans for developing my skills in the field of Informatics.' },
        ],
      },
      content: [],
      images: [],
      links: [],
      placeholder: false,
    },
    {
      id: 'A2',
      slug: 'assignment-2',
      title: 'Professional Text',
      subtitle: 'MY ONLINE SHOPPING EXPERIENCE: A Report on Purchasing Ad-Daa’ wa Ad-Dawaa’',
      summary: 'A professional writing assignment documenting my personal experience purchasing the book Ad-Daa’ wa Ad-Dawaa’ by Ibn Qayyim al-Jawziyya through Shopee. The report discusses product information, the online purchasing process, seller communication, packaging, and delivery experience. It also evaluates how clear and detailed product descriptions can influence customer trust and purchasing decisions.',
      info: [
        { label: 'Assignment Type', value: 'Professional Writing' },
        { label: 'Topic', value: 'Online Shopping Experience' },
        { label: 'Product', value: 'Ad-Daa’ wa Ad-Dawaa’' },
        { label: 'Author', value: 'Ibn Qayyim al-Jawziyya' },
        { label: 'Platform', value: 'Shopee' },
        { label: 'Product Link', value: 'id.shp.ee/aG6JnHD5', href: 'https://id.shp.ee/aG6JnHD5' },
      ],
      outline: {
        label: 'Report structure',
        items: [
          { marker: 'A', title: 'Introduction', text: 'Introduction to the online shopping experience and the purpose of the report.' },
          { marker: 'B', title: 'Product Information', text: 'Information about the purchased book, including its author, publisher, physical specifications, and product description.' },
          { marker: 'C', title: 'Purchasing Process', text: 'The purchasing process through Shopee, including adding the product to the cart, entering the delivery address, selecting shipping, and completing payment.' },
          { marker: 'D', title: 'Evaluation of Product Description', text: 'An evaluation of the product information provided by the seller and how it helps customers understand the product before purchasing.' },
          { marker: 'E', title: 'Conclusion', text: 'A conclusion about the importance of clear product descriptions in building customer trust and improving the online shopping experience.' },
        ],
      },
      document: {
        src: 'assignments/files/professional-text.pdf',
        title: 'My Online Shopping Experience: A Report on Purchasing Ad-Daa’ wa Ad-Dawaa’',
      },
      content: [],
      images: [],
      links: [],
      placeholder: false,
    },
    {
      id: 'A3',
      slug: 'assignment-3',
      title: 'Finding Journals on an Informatics Topic',
      summary: 'This assignment presents five research papers related to Natural Language Processing (NLP), deep learning, text classification, and chatbot development. The selected papers explore different applications of language processing techniques, ranging from campus facility search systems and public information services to disaster monitoring and traffic event detection.',
      outline: {
        label: 'Research papers',
        items: [
          {
            marker: '01',
            title: 'Technofac: An Android Application for Campus Facility Search Based on Speech-to-Text and Natural Language Processing',
            meta: [
              { label: 'Authors', value: 'Siti Ayu Hermaliah, Shinta Puspasari, and Indah Permatasari' },
              { label: 'Publication', value: 'Jurnal INSTEK, Vol. 10, No. 2, October 2025' },
            ],
            link: { label: 'View paper (PDF)', href: 'https://drive.google.com/file/d/1ZfI4KDhuBtvMrYXVj9cpDAj_2UM6NpT_/view?usp=sharing' },
            text: [
              'This research introduces Technofac, an Android application designed to help users find facilities within Universitas Indo Global Mandiri. The system integrates Speech-to-Text technology with Natural Language Processing using a Hybrid Keyword-Based approach.',
              'Its processing pipeline includes Automatic Speech Recognition, text preprocessing, intent detection, and Named Entity Recognition. The Hybrid Keyword-Based method achieved an F1-score of 0.9297, while usability testing resulted in a System Usability Scale score of 82.87 (Grade A). This study demonstrates how NLP and voice recognition can improve accessibility to campus information services.',
            ],
          },
          {
            marker: '02',
            title: 'Automatic Analysis of Natural Disaster Messages on Social Media using IndoBERT and Multilingual BERT',
            meta: [
              { label: 'Authors', value: 'Yasmin Dwi Safitri, Mohammad Reza Faisal, Dwi Kartini, Triando Hamonangan Saragih, Friska Abadi, and Adam Mukharil Bachtiar' },
              { label: 'Publication', value: 'Telematika, Vol. 18, No. 2, August 2025' },
            ],
            link: { label: 'View paper (PDF)', href: 'https://drive.google.com/file/d/19vnUef-Aq_YHqmYDdo-fQFhx52-dQEaO/view?usp=sharing' },
            text: [
              'This paper investigates the use of transformer-based language models to automatically classify natural disaster messages shared on social media. It compares four models: IndoBERT, IndoBERT with Masked Language Modeling (MLM), Multilingual BERT, and Multilingual BERT with MLM.',
              'The research focuses on messages related to floods, earthquakes, and forest fires, classifying them into eyewitness, non-eyewitness, and unknown categories. IndoBERT achieved the most consistent overall performance, with an average accuracy of 82%. The findings highlight the potential of Indonesian-specific language models to support disaster monitoring and early warning systems.',
            ],
          },
          {
            marker: '03',
            title: 'Chatbot Informasi Penerimaan Mahasiswa Baru Menggunakan Metode FastText dan LSTM',
            lang: 'id',
            meta: [
              { label: 'Authors', value: 'Fahmi Yusron F., Agus Komarudin, and Melina' },
              { label: 'Publication', value: 'Journal of Applied Computer Science and Technology (JACOST), Vol. 5, No. 1, 2024' },
            ],
            link: { label: 'View paper (PDF)', href: 'https://drive.google.com/file/d/1oHiifX6M2b8uKfOF91Ql9n_sNABh9Wza/view?usp=sharing' },
            text: [
              'This research develops an information chatbot to support the New Student Admission (PMB) services at the Faculty of Science and Informatics, Universitas Jenderal Achmad Yani. The system aims to provide consistent information to prospective students and their parents.',
              'The chatbot combines FastText word embeddings for text representation with a Long Short-Term Memory (LSTM) model for question classification. It covers various admission-related topics, including tuition fees, registration procedures, accreditation, scholarships, and career prospects. The model achieved 90% accuracy without casefolding and 89% with casefolding. This study illustrates the application of deep learning in developing automated academic information services.',
            ],
          },
          {
            marker: '04',
            title: 'Deteksi Kejadian Lalu Lintas pada Teks Twitter dengan Pendekatan Klasifikasi Multi-Label Berbasis Deep Learning',
            lang: 'id',
            meta: [
              { label: 'Authors', value: 'Luthfi Atikah, Diana Purwitasari, and Nanik Suciati' },
              { label: 'Publication', value: 'Jurnal Teknologi Informasi dan Ilmu Komputer (JTIIK), Vol. 9, No. 1, February 2022' },
            ],
            link: { label: 'View paper (PDF)', href: 'https://drive.google.com/file/d/1kwTQE4b1JPM415-RX10sVP2Qf56EesVC/view?usp=sharing' },
            text: [
              'This research explores multi-label text classification for detecting traffic events through Twitter data. It addresses the challenge of identifying multiple traffic-related situations within a single tweet, including weather conditions, traffic accidents, congestion, heavy traffic, and smooth traffic conditions.',
              'The study uses approximately 18,000 tweets from verified Twitter accounts in Surabaya and evaluates different combinations of Convolutional Neural Networks (CNN), Long Short-Term Memory (LSTM), Word2Vec, and FastText. The highest accuracy reached 75% without data augmentation and 95% with data augmentation. The best-performing combination was LSTM with FastText.',
            ],
          },
          {
            marker: '05',
            title: 'Development of an Intent-Classification Chatbot to Support Operational Services at Kadin Indonesia',
            meta: [
              { label: 'Authors', value: 'Rahma Aulia and Adi Purnama' },
              { label: 'Publication', value: 'Brilliance: Research of Artificial Intelligence, Vol. 5, No. 2, 2025' },
            ],
            link: { label: 'View paper (PDF)', href: 'https://drive.google.com/file/d/1dCistqyTXb5mcfCAR6sWAd2Mz3DMxt38/view?usp=sharing' },
            text: [
              'This paper presents the development of an NLP-based chatbot designed to support operational services at the Indonesian Chamber of Commerce and Industry (Kadin). The system addresses frequently asked questions about membership information, Certificates of Origin (COO), organizational activities, and administrative services.',
              'The research applies an intent classification approach using an LSTM model combined with 300-dimensional FastText embeddings. Its dataset contains more than 90 intent categories, constructed from frequently asked questions and service data. The model achieved 92.08% test accuracy and 96.23% Top-3 accuracy. The results demonstrate the potential of combining FastText and LSTM to automate information delivery in organizational services.',
            ],
          },
        ],
      },
      closing: {
        label: 'Research focus',
        text: 'Across these five papers, the main research interests include Natural Language Processing, text classification, word embeddings, transformer-based language models, deep learning, and chatbot development. Together, they provide insights into how language processing techniques can be applied to solve practical problems in different domains.',
      },
      content: [],
      images: [],
      links: [
        { label: 'All five papers (Google Drive folder)', href: 'https://drive.google.com/drive/folders/1yRQJU8yuGUo6vA8WIEsPkRu__19nhMzL?usp=sharing' },
      ],
      placeholder: false,
    },
    {
      id: 'A4',
      slug: 'assignment-4',
      title: 'Professional Curriculum Vitae',
      summary: 'A professional curriculum vitae highlighting my academic background, technical skills, projects, achievements, and organizational experience as an Informatics student. The CV emphasizes my interest in Artificial Intelligence, Machine Learning, and Natural Language Processing, along with my career aspirations in the technology field.',
      document: {
        src: 'assets/documents/cv-muhammad-fadhillah.pdf',
        title: 'Curriculum Vitae of Muhammad Fadhillah',
        fullPage: true,
      },
      content: [],
      images: [],
      links: [],
      placeholder: false,
    },
  ],
};

/* ==========================================================================
   Rendering (no need to edit below this line)
   ========================================================================== */

(function () {
  'use strict';

  const data = window.PORTFOLIO;
  if (!data) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const ROOT = document.documentElement.dataset.root || '';
  const OWNER = 'Muhammad Fadhillah';

  const isExternal = (href) => /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
  const resolve = (path) => (isExternal(path) || path.startsWith('#') ? path : ROOT + path);
  const pageOf = (assignment) => resolve(`assignments/${assignment.slug}.html`);
  const pad = (n) => String(n).padStart(2, '0');

  /* Small element builder: h('p', { class: 'x' }, 'text', childNode) */
  function h(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value === null || value === undefined || value === false) continue;
      if (key === 'class') node.className = value;
      else node.setAttribute(key, value === true ? '' : value);
    }
    for (const child of children.flat()) {
      if (child === null || child === undefined || child === false) continue;
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return node;
  }

  function star(className = 'star') {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', '#star');
    svg.append(use);
    return svg;
  }

  /* replaceChildren() would print "null" for empty slots, so drop them first */
  const fill = (node, ...children) => node && node.replaceChildren(...children.flat().filter((c) => c !== null && c !== undefined && c !== false));

  const hidden = (text) => h('span', { class: 'visually-hidden' }, text);
  const statusTag = (text) => h('p', { class: 'status-tag' }, star(), text);

  function link(href, props, ...children) {
    const external = isExternal(href) && !href.startsWith('mailto:');
    return h(
      'a',
      { href: resolve(href), target: external ? '_blank' : null, rel: external ? 'noopener noreferrer' : null, ...props },
      ...children,
      external ? hidden(' (opens in a new tab)') : null,
    );
  }

  /* "Assignment One" → solid "Assignment" + outline "One"; a single word stays solid */
  function splitTitle(title) {
    const words = title.trim().split(/\s+/);
    if (words.length === 1) {
      /* "Self-Introduction" → solid "Self-" + outline "Introduction" */
      const cut = words[0].lastIndexOf('-') + 1;
      if (cut > 1 && cut < words[0].length) {
        return [h('span', { class: 'solid warp' }, words[0].slice(0, cut)), h('span', { class: 'outline warp' }, words[0].slice(cut))];
      }
      return [h('span', { class: 'solid warp' }, words[0])];
    }
    const last = words.pop();
    return [h('span', { class: 'solid warp' }, words.join(' ')), ' ', h('span', { class: 'outline warp' }, last)];
  }

  /* ---------------------------------------------------------------- nav */

  function renderAssignmentMenus() {
    const current = document.querySelector('[data-assignment]')?.dataset.assignment;
    document.querySelectorAll('[data-assignment-menu]').forEach((list) => {
      const isDropdown = list.dataset.assignmentMenu === 'dropdown';
      list.replaceChildren(
        ...data.assignments.map((assignment) =>
          h(
            'li',
            {},
            h(
              'a',
              {
                class: isDropdown ? 'dropdown__link' : null,
                href: pageOf(assignment),
                'aria-current': assignment.slug === current ? 'page' : null,
              },
              star(),
              `${assignment.id} - ${assignment.title}`,
            ),
          ),
        ),
      );
    });
  }

  /* ---------------------------------------------------------------- projects */

  const listOf = (value) => (Array.isArray(value) ? value : value ? [value] : []).filter(Boolean);
  const label = (text) => h('h4', { class: 'project__label' }, text);
  /* Keeps hyphenated words such as "E-Commerce" from breaking at the hyphen */
  const keepWords = (text) => text.split(/(\s+)/).map((part) => (/\S-\S/.test(part) ? h('span', { class: 'nowrap' }, part) : part));

  /* Technologies grouped by role; a flat "tech" list or nothing falls back to one line */
  function projectStack(project) {
    const groups = listOf(project.techGroups).filter((group) => group.label && listOf(group.items).length);
    if (!groups.length) {
      const tech = listOf(project.tech).length ? listOf(project.tech).join(' / ') : 'to be added';
      return [h('p', { class: 'project__tech' }, `Tech stack: ${tech}`)];
    }
    return [
      label('Tech stack'),
      h(
        'dl',
        { class: 'project__stack' },
        groups.map((group) =>
          h(
            'div',
            { class: 'stack-group' },
            h('dt', {}, group.label),
            h('dd', {}, h('ul', { class: 'stack-group__items' }, listOf(group.items).map((item) => h('li', {}, item)))),
          ),
        ),
      ),
    ];
  }

  /* Optional extras under the description */
  function projectNotes(project) {
    const notes = [];
    const highlights = listOf(project.highlights);
    if (highlights.length) {
      notes.push(
        h('div', { class: 'project__note' }, label('Technical highlights'), h('ul', { class: 'project__highlights' }, highlights.map((text) => h('li', {}, text)))),
      );
    }
    const steps = listOf(project.workflow);
    if (steps.length) {
      notes.push(
        h(
          'div',
          { class: 'project__note' },
          label('Workflow'),
          h('ol', { class: 'project__workflow' }, steps.map((step) => h('li', {}, step))),
          project.workflowNote ? h('p', { class: 'project__note-text' }, project.workflowNote) : null,
        ),
      );
    }
    return notes;
  }

  function renderProjects(target) {
    const variants = ['v1', 'v2', 'v3'];

    target.replaceChildren(
      ...data.projects.map((project, index) => {
        const number = pad(index + 1);
        const titleId = `project-${number}-title`;

        /* A screenshot keeps its own proportions; without one, the artwork preview */
        const visual = project.image
          ? h('img', {
              src: resolve(project.image),
              alt: project.imageAlt || `Screenshot of ${project.title}`,
              width: project.imageWidth || null,
              height: project.imageHeight || null,
              loading: 'lazy',
              decoding: 'async',
            })
          : h(
              'div',
              { class: 'preview' },
              h('span', { class: 'preview__dots', 'aria-hidden': 'true' }, h('i'), h('i')),
              h('p', { class: 'preview__label' }, star(), 'Project preview'),
            );

        const links = [];
        if (project.repo) {
          links.push(
            h('li', {}, link(project.repo, { class: 'wave-link' }, h('span', { 'aria-hidden': 'true' }, '↗'), h('span', { class: 'has-wave' }, 'Repository'))),
          );
        }
        if (project.demo) {
          links.push(
            h('li', {}, link(project.demo, { class: 'wave-link' }, h('span', { 'aria-hidden': 'true' }, '↗'), h('span', { class: 'has-wave' }, 'Live demo'))),
          );
        }

        /* Reading order: period, title, category, description (+ extras),
           technology groups, links */
        return h(
          'article',
          { class: `project project--${variants[index % variants.length]}`, 'aria-labelledby': titleId },
          h(
            'div',
            { class: project.image ? 'project__media project__media--shot' : 'project__media' },
            h(
              'span',
              { class: `project__num project__num--${index % 2 === 0 ? 'outline' : 'solid'}`, 'aria-hidden': 'true' },
              number,
            ),
            h(
              'div',
              { class: project.image ? 'frame frame--fit' : 'frame' },
              h('div', { class: project.image ? 'frame__inner frame__inner--auto' : 'frame__inner' }, visual),
            ),
          ),
          h(
            'div',
            { class: 'project__head' },
            project.period ? h('p', { class: 'project__period' }, star(), project.period) : null,
            project.placeholder ? statusTag('Project details coming soon') : null,
            h('h3', { class: 'project__title', id: titleId }, hidden(`Project ${number}: `), keepWords(project.title)),
            project.category ? h('p', { class: 'project__category' }, project.category) : null,
          ),
          h(
            'div',
            { class: 'project__details' },
            h(
              'div',
              { class: 'project__story' },
              h('div', { class: 'project__desc' }, listOf(project.description).map((text) => h('p', {}, text))),
              projectNotes(project),
            ),
            h('div', { class: 'project__meta' }, projectStack(project), links.length ? h('ul', { class: 'project__links' }, links) : null),
          ),
        );
      }),
    );
  }

  /* ---------------------------------------------------------------- assignments */

  function renderAssignmentRows(target) {
    target.replaceChildren(
      ...data.assignments.map((assignment) =>
        h(
          'li',
          { class: 'assign-row' },
          h('span', { class: 'assign-row__num outline-num', 'aria-hidden': 'true' }, assignment.id),
          h(
            'div',
            { class: 'assign-row__main' },
            h(
              'h2',
              { class: 'assign-row__title' },
              h(
                'a',
                { class: 'assign-row__link', href: pageOf(assignment) },
                hidden(`${assignment.id}: `),
                h('span', { class: 'assign-row__label has-wave' }, assignment.title),
              ),
            ),
            h('p', { class: 'assign-row__summary' }, assignment.summary),
            assignment.placeholder ? statusTag('Assignment details coming soon') : null,
          ),
          h('span', { class: 'assign-row__arrow', 'aria-hidden': 'true' }, '→'),
        ),
      ),
    );
  }

  function pagerLink(assignment, direction) {
    const label =
      direction === 'prev'
        ? [h('span', { 'aria-hidden': 'true' }, '← '), 'Previous']
        : ['Next', h('span', { 'aria-hidden': 'true' }, ' →')];
    return h(
      'a',
      { class: `pager__link pager__link--${direction}`, href: pageOf(assignment), rel: direction },
      h('span', { class: 'pager__dir' }, label),
      h('span', { class: 'pager__title has-wave' }, `${assignment.id} - ${assignment.title}`),
    );
  }

  /* "https://youtu.be/ID", ".../watch?v=ID", ".../embed/ID", ".../shorts/ID" or the bare ID */
  function youtubeId(url) {
    const text = String(url).trim();
    const match =
      text.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/) ||
      text.match(/^([\w-]{11})$/);
    return match ? match[1] : '';
  }

  /* Video area: a YouTube embed, a video file or, with neither, "Video coming soon" */
  function videoBlock(video, title) {
    const id = video.youtube ? youtubeId(video.youtube) : '';
    let player;
    if (id) {
      player = h('iframe', {
        class: 'video-slot__player',
        src: `https://www.youtube-nocookie.com/embed/${id}`,
        title: `${title} (video)`,
        loading: 'lazy',
        allow: 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        referrerpolicy: 'strict-origin-when-cross-origin',
        allowfullscreen: true,
      });
    } else if (video.src) {
      player = h(
        'video',
        { class: 'video-slot__player', src: resolve(video.src), poster: video.poster ? resolve(video.poster) : null, controls: true, preload: 'metadata' },
        link(video.src, {}, 'Download the video'),
      );
    } else {
      player = h(
        'div',
        { class: 'video-slot__soon' },
        star('star video-slot__star'),
        h('p', { class: 'video-slot__title' }, h('span', { class: 'solid' }, 'Video'), ' ', h('span', { class: 'outline' }, 'coming soon')),
      );
    }
    return h(
      'section',
      { class: 'detail__media', 'aria-labelledby': 'video-heading' },
      h('h2', { class: 'label', id: 'video-heading' }, 'Video'),
      h('div', { class: 'frame frame--flat' }, h('div', { class: 'frame__inner video-slot' }, player)),
      video.caption ? h('p', { class: 'detail__caption' }, video.caption) : null,
    );
  }

  /* Numbered or lettered parts of an assignment, optionally with details such as
     authors and publication, and one or more paragraphs */
  function outlineList(items) {
    return h(
      'ol',
      { class: 'outline-list' },
      items.map((item) => {
        const meta = listOf(item.meta).filter((entry) => entry.label && entry.value);
        const text = listOf(item.text);
        return h(
          'li',
          { class: 'outline-list__item' },
          h('span', { class: 'outline-list__marker outline-num', 'aria-hidden': 'true' }, item.marker),
          h('h3', { class: 'outline-list__title', lang: item.lang || null }, item.marker ? hidden(`${item.marker}. `) : null, item.title),
          meta.length ? h('dl', { class: 'outline-list__meta' }, meta.map((entry) => h('div', {}, h('dt', {}, entry.label), h('dd', {}, entry.value)))) : null,
          text.length ? h('div', { class: 'outline-list__text' }, text.map((paragraph) => h('p', {}, paragraph))) : null,
          item.link && item.link.href
            ? h(
                'p',
                { class: 'outline-list__link' },
                link(
                  item.link.href,
                  { class: 'wave-link' },
                  h('span', { class: 'has-wave' }, item.link.label || 'Open'),
                  h('span', { 'aria-hidden': 'true' }, isExternal(item.link.href) ? '↗' : '→'),
                  item.marker ? hidden(`, item ${item.marker}`) : null,
                ),
              )
            : null,
        );
      }),
    );
  }

  /* A closing note after the content, styled like the summary */
  function closingBlock(closing) {
    return h(
      'section',
      { class: 'detail__closing', 'aria-labelledby': 'closing-heading' },
      h('h2', { class: 'label', id: 'closing-heading' }, closing.label || 'Notes'),
      h('span', { class: 'tick-rule', 'aria-hidden': 'true' }),
      listOf(closing.text).map((paragraph) => h('p', { class: 'detail__summary-text' }, paragraph)),
    );
  }

  /* Facts under the summary; an entry with href becomes a link */
  function infoList(info) {
    return h(
      'div',
      { class: 'detail__info' },
      h('h3', { class: 'label' }, 'Assignment information'),
      h(
        'dl',
        { class: 'facts' },
        info.map((item) => h('div', {}, h('dt', {}, item.label), h('dd', {}, item.href ? link(item.href, {}, item.value || item.href) : item.value))),
      ),
    );
  }

  /* An embedded PDF with View and Download links. Browsers that cannot show a PDF
     inline (most phones) get a short note and use the links instead. */
  function documentBlock(doc, title) {
    const href = resolve(doc.src);
    const note = (...lines) => h('div', { class: 'document__fallback' }, lines.map((line) => h('p', {}, line)));
    const actions = h(
      'ul',
      { class: 'document__actions' },
      h(
        'li',
        {},
        h('a', { class: 'wave-link', href, target: '_blank', rel: 'noopener' }, h('span', { class: 'has-wave' }, 'View PDF'), h('span', { 'aria-hidden': 'true' }, '↗'), hidden(' (opens in a new tab)')),
      ),
      h('li', {}, h('a', { class: 'wave-link', href, download: doc.src.split('/').pop() }, h('span', { class: 'has-wave' }, 'Download PDF'), h('span', { 'aria-hidden': 'true' }, '↓'))),
    );
    const canShow = navigator.pdfViewerEnabled !== false;
    /* A page-shaped viewer opens without the thumbnail panel, the page fitted to its width */
    const viewerUrl = doc.fullPage ? `${href}#navpanes=0&view=FitH` : href;
    const viewer = canShow
      ? h(
          'object',
          { class: 'document__viewer', data: viewerUrl, type: 'application/pdf', title: doc.title || title },
          note('This browser cannot show the PDF here.', 'Use View PDF or Download PDF to read it.'),
        )
      : note('This browser cannot show the PDF on the page.', 'Use View PDF or Download PDF to read it.');
    const frame = h('div', { class: canShow ? 'frame__inner document__frame' : 'frame__inner document__frame document__frame--note' }, viewer);
    if (doc.fullPage) frame.classList.add('document__frame--page');
    /* On a web server, check that the file is there: a missing PDF gets a notice
       instead of a broken viewer and dead links */
    if (/^https?:$/.test(location.protocol)) {
      fetch(href, { method: 'HEAD' })
        .then((response) => {
          if (response.ok) return;
          actions.remove();
          frame.classList.add('document__frame--note');
          frame.replaceChildren(note('The PDF will be available here soon.'));
        })
        .catch(() => {});
    }
    return h(
      'section',
      { class: doc.fullPage ? 'detail__document detail__document--page' : 'detail__document', 'aria-labelledby': 'document-heading' },
      h('div', { class: 'document__head' }, h('h2', { class: 'label', id: 'document-heading' }, 'Document'), actions),
      h('div', { class: 'frame frame--flat' }, frame),
    );
  }

  function renderAssignmentDetail(main) {
    const list = data.assignments;
    const index = list.findIndex((item) => item.slug === main.dataset.assignment);
    if (index === -1) return;
    const assignment = list[index];
    const field = (name) => main.querySelector(`[data-field="${name}"]`);

    fill(field('title'), splitTitle(assignment.title));
    fill(field('id'), assignment.id);
    fill(field('crumb'), `${assignment.id} - ${assignment.title}`);
    fill(field('summary'), assignment.summary);
    const status = field('status');
    if (status) status.hidden = !assignment.placeholder;

    /* Optional extras: subtitle under the title, facts under the summary, a video
       beside the summary, the parts of the assignment and a PDF document */
    const titleNode = field('title');
    if (assignment.subtitle && titleNode) titleNode.after(h('p', { class: 'page-hero__lede detail__subtitle' }, assignment.subtitle));

    const summarySection = main.querySelector('.detail__summary');
    if (summarySection && listOf(assignment.info).length) summarySection.append(infoList(listOf(assignment.info)));

    const contentSection = main.querySelector('.detail__content');
    if (assignment.video && contentSection) contentSection.before(videoBlock(assignment.video, assignment.title));

    const paragraphs = assignment.content || [];
    const outline = assignment.outline && listOf(assignment.outline.items).length ? assignment.outline : null;
    const content = field('content');
    if (content) {
      content.hidden = paragraphs.length === 0 && Boolean(outline);
      content.classList.toggle('prose--empty', paragraphs.length === 0);
      content.replaceChildren(
        ...(paragraphs.length
          ? paragraphs.map((text) => h('p', {}, text))
          : [h('p', {}, 'Assignment content will be added soon.')]),
      );
    }
    if (outline && contentSection) {
      if (!paragraphs.length) main.querySelector('#content-heading')?.replaceChildren(outline.label || 'Assignment content');
      else if (outline.label) contentSection.append(h('h3', { class: 'label' }, outline.label));
      contentSection.append(outlineList(listOf(outline.items)));
    }
    if (assignment.closing && listOf(assignment.closing.text).length && contentSection) contentSection.after(closingBlock(assignment.closing));

    /* With no text and no outline, a video or a document is the content, so the
       "content will be added soon" panel is left out */
    const hasDocument = Boolean(assignment.document && assignment.document.src);
    if (contentSection && !paragraphs.length && !outline && (assignment.video || hasDocument)) contentSection.hidden = true;

    /* A long title is set smaller, so it does not fill the whole screen */
    if (titleNode) titleNode.classList.toggle('page-title--long', assignment.title.length > 24);

    const detail = main.querySelector('.detail');
    if (hasDocument && detail) {
      const documentSection = documentBlock(assignment.document, assignment.title);
      /* A document that is the only content sits beside the summary, like a video */
      if (contentSection?.hidden && !assignment.video) documentSection.classList.add('detail__document--side');
      detail.append(documentSection);
    }

    const images = assignment.images || [];
    const imageSection = main.querySelector('[data-section="images"]');
    if (imageSection) {
      imageSection.hidden = images.length === 0;
      imageSection.querySelector('.gallery')?.replaceChildren(
        ...images.map((image) =>
          h(
            'figure',
            {},
            h(
              'div',
              { class: 'frame' },
              h(
                'div',
                { class: 'frame__inner frame__inner--auto' },
                h('img', { src: resolve(image.src), alt: image.alt || '', loading: 'lazy', decoding: 'async' }),
              ),
            ),
            image.caption ? h('figcaption', {}, image.caption) : null,
          ),
        ),
      );
    }

    const links = assignment.links || [];
    const linkSection = main.querySelector('[data-section="links"]');
    if (linkSection) {
      linkSection.hidden = links.length === 0;
      linkSection.querySelector('.file-list')?.replaceChildren(
        ...links.map((item) =>
          h(
            'li',
            {},
            link(item.href, {}, h('span', {}, item.label), h('span', { 'aria-hidden': 'true' }, isExternal(item.href) ? '↗' : '→')),
          ),
        ),
      );
    }

    const extra = main.querySelector('.detail__extra');
    if (extra) extra.hidden = images.length === 0 && links.length === 0;

    const pager = document.querySelector('[data-render="pager"]');
    fill(
      pager,
      index > 0 ? pagerLink(list[index - 1], 'prev') : null,
      h('a', { class: 'wave-link pager__all', href: resolve('assignments/index.html') }, h('span', { class: 'has-wave' }, 'All assignments')),
      index < list.length - 1 ? pagerLink(list[index + 1], 'next') : null,
    );

    document.title = `${assignment.title} (${assignment.id}) ● ${OWNER}`;
  }

  /* ---------------------------------------------------------------- init */

  renderAssignmentMenus();
  document.querySelectorAll('[data-render="projects"]').forEach(renderProjects);
  document.querySelectorAll('[data-render="assignments"]').forEach(renderAssignmentRows);
  const detail = document.querySelector('main[data-assignment]');
  if (detail) renderAssignmentDetail(detail);
})();
