const evidenceItems = [
  {
    title: "Approved peptide medicines",
    level: "High",
    filter: "regulated",
    summary:
      "The strongest lane is a regulated medicine used for a labeled condition with prescribing information, safety warnings, and clinician oversight.",
    tags: ["FDA pathway", "labeled use"],
  },
  {
    title: "Clinical-stage peptides",
    level: "Moderate",
    filter: "clinical",
    summary:
      "A peptide can be scientifically promising while still being investigational. Study phase, endpoints, population, and adverse events matter.",
    tags: ["trial context", "not automatic care"],
  },
  {
    title: "Compounded peptide products",
    level: "Limited",
    filter: "limited",
    summary:
      "Compounding can serve patient-specific needs, but it is not the same as a broadly approved product. Rules, quality, and availability can change.",
    tags: ["verify status", "pharmacy matters"],
  },
  {
    title: "Cosmetic peptide claims",
    level: "Limited",
    filter: "limited",
    summary:
      "Topical cosmetic claims are usually a different evidence category than prescription medicine. Look for human studies and realistic endpoints.",
    tags: ["topical", "claim-specific"],
  },
  {
    title: "Wellness and performance stacks",
    level: "High caution",
    filter: "avoid",
    summary:
      "Bundles sold for recovery, fat loss, sleep, longevity, or performance often combine weak evidence with unclear sourcing and medical risk.",
    tags: ["marketing risk", "quality unknown"],
  },
  {
    title: "Research-only peptides",
    level: "High caution",
    filter: "avoid",
    summary:
      "A laboratory-use label is not a patient safety credential. Avoid treating research-only products as a shortcut to therapy.",
    tags: ["not medicine", "avoid self-use"],
  },
  {
    title: "Social media before-and-after claims",
    level: "High caution",
    filter: "avoid",
    summary:
      "Testimonials cannot prove safety, purity, dose accuracy, diagnosis fit, or long-term outcomes.",
    tags: ["anecdote", "not evidence"],
  },
  {
    title: "Clinician-supervised off-label discussion",
    level: "Moderate",
    filter: "clinical",
    summary:
      "Off-label prescribing is a medical decision, not a shopping category. It needs a documented rationale, monitoring, and informed consent.",
    tags: ["medical judgment", "monitoring"],
  },
];

const evidenceGrid = document.querySelector("#evidenceGrid");
const filterButtons = document.querySelectorAll("[data-filter]");

function renderEvidence(activeFilter = "all") {
  const visibleItems =
    activeFilter === "all"
      ? evidenceItems
      : evidenceItems.filter((item) => item.filter === activeFilter);

  evidenceGrid.innerHTML = visibleItems
    .map(
      (item) => `
        <article class="evidence-card" data-level="${item.level}">
          <span class="card-kicker">${item.level}</span>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <div class="evidence-meta">
            ${item.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderEvidence(button.dataset.filter);
  });
});

const safetyForm = document.querySelector("#safetyForm");
const riskTitle = document.querySelector("#riskTitle");
const riskCopy = document.querySelector("#riskCopy");
const riskFill = document.querySelector("#riskFill");

function updateRiskSignal() {
  const checks = [...safetyForm.querySelectorAll("input[type='checkbox']")];
  const checked = checks.filter((input) => input.checked).length;
  const percent = Math.round((checked / checks.length) * 100);

  riskFill.style.width = `${percent}%`;

  if (percent === 100) {
    riskTitle.textContent = "Basics covered";
    riskCopy.textContent =
      "This still does not make a peptide right for you. It means the minimum verification questions have answers.";
    riskFill.style.background = "var(--teal)";
    return;
  }

  if (percent >= 67) {
    riskTitle.textContent = "Verify gaps";
    riskCopy.textContent =
      "Some important questions still need clear answers before the situation looks well controlled.";
    riskFill.style.background = "var(--amber)";
    return;
  }

  if (percent >= 34) {
    riskTitle.textContent = "Caution";
    riskCopy.textContent =
      "Missing medical, sourcing, or evidence basics can turn peptide decisions into avoidable risk.";
    riskFill.style.background = "var(--coral)";
    return;
  }

  riskTitle.textContent = "Incomplete";
  riskCopy.textContent =
    "Missing basics should raise caution. The safest answer may be to stop and verify before proceeding.";
  riskFill.style.background = "var(--coral)";
}

safetyForm.addEventListener("change", updateRiskSignal);

renderEvidence();
updateRiskSignal();
