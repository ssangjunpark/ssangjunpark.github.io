const authorName = "Sangjun Park";

const publications = [
  {
    title: "Fast Motion Retargeting for Scalable Humanoid Robot Learning",
    featured: true,
    authors: "Daniel Marew*, Sangjun Park*, Nisal Perera, and Donghyun Kim",
    venue: "IEEE-RAS 25th International Conference on Humanoid Robots (Humanoids)",
    year: "2026",
    venueNote: "130/338 ≈ 38.5% acceptance rate",
    links: [
      { label: "paper", url: "#" },
      { label: "code", url: "#" },
      { label: "video", url: "#" },
    ],
    contributionNote: "* indicates equal contribution.",
    media: {
      type: "video",
      src: "./assets/videos/fast-motion-retargeting-demo.mp4",
      alt: "Fast motion retargeting robot demo"
    }
  },
  {
    title: "Diffusion Policy for Coordinated Control of a Nonholonomic Mobile Base and Dual Arms in Door Opening and Passing",
    authors: "Shangqun Yu, Matthew En, Daniel Wu, Sangjun Park, Ziyi Zhou, Seyed Fakoorian, Donghyun Kim",
    venue: "arXiv Preprint",
    year: "2026",
    links: [
      { label: "paper", url: "https://arxiv.org/abs/2605.15352" }
    ],
    media: {
      type: "video",
      src: "./assets/videos/diffusion-policy-demo.mp4",
      alt: "Diffusion policy robot demo"
    }
  },
];

const miscItems = [
  {
    title: "Projects",
    description: "Selected robotics, machine learning, and systems work.",
    links: [
      { label: "GitHub", url: "https://github.com/ssangjunpark" }
    ]
  },
  {
    title: "Demos",
    description: "Short videos, GIFs, and notes from recent experiments.",
    links: []
  }
];

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  element.textContent = text;
  return element;
}

function createLinksElement(links, className) {
  if (!links || links.length === 0) {
    return null;
  }

  const linksElement = document.createElement("p");
  linksElement.className = className;

  links.forEach((link, index) => {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = link.label;

    linksElement.appendChild(anchor);
    if (index < links.length - 1) {
      linksElement.appendChild(document.createTextNode(" | "));
    }
  });

  return linksElement;
}

function createPublicationMedia(media) {
  if (!media) {
    return null;
  }

  const figure = document.createElement("figure");
  figure.className = "publication-media";

  const preview = document.createElement(media.type === "video" ? "video" : "img");
  preview.src = media.src;

  if (media.type === "video") {
    preview.autoplay = true;
    preview.muted = true;
    preview.loop = true;
    preview.playsInline = true;
    preview.preload = "auto";
    preview.setAttribute("aria-label", media.alt || "Publication demo");
  } else {
    preview.alt = media.alt || "";
    preview.loading = "lazy";
  }

  figure.appendChild(preview);
  return figure;
}

function createAuthorsElement(authors) {
  const element = document.createElement("p");
  element.className = "authors";

  const parts = authors.split(authorName);
  parts.forEach((part, index) => {
    if (part) {
      element.appendChild(document.createTextNode(part));
    }

    if (index < parts.length - 1) {
      const highlightedAuthor = document.createElement("span");
      highlightedAuthor.className = "author-self";
      highlightedAuthor.textContent = authorName;
      element.appendChild(highlightedAuthor);
    }
  });

  return element;
}

function renderPublications() {
  const list = document.getElementById("publications");
  list.innerHTML = "";

  publications.forEach((publication) => {
    const item = document.createElement("article");
    item.className = "publication";
    if (publication.featured) {
      item.classList.add("is-featured");
      item.setAttribute("aria-label", `Representative paper: ${publication.title}`);
    }

    const media = createPublicationMedia(publication.media);
    if (media) {
      item.classList.add("has-media");
      item.appendChild(media);
    }

    const body = document.createElement("div");
    body.className = "publication-body";
    body.appendChild(createTextElement("h3", "", publication.title));
    body.appendChild(createAuthorsElement(publication.authors));
    body.appendChild(
      createTextElement(
        "p",
        "venue",
        `${publication.venue}, ${publication.year}`
      )
    );

    if (publication.venueNote) {
      body.appendChild(
        createTextElement("p", "venue-note", `(${publication.venueNote})`)
      );
    }

    const links = createLinksElement(publication.links, "publication-links");
    if (links) {
      body.appendChild(links);
    }

    if (publication.contributionNote) {
      body.appendChild(
        createTextElement("p", "publication-note", publication.contributionNote)
      );
    }

    item.appendChild(body);
    list.appendChild(item);
  });
}

function renderMisc() {
  const list = document.getElementById("misc");
  if (!list) return;
  list.innerHTML = "";

  miscItems.forEach((miscItem) => {
    const item = document.createElement("article");
    item.className = "misc-item";

    item.appendChild(createTextElement("h3", "", miscItem.title));
    item.appendChild(createTextElement("p", "", miscItem.description));

    const links = createLinksElement(miscItem.links, "misc-links");
    if (links) {
      item.appendChild(links);
    }

    list.appendChild(item);
  });
}

function handleMissingPhoto() {
  const photo = document.getElementById("profile-photo");

  photo.addEventListener("error", () => {
    photo.classList.add("is-missing");
  });

  if (photo.complete) {
    if (photo.naturalWidth === 0) {
      photo.classList.add("is-missing");
    }
  }
}

handleMissingPhoto();
renderPublications();
renderMisc();
