import { L } from "../../lib/i18n.js";

// How AALKC works, end to end. Each stage restates what the company already
// publishes (containers, inspection and grading, certified weighing, laser
// and XRF-supported identification, supply to mills and foundries). The
// "after it leaves us" section describes industry practice, labelled as such.
export const processGuide = {
  standfirst: L(
    "Every load follows the same documented sequence. The order matters: material is inspected and graded before it is weighed, so the price follows what was actually delivered.",
    "تمر كل حمولة بالتسلسل الموثّق نفسه، والترتيب مهم: تُفحص المادة وتُصنَّف قبل وزنها، ليتبع السعر ما سُلِّم فعلًا.",
  ),
  brief: [
    L("Seven stages: enquiry, planning and collection, receiving and inspection, sorting and grading, certified weighing, valuation and settlement, and onward supply.", "سبع مراحل: الاستفسار، والتخطيط والجمع، والاستلام والفحص، والفرز والتصنيف، والوزن المعتمد، والتقييم والتسوية، والتوريد اللاحق."),
    L("Loads are inspected for safety and graded before weighing; sealed, pressurised or hazardous containers are not accepted.", "تُفحص الحمولات للسلامة وتُصنَّف قبل الوزن، ولا تُقبل الحاويات المغلقة أو المضغوطة أو الخطرة."),
    L("Weights are taken on certified industrial scales; alloys are confirmed with laser and XRF-supported identification.", "تُؤخذ الأوزان على موازين صناعية معتمدة، وتُؤكَّد السبائك بالتعرّف المدعوم بالليزر وتقنية XRF."),
    L("Graded material is supplied to mills, foundries and international buyers as feedstock for new metal.", "تُورَّد المواد المصنّفة إلى مصانع الصلب والمسابك والمشترين الدوليين مادةً خامًا لمعادن جديدة."),
  ],
  stages: [
    {
      id: "enquiry",
      title: L("Enquiry", "الاستفسار"),
      copy: L(
        "You share the material type, an estimated quantity, the site location and how often scrap is generated. Photographs sent on WhatsApp help us give a faster first assessment.",
        "تُشاركنا نوع المادة والكمية التقديرية وموقع العمل ومدى تكرار تولّد الخردة، وتساعدنا الصور المرسلة عبر واتساب على تقديم تقييم أولي أسرع.",
      ),
      points: [
        L("Material type and how it arises", "نوع المادة وكيف تتولد"),
        L("Estimated quantity and frequency", "الكمية التقديرية ومعدل التكرار"),
        L("Site location and access", "موقع العمل ومداخله"),
      ],
    },
    {
      id: "collection",
      title: L("Planning and collection", "التخطيط والجمع"),
      copy: L(
        "We match the collection to the site: roll-off containers from 10 to 40 yards, flatbed and specialised transport, swapped or collected on an agreed schedule. Plant clearances and heavy items are planned with dismantling and fleet coordination.",
        "نوائم الجمع مع الموقع: حاويات سحب من 10 إلى 40 ياردة، ونقل مسطح ومتخصص، تُستبدل أو تُجمع وفق جدول متفق عليه. ويُخطَّط لإخلاء المصانع والقطع الثقيلة مع التفكيك وتنسيق الأسطول.",
      ),
      points: [
        L("Containers matched to material and access", "حاويات تناسب المادة والمداخل"),
        L("Scheduled swaps or one-off collections", "استبدال مجدول أو جمع لمرة واحدة"),
        L("Dismantling and heavy logistics where needed", "تفكيك وخدمات لوجستية ثقيلة عند الحاجة"),
      ],
      links: [["/services/container-service", L("Container service", "خدمة الحاويات")], ["/services/heavy-logistics", L("Heavy logistics", "الخدمات اللوجستية الثقيلة")]],
    },
    {
      id: "inspection",
      title: L("Receiving and inspection", "الاستلام والفحص"),
      copy: L(
        "Every load is inspected before acceptance — for what it is, for contamination, and for safety. Sealed, pressurised or hazardous containers are not accepted, and the supplier confirms legal ownership of the material.",
        "تُفحص كل حمولة قبل قبولها: من حيث ماهيتها، والتلوث، والسلامة. ولا تُقبل الحاويات المغلقة أو المضغوطة أو الخطرة، ويؤكد المورّد ملكيته القانونية للمادة.",
      ),
      points: [
        L("Visual inspection of every load", "فحص بصري لكل حمولة"),
        L("Hazardous and sealed items rejected", "رفض المواد الخطرة والمغلقة"),
        L("Ownership confirmed by the supplier", "تأكيد الملكية من المورّد"),
      ],
    },
    {
      id: "grading",
      title: L("Sorting and grading", "الفرز والتصنيف"),
      copy: L(
        "Material is separated by family and assigned a grade. Where alloys need confirming — stainless grades, brass and bronze, aluminium series — we use laser and XRF-supported identification, and the acceptance review is documented for every load.",
        "تُفصل المواد بحسب الفئة وتُمنح درجة. وعند الحاجة إلى التحقق من السبائك — كدرجات الفولاذ المقاوم للصدأ، والنحاس الأصفر والبرونز، وسلاسل الألمنيوم — نستخدم التعرّف المدعوم بالليزر وتقنية XRF، ونوثّق مراجعة القبول لكل حمولة.",
      ),
      points: [
        L("Separation by metal family", "الفصل بحسب فئة المعدن"),
        L("Alloy identification with laser and XRF support", "التعرّف على السبائك بدعم الليزر وتقنية XRF"),
        L("Documented acceptance review", "مراجعة قبول موثقة"),
      ],
      links: [["/services/metal-sorting", L("Metal sorting", "فرز المعادن")], ["/insights/scrap-metal-grades-explained", L("How grades work", "كيف تعمل الدرجات")]],
    },
    {
      id: "weighing",
      title: L("Certified weighing", "الوزن المعتمد"),
      copy: L(
        "Accepted material is weighed on certified industrial scales through a documented process, so the weight that sets the value can be traced and checked.",
        "توزن المواد المقبولة على موازين صناعية معتمدة ضمن إجراء موثّق، ليمكن تتبّع الوزن الذي تتحدد به القيمة والتحقق منه.",
      ),
      points: [
        L("Certified industrial scales", "موازين صناعية معتمدة"),
        L("Documented weighing process", "إجراء وزن موثّق"),
      ],
    },
    {
      id: "settlement",
      title: L("Valuation and settlement", "التقييم والتسوية"),
      copy: L(
        "Value is confirmed from the grade and the certified weight against current market conditions. Website estimates are non-binding until material has been inspected and weighed; the agreed payment process then follows.",
        "تتأكد القيمة من الدرجة والوزن المعتمد وفق ظروف السوق الحالية. وتبقى التقديرات المقدَّمة عبر الموقع غير ملزمة حتى تُفحص المادة وتوزن، ثم تُستكمل إجراءات الدفع المتفق عليها.",
      ),
      points: [
        L("Market-aware pricing", "تسعير يراعي السوق"),
        L("Value confirmed after inspection and weighing", "تأكيد القيمة بعد الفحص والوزن"),
        L("Agreed payment process", "إجراءات دفع متفق عليها"),
      ],
      links: [["/services/scrap-purchasing", L("Scrap purchasing", "شراء الخردة")]],
    },
    {
      id: "supply",
      title: L("Onward supply", "التوريد اللاحق"),
      copy: L(
        "Graded material goes back into production: to steel mills and foundries as feedstock, and — where a grade finds its best value abroad — to international foundries and mills through coordinated trade channels.",
        "تعود المواد المصنّفة إلى الإنتاج: إلى مصانع الصلب والمسابك مادةً خامًا، وإلى المسابك والمصانع الدولية عبر قنوات تجارية منسّقة حين تجد الدرجة قيمتها الأفضل في الخارج.",
      ),
      points: [
        L("Mills and foundries as feedstock", "مصانع الصلب والمسابك مادةً خامًا"),
        L("Export through coordinated channels", "التصدير عبر قنوات منسّقة"),
      ],
      links: [["/services/global-export", L("Global export", "التصدير العالمي")]],
    },
  ],
  downstream: [
    { type: "h2", id: "after", text: L("After it leaves the yard: how scrap becomes metal again", "بعد مغادرة الساحة: كيف تعود الخردة معدنًا") },
    { type: "p", text: L(
      "Across the industry, sorted scrap is prepared for the furnace that will melt it. Heavy steel is sheared to size; light steel and non-ferrous material is baled or shredded; shredded material is separated with magnets for ferrous metal and eddy-current separators for non-ferrous metal. Steel scrap is melted in electric arc furnaces — which can run on up to 100% scrap — or added to basic oxygen furnaces; copper, aluminium and brass go to refiners, remelters and foundries.",
      "على مستوى الصناعة، تُجهَّز الخردة المفرزة للفرن الذي سيصهرها: يُقص الفولاذ الثقيل إلى المقاسات، ويُكبس الفولاذ الخفيف والمعادن غير الحديدية أو تُفرم، ثم تُفصل المواد المفرومة بالمغانط للمعادن الحديدية وبفواصل التيار الدوّامي للمعادن غير الحديدية. وتُصهر خردة الفولاذ في الأفران القوسية الكهربائية — التي يمكن أن تعمل بخردة تصل نسبتها إلى 100% — أو تُضاف إلى المحوّلات الأكسجينية القاعدية، بينما يذهب النحاس والألمنيوم والنحاس الأصفر إلى المصافي ومصانع إعادة الصهر والمسابك.",
    ) },
    { type: "p", text: L(
      "Read the full account in [how scrap metal is recycled](/insights/how-scrap-metal-is-recycled).",
      "اقرأ الشرح الكامل في [كيف يُعاد تدوير الخردة المعدنية](/insights/how-scrap-metal-is-recycled).",
    ) },
  ],
  faq: [
    { question: L("Why is material graded before it is weighed?", "لماذا تُصنَّف المادة قبل وزنها؟"), answer: L("Because value depends on both. Grading first means the certified weight is applied to the grade that was actually delivered, not to an estimate.", "لأن القيمة تتوقف على الأمرين معًا، والتصنيف أولًا يعني تطبيق الوزن المعتمد على الدرجة المسلَّمة فعلًا لا على تقدير.") },
    { question: L("Are website quotations final?", "هل عروض الأسعار عبر الموقع نهائية؟"), answer: L("No. Estimates given through the website or by email are based on current market conditions and are non-binding until material has been physically inspected and weighed.", "لا. التقديرات المقدَّمة عبر الموقع أو البريد الإلكتروني مبنية على ظروف السوق الحالية، وتبقى غير ملزمة حتى تُفحص المادة فعليًا وتوزن.") },
    { question: L("What will not be accepted?", "ما الذي لا يُقبل؟"), answer: L("Sealed, pressurised or hazardous containers, and material containing explosive or radioactive items. Suppliers are responsible for ensuring scrap is free of hazardous materials and for confirming ownership.", "الحاويات المغلقة أو المضغوطة أو الخطرة، والمواد التي تحتوي على مواد متفجرة أو مشعة. والمورّد مسؤول عن خلوّ الخردة من المواد الخطرة وعن تأكيد الملكية.") },
  ],
};
