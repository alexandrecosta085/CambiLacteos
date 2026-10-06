/* =========================================================
   Cambí Lácteos — Laticínios Vale do Pirangi
   Scripts: dados de contato, catálogo de produtos,
   abas, menu mobile, navbar e animações ao rolar
   ========================================================= */

/* ---------- Contatos ---------- */
const WHATSAPP_NUMBER = "5585981934450";
const CONTACTS = {
    phoneDisplay: "(85) 9 8193-4450",
    phoneHref: "tel:+5585981934450",
    email: "comercial@laticinioscambi.com.br",
    instagramDisplay: "@laticinioscambi",
    instagramHref: "https://www.instagram.com/laticinioscambi",
};

const waLink = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/* ---------- Catálogo de produtos ---------- */
const CATEGORIES = [
    {
        id: "queijos",
        label: "Queijos",
        icon: "sandwich",
        items: [
            { id: "q1", name: "Queijo Coalho Tradicional", desc: "O clássico do Nordeste: sabor marcante e textura que fica perfeita na espalmadeira ou na grelha.", tag: "Tradição" },
            { id: "q2", name: "Queijo Coalho Tradicional para Fatiar", desc: "O mesmo sabor de sempre, agora em fatias práticas para o dia a dia.", tag: "Praticidade" },
            { id: "q3", name: "Queijo Coalho Maturado", desc: "Sabor acentuado e aroma intenso, resultado de uma maturação feita no tempo certo.", tag: "Maturado" },
            { id: "q4", name: "Queijo Coalho Light", desc: "Queijo de coalho reduzido em calorias, sem abrir mão do sabor.", tag: "Light" },
            { id: "q5", name: "Queijo Coalho Zero Lactose", desc: "Todo o sabor do coalho, ideal para dietas com restrição de lactose.", tag: "Zero Lactose" },
            { id: "q6", name: "Queijo Minas Frescal Light", desc: "Leve e fresquinho, com 26% menos calorias comparado à média do mercado.", tag: "Light" },
            { id: "q7", name: "Queijo Minas Frescal Zero Lactose", desc: "Macio e delicado, ideal para dietas com restrição de lactose.", tag: "Zero Lactose" },
            { id: "q8", name: "Queijo Mussarela para Fatiar", desc: "Derretimento uniforme e fatias que rendem em sanduíches, pizzas e receitas.", tag: "Para Fatiar" },
            { id: "q9", name: "Ricota Fresca", desc: "Fonte de proteínas, de sabor delicado e textura suave — com apenas 14% de gorduras.", tag: "Leve" },
        ],
    },
    {
        id: "manteigas",
        label: "Manteigas",
        icon: "utensils",
        items: [
            { id: "m1", name: "Manteiga com Sal", desc: "Manteiga de primeira qualidade, cremosa, perfeita do pão quentinho às receitas.", tag: "Favorita", meta: "200g · 500g · 1kg" },
            { id: "m2", name: "Manteiga sem Sal", desc: "Leite puro em forma de manteiga, ideal para confeitaria e preparos refinados.", tag: "Pura", meta: "1kg" },
            { id: "m3", name: "Manteiga da Terra com Sal", desc: "Sabor marcante da terra, ideal para realçar o sabor do seu prato.", tag: "Sabor Regional", meta: "190g · 1000g" },
            { id: "m4", name: "Manteiga Ghee Zero Lactose", desc: "Zero lactose e zero sódio: o óleo puro extraído do leite.", tag: "Zero Lactose", meta: "200g" },
        ],
    },
    {
        id: "cremes",
        label: "Cremes, Natas e Requeijões",
        icon: "milk",
        items: [
            { id: "c1", name: "Creme de Leite Fresco Tradicional", desc: "Fresco e versátil, ideal para dar cremosidade e sabor às suas receitas.", tag: "Fresco", meta: "450g" },
            { id: "c2", name: "Creme de Leite Fresco Zero Lactose", desc: "Para dietas com restrição de lactose, com a mesma qualidade e cremosidade.", tag: "Zero Lactose", meta: "450g" },
            { id: "c3", name: "Nata com Sal", desc: "Cremosa, para trazer sabor e textura a receitas doces e salgadas.", tag: "Artesanal", meta: "200g · 1kg" },
            { id: "c4", name: "Requeijão Cremoso Light", desc: "Reduzido em 40% de calorias comparado à média do mercado, sem perder a cremosidade.", tag: "Light", meta: "200g" },
            { id: "c5", name: "Requeijão Cremoso Zero Lactose", desc: "Cremoso e saboroso, para dietas com restrição de lactose.", tag: "Zero Lactose", meta: "200g" },
        ],
    },
];

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const refreshIcons = () => {
    if (window.lucide) window.lucide.createIcons();
};

