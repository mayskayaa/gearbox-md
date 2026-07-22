/** Default section content for seed / memory fallback */

export const SECTION_KEYS = [
  "hero",
  "specialization",
  "stats",
  "services",
  "cases",
  "cta",
  "contacts",
  "footer",
];

export const DEFAULT_SECTIONS = [
  {
    key: "hero",
    visible: true,
    contentRu: {
      locationTag: "Кишинёв · С 2005 года · Только АКПП",
      title: "Ремонт АКПП любой сложности",
      titleHighlight: "АКПП",
      subtitle:
        "Узкоспециализированный сервис автоматических трансмиссий. Диагностика, ремонт и обслуживание любых типов АКПП -\nот легковых до спецтехники.",
      ctaText: "Записаться на диагностику",
      ctaSecondaryText: "Наши услуги",
      ctaHref: "#contacts",
      bgImageUrl: "/img/MainImg.webp",
    },
    contentRo: {
      locationTag: "Chișinău · Din 2005 · Doar cutii automate",
      title: "Reparație cutii automate de orice complexitate",
      titleHighlight: "cutii automate",
      subtitle:
        "Service specializat în transmisii automate. Diagnosticare, reparație și întreținere a tuturor tipurilor de cutii automate - de la autoturisme la utilaje speciale.",
      ctaText: "Programare la diagnosticare",
      ctaSecondaryText: "Serviciile noastre",
      ctaHref: "#contacts",
      bgImageUrl: "/img/MainImg.webp",
    },
  },
  {
    key: "specialization",
    visible: true,
    contentRu: {
      label: "Специализация",
      text: "Диагностика, обслуживание и ремонт всех типов АКПП - легковые, внедорожники, грузовая и спецтехника",
      highlight: "всех типов АКПП",
      tickerItems: [
        "Ремонт АКПП",
        "Вариаторы CVT",
        "DSG и роботы",
        "Гидротрансформаторы",
        "Гидроблоки",
        "Соленоиды",
        "Замена масла",
        "Диагностика",
        "Полный привод",
        "Раздаточные коробки",
      ],
    },
    contentRo: {
      label: "Specializare",
      text: "Diagnosticare, întreținere și reparație a tuturor tipurilor de cutii automate - autoturisme, SUV-uri, camioane și utilaje speciale",
      highlight: "tuturor tipurilor de cutii automate",
      tickerItems: [
        "Reparație cutii automate",
        "Variatoare CVT",
        "DSG și roboți",
        "Convertizoare de cuplu",
        "Blocuri hidraulice",
        "Solenoizi",
        "Schimb ulei",
        "Diagnosticare",
        "Tracțiune integrală",
        "Cutii de distribuție",
      ],
    },
  },
  {
    key: "stats",
    visible: true,
    contentRu: {
      items: [
        {
          tag: "На рынке",
          badge: "Стаж",
          value: "20",
          suffix: "+",
          description: "лет в ремонте АКПП,\nс 2005 года",
        },
        {
          tag: "Гарантия на работы",
          badge: "Надёжность",
          value: "6",
          suffix: "мес",
          description: "или 10 000 км\nпробега",
        },
      ],
    },
    contentRo: {
      items: [
        {
          tag: "Pe piață",
          badge: "Experiență",
          value: "20",
          suffix: "+",
          description: "ani în reparația cutiilor automate,\ndin 2005",
        },
        {
          tag: "Garanție la lucrări",
          badge: "Fiabilitate",
          value: "6",
          suffix: "luni",
          description: "sau 10 000 km\nparcurși",
        },
      ],
    },
  },
  {
    key: "services",
    visible: true,
    contentRu: {
      label: "Что мы делаем",
      title: "Услуги",
      items: [
        {
          num: "01",
          title: "Текущее обслуживание АКПП",
          description: "Компьютерная диагностика, считывание ошибок, адаптация блоков управления.",
        },
        {
          num: "02",
          title: "Ремонт гидротрансформаторов",
          description: "Полный цикл: дефектовка, восстановление, балансировка.",
        },
        {
          num: "03",
          title: "Ремонт гидроблоков",
          description: "Ремонт клапанов, пружин, регуляторов давления.",
        },
        {
          num: "04",
          title: "Ремонт автоматических систем полного привода",
          description:
            "Ремонт раздаточных коробок и автоматических систем полного привода. Шестерни, шлицевые соединения, дифференциалы - любые неисправности трансмиссии.",
        },
        {
          num: "05",
          title: "Замена масла в АКПП",
          description: "Полным или частичным способом.",
        },
        {
          num: "06",
          title: "Соленоиды и ЭБУ",
          description:
            "Проверка, чистка и ремонт соленоидов. Ремонт электронных блоков управления АКПП большинства марок - включая нестандартные и редкие конфигурации.",
        },
      ],
    },
    contentRo: {
      label: "Ce facem",
      title: "Servicii",
      items: [
        {
          num: "01",
          title: "Întreținere curentă cutie automată",
          description: "Diagnostic computerizat, citire erori, adaptare unități de control.",
        },
        {
          num: "02",
          title: "Reparație convertizoare de cuplu",
          description: "Ciclu complet: expertiză, restaurare, echilibrare.",
        },
        {
          num: "03",
          title: "Reparație blocuri hidraulice",
          description: "Reparație supape, arcuri, regulatoare de presiune.",
        },
        {
          num: "04",
          title: "Reparație sisteme automate de tracțiune integrală",
          description:
            "Reparație cutii de distribuție și sisteme automate 4x4. Angrenaje, caneluri, diferențiale - orice defecțiune de transmisie.",
        },
        {
          num: "05",
          title: "Schimb ulei în cutia automată",
          description: "Complet sau parțial.",
        },
        {
          num: "06",
          title: "Solenoizi și ECU",
          description:
            "Verificare, curățare și reparație solenoizi. Reparație unități electronice de control pentru majoritatea mărcilor - inclusiv configurații rare.",
        },
      ],
    },
  },
  {
    key: "cases",
    visible: true,
    contentRu: {
      items: [
        {
          variant: "stats",
          label: "О компании",
          title: "Gearbox —\n20 лет только АКПП",
          description:
            "Основан в 2005 году как узкоспециализированный сервис. Мы никогда не расширялись на «всё подряд» - и это принципиальная позиция. Каждый механик в нашей компании работает исключительно с автоматическими трансмиссиями. Это означает, что проблему, с которой вы приехали, мы видели сотни раз.\n\nОбслуживаем легковые автомобили, минивэны, пикапы, внедорожники, грузовые и специальную технику. Все необходимые расходники в наличии на складе, без ожидания и переплат посредникам.",
          imageUrl: "/img/Background.png",
          stats: ["2005", "30+", "100%"],
          statsLabels: ["год основания", "марок авто", "только АКПП"],
        },
        {
          variant: "bullets",
          label: "Оснащение",
          title: "Наше\nоборудование",
          description:
            "Современные диагностические стенды и профессиональный инструмент позволяют обслуживать несколько автомобилей одновременно без потери качества.",
          imageUrl: "/img/DSC00956.png",
          bullets: [
            "Компьютеризированная диагностика всех марок",
            "Установки для проточной замены масла в АКПП",
            "Стенды для проверки и ремонта гидроблоков",
          ],
        },
      ],
    },
    contentRo: {
      items: [
        {
          variant: "stats",
          label: "Despre noi",
          title: "Gearbox —\n20 de ani doar cutii automate",
          description:
            "Fondat în 2005 ca service strict specializat. Nu ne-am extins niciodată la «de toate» - este o poziție de principiu. Fiecare mecanic din echipa noastră lucrează exclusiv cu transmisii automate. Asta înseamnă că problema cu care ați venit am mai văzut-o de sute de ori.\n\nDeservim autoturisme, minivanuri, pick-up-uri, SUV-uri, camioane și utilaje speciale. Toate consumabilele necesare sunt în stoc, fără așteptare și fără suprataxe intermediari.",
          imageUrl: "/img/Background.png",
          stats: ["2005", "30+", "100%"],
          statsLabels: ["an fondare", "mărci auto", "doar cutii automate"],
        },
        {
          variant: "bullets",
          label: "Dotare",
          title: "Echipamentul\nnostru",
          description:
            "Standuri moderne de diagnosticare și scule profesionale ne permit să deservim mai multe mașini simultan fără a compromite calitatea.",
          imageUrl: "/img/DSC00956.png",
          bullets: [
            "Diagnostic computerizat pentru toate mărcile",
            "Instalații pentru schimb de ulei prin circulație",
            "Standuri pentru verificarea și repararea blocurilor hidraulice",
          ],
        },
      ],
    },
  },
  {
    key: "cta",
    visible: true,
    contentRu: {
      label: "Запись на сервис",
      title: "Проблема с АКПП? Запишитесь на бесплатную диагностику.",
      titleLine1: "Проблема с АКПП?",
      titleLine2: "Запишитесь",
      titleLine3: "на ",
      titleHighlight: "бесплатную диагностику.",
      buttonText: "Позвонить",
    },
    contentRo: {
      label: "Programare service",
      title: "Problemă cu cutia automată? Înscrieți-vă la diagnosticare gratuită.",
      titleLine1: "Problemă cu cutia automată?",
      titleLine2: "Înscrieți-vă",
      titleLine3: "la ",
      titleHighlight: "diagnosticare gratuită.",
      buttonText: "Sună",
    },
  },
  {
    key: "contacts",
    visible: true,
    contentRu: {
      label: "Как нас найти",
      title: "Контакты",
      address: "Кишинёв, Calea Ghidighici, 4",
      map: {
        placeName: "GearBox ATCC",
        googleMapsUrl: "",
        latitude: 47.05467,
        longitude: 28.77951,
        zoom: 17,
      },
      phones: ["+373 79 911 103", "+373 79 911 104"],
      email: "service@gearbox.md",
      hoursWeekday: "Пн–Пт: 9:00–18:00",
      hoursSaturday: "Сб: 9:00–14:00",
      socials: {
        viber: "viber://chat?number=%2B37379911103",
        whatsapp: "https://wa.me/37379911103",
        instagram: "https://www.instagram.com/gearbox_md?igsh=N3lxYmpkZWxpbDh1&utm_source=qr",
        facebook: "https://www.facebook.com/share/1EAwpVfqaP/?mibextid=wwXIfr",
      },
      formTitle: "Оставить заявку",
      formNameLabel: "Имя",
      formPhoneLabel: "Телефон",
      formEmailLabel: "Email",
      formMessageLabel: "Сообщение",
      formSubmitLabel: "Отправить",
    },
    contentRo: {
      label: "Cum ne găsiți",
      title: "Contacte",
      address: "Chișinău, Calea Ghidighici, 4",
      map: {
        placeName: "GearBox ATCC",
        googleMapsUrl: "",
        latitude: 47.05467,
        longitude: 28.77951,
        zoom: 17,
      },
      phones: ["+373 79 911 103", "+373 79 911 104"],
      email: "service@gearbox.md",
      hoursWeekday: "Lun–Vin: 9:00–18:00",
      hoursSaturday: "Sâm: 9:00–14:00",
      socials: {
        viber: "viber://chat?number=%2B37379911103",
        whatsapp: "https://wa.me/37379911103",
        instagram: "https://www.instagram.com/gearbox_md?igsh=N3lxYmpkZWxpbDh1&utm_source=qr",
        facebook: "https://www.facebook.com/share/1EAwpVfqaP/?mibextid=wwXIfr",
      },
      formTitle: "Trimiteți o cerere",
      formNameLabel: "Nume",
      formPhoneLabel: "Telefon",
      formEmailLabel: "Email",
      formMessageLabel: "Mesaj",
      formSubmitLabel: "Trimite",
    },
  },
  {
    key: "footer",
    visible: true,
    contentRu: {
      logoUrl: "/img/Group 15.png",
      navTitle: "Навигация",
      addressTitle: "Адрес",
      contactsTitle: "Контакты",
      navLinks: [
        { label: "Услуги", href: "#services" },
        { label: "О нас", href: "#about" },
        { label: "Контакты", href: "#contacts" },
      ],
      copyrightLocation: "Кишинёв, Молдова.",
    },
    contentRo: {
      logoUrl: "/img/Group 15.png",
      navTitle: "Navigare",
      addressTitle: "Adresă",
      contactsTitle: "Contacte",
      navLinks: [
        { label: "Servicii", href: "#services" },
        { label: "Despre noi", href: "#about" },
        { label: "Contacte", href: "#contacts" },
      ],
      copyrightLocation: "Chișinău, Moldova.",
    },
  },
];

export const DEFAULT_SITE_SETTINGS = {
  logoUrl: "",
  seoTitleRu: "Gearbox - Ремонт АКПП в Кишинёве",
  seoTitleRo: "Gearbox - Reparație cutii automate în Chișinău",
  seoDescRu:
    "Узкоспециализированный сервис ремонта АКПП с 2005 года. Диагностика, ремонт, обслуживание. Гарантия 6 месяцев. Звоните - расскажем что делать дальше.",
  seoDescRo:
    "Service specializat în reparația cutiilor automate din 2005. Diagnosticare, reparație, întreținere. Garanție 6 luni. Sunați - vă spunem ce urmează.",
  sectionSpacing: { defaultGap: 80, overrides: {} },
};
