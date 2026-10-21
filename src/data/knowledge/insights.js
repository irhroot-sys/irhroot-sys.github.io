import { L } from "../../lib/i18n.js";

// Industry insights. Each article answers one question a supplier,
// procurement team or researcher actually asks, opens with a short "in brief",
// and cites the sources behind every figure and date. Articles describe the
// industry; where AALKC is mentioned, it is only for what the company already
// publishes about itself.
//
// Keyed by slug; titles, dates and sources are in meta.js.
export const insightBodies = {
  "scrap-metal-grades-explained": {
    standfirst: L(
      "Scrap is bought and sold by grade. A grade is a shared definition — of metal, form, size and cleanliness — that lets a seller, a trader and a mill agree on exactly what is in a load.",
      "تُشترى الخردة وتُباع بحسب الدرجة، والدرجة تعريف مشترك — للمعدن والشكل والمقاس والنظافة — يتيح للبائع والتاجر والمصنع الاتفاق على ما تحتويه الحمولة بالضبط.",
    ),
    brief: [
      L("The first division is ferrous (iron-based, magnetic) versus non-ferrous (copper, aluminium, brass and other metals without iron).", "التقسيم الأول هو الحديدي (القائم على الحديد والمغناطيسي) مقابل غير الحديدي (النحاس والألمنيوم والنحاس الأصفر وغيرها من المعادن الخالية من الحديد)."),
      L("Internationally, grades follow the Scrap Specifications Circular of the Institute of Scrap Recycling Industries, now the Recycled Materials Association (ReMA), which gives each grade a code name.", "تتبع الدرجات دوليًا نشرة مواصفات الخردة الصادرة عن معهد صناعات إعادة تدوير الخردة، المعروف اليوم برابطة المواد المعاد تدويرها (ReMA)، التي تعطي كل درجة اسمًا رمزيًا."),
      L("A grade is decided by composition, form and size, and by what else is in the load — attachments, coatings, oil, moisture.", "تتحدد الدرجة بالتركيب والشكل والمقاس، وبما يوجد في الحمولة غير المعدن — الملحقات والطلاءات والزيوت والرطوبة."),
      L("Grades are confirmed by inspection, magnet testing and alloy analysers before weighing.", "تُؤكَّد الدرجات بالفحص واختبار المغناطيس وأجهزة تحليل السبائك قبل الوزن."),
    ],
    blocks: [
      { type: "h2", id: "why-grades", text: L("Why scrap is traded by grade", "لماذا تُتداول الخردة بحسب الدرجة") },
      { type: "p", text: L(
        "A steel mill planning a melt, or a refinery buying copper, needs to know what is arriving: its chemistry, its size, and how much of the weight is not metal at all. Grades answer those questions in one word. The most widely used set is the Scrap Specifications Circular, published for decades by the Institute of Scrap Recycling Industries (ISRI), which now operates as the Recycled Materials Association (ReMA) and continues to update it. Its short code names — \"Candy\", \"Honey\", \"Taint/Tabor\" — appear in contracts around the world.",
        "يحتاج مصنع الصلب الذي يخطط لعملية صهر، أو المصفاة التي تشتري النحاس، إلى معرفة ما سيصل إليه: تركيبه الكيميائي، ومقاسه، وكم من الوزن ليس معدنًا أصلًا. والدرجات تجيب عن هذه الأسئلة بكلمة واحدة. وأوسع المجموعات استخدامًا هي نشرة مواصفات الخردة التي ينشرها منذ عقود معهد صناعات إعادة تدوير الخردة (ISRI)، الذي يعمل اليوم باسم رابطة المواد المعاد تدويرها (ReMA) ويواصل تحديثها. وتظهر أسماؤها الرمزية القصيرة — «Candy» و«Honey» و«Taint/Tabor» — في العقود حول العالم.",
      ) },
      { type: "h2", id: "ferrous-non-ferrous", text: L("Ferrous and non-ferrous: the first division", "الحديدي وغير الحديدي: التقسيم الأول") },
      { type: "p", text: L(
        "Ferrous scrap is iron-based — carbon steel, wrought iron and cast iron — and is generally magnetic. It is traded in large tonnages and melted in steel mills and foundries. Non-ferrous scrap contains little or no iron: copper, aluminium, brass, bronze, lead, zinc and nickel alloys. It is lighter in volume and higher in value per tonne. Stainless steel sits between the two: it is iron-based, but valued for its chromium, nickel and molybdenum and traded separately from carbon steel.",
        "الخردة الحديدية قائمة على الحديد — الفولاذ الكربوني والحديد المطاوع وحديد الزهر — وهي مغناطيسية عمومًا، وتُتداول بأطنان كبيرة وتُصهر في مصانع الصلب والمسابك. أما الخردة غير الحديدية فتحتوي على قليل من الحديد أو لا تحتويه: النحاس والألمنيوم والنحاس الأصفر والبرونز والرصاص والزنك وسبائك النيكل، وهي أقل حجمًا وأعلى قيمة للطن. ويقع الفولاذ المقاوم للصدأ بين الاثنين: فهو قائم على الحديد، لكنه يُقيَّم بما فيه من كروم ونيكل وموليبدنوم ويُتداول منفصلًا عن الفولاذ الكربوني.",
      ) },
      { type: "h2", id: "ferrous-grades", text: L("Common ferrous grades", "الدرجات الحديدية الشائعة") },
      { type: "table", caption: L("Common ferrous scrap grades", "درجات الخردة الحديدية الشائعة"), head: [L("Grade", "الدرجة"), L("What defines it", "ما يميزها")], rows: [
        [L("[HMS 1](/materials/heavy-melt-steel)", "[HMS 1](/materials/heavy-melt-steel)"), L("Obsolete wrought iron or steel at least ¼ in (6.35 mm) thick, no galvanized or black steel, cut to maximum dimensions.", "حديد مطاوع أو فولاذ متقادم لا تقل سماكته عن ¼ بوصة (6.35 مم)، دون فولاذ مجلفن أو أسود، مقطّع إلى أبعاد قصوى.")],
        [L("[HMS 2](/materials/heavy-melt-steel)", "[HMS 2](/materials/heavy-melt-steel)"), L("Thinner steel from ⅛ in (3.175 mm), black and galvanized allowed.", "فولاذ أرق يبدأ من ⅛ بوصة (3.175 مم)، ويُسمح فيه بالأسود والمجلفن.")],
        [L("[Plate and structural](/materials/plate-structural)", "[الصفائح والهياكل](/materials/plate-structural)"), L("Clean heavy plate and sections, cut to size; generally above HMS.", "صفائح ومقاطع ثقيلة نظيفة مقطّعة إلى المقاسات، وتُقيَّم عمومًا فوق HMS.")],
        [L("[Rebar](/materials/rebar)", "[حديد التسليح](/materials/rebar)"), L("Reinforcing bar offcuts and recovered bar, free of concrete.", "بقايا حديد التسليح والقضبان المستخلصة، خالية من الخرسانة.")],
        [L("[Cast iron](/materials/cast-iron)", "[حديد الزهر](/materials/cast-iron)"), L("High-carbon iron castings, broken to foundry sizes.", "مسبوكات حديد مرتفعة الكربون، مكسّرة إلى مقاسات المسابك.")],
      ] },
      { type: "p", text: L(
        "HMS is commonly traded as a blend of the two grades — 80:20 as the premium mix, with 70:30 and 60:40 below it.",
        "يُتداول HMS عادةً خليطًا من الدرجتين — 80:20 هي الخلطة الممتازة، وتليها 70:30 و60:40.",
      ) },
      { type: "h2", id: "non-ferrous-grades", text: L("Common non-ferrous grades and their code names", "الدرجات غير الحديدية الشائعة وأسماؤها الرمزية") },
      { type: "table", caption: L("Selected non-ferrous code names from the Scrap Specifications Circular", "أسماء رمزية مختارة للمعادن غير الحديدية من نشرة مواصفات الخردة"), head: [L("Metal", "المعدن"), L("Code name", "الاسم الرمزي"), L("Grade", "الدرجة")], rows: [
        [L("[Copper](/materials/copper)", "[النحاس](/materials/copper)"), L("Barley, Berry", "Barley وBerry"), L("No. 1 copper wire", "سلك النحاس رقم 1")],
        [L("Copper", "النحاس"), L("Candy", "Candy"), L("No. 1 heavy copper", "النحاس الثقيل رقم 1")],
        [L("Copper", "النحاس"), L("Cliff / Birch", "Cliff وBirch"), L("No. 2 copper / No. 2 copper wire", "النحاس رقم 2 / سلك النحاس رقم 2")],
        [L("[Brass](/materials/brass)", "[النحاس الأصفر](/materials/brass)"), L("Honey", "Honey"), L("Yellow brass scrap", "خردة النحاس الأصفر")],
        [L("Brass", "النحاس الأصفر"), L("Ebony", "Ebony"), L("Composition or red brass", "النحاس التركيبي أو الأحمر")],
        [L("[Aluminium](/materials/aluminum)", "[الألمنيوم](/materials/aluminum)"), L("Taint/Tabor", "Taint/Tabor"), L("Clean mixed old alloy sheet", "صفائح سبائك قديمة مختلطة نظيفة")],
        [L("Aluminium", "الألمنيوم"), L("Tread", "Tread"), L("Segregated new castings, forgings and extrusions", "مسبوكات ومطروقات ومقاطع جديدة مفصولة")],
        [L("Aluminium", "الألمنيوم"), L("Zorba", "Zorba"), L("Shredded mixed non-ferrous from fragmentizers", "معادن غير حديدية مختلطة مفرومة من آلات التفتيت")],
        [L("[Stainless steel](/materials/stainless-steel)", "[الفولاذ المقاوم للصدأ](/materials/stainless-steel)"), L("Sabot / Ultra", "Sabot وUltra"), L("Stainless solids / stainless turnings", "قطع صلبة / برادة من الفولاذ المقاوم للصدأ")],
      ] },
      { type: "h2", id: "what-decides", text: L("What decides a grade", "ما الذي يحدد الدرجة") },
      { type: "definitions", items: [
        { term: L("Composition", "التركيب"), text: L("Which metal or alloy it is — 304 or 316 stainless, yellow or red brass, wrought or cast aluminium.", "أي معدن أو سبيكة — فولاذ مقاوم للصدأ 304 أو 316، نحاس أصفر أو أحمر، ألمنيوم مشكَّل أو مسبوك.") },
        { term: L("Form and size", "الشكل والمقاس"), text: L("Wire, solids, turnings or sheet; thickness; whether pieces fit the furnace without further cutting.", "أسلاك أو قطع صلبة أو برادة أو صفائح، والسماكة، وهل تتسع القطع للفرن دون تقطيع إضافي.") },
        { term: L("Attachments", "الملحقات"), text: L("Steel screws in aluminium, brass fittings on copper tube, armour on cable.", "براغٍ فولاذية في الألمنيوم، ووصلات نحاس أصفر على أنابيب النحاس، ودروع على الكابلات.") },
        { term: L("Coatings and contamination", "الطلاءات والتلوث"), text: L("Paint, plating, insulation, oil, moisture and dirt — weight that is not the metal being paid for.", "الدهان والطلاء المعدني والعزل والزيوت والرطوبة والأتربة — وزن ليس من المعدن الذي يُدفع ثمنه.") },
      ] },
      { type: "h2", id: "confirming", text: L("How grades are confirmed", "كيف تُؤكَّد الدرجات") },
      { type: "p", text: L(
        "Inspection comes first: what the material is, how it was generated and what is attached to it. A magnet separates ferrous from non-ferrous, and most 300-series stainless from carbon steel. Handheld analysers — X-ray fluorescence (XRF) and laser-induced breakdown spectroscopy — read alloy content in seconds and are how stainless grades, brasses and aluminium series are told apart. Only then is the load weighed. At AALKC, every load is inspected and graded before it is weighed on certified scales, with laser and XRF-supported identification where alloys need confirming — the sequence is set out in [how we work](/process).",
        "يأتي الفحص أولًا: ما المادة، وكيف تولدت، وما الملتصق بها. ويفصل المغناطيس الحديدي عن غير الحديدي، ومعظم الفولاذ المقاوم للصدأ من سلسلة 300 عن الفولاذ الكربوني. أما أجهزة التحليل المحمولة — بتقنية فلورية الأشعة السينية (XRF) أو مطيافية الانهيار المستحث بالليزر — فتقرأ محتوى السبيكة في ثوانٍ، وبها تُميَّز درجات الفولاذ المقاوم للصدأ وأنواع النحاس الأصفر وسلاسل الألمنيوم. وبعد ذلك فقط توزن الحمولة. وفي أمانة الكلمة تُفحص كل حمولة وتُصنَّف قبل وزنها على موازين معتمدة، مع التعرّف المدعوم بالليزر وتقنية XRF عند الحاجة إلى التحقق من السبائك — والتسلسل مشروح في [كيف نعمل](/process).",
      ) },
    ],
    faq: [
      { question: L("Who sets scrap metal grades?", "من يضع درجات الخردة المعدنية؟"), answer: L("The most widely used definitions are in the Scrap Specifications Circular, published by the Institute of Scrap Recycling Industries — now the Recycled Materials Association (ReMA). Buyers and sellers also agree specific terms in each contract.", "أوسع التعريفات استخدامًا موجودة في نشرة مواصفات الخردة الصادرة عن معهد صناعات إعادة تدوير الخردة، المعروف اليوم برابطة المواد المعاد تدويرها (ReMA)، ويتفق البائعون والمشترون أيضًا على شروط محددة في كل عقد.") },
      { question: L("Is stainless steel ferrous or non-ferrous?", "هل الفولاذ المقاوم للصدأ حديدي أم غير حديدي؟"), answer: L("It is iron-based, so ferrous, but it is traded separately from carbon steel because its value lies in chromium, nickel and molybdenum.", "هو قائم على الحديد فهو حديدي، لكنه يُتداول منفصلًا عن الفولاذ الكربوني لأن قيمته في الكروم والنيكل والموليبدنوم.") },
    ],
    related: [
      { to: "/materials", label: L("Material guides", "أدلة المواد"), note: L("Grades, preparation and end uses for each metal", "الدرجات والتجهيز والاستخدامات النهائية لكل معدن") },
      { to: "/insights/preparing-scrap-for-grading", label: L("Preparing scrap for grading", "تجهيز الخردة للتصنيف"), note: L("Practical steps that protect the grade", "خطوات عملية تحفظ الدرجة") },
    ],
  },

  "how-scrap-metal-is-recycled": {
    standfirst: L(
      "Metal does not wear out. Steel, aluminium and copper can be melted and made into new products again and again — which makes scrap one of industry's most important raw materials.",
      "المعادن لا تبلى. يمكن صهر الفولاذ والألمنيوم والنحاس وتحويلها إلى منتجات جديدة مرة بعد مرة، ما يجعل الخردة من أهم المواد الخام في الصناعة.",
    ),
    brief: [
      L("Scrap comes from production offcuts (new scrap) and from products at the end of their life (old or obsolete scrap).", "تأتي الخردة من بقايا الإنتاج (الخردة الجديدة) ومن المنتجات المنتهية العمر (الخردة القديمة أو المتقادمة)."),
      L("It is sorted by metal and grade, then sheared, baled or shredded, and separated with magnets and eddy-current systems.", "تُفرز بحسب المعدن والدرجة، ثم تُقص أو تُكبس أو تُفرم، وتُفصل بالمغانط وأنظمة التيار الدوّامي."),
      L("Steel scrap is melted in electric arc furnaces (up to 100% scrap) and basic oxygen furnaces (typically 15–25% scrap).", "تُصهر خردة الفولاذ في الأفران القوسية الكهربائية (حتى 100% خردة) والمحوّلات الأكسجينية القاعدية (15–25% خردة عادةً)."),
      L("Each tonne of steel scrap avoids about 1.5 t of CO₂; recycling aluminium saves up to 95% of the energy and copper about 85%.", "كل طن من خردة الفولاذ يجنّب نحو 1.5 طن من ثاني أكسيد الكربون، ويوفّر تدوير الألمنيوم ما يصل إلى 95% من الطاقة والنحاس نحو 85%."),
    ],
    blocks: [
      { type: "h2", id: "sources", text: L("Where scrap comes from", "من أين تأتي الخردة") },
      { type: "p", text: L(
        "The industry distinguishes new scrap from old. New (or prompt) scrap is generated in manufacturing — offcuts, punchings, turnings, rejected parts — and is usually clean and of known alloy. Old (or obsolete) scrap comes from things at the end of their life: demolished buildings, dismantled plants, cables, vehicles and equipment. It is more varied and needs more sorting. Both are essential: obsolete scrap is the larger stream over time, because every steel beam and copper cable in use today will eventually return.",
        "تميّز الصناعة بين الخردة الجديدة والقديمة. فالخردة الجديدة تتولد في التصنيع — بقايا القص والقطع المثقوبة والبرادة والأجزاء المرفوضة — وتكون عادةً نظيفة ومعروفة السبيكة. أما الخردة القديمة أو المتقادمة فتأتي من أشياء انتهى عمرها: المباني المهدومة والمصانع المفككة والكابلات والمركبات والمعدات، وهي أكثر تنوعًا وتحتاج إلى فرز أكبر. وكلاهما ضروري، والخردة المتقادمة هي التيار الأكبر بمرور الوقت، لأن كل جسر فولاذي وكابل نحاسي مستخدم اليوم سيعود يومًا ما.",
      ) },
      { type: "h2", id: "collection-sorting", text: L("Collection and sorting", "الجمع والفرز") },
      { type: "p", text: L(
        "Scrap is collected from sites in containers or by bulk transport and brought to a yard, where it is inspected and sorted: ferrous from non-ferrous, then by metal and grade. Sorting is where most value is created or lost — a load of mixed metals sells at the value of its lowest component. Magnets, visual inspection and handheld alloy analysers do most of this work. See [scrap grades explained](/insights/scrap-metal-grades-explained).",
        "تُجمع الخردة من المواقع في حاويات أو بالنقل الكبير وتُنقل إلى ساحة تُفحص فيها وتُفرز: الحديدي عن غير الحديدي، ثم بحسب المعدن والدرجة. والفرز هو حيث تُصنع معظم القيمة أو تضيع، فحمولة المعادن المختلطة تُباع بقيمة أدنى مكوّناتها. وتتولى المغانط والفحص البصري وأجهزة تحليل السبائك المحمولة معظم هذا العمل. اطّلع على [شرح درجات الخردة](/insights/scrap-metal-grades-explained).",
      ) },
      { type: "h2", id: "processing", text: L("Processing: shearing, baling and shredding", "المعالجة: القص والكبس والفرم") },
      { type: "definitions", items: [
        { term: L("Shearing", "القص"), text: L("Heavy steel — beams, plate, pipe — is cut by hydraulic shears or torches to the sizes a furnace can charge.", "يُقطَّع الفولاذ الثقيل — الجسور والصفائح والأنابيب — بمقصات هيدروليكية أو بالمشاعل إلى مقاسات يمكن تلقيمها في الفرن.") },
        { term: L("Baling", "الكبس"), text: L("Light steel, sheet and non-ferrous material such as cans and wire is compressed into dense bales for handling and melting.", "يُضغط الفولاذ الخفيف والصفائح والمواد غير الحديدية كالعلب والأسلاك في بالات كثيفة لتسهيل نقلها وصهرها.") },
        { term: L("Shredding", "الفرم"), text: L("Shredders tear vehicles, appliances and light mixed scrap into fist-sized pieces so the metals can be separated.", "تمزّق آلات الفرم المركبات والأجهزة والخردة الخفيفة المختلطة إلى قطع بحجم القبضة ليمكن فصل معادنها.") },
        { term: L("Separation", "الفصل"), text: L("Magnets pull out ferrous metal; eddy-current separators throw out aluminium and copper; sensor-based systems sort further by alloy. The non-ferrous mix that results is traded as Zorba.", "تسحب المغانط المعادن الحديدية، وتطرد فواصل التيار الدوّامي الألمنيوم والنحاس، وتفرز الأنظمة القائمة على المستشعرات بحسب السبيكة. ويُتداول خليط المعادن غير الحديدية الناتج باسم Zorba.") },
      ] },
      { type: "p", text: L(
        "Cable is processed separately: chopped and granulated, then separated into copper or aluminium and plastic. Cast iron is broken rather than sheared, because it fractures instead of bending.",
        "وتُعالج الكابلات على حدة: تُقطَّع وتُحبَّب ثم تُفصل إلى نحاس أو ألمنيوم وبلاستيك. أما حديد الزهر فيُكسَّر ولا يُقص، لأنه ينكسر بدل أن ينثني.",
      ) },
      { type: "h2", id: "melting", text: L("Melting: where scrap becomes metal again", "الصهر: حيث تعود الخردة معدنًا") },
      { type: "p", text: L(
        "Steel scrap feeds both main steelmaking routes. An electric arc furnace uses electrical energy to melt charges of up to 100% scrap; a basic oxygen furnace typically takes 15–25% scrap, which also absorbs heat from the process. Worldwide, around 650 million tonnes of scrap are consumed each year, about 30% of the metal fed into steelmaking. Foundries melt cast iron and steel scrap into new castings. Aluminium goes to remelters, which turn clean segregated scrap back into billet and sheet ingot, and refiners, which blend mixed scrap into casting alloys. Copper goes to rod and wire mills when it is clean, and through fire and electrolytic refining when it is not.",
        "تغذّي خردة الفولاذ مساري صناعة الصلب الرئيسيين: يستخدم الفرن القوسي الكهربائي الطاقة الكهربائية لصهر شحنات تصل نسبة الخردة فيها إلى 100%، ويأخذ المحوّل الأكسجيني القاعدي عادةً 15–25% من الخردة التي تمتص أيضًا حرارة العملية. ويُستهلك عالميًا نحو 650 مليون طن من الخردة سنويًا، أي قرابة 30% من المعدن المغذّي لصناعة الصلب. وتصهر المسابك خردة حديد الزهر والفولاذ لصنع مسبوكات جديدة. ويذهب الألمنيوم إلى مصانع إعادة الصهر التي تعيد الخردة النظيفة المفصولة قضبانًا وسبائك صفائح، وإلى مصانع التكرير التي تمزج الخردة المختلطة لإنتاج سبائك السباكة. ويذهب النحاس إلى مصانع القضبان والأسلاك إذا كان نظيفًا، وإلى التكرير الحراري والكهربائي إذا لم يكن.",
      ) },
      { type: "h2", id: "why-it-matters", text: L("What recycling saves", "ما الذي يوفّره التدوير") },
      { type: "table", caption: L("Savings from recycling, as published by industry bodies", "الوفورات من التدوير كما تنشرها الهيئات الصناعية"), head: [L("Metal", "المعدن"), L("Published figure", "الرقم المنشور"), L("Source", "المصدر")], rows: [
        [L("Steel", "الفولاذ"), L("Each tonne of scrap used avoids about 1.5 t of CO₂, 1.4 t of iron ore, 740 kg of coal and 120 kg of limestone", "كل طن خردة يُستخدم يجنّب نحو 1.5 طن من ثاني أكسيد الكربون و1.4 طن من خام الحديد و740 كغ من الفحم و120 كغ من الحجر الجيري"), L("worldsteel data", "بيانات الرابطة العالمية للصلب")],
        [L("Aluminium", "الألمنيوم"), L("Up to 95% less energy than primary metal; about 75% of all aluminium ever produced still in use", "طاقة أقل بما يصل إلى 95% من المعدن الأولي، ونحو 75% من كل الألمنيوم المُنتَج ما زال قيد الاستخدام"), L("International Aluminium Institute", "المعهد الدولي للألمنيوم")],
        [L("Copper", "النحاس"), L("About 85% less energy than primary production; about two-thirds of copper produced in the last 100 years still in use", "طاقة أقل بنحو 85% من الإنتاج الأولي، ونحو ثلثي النحاس المُنتَج خلال المئة عام الماضية ما زال قيد الاستخدام"), L("International Copper Association", "الرابطة الدولية للنحاس")],
      ] },
    ],
    faq: [
      { question: L("Does recycled metal perform as well as new metal?", "هل يؤدي المعدن المعاد تدويره كالمعدن الجديد؟"), answer: L("Yes. Steel, aluminium and copper can be recycled repeatedly without losing their inherent properties; the industry bodies for aluminium and copper both state this explicitly.", "نعم. يمكن تدوير الفولاذ والألمنيوم والنحاس مرارًا دون أن تفقد خصائصها الأصيلة، وتنص على ذلك صراحةً الهيئتان الصناعيتان للألمنيوم والنحاس.") },
      { question: L("What is the difference between new and old scrap?", "ما الفرق بين الخردة الجديدة والقديمة؟"), answer: L("New scrap is generated in manufacturing and is usually clean and of known alloy; old scrap comes from products at the end of their life and needs more sorting.", "الخردة الجديدة تتولد في التصنيع وتكون عادةً نظيفة ومعروفة السبيكة، والقديمة تأتي من منتجات انتهى عمرها وتحتاج إلى فرز أكبر.") },
    ],
    related: [
      { to: "/process", label: L("How AALKC works", "كيف تعمل أمانة الكلمة"), note: L("From enquiry to onward supply", "من الاستفسار إلى التوريد اللاحق") },
      { to: "/sustainability", label: L("Sustainability", "الاستدامة"), note: L("How AALKC keeps metal in productive use", "كيف تُبقي أمانة الكلمة المعادن قيد الاستخدام المنتج") },
    ],
  },

  "saudi-arabia-scrap-metal-industry": {
    standfirst: L(
      "The Kingdom's scrap industry follows its industrial history: oil, then industrial cities, then a domestic steel and aluminium base that turned scrap from an export commodity into a raw material the country needs.",
      "تتبع صناعة الخردة في المملكة تاريخها الصناعي: النفط أولًا، ثم المدن الصناعية، ثم قاعدة محلية للصلب والألمنيوم حوّلت الخردة من سلعة تصدير إلى مادة خام تحتاجها البلاد.",
    ),
    brief: [
      L("Industrialisation began in the Eastern Province with oil from Dammam No. 7 in 1938, followed by the first industrial cities in 1973 and the Royal Commission for Jubail and Yanbu in 1975.", "بدأ التصنيع في المنطقة الشرقية مع نفط بئر الدمام رقم 7 عام 1938، تلته أولى المدن الصناعية عام 1973 والهيئة الملكية للجبيل وينبع عام 1975."),
      L("A domestic steel industry — Hadeed was established in 1979 — and later an integrated aluminium complex at Ras Al-Khair created home demand for scrap.", "أوجدت صناعة الصلب المحلية — تأسست «حديد» عام 1979 — ثم مجمّع الألمنيوم المتكامل في رأس الخير طلبًا محليًا على الخردة."),
      L("Scrap metal exports were banned for about 16 years until March 2006, when the ban was lifted after the Kingdom joined the WTO.", "حُظر تصدير الخردة المعدنية نحو 16 عامًا حتى مارس 2006، حين رُفع الحظر بعد انضمام المملكة إلى منظمة التجارة العالمية."),
      L("Industry estimates put ferrous scrap supply at 4–4.5 million tonnes a year, with domestic mills keeping it tight.", "تقدّر مصادر صناعية المعروض من الخردة الحديدية بنحو 4–4.5 مليون طن سنويًا، مع مصانع محلية تُبقيه شحيحًا."),
    ],
    blocks: [
      { type: "h2", id: "oil-to-industry", text: L("From oil to industry", "من النفط إلى الصناعة") },
      { type: "p", text: L(
        "The Kingdom's industrial story starts in the Eastern Province. On 4 March 1938, Dammam No. 7 at Dhahran began producing oil in commercial quantities, opening the oil era. In the decades that followed, the state set out to build an industrial economy around that resource: the first three industrial cities — in Riyadh, Jeddah and Dammam — were inaugurated in 1973, and the Royal Commission for Jubail and Yanbu was established by royal decree on 21 September 1975 to build two new industrial cities on the coasts, Jubail on the Gulf and Yanbu on the Red Sea.",
        "تبدأ قصة المملكة الصناعية في المنطقة الشرقية. ففي 4 مارس 1938 بدأت بئر الدمام رقم 7 في الظهران إنتاج النفط بكميات تجارية، فافتُتح عصر النفط. وفي العقود التالية شرعت الدولة في بناء اقتصاد صناعي حول هذا المورد: افتُتحت أولى المدن الصناعية الثلاث — في الرياض وجدة والدمام — عام 1973، وأُنشئت الهيئة الملكية للجبيل وينبع بمرسوم ملكي في 21 سبتمبر 1975 لبناء مدينتين صناعيتين جديدتين على الساحلين: الجبيل على الخليج وينبع على البحر الأحمر.",
      ) },
      { type: "p", text: L(
        "Industrial cities, refineries, petrochemical complexes and the infrastructure to serve them consumed large quantities of steel — and, in time, generated scrap: construction offcuts, plant turnarounds and decommissioned equipment. Today the Saudi Authority for Industrial Cities and Technology Zones (MODON), founded in 2001, oversees some thirty-six industrial cities across the Kingdom.",
        "استهلكت المدن الصناعية والمصافي ومجمّعات البتروكيماويات والبنية التحتية التي تخدمها كميات كبيرة من الفولاذ، ثم أخذت مع الوقت تُنتج الخردة: بقايا الإنشاء، وأعمال الصيانة الدورية للمصانع، والمعدات المخرجة من الخدمة. واليوم تشرف الهيئة السعودية للمدن الصناعية ومناطق التقنية (مدن)، التي تأسست عام 2001، على نحو ستٍّ وثلاثين مدينة صناعية في أنحاء المملكة.",
      ) },
      { type: "h2", id: "steel-and-aluminium", text: L("A domestic steel and aluminium base", "قاعدة محلية للصلب والألمنيوم") },
      { type: "p", text: L(
        "Scrap matters most where there are furnaces to melt it. Hadeed — the Saudi Iron and Steel Company, established in 1979 at Al-Jubail — grew into one of the world's largest integrated direct-reduced iron (DRI) operators, with a finished-products capacity of about 7 million tonnes a year in long and flat steel. In 2024 the Public Investment Fund took a majority stake in Hadeed, which at the same time acquired AlRajhi Steel Industries. Alongside the large DRI-based producers, many mills melt scrap in electric arc furnaces and induction furnaces to make billet and rebar.",
        "تكتسب الخردة أهميتها حيث توجد أفران تصهرها. فقد نمت «حديد» — الشركة السعودية للحديد والصلب، التي تأسست عام 1979 في الجبيل — لتصبح من أكبر مشغّلي الحديد المختزل مباشرةً المتكاملين في العالم، بطاقة منتجات نهائية تبلغ نحو 7 ملايين طن سنويًا من الصلب الطويل والمسطح. وفي عام 2024 استحوذ صندوق الاستثمارات العامة على حصة أغلبية في «حديد»، التي استحوذت في الوقت نفسه على شركة الراجحي للصناعات الحديدية. وإلى جانب المنتجين الكبار المعتمدين على الحديد المختزل، تصهر مصانع كثيرة الخردة في أفران قوسية كهربائية وأفران حث لإنتاج العروق وحديد التسليح.",
      ) },
      { type: "p", text: L(
        "Aluminium followed. At Ras Al-Khair, north of Jubail, the Ma'aden–Alcoa joint venture poured its first hot metal on 12 December 2012, part of an integrated complex running from bauxite mine and alumina refinery to smelter and rolling mill. A domestic primary industry also builds the downstream fabrication that, in turn, generates aluminium scrap.",
        "ثم جاء الألمنيوم. ففي رأس الخير شمال الجبيل، صبّ المشروع المشترك بين معادن وألكوا أول معدن منصهر في 12 ديسمبر 2012، ضمن مجمّع متكامل يمتد من منجم البوكسيت ومصفاة الألومينا إلى المصهر ومصنع الدرفلة. وتبني الصناعة الأولية المحلية أيضًا قطاع التصنيع اللاحق الذي يُنتج بدوره خردة الألمنيوم.",
      ) },
      { type: "h2", id: "eastern-province", text: L("Why the Eastern Province is at the centre", "لماذا تقع المنطقة الشرقية في القلب") },
      { type: "list", items: [
        L("It is the oil and petrochemical heartland, with Dhahran, Dammam's industrial cities, Jubail and Ras Al-Khair within one region.", "هي قلب النفط والبتروكيماويات، تجمع الظهران والمدن الصناعية في الدمام والجبيل ورأس الخير في منطقة واحدة."),
        L("Plants, refineries and infrastructure generate steady turnaround, replacement and decommissioning scrap.", "تُنتج المصانع والمصافي والبنية التحتية خردة منتظمة من الصيانة الدورية والاستبدال وإيقاف التشغيل."),
        L("Steel and aluminium producers that consume scrap are located in the region.", "يقع في المنطقة منتجو الصلب والألمنيوم المستهلكون للخردة."),
        L("King Abdulaziz Port in Dammam — described as the largest port on the Gulf — connects the region to international markets.", "يربط ميناء الملك عبدالعزيز في الدمام — الموصوف بأنه أكبر موانئ الخليج — المنطقةَ بالأسواق الدولية."),
      ] },
      { type: "h2", id: "trade-policy", text: L("Export rules: from ban to duty", "قواعد التصدير: من الحظر إلى الرسوم") },
      { type: "p", text: L(
        "For about sixteen years the export of scrap metal from the Kingdom was banned, keeping the material at home. In March 2006, outlets were instructed that scrap metal could be exported in any amount — a change reported as being in line with the Kingdom's commitments after it joined the World Trade Organization in December 2005. More recently, trade reports in February 2024 described a 5% export duty on certain non-ferrous scrap, including copper scrap and alloys and zinc scrap, from 15 February 2024; the official notification was not widely published, so exporters should confirm current rules with the customs authority before shipping.",
        "ظل تصدير الخردة المعدنية من المملكة محظورًا نحو ستة عشر عامًا، فبقيت المادة في الداخل. وفي مارس 2006 وُجِّهت المنافذ بالسماح بتصدير الخردة المعدنية بأي كمية — وهو تغيير قيل إنه يتماشى مع التزامات المملكة بعد انضمامها إلى منظمة التجارة العالمية في ديسمبر 2005. وفي فبراير 2024 تحدثت تقارير تجارية عن رسم تصدير بنسبة 5% على بعض الخردة غير الحديدية، ومنها خردة النحاس وسبائكه وخردة الزنك، اعتبارًا من 15 فبراير 2024. ولم يُنشر الإشعار الرسمي على نطاق واسع، لذا ينبغي للمصدّرين التأكد من القواعد السارية لدى هيئة الجمارك قبل الشحن.",
      ) },
      { type: "h2", id: "market-today", text: L("The market today", "السوق اليوم") },
      { type: "p", text: L(
        "Domestic demand now sets the tone. Speaking to Fastmarkets in 2025, an executive at one of the Kingdom's larger processors put total ferrous scrap supply at 4–4.5 million tonnes a year and described it as tight; induction furnaces were estimated to account for about 35% of steel production, with some operators planning moves to electric arc furnaces, and mills turning to direct-reduced iron or imported billet when scrap ran short. These are industry estimates rather than official statistics, but they describe a market in which scrap is a sought-after raw material.",
        "يحدد الطلب المحلي اليوم إيقاع السوق. ففي حديث إلى «فاستماركتس» عام 2025، قدّر مسؤول تنفيذي في إحدى كبرى شركات معالجة الخردة في المملكة إجمالي المعروض من الخردة الحديدية بنحو 4–4.5 مليون طن سنويًا ووصفه بالشحيح، وقُدّرت حصة أفران الحث بنحو 35% من إنتاج الصلب، مع خطط لدى بعض المشغّلين للانتقال إلى الأفران القوسية الكهربائية، ولجوء المصانع إلى الحديد المختزل مباشرةً أو العروق المستوردة عند شح الخردة. وهذه تقديرات صناعية لا إحصاءات رسمية، لكنها تصف سوقًا أصبحت فيها الخردة مادة خام مطلوبة.",
      ) },
      { type: "p", text: L(
        "The sector is also being formalised. The National Center for Waste Management was established in 2019; the Waste Management Law of 2021 requires a licence for any waste-management activity; and in February 2026 the Ministry of Industry and Mineral Resources launched a licensing framework for the recycling industry that includes the sorting, processing and preparation of metal scrap as an industrial activity. The policy side is covered in [scrap metal and the circular economy](/insights/scrap-metal-in-saudi-circular-economy).",
        "ويشهد القطاع كذلك تنظيمًا متزايدًا: فقد أُنشئ المركز الوطني لإدارة النفايات عام 2019، ويشترط نظام إدارة النفايات الصادر عام 2021 الحصول على ترخيص لأي نشاط في إدارة النفايات، وفي فبراير 2026 أطلقت وزارة الصناعة والثروة المعدنية إطارًا لترخيص صناعة إعادة التدوير يشمل فرز الخردة المعدنية ومعالجتها وتجهيزها نشاطًا صناعيًا. ويتناول [الخردة المعدنية والاقتصاد الدائري](/insights/scrap-metal-in-saudi-circular-economy) الجانب التنظيمي.",
      ) },
    ],
    faq: [
      { question: L("Can scrap metal be exported from Saudi Arabia?", "هل يمكن تصدير الخردة المعدنية من المملكة؟"), answer: L("A long-standing export ban was lifted in March 2006. Trade reports in 2024 described a 5% export duty on certain non-ferrous scrap, including copper; confirm current rules with the customs authority before shipping.", "رُفع حظر التصدير القديم في مارس 2006. وتحدثت تقارير تجارية عام 2024 عن رسم تصدير بنسبة 5% على بعض الخردة غير الحديدية ومنها النحاس، فتأكد من القواعد السارية لدى هيئة الجمارك قبل الشحن.") },
      { question: L("Who uses scrap metal in Saudi Arabia?", "من يستخدم الخردة المعدنية في المملكة؟"), answer: L("Mainly steel mills melting scrap in electric arc and induction furnaces — often alongside direct-reduced iron — plus foundries and non-ferrous remelters and refiners.", "أساسًا مصانع الصلب التي تصهر الخردة في الأفران القوسية الكهربائية وأفران الحث — غالبًا إلى جانب الحديد المختزل مباشرةً — إضافة إلى المسابك ومصانع صهر المعادن غير الحديدية وتكريرها.") },
    ],
    related: [
      { to: "/insights/scrap-metal-in-saudi-circular-economy", label: L("Scrap metal and the circular economy", "الخردة المعدنية والاقتصاد الدائري"), note: L("Vision 2030, the Waste Management Law and recycling licences", "رؤية 2030 ونظام إدارة النفايات وتراخيص التدوير") },
      { to: "/about", label: L("About AALKC", "عن أمانة الكلمة"), note: L("A licensed scrap metal dealer in Dammam since 2017", "تاجر خردة معدنية مرخّص في الدمام منذ 2017") },
    ],
  },

  "scrap-metal-in-saudi-circular-economy": {
    standfirst: L(
      "Metals are the original circular material: they can be recycled again and again without losing their properties. Saudi policy since 2016 has been building the rules and targets that turn that potential into practice.",
      "المعادن هي المادة الدائرية الأصيلة، إذ يمكن تدويرها مرارًا دون أن تفقد خصائصها. وتعمل السياسات السعودية منذ 2016 على بناء القواعد والأهداف التي تحوّل هذه الإمكانية إلى ممارسة.",
    ),
    brief: [
      L("Vision 2030 (2016) set the direction; the G20 under Saudi presidency endorsed the circular carbon economy in 2020.", "رسمت رؤية 2030 (2016) الاتجاه، وأيدت مجموعة العشرين برئاسة المملكة الاقتصاد الدائري للكربون عام 2020."),
      L("The National Center for Waste Management (MWAN), established in 2019, licenses the sector; its master plan aims to divert 90% of waste from landfill by 2040.", "يرخّص المركز الوطني لإدارة النفايات (موان)، المنشأ عام 2019، للقطاع، وتهدف خطته الرئيسية إلى تحويل 90% من النفايات بعيدًا عن المرادم بحلول 2040."),
      L("The 2021 Waste Management Law puts recycling first, requires waste producers to sort recyclables, and requires a licence for any waste activity.", "يضع نظام إدارة النفايات لعام 2021 التدوير أولًا، ويُلزم منتجي النفايات بفرز القابل للتدوير، ويشترط ترخيصًا لأي نشاط في إدارة النفايات."),
      L("In February 2026 a national licensing framework made metal scrap processing a licensed industrial activity.", "في فبراير 2026 جعل إطار ترخيص وطني معالجة الخردة المعدنية نشاطًا صناعيًا مرخّصًا."),
    ],
    blocks: [
      { type: "h2", id: "circular-metals", text: L("Why metals are circular by nature", "لماذا المعادن دائرية بطبيعتها") },
      { type: "p", text: L(
        "A circular economy keeps materials in use instead of extracting new ones and discarding the old. Metals fit that model better than almost any material: according to the International Aluminium Institute, about 75% of all aluminium ever produced is still in use; the International Copper Association estimates that two-thirds of the copper produced in the last century is still in productive use; and every tonne of steel scrap used in steelmaking avoids about 1.5 tonnes of CO₂ and 1.4 tonnes of iron ore. Scrap is the mechanism that makes this work.",
        "يُبقي الاقتصاد الدائري المواد قيد الاستخدام بدل استخراج مواد جديدة والتخلص من القديمة. والمعادن تناسب هذا النموذج أكثر من أي مادة تقريبًا: فبحسب المعهد الدولي للألمنيوم ما زال نحو 75% من كل الألمنيوم المُنتَج قيد الاستخدام، وتقدّر الرابطة الدولية للنحاس أن ثلثي النحاس المُنتَج خلال القرن الماضي ما زال قيد الاستخدام المنتج، وكل طن من خردة الفولاذ يُستخدم في صناعة الصلب يجنّب نحو 1.5 طن من ثاني أكسيد الكربون و1.4 طن من خام الحديد. والخردة هي الآلية التي تجعل ذلك ممكنًا.",
      ) },
      { type: "h2", id: "timeline", text: L("The policy timeline", "التسلسل الزمني للسياسات") },
      { type: "table", caption: L("Milestones in Saudi waste and circular-economy policy", "محطات في سياسات النفايات والاقتصاد الدائري في المملكة"), head: [L("Year", "السنة"), L("Milestone", "المحطة")], rows: [
        [L("2016", "2016"), L("Saudi Vision 2030 announced (April), setting a national agenda for economic diversification and sustainability.", "إعلان رؤية المملكة 2030 (أبريل)، واضعةً أجندة وطنية للتنويع الاقتصادي والاستدامة.")],
        [L("2017", "2017"), L("The Public Investment Fund launches the Saudi Investment Recycling Company (SIRC) to build national recycling capacity.", "صندوق الاستثمارات العامة يطلق الشركة السعودية الاستثمارية لإعادة التدوير لبناء قدرات التدوير الوطنية.")],
        [L("2019", "2019"), L("The National Center for Waste Management (MWAN) is established to regulate and license the waste sector.", "إنشاء المركز الوطني لإدارة النفايات (موان) لتنظيم قطاع النفايات والترخيص له.")],
        [L("2020", "2020"), L("Under Saudi Arabia's G20 presidency, leaders endorse the circular carbon economy, which adds \"remove\" to reduce, reuse and recycle.", "في ظل رئاسة المملكة لمجموعة العشرين، يؤيد القادة الاقتصاد الدائري للكربون الذي يضيف «الإزالة» إلى التقليل وإعادة الاستخدام والتدوير.")],
        [L("2021", "2021"), L("The Saudi Green Initiative is announced; the Waste Management Law is issued by Royal Decree No. M/3.", "إعلان مبادرة السعودية الخضراء، وصدور نظام إدارة النفايات بالمرسوم الملكي رقم م/3.")],
        [L("2026", "2026"), L("The Ministry of Industry and Mineral Resources launches a licensing framework for the recycling industry, including metal scrap processing (February).", "وزارة الصناعة والثروة المعدنية تطلق إطار ترخيص لصناعة إعادة التدوير يشمل معالجة الخردة المعدنية (فبراير).")],
      ] },
      { type: "h2", id: "waste-law", text: L("What the Waste Management Law requires", "ما يشترطه نظام إدارة النفايات") },
      { type: "list", items: [
        L("A priority order for waste: recycling first, then resource recovery, then safe disposal.", "ترتيب أولويات للنفايات: التدوير أولًا، ثم استعادة الموارد، ثم التخلص الآمن."),
        L("Waste producers must sort waste that can be reused or recycled.", "يجب على منتجي النفايات فرز ما يمكن إعادة استخدامه أو تدويره."),
        L("No waste-management activity may be carried out without a licence or permit; imports, exports and transit of specified waste also need a licence.", "لا يجوز ممارسة أي نشاط في إدارة النفايات دون ترخيص أو تصريح، ويحتاج استيراد النفايات المحددة وتصديرها وعبورها كذلك إلى ترخيص."),
        L("Producers and importers take on extended producer responsibility, based on circular-economy principles.", "يتحمل المنتجون والمستوردون مسؤولية المنتِج الممتدة، القائمة على مبادئ الاقتصاد الدائري."),
      ] },
      { type: "h2", id: "targets", text: L("The targets", "الأهداف") },
      { type: "p", text: L(
        "MWAN's master plan aims to divert 90% of waste from landfill by 2040. SIRC has set itself the goal of diverting 82% of all waste from landfill by 2035. And the 2026 licensing framework aims to mobilise up to SAR 40 billion of private investment and recover 4.2 million tonnes of recyclables by 2035, with metal scrap handling — \"sorting, processing and preparation of metal scrap and waste for use as industrial raw materials and feedstock\" — among its eight licensed activities.",
        "تهدف الخطة الرئيسية لموان إلى تحويل 90% من النفايات بعيدًا عن المرادم بحلول 2040، ووضعت الشركة السعودية الاستثمارية لإعادة التدوير هدفًا بتحويل 82% من جميع النفايات بعيدًا عن المرادم بحلول 2035. ويسعى إطار الترخيص لعام 2026 إلى حشد ما يصل إلى 40 مليار ريال من الاستثمارات الخاصة واستعادة 4.2 مليون طن من المواد القابلة للتدوير بحلول 2035، وتأتي معالجة الخردة المعدنية — «فرز الخردة والنفايات المعدنية ومعالجتها وتجهيزها لاستخدامها مواد خام ومدخلات صناعية» — ضمن أنشطته الثمانية المرخّصة.",
      ) },
      { type: "h2", id: "what-it-means", text: L("What it means for companies that generate scrap", "ماذا يعني ذلك للشركات المنتجة للخردة") },
      { type: "list", items: [
        L("Sort at source: separating metal from general waste — and metals from each other — is both a legal expectation and where the value is. See [preparing scrap for grading](/insights/preparing-scrap-for-grading).", "الفرز من المصدر: فصل المعادن عن النفايات العامة — وفصل المعادن بعضها عن بعض — توقّع نظامي وموطن القيمة في آن. اطّلع على [تجهيز الخردة للتصنيف](/insights/preparing-scrap-for-grading)."),
        L("Work with licensed, registered counterparts and keep records of what leaves site.", "التعامل مع جهات مرخّصة ومسجّلة والاحتفاظ بسجلات لما يغادر الموقع."),
        L("Treat scrap as a raw material for domestic mills, not as waste for disposal — the market already does.", "معاملة الخردة مادةً خامًا للمصانع المحلية لا نفايات للتخلص منها، فالسوق يتعامل معها هكذا بالفعل."),
      ] },
    ],
    faq: [
      { question: L("Does Saudi law require companies to sort recyclable waste?", "هل يُلزم النظام السعودي الشركات بفرز النفايات القابلة للتدوير؟"), answer: L("The Waste Management Law requires waste producers to sort waste that can be reused or recycled, and requires a licence or permit for any waste-management activity.", "يُلزم نظام إدارة النفايات منتجي النفايات بفرز ما يمكن إعادة استخدامه أو تدويره، ويشترط ترخيصًا أو تصريحًا لأي نشاط في إدارة النفايات.") },
      { question: L("What is the circular carbon economy?", "ما الاقتصاد الدائري للكربون؟"), answer: L("A framework championed by Saudi Arabia during its 2020 G20 presidency and endorsed by G20 leaders. It adds a fourth principle — remove — to the established reduce, reuse and recycle.", "إطار تبنّته المملكة خلال رئاستها لمجموعة العشرين عام 2020 وأيده قادة المجموعة، ويضيف مبدأً رابعًا — الإزالة — إلى المبادئ الراسخة: التقليل وإعادة الاستخدام والتدوير.") },
    ],
    related: [
      { to: "/sustainability", label: L("Sustainability at AALKC", "الاستدامة في أمانة الكلمة"), note: L("Circular materials, responsible handling, ISO 14001", "مواد دائرية، ومناولة مسؤولة، وISO 14001") },
      { to: "/insights/saudi-arabia-scrap-metal-industry", label: L("Saudi Arabia's scrap metal industry", "صناعة الخردة المعدنية في المملكة"), note: L("History, geography and the market today", "التاريخ والجغرافيا والسوق اليوم") },
    ],
  },

  "preparing-scrap-for-grading": {
    standfirst: L(
      "Most value in scrap is won or lost before the truck arrives. A few habits on site — separation, cleanliness, safety, records — decide which grade a load reaches.",
      "تُكسب معظم قيمة الخردة أو تضيع قبل وصول الشاحنة. فبضع عادات في الموقع — الفصل والنظافة والسلامة والسجلات — تحدد الدرجة التي تبلغها الحمولة.",
    ),
    brief: [
      L("Separate by metal family first, then by alloy where you know it — mixed loads sell at their lowest component.", "افصل بحسب فئة المعدن أولًا، ثم بحسب السبيكة إن كنت تعرفها، فالحمولات المختلطة تُباع بقيمة أدنى مكوّناتها."),
      L("Remove attachments and non-metallics; keep turnings dry; never burn cable.", "أزل الملحقات والمواد غير المعدنية، واحفظ البرادة جافة، ولا تحرق الكابلات أبدًا."),
      L("Empty, open and clean every vessel; sealed, pressurised or hazardous items are not accepted.", "فرّغ كل وعاء وافتحه ونظّفه، فلا تُقبل المواد المغلقة أو المضغوطة أو الخطرة."),
      L("Describe the load, its source and quantity, and confirm ownership.", "صِف الحمولة ومصدرها وكميتها، وأكّد ملكيتك لها."),
    ],
    blocks: [
      { type: "h2", id: "separate", text: L("1. Separate at source", "1. افصل من المصدر") },
      { type: "p", text: L(
        "The single biggest factor in value is separation. Copper mixed into steel is paid as steel; 316 stainless mixed with 304 is paid as 304; cast aluminium mixed with extrusions is paid as mixed aluminium. Give each stream its own container or bin, and label it where the scrap is generated — at the machine, the cutting station or the strip-out face.",
        "أكبر عامل في القيمة هو الفصل. فالنحاس المخلوط بالفولاذ يُدفع ثمنه فولاذًا، والفولاذ المقاوم للصدأ 316 المخلوط بـ304 يُدفع ثمنه 304، والألمنيوم المسبوك المخلوط بالمقاطع يُدفع ثمنه ألمنيومًا مختلطًا. خصّص لكل تيار حاويته أو صندوقه، وعلّمه حيث تتولد الخردة — عند الآلة أو محطة القص أو موقع الإزالة.",
      ) },
      { type: "list", items: [
        L("Ferrous (carbon steel, cast iron) apart from non-ferrous.", "الحديدي (الفولاذ الكربوني وحديد الزهر) بعيدًا عن غير الحديدي."),
        L("Copper, brass, aluminium and stainless each on their own.", "النحاس والنحاس الأصفر والألمنيوم والفولاذ المقاوم للصدأ كلٌّ على حدة."),
        L("Known alloys apart: 304 and 316 stainless; extrusions and castings; bare and insulated cable.", "السبائك المعروفة منفصلة: 304 و316، والمقاطع والمسبوكات، والكابلات العارية والمعزولة."),
        L("Heavy steel apart from light steel.", "الفولاذ الثقيل بعيدًا عن الخفيف."),
      ] },
      { type: "h2", id: "clean", text: L("2. Keep it clean", "2. حافظ على نظافتها") },
      { type: "list", items: [
        L("Remove steel screws, brackets, armour and fittings from non-ferrous metals.", "أزل البراغي والكتائف والدروع والملحقات الفولاذية عن المعادن غير الحديدية."),
        L("Take off timber, plastics, rubber, glass and concrete.", "انزع الأخشاب والبلاستيك والمطاط والزجاج والخرسانة."),
        L("Drain machining turnings and keep them dry.", "صفِّ برادة التشغيل الآلي واحفظها جافة."),
        L("Leave insulation on cable rather than burning it; burnt wire is downgraded and burning pollutes.", "اترك العزل على الكابلات بدل حرقه، فالسلك المحترق تُخفض درجته والحرق يلوث."),
      ] },
      { type: "h2", id: "safety", text: L("3. Make it safe", "3. اجعلها آمنة") },
      { type: "p", text: L(
        "Scrap can hide hazards. Drums, tanks, cylinders and process vessels must be emptied, opened and cleaned; refrigeration and air-conditioning equipment should be degassed by a qualified contractor; and anything sealed, pressurised, explosive or radioactive must never enter a scrap load. AALKC does not accept sealed, pressurised or hazardous containers, and its terms make the supplier responsible for ensuring material is free of hazardous items. See [quality and safety in the scrap trade](/insights/quality-and-safety-in-scrap-trading).",
        "قد تُخفي الخردة مخاطر. يجب تفريغ البراميل والخزانات والأسطوانات وأوعية المعالجة وفتحها وتنظيفها، وينبغي أن يسحب مقاول مؤهل غازات أجهزة التبريد والتكييف، ولا يجوز أبدًا أن يدخل حمولة الخردة أي شيء مغلق أو مضغوط أو متفجر أو مشع. ولا تقبل أمانة الكلمة الحاويات المغلقة أو المضغوطة أو الخطرة، وتُحمّل شروطها المورّدَ مسؤولية خلوّ المواد من المواد الخطرة. اطّلع على [الجودة والسلامة في تجارة الخردة](/insights/quality-and-safety-in-scrap-trading).",
      ) },
      { type: "h2", id: "size", text: L("4. Size and handling", "4. المقاس والمناولة") },
      { type: "p", text: L(
        "Material that fits the buyer's handling and the mill's furnace needs less work and grades better. Cut heavy steel to the dimensions agreed for its grade, keep long items bundled, and tell the buyer in advance about oversized or heavy pieces so lifting and transport can be planned.",
        "المادة التي تناسب مناولة المشتري وفرن المصنع تحتاج إلى عمل أقل وتُصنَّف أفضل. قطّع الفولاذ الثقيل إلى الأبعاد المتفق عليها لدرجته، واحزم القطع الطويلة، وأبلغ المشتري مسبقًا بالقطع كبيرة الحجم أو الثقيلة ليُخطَّط لرفعها ونقلها.",
      ) },
      { type: "h2", id: "paperwork", text: L("5. Describe the load", "5. صِف الحمولة") },
      { type: "list", items: [
        L("What the material is and how it arose (production offcuts, demolition, replacement).", "ما المادة وكيف تولدت (بقايا إنتاج، هدم، استبدال)."),
        L("Estimated quantity and how often it is generated.", "الكمية التقديرية ومعدل تولّدها."),
        L("Photographs — they speed up a first assessment.", "صور، فهي تسرّع التقييم الأولي."),
        L("Confirmation that you own the material and are entitled to sell it.", "تأكيد ملكيتك للمادة وحقك في بيعها."),
      ] },
      { type: "p", text: L(
        "At acceptance, AALKC inspects and grades each load before weighing it on certified scales — the full sequence is in [how we work](/process). Website estimates are non-binding until material has been inspected and weighed.",
        "عند القبول تفحص أمانة الكلمة كل حمولة وتصنّفها قبل وزنها على موازين معتمدة — والتسلسل الكامل في [كيف نعمل](/process). وتبقى التقديرات المقدَّمة عبر الموقع غير ملزمة حتى تُفحص المادة وتوزن.",
      ) },
    ],
    faq: [
      { question: L("Is it worth separating small quantities of non-ferrous metal?", "هل يستحق فصل الكميات الصغيرة من المعادن غير الحديدية؟"), answer: L("Usually yes. Copper, brass, aluminium and stainless are worth many times their weight in carbon steel, so even small quantities are worth keeping apart.", "غالبًا نعم. فقيمة النحاس والنحاس الأصفر والألمنيوم والفولاذ المقاوم للصدأ أضعاف وزنها من الفولاذ الكربوني، فحتى الكميات الصغيرة تستحق الفصل.") },
    ],
    related: [
      { to: "/materials", label: L("Material guides", "أدلة المواد"), note: L("What lowers the grade, metal by metal", "ما الذي يخفض الدرجة، معدنًا معدنًا") },
      { to: "/contact", label: L("Talk to AALKC", "تواصل مع أمانة الكلمة"), note: L("Share the material, quantity and site", "شارك المادة والكمية والموقع") },
    ],
  },

  "quality-and-safety-in-scrap-trading": {
    standfirst: L(
      "A scrap transaction rests on three questions: is it what it says it is, does it weigh what it says it weighs, and is it safe? Each has its own standards.",
      "تقوم صفقة الخردة على ثلاثة أسئلة: هل هي ما يُقال إنها؟ وهل تزن ما يُقال إنها تزن؟ وهل هي آمنة؟ ولكل سؤال معاييره.",
    ),
    brief: [
      L("Grade specifications define what a load is; alloy analysers verify it.", "تحدد مواصفات الدرجات ماهية الحمولة، وتتحقق منها أجهزة تحليل السبائك."),
      L("Weights used for trade should come from certified, calibrated scales through a documented process.", "ينبغي أن تأتي الأوزان المستخدمة في التجارة من موازين معتمدة ومعايرة ضمن إجراء موثّق."),
      L("Sealed, pressurised, explosive and radioactive items are the main safety risks in scrap; the IAEA publishes guidance on radioactive material in metal recycling.", "المواد المغلقة والمضغوطة والمتفجرة والمشعة هي أبرز مخاطر السلامة في الخردة، وتنشر الوكالة الدولية للطاقة الذرية إرشادات حول المواد المشعة في تدوير المعادن."),
      L("ISO 9001, 14001 and 45001 cover quality, environmental and occupational health and safety management.", "تغطي معايير ISO 9001 و14001 و45001 إدارة الجودة والبيئة والصحة والسلامة المهنية."),
    ],
    blocks: [
      { type: "h2", id: "specification", text: L("Is it what it says it is? Specifications and verification", "هل هي ما يُقال إنها؟ المواصفات والتحقق") },
      { type: "p", text: L(
        "Grade specifications — most widely those of the Scrap Specifications Circular, published by the Recycled Materials Association (formerly ISRI) — define each grade by metal, form, size and permitted contamination, and contracts refer to them. Verification turns the specification into evidence: inspection, magnet testing, and handheld analysers using X-ray fluorescence (XRF) or laser-induced breakdown spectroscopy to read alloy content. AALKC uses laser and XRF-supported identification to classify alloys and verify grades, and documents the acceptance review for every load. Read [scrap grades explained](/insights/scrap-metal-grades-explained).",
        "تحدد مواصفات الدرجات — وأوسعها استخدامًا مواصفات نشرة مواصفات الخردة الصادرة عن رابطة المواد المعاد تدويرها (المعروفة سابقًا بـISRI) — كل درجة بالمعدن والشكل والمقاس والتلوث المسموح به، وتحيل العقود إليها. ويحوّل التحقق المواصفة إلى دليل: الفحص، واختبار المغناطيس، وأجهزة التحليل المحمولة بتقنية فلورية الأشعة السينية (XRF) أو مطيافية الانهيار المستحث بالليزر لقراءة محتوى السبيكة. وتستخدم أمانة الكلمة التعرّف المدعوم بالليزر وتقنية XRF لتصنيف السبائك والتحقق من الدرجات، وتوثّق مراجعة القبول لكل حمولة. اقرأ [شرح درجات الخردة](/insights/scrap-metal-grades-explained).",
      ) },
      { type: "h2", id: "weighing", text: L("Does it weigh what it says? Certified weighing", "هل تزن ما يُقال؟ الوزن المعتمد") },
      { type: "p", text: L(
        "Weight sets the price, so the scale must be trusted by both sides. Trade weighing relies on certified, regularly calibrated industrial scales and a documented weighing process, with weights recorded against each load. In the Kingdom, metrology falls within the remit of the Saudi Standards, Metrology and Quality Organization (SASO). AALKC weighs accepted material on certified industrial scales through a documented process, after inspection and grading.",
        "الوزن يحدد السعر، فلا بد أن يثق الطرفان بالميزان. ويعتمد الوزن التجاري على موازين صناعية معتمدة تُعايَر بانتظام وإجراء وزن موثّق تُسجَّل فيه الأوزان لكل حمولة. وفي المملكة تقع المقاييس ضمن اختصاص الهيئة السعودية للمواصفات والمقاييس والجودة. وتزن أمانة الكلمة المواد المقبولة على موازين صناعية معتمدة ضمن إجراء موثّق، بعد الفحص والتصنيف.",
      ) },
      { type: "h2", id: "safety", text: L("Is it safe? Hazards hidden in scrap", "هل هي آمنة؟ المخاطر الكامنة في الخردة") },
      { type: "definitions", items: [
        { term: L("Sealed and pressurised containers", "الحاويات المغلقة والمضغوطة"), text: L("Cylinders, drums and closed vessels can explode when cut or melted. They must be emptied, opened and clean.", "قد تنفجر الأسطوانات والبراميل والأوعية المغلقة عند قطعها أو صهرها، فيجب تفريغها وفتحها وتنظيفها.") },
        { term: L("Explosive items", "المواد المتفجرة"), text: L("Ordnance and live munitions must never enter the scrap stream.", "يجب ألا تدخل الذخائر والمواد المتفجرة الحية تيار الخردة أبدًا.") },
        { term: L("Radioactive material", "المواد المشعة"), text: L("Disused radioactive sources from industrial gauges or medical equipment can end up in scrap. The International Atomic Energy Agency's Specific Safety Guide SSG-17 sets out how the metal recycling and production industries should control this risk, and many steel mills and processors screen incoming loads with radiation detectors.", "قد تنتهي مصادر مشعة مهجورة من أجهزة القياس الصناعية أو المعدات الطبية في الخردة. ويحدد دليل الأمان المحدد SSG-17 الصادر عن الوكالة الدولية للطاقة الذرية كيف ينبغي لصناعات تدوير المعادن وإنتاجها التحكم في هذا الخطر، وتفحص كثير من مصانع الصلب وشركات المعالجة الحمولات الواردة بأجهزة كشف الإشعاع.") },
        { term: L("Refrigerants, fuels and residues", "المبردات والوقود والبقايا"), text: L("Equipment must be degassed and drained by qualified contractors before it is scrapped.", "يجب أن يسحب مقاولون مؤهلون الغازات والسوائل من المعدات قبل تحويلها إلى خردة.") },
      ] },
      { type: "p", text: L(
        "AALKC does not accept sealed, pressurised or hazardous containers, and its terms of service make suppliers responsible for ensuring that scrap is free from hazardous materials, including explosive, radioactive or pressurised items.",
        "لا تقبل أمانة الكلمة الحاويات المغلقة أو المضغوطة أو الخطرة، وتُحمّل شروط خدمتها المورّدين مسؤولية خلوّ الخردة من المواد الخطرة، ومنها المواد المتفجرة أو المشعة أو المضغوطة.",
      ) },
      { type: "h2", id: "management-systems", text: L("Management systems: ISO 9001, 14001 and 45001", "أنظمة الإدارة: ISO 9001 و14001 و45001") },
      { type: "table", caption: L("ISO management system standards relevant to scrap operations", "معايير أنظمة إدارة ISO ذات الصلة بعمليات الخردة"), head: [L("Standard", "المعيار"), L("Covers", "يغطي"), L("In a scrap operation", "في عمليات الخردة")], rows: [
        [L("ISO 9001", "ISO 9001"), L("Quality management", "إدارة الجودة"), L("Controlled processes for weighing, grading and transactions", "إجراءات مضبوطة للوزن والتصنيف والمعاملات")],
        [L("ISO 14001", "ISO 14001"), L("Environmental management", "الإدارة البيئية"), L("Controls on run-off, fuel use and site impacts", "ضوابط على الجريان السطحي واستهلاك الوقود وآثار الموقع")],
        [L("ISO 45001", "ISO 45001"), L("Occupational health and safety", "الصحة والسلامة المهنية"), L("Safe handling of heavy material and container operations", "مناولة آمنة للمواد الثقيلة وعمليات الحاويات")],
      ] },
      { type: "p", text: L(
        "AALKC lists ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 among its management standards.",
        "تُدرج أمانة الكلمة معايير ISO 9001:2015 وISO 14001:2015 وISO 45001:2018 ضمن معايير الإدارة لديها.",
      ) },
      { type: "h2", id: "licensing", text: L("Licensing in Saudi Arabia", "الترخيص في المملكة") },
      { type: "p", text: L(
        "Under the 2021 Waste Management Law, no waste-management activity may be carried out without a licence or permit, overseen by the National Center for Waste Management. In February 2026 the Ministry of Industry and Mineral Resources introduced a licensing framework for the recycling industry in which the sorting, processing and preparation of metal scrap is a licensed industrial activity. For companies selling scrap, the practical step is simple: deal with registered, licensed counterparts and keep a record of what leaves site. See [scrap metal and the circular economy](/insights/scrap-metal-in-saudi-circular-economy).",
        "بموجب نظام إدارة النفايات لعام 2021، لا يجوز ممارسة أي نشاط في إدارة النفايات دون ترخيص أو تصريح، تحت إشراف المركز الوطني لإدارة النفايات. وفي فبراير 2026 قدّمت وزارة الصناعة والثروة المعدنية إطارًا لترخيص صناعة إعادة التدوير، أصبح فيه فرز الخردة المعدنية ومعالجتها وتجهيزها نشاطًا صناعيًا مرخّصًا. والخطوة العملية للشركات البائعة للخردة بسيطة: التعامل مع جهات مسجّلة ومرخّصة والاحتفاظ بسجل لما يغادر الموقع. اطّلع على [الخردة المعدنية والاقتصاد الدائري](/insights/scrap-metal-in-saudi-circular-economy).",
      ) },
    ],
    faq: [
      { question: L("Why are sealed containers dangerous in scrap?", "لماذا تُعد الحاويات المغلقة خطرة في الخردة؟"), answer: L("Closed vessels can contain gas, liquid or residue that expands or ignites when the container is cut or melted, which can cause explosions at a yard or a furnace.", "قد تحتوي الأوعية المغلقة على غاز أو سائل أو بقايا تتمدد أو تشتعل عند قطع الوعاء أو صهره، ما قد يسبب انفجارات في الساحة أو الفرن.") },
      { question: L("What is SSG-17?", "ما SSG-17؟"), answer: L("A Specific Safety Guide from the International Atomic Energy Agency on controlling orphan sources and other radioactive material in the metal recycling and production industries.", "دليل أمان محدد من الوكالة الدولية للطاقة الذرية بشأن التحكم في المصادر المهجورة وغيرها من المواد المشعة في صناعات تدوير المعادن وإنتاجها.") },
    ],
    related: [
      { to: "/process", label: L("How AALKC works", "كيف تعمل أمانة الكلمة"), note: L("Inspection, grading and certified weighing", "الفحص والتصنيف والوزن المعتمد") },
      { to: "/about", label: L("Certifications", "الشهادات"), note: L("AALKC's management standards and registration", "معايير الإدارة والتسجيل لدى أمانة الكلمة") },
    ],
  },
};