const tagClass = (tag) =>
    tag === "Zero Lactose" ? "product-tag zero" : tag === "Light" ? "product-tag light" : "product-tag";

/* ---------- Preenche links de contato ---------- */
function fillContacts() {
    $$("[data-wa]").forEach((el) => (el.href = waLink(el.dataset.wa)));
    $$("[data-phone]").forEach((el) => (el.textContent = CONTACTS.phoneDisplay));
    $$("[data-tel]").forEach((el) => (el.href = CONTACTS.phoneHref));
    $$("[data-email]").forEach((el) => (el.href = `mailto:${CONTACTS.email}`));
    $$("[data-email-text]").forEach((el) => (el.textContent = CONTACTS.email));
    $$("[data-instagram]").forEach((el) => (el.href = CONTACTS.instagramHref));
    $$("[data-instagram-text]").forEach((el) => (el.textContent = CONTACTS.instagramDisplay));
    $("#year").textContent = new Date().getFullYear();
}

/* ---------- Produtos: abas + cards ---------- */
function renderTabs(activeId) {
    $("#tabs").innerHTML = CATEGORIES.map(
        (cat) => `
        <button class="tab ${cat.id === activeId ? "active" : ""}" role="tab"
                aria-selected="${cat.id === activeId}" data-category="${cat.id}">
            <i data-lucide="${cat.icon}"></i>
            ${cat.label}
            <span class="tab-count">${cat.items.length}</span>
        </button>`,
    ).join("");

    $$(".tab").forEach((btn) =>
        btn.addEventListener("click", () => renderProducts(btn.dataset.category)),
    );
}

function renderProducts(activeId) {
    const category = CATEGORIES.find((c) => c.id === activeId);
    const count = category.items.length;

    renderTabs(activeId);

    $("#category-label").innerHTML = `
        <i data-lucide="${category.icon}"></i>
        <p>${category.label} · ${count} ${count === 1 ? "produto" : "produtos"}</p>`;

    const grid = $("#products-grid");
    grid.innerHTML = category.items.map(
        (p) => `
        <article class="product" id="product-${p.id}">
            <span class="${tagClass(p.tag)}">${p.tag}</span>
            <h3>${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
            ${p.meta ? `<p class="product-meta">${p.meta}</p>` : ""}
            <a class="product-btn" target="_blank" rel="noreferrer"
               href="${waLink(`Olá! Tenho interesse no produto ${p.name}, da Cambí Lácteos.`)}">
                <i data-lucide="message-circle"></i>
                Pedir no WhatsApp
            </a>
        </article>`,
    ).join("");

    // reinicia a animação de troca de categoria
    grid.classList.remove("switching");
    void grid.offsetWidth;
    grid.classList.add("switching");

    refreshIcons();
}

/* ---------- Navbar + botão flutuante: efeito ao rolar ---------- */
function initNavbar() {
    const navbar = $("#navbar");
    const waFloat = $("#wa-float");
    const onScroll = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 24);
        waFloat.classList.toggle("visible", window.scrollY > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Menu mobile ---------- */
function initMobileMenu() {
    const menu = $("#mobile-menu");
    const open = () => {
        menu.classList.add("open");
        document.body.style.overflow = "hidden";
    };
    const close = () => {
        menu.classList.remove("open");
        document.body.style.overflow = "";
    };

    $("#menu-open").addEventListener("click", open);
    $("#menu-close").addEventListener("click", close);
    $$("a", menu).forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
}

/* ---------- Rolagem suave com deslocamento da navbar ---------- */
function initSmoothScroll() {
    $$("[data-scroll]").forEach((link) => {
        link.addEventListener("click", (e) => {
            const target = $(link.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });
}

/* ---------- Revelação ao rolar ---------- */
function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("visible"));
        return;
    }
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
}

/* ---------- Inicialização ---------- */
document.addEventListener("DOMContentLoaded", () => {
    fillContacts();
    renderProducts("queijos");
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initReveal();
    refreshIcons();
});
