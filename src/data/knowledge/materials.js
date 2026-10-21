import { L } from "../../lib/i18n.js";

// One guide per material family AALKC purchases. Grade names follow the
// Scrap Specifications Circular (ISRI, now the Recycled Materials Association)
// where a code name is quoted; everything AALKC-specific restates what the
// company already publishes (inspection, grading, certified weighing,
// laser and XRF-supported identification). Industry practice is described as
// industry practice, not as an AALKC capability.
export const materialGuides = {
  copper: {
    standfirst: L(
      "The most valuable metal most industrial sites generate. Copper is bought by grade, and the grade is decided by how clean, how unalloyed and how well separated the material is.",
      "أعلى المعادن قيمةً بين ما تُنتجه المواقع الصناعية عادةً. يُشترى النحاس بحسب درجته، وتتحدد الدرجة بمدى نظافته وخلوّه من السبائك وحسن فصله عن غيره.",
    ),
    brief: [
      L("Copper scrap is graded mainly by purity: bare, unalloyed wire and clean solids sit at the top; coated, soldered or mixed material is graded lower.", "تُصنَّف خردة النحاس أساسًا بحسب نقائها: السلك العاري غير السبائكي والقطع النظيفة في أعلى السلم، والمطلي أو الملحوم أو المختلط في درجات أدنى."),
      L("Insulated cable is valued on the copper that can be recovered from it, so its price depends on the copper yield.", "تُقيَّم الكابلات المعزولة بقدر النحاس الذي يمكن استخلاصه منها، فيتوقف سعرها على نسبة النحاس فيها."),
      L("Brass fittings, steel attachments and burnt wire are the most common reasons a load is downgraded.", "وصلات النحاس الأصفر والملحقات الفولاذية والأسلاك المحترقة هي أكثر أسباب خفض درجة الحمولة شيوعًا."),
      L("Recycled copper needs about 85% less energy than primary copper, according to the International Copper Association.", "يحتاج النحاس المعاد تدويره إلى طاقة أقل بنحو 85% من النحاس الأولي، بحسب الرابطة الدولية للنحاس."),
    ],
    facts: [
      { term: L("Family", "الفئة"), text: L("Non-ferrous metal (Cu)", "معدن غير حديدي (Cu)") },
      { term: L("Common trade grades", "الدرجات التجارية الشائعة"), text: L("Bare bright and No. 1 copper wire, No. 2 copper wire, No. 1 heavy copper, No. 2 copper, insulated copper wire", "السلك العاري اللامع وسلك النحاس رقم 1، وسلك النحاس رقم 2، والنحاس الثقيل رقم 1، والنحاس رقم 2، والأسلاك النحاسية المعزولة") },
      { term: L("Typical sources", "المصادر المعتادة"), text: L("Power and control cable, busbar, motor and transformer windings, copper tube, electrical switchgear", "كابلات الطاقة والتحكم، وقضبان التوزيع، ولفائف المحركات والمحولات، والأنابيب النحاسية، ولوحات المفاتيح الكهربائية") },
      { term: L("Where it goes", "إلى أين يذهب"), text: L("Refineries, rod and wire mills, and brass and alloy producers", "المصافي ومصانع القضبان والأسلاك ومنتجو النحاس الأصفر والسبائك") },
    ],
    blocks: [
      { type: "h2", id: "grades", text: L("How copper scrap is graded", "كيف تُصنَّف خردة النحاس") },
      { type: "p", text: L(
        "Internationally, copper scrap is described with the grades of the Scrap Specifications Circular published by the Institute of Scrap Recycling Industries, which now operates as the Recycled Materials Association (ReMA). Each grade has a short code name used in contracts, so a buyer in Dammam and a refinery abroad mean the same thing by it.",
        "تُوصَف خردة النحاس دوليًا بدرجات «نشرة مواصفات الخردة» الصادرة عن معهد صناعات إعادة تدوير الخردة، الذي يعمل اليوم باسم رابطة المواد المعاد تدويرها (ReMA). ولكل درجة اسم رمزي قصير يُستخدم في العقود، فيفهم المشتري في الدمام والمصفاة في الخارج الشيء نفسه.",
      ) },
      { type: "table", caption: L("Common copper scrap grades", "درجات خردة النحاس الشائعة"), head: [L("Grade", "الدرجة"), L("Circular code name", "الاسم الرمزي في النشرة"), L("What it usually is", "ما تكون عادةً")], rows: [
        [L("No. 1 copper wire, including bare bright", "سلك النحاس رقم 1، ومنه العاري اللامع"), L("Barley, Berry", "Barley وBerry"), L("Clean, uncoated, unalloyed wire with the insulation removed. Bright, uncorroded wire is often traded as \"bare bright\" or \"Millberry\".", "سلك نظيف غير مطلي وغير سبائكي نُزع عنه العزل. ويُتداول السلك اللامع غير المتأكسد غالبًا باسم «العاري اللامع» أو «ميلبيري».")],
        [L("No. 2 copper wire", "سلك النحاس رقم 2"), L("Birch", "Birch"), L("Unalloyed wire with some oxidation, tinning or coating.", "سلك غير سبائكي عليه شيء من الأكسدة أو القصدير أو الطلاء.")],
        [L("No. 1 heavy copper", "النحاس الثقيل رقم 1"), L("Candy", "Candy"), L("Clean, unalloyed solids: busbar, clippings, punchings and clean tube.", "قطع صلبة نظيفة غير سبائكية: قضبان توزيع وقصاصات وأجزاء مثقوبة وأنابيب نظيفة.")],
        [L("No. 2 copper", "النحاس رقم 2"), L("Cliff", "Cliff"), L("Unalloyed copper carrying solder, paint, coating or corrosion.", "نحاس غير سبائكي عليه لحام أو طلاء أو تآكل.")],
        [L("Insulated copper wire", "الأسلاك النحاسية المعزولة"), L("Druid", "Druid"), L("Cable still in its insulation, valued on its recoverable copper.", "كابلات ما زالت بعزلها، تُقيَّم بالنحاس القابل للاستخلاص منها.")],
      ] },
      { type: "p", text: L(
        "Exact limits — minimum wire gauge, how much oxidation or tinning is tolerated — are set in the circular and in each contract. AALKC inspects and grades every load before it is weighed, so the price reflects what was actually delivered. See [how scrap grades work](/insights/scrap-metal-grades-explained) for the wider system.",
        "تُحدَّد الحدود الدقيقة — كأدنى مقاس للسلك ومقدار الأكسدة أو القصدير المقبول — في النشرة وفي كل عقد. وتفحص أمانة الكلمة كل حمولة وتصنّفها قبل وزنها، ليعكس السعر ما سُلِّم فعلًا. اطّلع على [كيف تعمل درجات الخردة](/insights/scrap-metal-grades-explained) لفهم النظام كاملًا.",
      ) },
      { type: "h2", id: "inspection", text: L("What lowers the grade", "ما الذي يخفض الدرجة"), },
      { type: "list", items: [
        L("Brass or bronze fittings left on tube, which make the load an alloy rather than pure copper.", "وصلات النحاس الأصفر أو البرونز المتروكة على الأنابيب، فتصبح الحمولة سبيكة لا نحاسًا نقيًا."),
        L("Steel attachments: clamps, screws, cable armour or brackets.", "الملحقات الفولاذية: المشابك والبراغي ودروع الكابلات والكتائف."),
        L("Solder, paint, tinning or plating on the surface.", "اللحام أو الطلاء أو القصدير أو الطبقات المعدنية على السطح."),
        L("Burnt wire: burning insulation off oxidises the copper and is a pollution hazard; cable is better delivered as it is.", "الأسلاك المحترقة: حرق العزل يؤكسد النحاس ويضر بالبيئة، والأفضل تسليم الكابلات كما هي."),
        L("Oil, grease, dirt and moisture, which add weight that is not copper.", "الزيوت والشحوم والأتربة والرطوبة، فهي وزن ليس من النحاس."),
      ] },
      { type: "h2", id: "where-it-goes", text: L("Where copper scrap goes next", "إلى أين تتجه خردة النحاس"), },
      { type: "p", text: L(
        "The cleanest grades can be melted almost directly by rod and wire mills and alloy makers. Lower grades are fire-refined or smelted and then electrolytically refined back to cathode quality. Because copper can be recycled again and again without losing its properties, the International Copper Association estimates that about two-thirds of the copper produced in the last hundred years is still in use.",
        "يمكن صهر أنظف الدرجات مباشرةً تقريبًا في مصانع القضبان والأسلاك ولدى منتجي السبائك. أما الدرجات الأدنى فتُكرَّر حراريًا أو تُصهر ثم تُكرَّر كهربائيًا حتى تبلغ جودة الكاثود. ولأن النحاس يمكن تدويره مرارًا دون أن يفقد خصائصه، تقدّر الرابطة الدولية للنحاس أن نحو ثلثي النحاس المُنتَج خلال المئة عام الماضية ما زال قيد الاستخدام.",
      ) },
    ],
    faq: [
      { question: L("Should insulation be stripped from copper cable before selling it?", "هل يجب نزع العزل عن الكابلات النحاسية قبل بيعها؟"), answer: L("Not necessarily. Insulated cable is a recognised grade and is valued on its copper yield. Never burn insulation off: it oxidises the copper, lowers its grade and is a pollution hazard.", "ليس بالضرورة. فالكابلات المعزولة درجة معترف بها وتُقيَّم بنسبة النحاس فيها. ولا تحرق العزل أبدًا، فذلك يؤكسد النحاس ويخفض درجته ويضر بالبيئة.") },
      { question: L("Is brass the same as copper scrap?", "هل النحاس الأصفر مثل خردة النحاس؟"), answer: L("No. Brass is a copper–zinc alloy and is graded separately. Keeping brass fittings out of copper loads protects the copper grade. See the [brass guide](/materials/brass).", "لا. النحاس الأصفر سبيكة من النحاس والزنك وتُصنَّف على حدة. وإبعاد وصلات النحاس الأصفر عن حمولات النحاس يحفظ درجته. اطّلع على [دليل النحاس الأصفر](/materials/brass).") },
      { question: L("How does AALKC confirm the grade?", "كيف تتحقق أمانة الكلمة من الدرجة؟"), answer: L("Every load is inspected and graded before it is weighed on certified scales. Where alloys need confirming, AALKC uses laser and XRF-supported identification.", "تُفحص كل حمولة وتُصنَّف قبل وزنها على موازين معتمدة، وعند الحاجة إلى التحقق من السبائك تستخدم أمانة الكلمة التعرّف المدعوم بالليزر وتقنية XRF.") },
    ],
    related: ["brass", "aluminum"],
    industries: ["electrical", "manufacturing", "industrial-plants"],
    services: ["scrap-purchasing", "metal-sorting"],
    insights: ["scrap-metal-grades-explained", "preparing-scrap-for-grading"],
    sources: ["scrapTerminology", "remaCircular", "copperRecycling"],
  },

  "heavy-melt-steel": {
    standfirst: L(
      "The bulk grade of the ferrous trade. Heavy melting steel is old structural steel, plate and machinery, cut to sizes a steel furnace can charge.",
      "الدرجة الرئيسية في تجارة الخردة الحديدية. الفولاذ الثقيل للصهر هو فولاذ إنشائي وصفائح وآلات قديمة، مقطّعة إلى مقاسات يمكن تلقيمها في أفران الصلب.",
    ),
    brief: [
      L("HMS 1 is wrought iron or steel at least 6.35 mm (¼ in) thick; HMS 2 allows thinner material from 3.175 mm (⅛ in) and galvanized or black steel.", "‏HMS 1 حديد مطاوع أو فولاذ لا تقل سماكته عن 6.35 مم (¼ بوصة)، ويقبل HMS 2 مواد أرق تبدأ من 3.175 مم (⅛ بوصة) والفولاذ المجلفن أو الأسود."),
      L("Both are obsolete scrap — steel from structures and equipment at the end of their life — cut to maximum dimensions.", "كلاهما خردة متقادمة — فولاذ من منشآت ومعدات انتهى عمرها — مقطّعة إلى أبعاد قصوى محددة."),
      L("HMS is usually traded as a blend of the two, such as 80:20, with 70:30 and 60:40 as lower mixes.", "يُتداول عادةً خليطًا من النوعين مثل 80:20، والخلطات 70:30 و60:40 أدنى منها."),
      L("Each tonne of scrap used in steelmaking avoids about 1.5 tonnes of CO₂ and 1.4 tonnes of iron ore, according to worldsteel data.", "كل طن خردة يُستخدم في صناعة الصلب يجنّب نحو 1.5 طن من ثاني أكسيد الكربون و1.4 طن من خام الحديد، بحسب بيانات الرابطة العالمية للصلب."),
    ],
    facts: [
      { term: L("Family", "الفئة"), text: L("Ferrous (carbon steel and wrought iron)", "حديدية (فولاذ كربوني وحديد مطاوع)") },
      { term: L("Common trade grades", "الدرجات التجارية الشائعة"), text: L("HMS 1, HMS 2, and blends such as HMS 1&2 (80:20)", "HMS 1 وHMS 2 والخلطات مثل HMS 1&2 (80:20)") },
      { term: L("Typical sources", "المصادر المعتادة"), text: L("Demolished structures, plate offcuts, redundant machinery frames, tanks cut open and cleaned", "المنشآت المهدومة، وبقايا الصفائح، وهياكل الآلات المستغنى عنها، والخزانات المقطوعة والمنظفة") },
      { term: L("Where it goes", "إلى أين يذهب"), text: L("Electric arc furnace and basic oxygen steelmaking", "صناعة الصلب في الأفران القوسية الكهربائية والمحوّلات الأكسجينية") },
    ],
    blocks: [
      { type: "h2", id: "grades", text: L("HMS 1 and HMS 2 explained", "شرح HMS 1 وHMS 2") },
      { type: "p", text: L(
        "Under the Scrap Specifications Circular, HMS 1 (codes 200–202) is wrought iron or steel at least ¼ inch (6.35 mm) thick, without galvanized or blackened steel. HMS 2 (codes 203–206) accepts thinner steel, down to ⅛ inch (3.175 mm), and includes black and galvanized material. Each code also sets maximum dimensions — for example 60 × 24 inches for code 200 and 36 × 18 inches for code 201 — so pieces fit the charging buckets of a steel furnace.",
        "بحسب نشرة مواصفات الخردة، فإن HMS 1 (الرموز 200–202) حديد مطاوع أو فولاذ لا تقل سماكته عن ¼ بوصة (6.35 مم) ولا يحتوي على فولاذ مجلفن أو أسود. أما HMS 2 (الرموز 203–206) فيقبل فولاذًا أرق حتى ⅛ بوصة (3.175 مم) ويشمل المواد السوداء والمجلفنة. ويحدد كل رمز أيضًا أبعادًا قصوى — مثل 60 × 24 بوصة للرمز 200 و36 × 18 بوصة للرمز 201 — لتناسب القطع سلال التلقيم في أفران الصلب.",
      ) },
      { type: "p", text: L(
        "Because most yards collect a mix of heavy and lighter steel, HMS is commonly traded as a blend: 80:20 is the premium mix, with 70:30 and 60:40 as lower grades. The blend and the size limits are agreed in each contract.",
        "ولأن معظم الساحات تجمع خليطًا من الفولاذ الثقيل والأخف، يُتداول HMS عادةً خليطًا: 80:20 هي الخلطة الممتازة، و70:30 و60:40 درجات أدنى. ويُتفق على الخلطة وحدود المقاس في كل عقد.",
      ) },
      { type: "h2", id: "preparation", text: L("Preparing HMS for acceptance", "تجهيز الفولاذ الثقيل للقبول") },
      { type: "list", items: [
        L("Cut to the sizes agreed for the grade; oversized pieces need further cutting before they can be charged.", "التقطيع إلى المقاسات المتفق عليها للدرجة، فالقطع الكبيرة تحتاج إلى تقطيع إضافي قبل تلقيمها."),
        L("Remove concrete, timber, rubber, plastics and other non-metallics.", "إزالة الخرسانة والأخشاب والمطاط والبلاستيك وغيرها من المواد غير المعدنية."),
        L("Tanks, drums and vessels must be cut open, emptied and clean. Sealed, pressurised or hazardous containers are not accepted.", "يجب قطع الخزانات والبراميل والأوعية وتفريغها وتنظيفها، ولا تُقبل الحاويات المغلقة أو المضغوطة أو الخطرة."),
        L("Keep non-ferrous metals and stainless steel out: they are worth more sold separately and are contaminants in a carbon-steel melt.", "إبعاد المعادن غير الحديدية والفولاذ المقاوم للصدأ، فقيمتها أعلى إذا بيعت منفصلة، وهي ملوِّثات في صهر الفولاذ الكربوني."),
      ] },
      { type: "h2", id: "where-it-goes", text: L("Where heavy melting steel goes", "إلى أين يتجه الفولاذ الثقيل للصهر") },
      { type: "p", text: L(
        "Scrap is a feedstock for both main steelmaking routes. An electric arc furnace can melt charges of up to 100% scrap; a basic oxygen furnace typically takes 15–25% scrap alongside hot metal from the blast furnace. Worldwide, around 650 million tonnes of scrap are consumed each year, about 30% of the metal fed to steelmaking. In Saudi Arabia, scrap is melted alongside direct-reduced iron and in induction furnaces — see [the Kingdom's scrap industry](/insights/saudi-arabia-scrap-metal-industry).",
        "الخردة مادة خام لمساري صناعة الصلب الرئيسيين: يمكن للفرن القوسي الكهربائي صهر شحنات تصل نسبة الخردة فيها إلى 100%، بينما يأخذ المحوّل الأكسجيني القاعدي عادةً 15–25% من الخردة إلى جانب الحديد المنصهر من الفرن العالي. ويُستهلك عالميًا نحو 650 مليون طن من الخردة سنويًا، أي قرابة 30% من المعدن المغذّي لصناعة الصلب. وفي المملكة تُصهر الخردة إلى جانب الحديد المختزل مباشرةً وفي أفران الحث — اطّلع على [صناعة الخردة في المملكة](/insights/saudi-arabia-scrap-metal-industry).",
      ) },
    ],
    faq: [
      { question: L("What does HMS 1&2 80:20 mean?", "ما معنى HMS 1&2 بنسبة 80:20؟"), answer: L("A blend of heavy melting steel grades — the premium mix of HMS 1 and HMS 2. Lower mixes such as 70:30 and 60:40 are also traded. The exact blend is agreed in the contract.", "خليط من درجات الفولاذ الثقيل للصهر — وهو الخلطة الممتازة من HMS 1 وHMS 2، وتُتداول أيضًا خلطات أدنى مثل 70:30 و60:40، ويُتفق على الخلطة بدقة في العقد.") },
      { question: L("Is galvanized steel accepted as HMS?", "هل يُقبل الفولاذ المجلفن ضمن HMS؟"), answer: L("Galvanized and black steel belong in HMS 2, not HMS 1. Mixing them into an HMS 1 load lowers its grade.", "ينتمي الفولاذ المجلفن والأسود إلى HMS 2 لا إلى HMS 1، وخلطه في حمولة HMS 1 يخفض درجتها.") },
    ],
    related: ["plate-structural", "rebar", "cast-iron"],
    industries: ["construction", "industrial-plants"],
    services: ["industrial-demolition", "container-service", "heavy-logistics"],
    insights: ["scrap-metal-grades-explained", "how-scrap-metal-is-recycled"],
    sources: ["heavyMeltingSteel", "steelScrapFacts", "remaCircular"],
  },

  aluminum: {
    standfirst: L(
      "Light, valuable and endlessly recyclable — but only when alloys are kept apart. Aluminium scrap is graded by alloy family and by how much other material is attached to it.",
      "خفيف وذو قيمة وقابل للتدوير بلا نهاية، بشرط فصل سبائكه بعضها عن بعض. تُصنَّف خردة الألمنيوم بحسب عائلة السبيكة ومقدار المواد الأخرى الملتصقة بها.",
    ),
    brief: [
      L("Aluminium is graded by alloy family: wrought material (extrusions, sheet, wire) and cast material are sold separately.", "يُصنَّف الألمنيوم بحسب عائلة السبيكة: تُباع المواد المشكَّلة (المقاطع والصفائح والأسلاك) والمواد المسبوكة كلٌّ على حدة."),
      L("Segregated extrusions, such as 6063 window and door profiles, are worth more than mixed aluminium.", "المقاطع المفصولة، مثل مقاطع النوافذ والأبواب من سبيكة 6063، أعلى قيمة من الألمنيوم المختلط."),
      L("Steel screws, plastic thermal breaks, paint and rubber reduce the grade.", "البراغي الفولاذية والفواصل الحرارية البلاستيكية والطلاء والمطاط تخفض الدرجة."),
      L("Recycling aluminium takes up to 95% less energy than producing primary metal, and about 75% of all aluminium ever produced is still in use (International Aluminium Institute).", "يتطلب تدوير الألمنيوم طاقة أقل بما يصل إلى 95% من إنتاج المعدن الأولي، ونحو 75% من كل الألمنيوم المُنتَج ما زال قيد الاستخدام (المعهد الدولي للألمنيوم)."),
    ],
    facts: [
      { term: L("Family", "الفئة"), text: L("Non-ferrous metal (Al) and its alloys", "معدن غير حديدي (Al) وسبائكه") },
      { term: L("Common trade grades", "الدرجات التجارية الشائعة"), text: L("Segregated extrusions, clean old sheet, mixed castings, pure wire and cable, used beverage cans", "المقاطع المبثوقة المفصولة، والصفائح القديمة النظيفة، والمسبوكات المختلطة، والأسلاك والكابلات النقية، وعلب المشروبات المستعملة") },
      { term: L("Typical sources", "المصادر المعتادة"), text: L("Windows, doors and façades, cladding, overhead conductors, machined offcuts, cast housings", "النوافذ والأبواب والواجهات، والكسوات، والموصلات الهوائية، وبقايا التشغيل الآلي، والأغلفة المسبوكة") },
      { term: L("Where it goes", "إلى أين يذهب"), text: L("Remelters and refiners producing ingot, billet and casting alloys", "مصانع إعادة الصهر والتكرير المنتجة للسبائك والقضبان وسبائك السباكة") },
    ],
    blocks: [
      { type: "h2", id: "grades", text: L("How aluminium scrap is graded", "كيف تُصنَّف خردة الألمنيوم") },
      { type: "p", text: L(
        "Aluminium is not one metal in the scrap trade but a family of alloys, and remelters need to know which they are buying. The Scrap Specifications Circular gives each common type a code name:",
        "الألمنيوم في تجارة الخردة ليس معدنًا واحدًا بل عائلة من السبائك، ويحتاج مصهر الألمنيوم إلى معرفة ما يشتريه. وتعطي نشرة مواصفات الخردة لكل نوع شائع اسمًا رمزيًا:",
      ) },
      { type: "table", caption: L("Common aluminium scrap grades", "درجات خردة الألمنيوم الشائعة"), head: [L("Grade", "الدرجة"), L("Circular code name", "الاسم الرمزي في النشرة"), L("What it usually is", "ما تكون عادةً")], rows: [
        [L("Segregated new castings, forgings and extrusions", "مسبوكات ومطروقات ومقاطع جديدة مفصولة"), L("Tread", "Tread"), L("Clean production material of one alloy, such as 6063 extrusions.", "مواد إنتاج نظيفة من سبيكة واحدة، مثل مقاطع 6063.")],
        [L("Clean mixed old alloy sheet", "صفائح سبائك قديمة مختلطة نظيفة"), L("Taint/Tabor", "Taint/Tabor"), L("Used sheet aluminium of mixed alloys, free of attachments.", "صفائح ألمنيوم مستعملة من سبائك مختلطة وخالية من الملحقات.")],
        [L("Mixed aluminium castings", "مسبوكات ألمنيوم مختلطة"), L("Tense", "Tense"), L("Cast parts such as housings, without iron inserts.", "أجزاء مسبوكة مثل الأغلفة، دون إدخالات حديدية.")],
        [L("New and old pure wire and cable", "أسلاك وكابلات نقية جديدة وقديمة"), L("Talon, Taste", "Talon وTaste"), L("Electrical-conductor aluminium, bare and free of steel core.", "ألمنيوم موصلات كهربائية، عارٍ وخالٍ من القلب الفولاذي.")],
        [L("Used beverage cans", "علب المشروبات المستعملة"), L("Talcred, Taldack, Taldon", "Talcred وTaldack وTaldon"), L("Cans, shredded, densified or baled.", "علب مفرومة أو مكثّفة أو مكبوسة.")],
      ] },
      { type: "p", text: L(
        "6063 is the alloy most window, door and curtain-wall profiles are made of; 6061 is a stronger structural alloy. Electrical conductors are made of high-purity conductor grades. Keeping these streams separate is what lets a remelter use them without diluting a specification.",
        "سبيكة 6063 هي التي تُصنع منها معظم مقاطع النوافذ والأبواب والواجهات الزجاجية، و6061 سبيكة إنشائية أقوى، أما الموصلات الكهربائية فتُصنع من درجات موصلات عالية النقاء. وفصل هذه التيارات هو ما يتيح لمصهر الألمنيوم استخدامها دون الإخلال بالمواصفة.",
      ) },
      { type: "h2", id: "inspection", text: L("What lowers the grade", "ما الذي يخفض الدرجة") },
      { type: "list", items: [
        L("Iron attachments — screws, bolts, hinges, steel inserts — which make material \"irony\" aluminium.", "الملحقات الحديدية — البراغي والمسامير والمفصلات والإدخالات الفولاذية — التي تجعل المادة «ألمنيومًا محدّدًا»."),
        L("Plastic thermal breaks, glass, rubber gaskets and sealant left in window profiles.", "الفواصل الحرارية البلاستيكية والزجاج والحشوات المطاطية ومواد الإحكام المتروكة في مقاطع النوافذ."),
        L("Paint and coatings; painted material is a recognised but lower grade.", "الطلاءات والدهانات، فالمواد المطلية درجة معترف بها لكنها أدنى."),
        L("Mixing cast and wrought aluminium, or different alloys, in one load.", "خلط الألمنيوم المسبوك بالمشكَّل، أو خلط سبائك مختلفة في حمولة واحدة."),
      ] },
      { type: "h2", id: "where-it-goes", text: L("Where aluminium scrap goes next", "إلى أين تتجه خردة الألمنيوم") },
      { type: "p", text: L(
        "Remelters turn clean, segregated scrap back into billet and sheet ingot; refiners blend mixed and cast scrap into casting alloys. The International Aluminium Institute notes that recycling needs up to 95% less energy than producing primary metal, and that aluminium can be recycled without loss of its inherent properties — which is why about 75% of all aluminium ever produced is still in productive use.",
        "تعيد مصانع الصهر الخردةَ النظيفة المفصولة إلى قضبان وسبائك صفائح، بينما تمزج مصانع التكرير الخردة المختلطة والمسبوكة لإنتاج سبائك السباكة. ويشير المعهد الدولي للألمنيوم إلى أن التدوير يتطلب طاقة أقل بما يصل إلى 95% من إنتاج المعدن الأولي، وأن الألمنيوم يمكن تدويره دون أن يفقد خصائصه الأصيلة، ولهذا ما زال نحو 75% من كل الألمنيوم المُنتَج قيد الاستخدام.",
      ) },
    ],
    faq: [
      { question: L("Do aluminium windows need to be stripped before selling?", "هل يجب تفكيك نوافذ الألمنيوم قبل بيعها؟"), answer: L("Removing glass, rubber, plastic thermal breaks and steel fittings lets the profiles be graded as clean extrusion rather than as a lower, mixed grade.", "إزالة الزجاج والمطاط والفواصل الحرارية البلاستيكية والملحقات الفولاذية تتيح تصنيف المقاطع مقاطعَ نظيفة بدلًا من درجة مختلطة أدنى.") },
      { question: L("Can different aluminium alloys be mixed?", "هل يمكن خلط سبائك الألمنيوم المختلفة؟"), answer: L("They can be sold mixed, but at a mixed-grade value. Keeping extrusions, sheet, castings and wire separate preserves the value of each.", "يمكن بيعها مختلطة لكن بقيمة الدرجة المختلطة، وفصل المقاطع والصفائح والمسبوكات والأسلاك يحفظ قيمة كل منها.") },
    ],
    related: ["copper", "stainless-steel"],
    industries: ["construction", "commercial", "electrical"],
    services: ["scrap-purchasing", "metal-sorting"],
    insights: ["scrap-metal-grades-explained", "preparing-scrap-for-grading"],
    sources: ["scrapTerminology", "aluminiumRecycling"],
  },

  rebar: {
    standfirst: L(
      "Construction's most constant offcut. Rebar is clean carbon steel of known composition, which makes it a favoured feed for the mills that roll new reinforcing bar.",
      "أكثر البقايا انتظامًا في مواقع الإنشاء. حديد التسليح فولاذ كربوني نظيف معروف التركيب، ما يجعله مادة مفضلة لمصانع درفلة حديد التسليح الجديد.",
    ),
    brief: [
      L("Rebar scrap is deformed carbon-steel bar — offcuts, overruns and bar recovered from demolition.", "خردة حديد التسليح قضبان فولاذية كربونية مضلعة — بقايا القص والفائض والقضبان المستخلصة من الهدم."),
      L("New offcuts from site are usually clean; bar from demolition must be freed of concrete.", "البقايا الجديدة من المواقع نظيفة عادةً، أما القضبان المستخلصة من الهدم فيجب تخليصها من الخرسانة."),
      L("It is commonly sold within heavy melting steel or as a separate rebar grade, depending on the buyer.", "يُباع عادةً ضمن الفولاذ الثقيل للصهر أو درجةً مستقلة لحديد التسليح بحسب المشتري."),
      L("Long-steel mills melt it in electric or induction furnaces and roll it into new bar.", "تصهره مصانع الصلب الطويل في الأفران الكهربائية أو أفران الحث وتدرفله قضبانًا جديدة."),
    ],
    facts: [
      { term: L("Family", "الفئة"), text: L("Ferrous (carbon steel)", "حديدية (فولاذ كربوني)") },
      { term: L("Common forms", "الأشكال الشائعة"), text: L("Cut-and-bend offcuts, overrun bar, bar recovered from demolition", "بقايا القص والثني، والقضبان الفائضة، والقضبان المستخلصة من الهدم") },
      { term: L("Typical sources", "المصادر المعتادة"), text: L("Construction sites, precast yards, steel fixing and cut-and-bend shops", "مواقع الإنشاء، وساحات الخرسانة مسبقة الصب، وورش تركيب وقص وثني الحديد") },
      { term: L("Where it goes", "إلى أين يذهب"), text: L("Long-steel mills producing billet, rebar and wire rod", "مصانع الصلب الطويل المنتجة للعروق وحديد التسليح وقضبان الأسلاك") },
    ],
    blocks: [
      { type: "h2", id: "what-it-is", text: L("What counts as rebar scrap", "ما الذي يُعد خردة حديد تسليح") },
      { type: "p", text: L(
        "Reinforcing bar is hot-rolled carbon steel with surface ribs that bond it to concrete. It is produced to standard grades — ASTM A615 Grade 60 is one widely used specification — so its chemistry is known and consistent. On a construction site, scrap rebar comes from cutting bar to length, from overruns at the end of a pour, and from bar removed when structures are demolished.",
        "حديد التسليح فولاذ كربوني مدرفل على الساخن، عليه نتوءات سطحية تربطه بالخرسانة. ويُنتج وفق درجات قياسية — ومنها درجة 60 في المواصفة ASTM A615 الشائعة الاستخدام — فتركيبه الكيميائي معروف ومتّسق. وفي مواقع الإنشاء تأتي خردة حديد التسليح من قص القضبان إلى الأطوال المطلوبة، ومن الفائض في نهاية الصب، ومن القضبان المنزوعة عند هدم المنشآت.",
      ) },
      { type: "h2", id: "preparation", text: L("Keeping rebar clean", "الحفاظ على نظافة حديد التسليح") },
      { type: "list", items: [
        L("Keep a dedicated container for offcuts so they do not mix with timber, packaging and general site waste.", "خصّص حاوية للبقايا حتى لا تختلط بالأخشاب ومواد التغليف ومخلفات الموقع العامة."),
        L("Break concrete off bar recovered from demolition; concrete is weight the buyer does not pay for.", "انزع الخرسانة عن القضبان المستخلصة من الهدم، فهي وزن لا يدفع المشتري ثمنه."),
        L("Tie wire and light surface rust are normal; heavy scale and attached non-metallics are not.", "أسلاك الربط والصدأ السطحي الخفيف أمر طبيعي، أما القشور الكثيفة والمواد غير المعدنية الملتصقة فلا."),
        L("Keep stainless or epoxy-coated bar separate if the project used it.", "افصل القضبان المقاومة للصدأ أو المطلية بالإيبوكسي إن استُخدمت في المشروع."),
      ] },
      { type: "h2", id: "where-it-goes", text: L("Where rebar scrap goes", "إلى أين تتجه خردة حديد التسليح") },
      { type: "p", text: L(
        "Rebar returns to the long-steel mills that make it. In Saudi Arabia these mills melt scrap in electric arc furnaces and induction furnaces, often alongside direct-reduced iron, and roll the billet back into reinforcing bar. Industry estimates put the Kingdom's ferrous scrap supply at 4–4.5 million tonnes a year, with domestic demand keeping supply tight — see [the Kingdom's scrap industry](/insights/saudi-arabia-scrap-metal-industry).",
        "يعود حديد التسليح إلى مصانع الصلب الطويل التي تنتجه. وفي المملكة تصهر هذه المصانع الخردة في أفران قوسية كهربائية وأفران حث، غالبًا إلى جانب الحديد المختزل مباشرةً، ثم تدرفل العروق إلى حديد تسليح من جديد. وتقدّر مصادر صناعية المعروض المحلي من الخردة الحديدية بنحو 4–4.5 مليون طن سنويًا، مع طلب محلي يُبقي المعروض شحيحًا — اطّلع على [صناعة الخردة في المملكة](/insights/saudi-arabia-scrap-metal-industry).",
      ) },
    ],
    faq: [
      { question: L("Is rusty rebar still accepted?", "هل يُقبل حديد التسليح الصدئ؟"), answer: L("Light surface rust is normal for bar stored outdoors. Heavy scale, concrete and attached non-metallics reduce the recoverable steel and are deducted at grading.", "الصدأ السطحي الخفيف طبيعي للقضبان المخزنة في العراء، أما القشور الكثيفة والخرسانة والمواد غير المعدنية الملتصقة فتقلل الفولاذ القابل للاستخلاص وتُخصم عند التصنيف.") },
      { question: L("Can rebar be collected from an active site?", "هل يمكن جمع حديد التسليح من موقع قيد العمل؟"), answer: L("Yes. AALKC places roll-off containers from 10 to 40 yards and swaps or collects them on a schedule that suits the site. See [container service](/services/container-service).", "نعم. تضع أمانة الكلمة حاويات سحب من 10 إلى 40 ياردة وتستبدلها أو تجمعها وفق جدول يناسب الموقع. اطّلع على [خدمة الحاويات](/services/container-service).") },
    ],
    related: ["heavy-melt-steel", "plate-structural"],
    industries: ["construction"],
    services: ["container-service", "scrap-purchasing", "heavy-logistics"],
    insights: ["preparing-scrap-for-grading", "saudi-arabia-scrap-metal-industry"],
    sources: ["fastmarketsSaudi", "steelScrapFacts"],
  },

  brass: {
    standfirst: L(
      "Copper's most common alloy. Brass is bought by type — yellow or red, solids or turnings — because each is remelted into a different product.",
      "أكثر سبائك النحاس شيوعًا. يُشترى النحاس الأصفر بحسب نوعه — أصفر أو أحمر، قطعًا صلبة أو برادة — لأن كلًّا منها يُعاد صهره لمنتج مختلف.",
    ),
    brief: [
      L("Brass is an alloy of copper and zinc; red brass and bronze carry more copper and often tin.", "النحاس الأصفر سبيكة من النحاس والزنك، أما النحاس الأحمر والبرونز ففيهما نحاس أكثر وكثيرًا ما يحتويان القصدير."),
      L("Common grades include yellow brass scrap, red brass, brass pipe, yellow brass turnings and cocks and faucets.", "من الدرجات الشائعة: خردة النحاس الأصفر، والنحاس الأحمر، وأنابيب النحاس الأصفر، وبرادة النحاس الأصفر، والصنابير والمحابس."),
      L("Steel attachments, plating and plastic parts lower the grade; turnings must be dry and free of oil.", "الملحقات الفولاذية والطلاء المعدني والأجزاء البلاستيكية تخفض الدرجة، ويجب أن تكون البرادة جافة وخالية من الزيوت."),
      L("Brass mills and foundries remelt it into rod, ingot and castings.", "تعيد مصانع النحاس الأصفر والمسابك صهره قضبانًا وسبائك ومسبوكات."),
    ],
    facts: [
      { term: L("Family", "الفئة"), text: L("Non-ferrous copper alloy (Cu–Zn)", "سبيكة نحاسية غير حديدية (Cu–Zn)") },
      { term: L("Common trade grades", "الدرجات التجارية الشائعة"), text: L("Yellow brass scrap (Honey), red brass (Ebony), brass pipe (Melon), yellow brass turnings (Nomad), cocks and faucets (Grape)", "خردة النحاس الأصفر (Honey)، والنحاس الأحمر (Ebony)، وأنابيب النحاس الأصفر (Melon)، وبرادة النحاس الأصفر (Nomad)، والصنابير والمحابس (Grape)") },
      { term: L("Typical sources", "المصادر المعتادة"), text: L("Valves and fittings, plumbing fixtures, machined parts, radiators, fasteners", "الصمامات والوصلات، والتجهيزات الصحية، والأجزاء المشغولة آليًا، والمشعّات، وأدوات التثبيت") },
      { term: L("Where it goes", "إلى أين يذهب"), text: L("Brass mills, ingot makers and foundries", "مصانع النحاس الأصفر ومنتجو السبائك والمسابك") },
    ],
    blocks: [
      { type: "h2", id: "grades", text: L("Brass grades in the trade", "درجات النحاس الأصفر في التجارة") },
      { type: "p", text: L(
        "The Scrap Specifications Circular separates brass by colour and form. \"Honey\" is yellow brass scrap; \"Ebony\" is composition or red brass, which carries more copper; \"Melon\" is brass pipe; \"Nomad\" is yellow brass turnings; and \"Grape\" covers cocks and faucets, which are often plated. Each is remelted into a different alloy, which is why mixed brass is worth less than sorted brass.",
        "تفصل نشرة مواصفات الخردة النحاس الأصفر بحسب اللون والشكل: «Honey» خردة النحاس الأصفر، و«Ebony» النحاس الأحمر أو التركيبي الذي يحتوي نحاسًا أكثر، و«Melon» أنابيب النحاس الأصفر، و«Nomad» برادة النحاس الأصفر، و«Grape» الصنابير والمحابس التي تكون مطلية في الغالب. ويُعاد صهر كلٍّ منها لسبيكة مختلفة، ولهذا يكون النحاس الأصفر المختلط أقل قيمة من المفرز.",
      ) },
      { type: "h2", id: "inspection", text: L("What lowers the grade", "ما الذي يخفض الدرجة") },
      { type: "list", items: [
        L("Steel stems, springs and screws left in valves and fittings.", "السيقان والنوابض والبراغي الفولاذية المتروكة في الصمامات والوصلات."),
        L("Chrome or nickel plating on fixtures, which places them in a lower grade.", "طلاء الكروم أو النيكل على التجهيزات، ما يضعها في درجة أدنى."),
        L("Plastic handles, rubber seals and other non-metallics.", "المقابض البلاستيكية والحشوات المطاطية وغيرها من المواد غير المعدنية."),
        L("Oily or wet turnings; machining swarf should be drained and kept dry.", "البرادة الزيتية أو المبللة، فبقايا التشغيل الآلي يجب تصفيتها وحفظها جافة."),
        L("Mixing brass into copper loads, which downgrades the copper.", "خلط النحاس الأصفر بحمولات النحاس، ما يخفض درجة النحاس."),
      ] },
      { type: "h2", id: "where-it-goes", text: L("Where brass scrap goes", "إلى أين تتجه خردة النحاس الأصفر") },
      { type: "p", text: L(
        "Brass mills remelt clean, sorted brass into rod and strip with little adjustment; ingot makers blend mixed brass and bronze into casting alloys for foundries. Because brass is mostly copper, it carries much of copper's recycling value — and is one of the reasons separating copper alloys at source matters.",
        "تعيد مصانع النحاس الأصفر صهر النحاس الأصفر النظيف المفرز إلى قضبان وشرائح بأقل قدر من التعديل، ويمزج منتجو السبائك النحاس الأصفر والبرونز المختلطين لإنتاج سبائك سباكة للمسابك. ولأن النحاس الأصفر نحاس في معظمه، فهو يحمل كثيرًا من قيمة النحاس في التدوير — وهذا من أسباب أهمية فصل سبائك النحاس من المصدر.",
      ) },
    ],
    faq: [
      { question: L("Why is brass priced lower than copper?", "لماذا يُسعَّر النحاس الأصفر أقل من النحاس؟"), answer: L("Brass contains zinc as well as copper, so a tonne of brass holds less copper than a tonne of copper scrap. Red brass, with more copper, is generally valued above yellow brass.", "يحتوي النحاس الأصفر على الزنك إلى جانب النحاس، فيحمل الطن منه نحاسًا أقل من طن خردة النحاس. والنحاس الأحمر، لاحتوائه نحاسًا أكثر، يُقيَّم عمومًا فوق النحاس الأصفر.") },
      { question: L("How is brass told apart from bronze?", "كيف يُميَّز النحاس الأصفر عن البرونز؟"), answer: L("Colour and use give a first indication; alloy analysis confirms it. AALKC uses laser and XRF-supported identification where an alloy needs confirming.", "يعطي اللون والاستخدام مؤشرًا أوليًا، ويؤكده تحليل السبيكة. وتستخدم أمانة الكلمة التعرّف المدعوم بالليزر وتقنية XRF عند الحاجة إلى التحقق من السبيكة.") },
    ],
    related: ["copper", "stainless-steel"],
    industries: ["manufacturing", "electrical"],
    services: ["metal-sorting", "scrap-purchasing"],
    insights: ["scrap-metal-grades-explained"],
    sources: ["scrapTerminology"],
  },

  "cast-iron": {
    standfirst: L(
      "Heavy, brittle and in steady demand from foundries. Cast iron is iron with a high carbon content, and it is bought separately from steel because it melts and behaves differently.",
      "ثقيل وهش ومطلوب باستمرار لدى المسابك. حديد الزهر حديد مرتفع المحتوى الكربوني، ويُشترى منفصلًا عن الفولاذ لأنه ينصهر ويتصرف بطريقة مختلفة.",
    ),
    brief: [
      L("Cast iron carries roughly 2–4% carbon, far more than steel, which makes it hard and brittle.", "يحتوي حديد الزهر على نحو 2–4% من الكربون، أي أكثر بكثير من الفولاذ، ما يجعله صلبًا وهشًا."),
      L("Grey iron is the classic machinery and engine-block iron; ductile iron is tougher and common in pipe and valve bodies.", "الحديد الرمادي هو حديد الآلات وكتل المحركات التقليدي، أما الحديد اللدن فأمتن وشائع في الأنابيب وأجسام الصمامات."),
      L("Because it fractures rather than bends, cast iron is broken to size rather than sheared.", "ولأنه ينكسر بدل أن ينثني، يُكسَّر حديد الزهر إلى المقاسات المطلوبة بدل قصّه."),
      L("Foundries melt it to make new castings.", "تصهره المسابك لصنع مسبوكات جديدة."),
    ],
    facts: [
      { term: L("Family", "الفئة"), text: L("Ferrous (high-carbon iron)", "حديدية (حديد مرتفع الكربون)") },
      { term: L("Common types", "الأنواع الشائعة"), text: L("Grey iron and ductile iron castings, cast iron pipe, machinery cast", "مسبوكات الحديد الرمادي واللدن، وأنابيب حديد الزهر، ومسبوكات الآلات") },
      { term: L("Typical sources", "المصادر المعتادة"), text: L("Machine bases and frames, pump and valve bodies, engine blocks, pipe and fittings, manhole covers", "قواعد الآلات وهياكلها، وأجسام المضخات والصمامات، وكتل المحركات، والأنابيب ووصلاتها، وأغطية غرف التفتيش") },
      { term: L("Where it goes", "إلى أين يذهب"), text: L("Iron foundries producing new castings", "مسابك الحديد المنتجة لمسبوكات جديدة") },
    ],
    blocks: [
      { type: "h2", id: "what-it-is", text: L("Cast iron and steel are not the same scrap", "حديد الزهر والفولاذ ليسا خردة واحدة") },
      { type: "p", text: L(
        "Steel carries well under 2% carbon; cast iron carries roughly 2–4%. That carbon is what lets cast iron flow into complex moulds — and what makes it brittle. Steelmakers and foundries plan their melts around carbon content, so cast iron mixed into a steel load is a contaminant, and steel mixed into cast iron changes a foundry's chemistry. Kept apart, each is worth more.",
        "يحتوي الفولاذ على أقل بكثير من 2% من الكربون، بينما يحتوي حديد الزهر على نحو 2–4%. هذا الكربون هو ما يتيح لحديد الزهر أن ينساب في القوالب المعقدة، وهو ما يجعله هشًا. وتخطط مصانع الصلب والمسابك عمليات الصهر حول المحتوى الكربوني، فيكون حديد الزهر المختلط بحمولة فولاذ ملوِّثًا، ويغيّر الفولاذ المختلط بحديد الزهر كيمياء المسبك. وإذا فُصل كلٌّ منهما زادت قيمته.",
      ) },
      { type: "h2", id: "preparation", text: L("Sizing and preparing cast iron", "تقطيع حديد الزهر وتجهيزه") },
      { type: "list", items: [
        L("Cast iron is broken, not sheared: large castings are fractured to sizes the foundry's furnace can take.", "يُكسَّر حديد الزهر ولا يُقص، إذ تُكسر المسبوكات الكبيرة إلى مقاسات تتسع لها أفران المسبك."),
        L("Remove steel shafts, bolts, bearings and brackets from machinery castings.", "انزع الأعمدة والبراغي والمحامل والكتائف الفولاذية عن مسبوكات الآلات."),
        L("Drain oil and coolant from engine blocks and gearbox housings.", "صفِّ الزيت وسائل التبريد من كتل المحركات وأغلفة صناديق التروس."),
        L("Keep cast iron pipe separate from steel pipe; they look similar but are graded differently.", "افصل أنابيب حديد الزهر عن الأنابيب الفولاذية، فهي متشابهة في الشكل لكنها تُصنَّف بشكل مختلف."),
      ] },
      { type: "h2", id: "where-it-goes", text: L("Where cast iron scrap goes", "إلى أين تتجه خردة حديد الزهر") },
      { type: "p", text: L(
        "Iron foundries melt cast iron scrap, together with steel scrap and pig iron, to produce new grey and ductile castings — pipe fittings, pump bodies, machine parts and street furniture. Clean, well-sized cast iron is a dependable foundry feed because its composition is close to what the foundry is making.",
        "تصهر مسابك الحديد خردة حديد الزهر مع خردة الفولاذ وحديد الخام لإنتاج مسبوكات رمادية ولدنة جديدة — وصلات أنابيب وأجسام مضخات وقطع آلات وأثاث شوارع. وحديد الزهر النظيف المقطّع جيدًا مادة يُعتمد عليها في المسابك لأن تركيبه قريب مما تنتجه.",
      ) },
    ],
    faq: [
      { question: L("How can cast iron be told apart from steel on site?", "كيف يُميَّز حديد الزهر عن الفولاذ في الموقع؟"), answer: L("Cast iron usually has a rough, sandy surface from its mould and breaks with a grey, granular fracture; steel bends and shows a fine, bright fracture. When it matters, analysis confirms it.", "سطح حديد الزهر عادةً خشن رملي من أثر القالب، وينكسر بمقطع رمادي حُبيبي، بينما ينثني الفولاذ ويظهر مقطعه ناعمًا لامعًا، وعند الحاجة يؤكد التحليل ذلك.") },
    ],
    related: ["heavy-melt-steel", "stainless-steel"],
    industries: ["industrial-plants", "manufacturing"],
    services: ["industrial-demolition", "scrap-purchasing"],
    insights: ["how-scrap-metal-is-recycled"],
    sources: [],
  },

  "stainless-steel": {
    standfirst: L(
      "Steel with a chemistry that pays. Stainless steel scrap is valued for the chromium, nickel and molybdenum it carries, so knowing the exact grade is worth the effort.",
      "فولاذ ذو تركيب كيميائي له قيمته. تُقيَّم خردة الفولاذ المقاوم للصدأ بما تحمله من الكروم والنيكل والموليبدنوم، فمعرفة الدرجة بدقة تستحق الجهد.",
    ),
    brief: [
      L("Type 304 is the common \"18/8\" grade — about 18% chromium and 8% nickel; 316 adds molybdenum for corrosion resistance.", "النوع 304 هو الدرجة الشائعة «18/8» — نحو 18% كروم و8% نيكل، ويضيف النوع 316 الموليبدنوم لمقاومة التآكل."),
      L("Value follows alloy content: 316 above 304, and both above low-nickel 200-series and nickel-free 400-series.", "تتبع القيمة محتوى السبيكة: 316 فوق 304، وكلاهما فوق سلسلة 200 قليلة النيكل وسلسلة 400 الخالية منه."),
      L("Austenitic 300-series stainless is largely non-magnetic; a magnet alone cannot confirm the grade.", "الفولاذ الأوستنيتي من سلسلة 300 غير مغناطيسي في الغالب، ولا يكفي المغناطيس وحده لتأكيد الدرجة."),
      L("Analysers such as XRF identify the grade; AALKC uses laser and XRF-supported identification.", "تحدد أجهزة التحليل مثل XRF الدرجة، وتستخدم أمانة الكلمة التعرّف المدعوم بالليزر وتقنية XRF."),
    ],
    facts: [
      { term: L("Family", "الفئة"), text: L("Ferrous alloy (Fe–Cr–Ni), traded apart from carbon steel", "سبيكة حديدية (Fe–Cr–Ni) تُتداول منفصلة عن الفولاذ الكربوني") },
      { term: L("Common grades", "الدرجات الشائعة"), text: L("304 and 316 (300 series), 200 series, 400 series; solids and turnings", "304 و316 (سلسلة 300)، وسلسلة 200، وسلسلة 400، قطعًا صلبة وبرادة") },
      { term: L("Typical sources", "المصادر المعتادة"), text: L("Food and process equipment, tanks and piping, kitchen and hospital fit-outs, fabrication offcuts", "معدات الأغذية والمعالجة، والخزانات والأنابيب، وتجهيزات المطابخ والمستشفيات، وبقايا التصنيع") },
      { term: L("Where it goes", "إلى أين يذهب"), text: L("Stainless steel melt shops", "مصانع صهر الفولاذ المقاوم للصدأ") },
    ],
    blocks: [
      { type: "h2", id: "grades", text: L("Stainless grades and why they matter", "درجات الفولاذ المقاوم للصدأ وأهميتها") },
      { type: "table", caption: L("Common stainless steel families", "عائلات الفولاذ المقاوم للصدأ الشائعة"), head: [L("Series", "السلسلة"), L("Key alloying elements", "عناصر السبيكة الرئيسية"), L("Typical use", "الاستخدام المعتاد")], rows: [
        [L("304 (300 series)", "304 (سلسلة 300)"), L("About 18% chromium, 8% nickel", "نحو 18% كروم و8% نيكل"), L("Food equipment, sinks, general fabrication", "معدات الأغذية والأحواض والتصنيع العام")],
        [L("316 (300 series)", "316 (سلسلة 300)"), L("Chromium and nickel, plus molybdenum", "الكروم والنيكل مع الموليبدنوم"), L("Chemical, marine and process plant", "المصانع الكيميائية والبحرية ومنشآت المعالجة")],
        [L("200 series", "سلسلة 200"), L("Chromium with manganese, low nickel", "الكروم مع المنغنيز وقليل من النيكل"), L("Lower-cost appliances and trim", "الأجهزة والزخارف الأقل تكلفة")],
        [L("400 series", "سلسلة 400"), L("Chromium, little or no nickel (magnetic)", "الكروم مع قليل من النيكل أو بدونه (مغناطيسي)"), L("Cutlery, exhausts, some appliances", "أدوات المائدة وأنظمة العادم وبعض الأجهزة")],
      ] },
      { type: "p", text: L(
        "In the Scrap Specifications Circular, stainless steel scrap solids are traded as \"Sabot\", turnings as \"Ultra\", and 200-series solids as \"Pekoe\". Because nickel and molybdenum drive the price, a load of mixed stainless is worth less than the same material sorted by grade.",
        "في نشرة مواصفات الخردة تُتداول القطع الصلبة من الفولاذ المقاوم للصدأ باسم «Sabot»، والبرادة باسم «Ultra»، والقطع الصلبة من سلسلة 200 باسم «Pekoe». ولأن النيكل والموليبدنوم يحددان السعر، تكون حمولة الفولاذ المقاوم للصدأ المختلط أقل قيمة من المادة نفسها مفرزةً بحسب الدرجة.",
      ) },
      { type: "h2", id: "identification", text: L("How grades are identified", "كيف تُعرَف الدرجات") },
      { type: "p", text: L(
        "A magnet separates most 300-series stainless (largely non-magnetic) from 400-series and carbon steel, but it cannot tell 304 from 316, and cold-worked 300-series can be slightly magnetic. Handheld analysers — X-ray fluorescence (XRF) and laser-induced breakdown spectroscopy — read the alloy content in seconds. AALKC uses laser and XRF-supported identification to classify alloys and verify grades.",
        "يفصل المغناطيس معظم الفولاذ المقاوم للصدأ من سلسلة 300 (غير مغناطيسي في الغالب) عن سلسلة 400 والفولاذ الكربوني، لكنه لا يميّز 304 عن 316، وقد يكون الفولاذ من سلسلة 300 المشغول على البارد مغناطيسيًا قليلًا. أما أجهزة التحليل المحمولة — بتقنية فلورية الأشعة السينية (XRF) أو مطيافية الانهيار المستحث بالليزر — فتقرأ محتوى السبيكة في ثوانٍ. وتستخدم أمانة الكلمة التعرّف المدعوم بالليزر وتقنية XRF لتصنيف السبائك والتحقق من الدرجات.",
      ) },
      { type: "h2", id: "inspection", text: L("What lowers the grade", "ما الذي يخفض الدرجة") },
      { type: "list", items: [
        L("Mixing 304, 316 and lower series in one load.", "خلط 304 و316 والسلاسل الأدنى في حمولة واحدة."),
        L("Carbon-steel fittings, brackets and fasteners left attached.", "ترك الوصلات والكتائف وأدوات التثبيت من الفولاذ الكربوني ملتصقة."),
        L("Oily turnings and residues from process equipment; vessels must be emptied and cleaned.", "البرادة الزيتية وبقايا معدات المعالجة، ويجب تفريغ الأوعية وتنظيفها."),
      ] },
    ],
    faq: [
      { question: L("Is stainless steel ferrous or non-ferrous scrap?", "هل الفولاذ المقاوم للصدأ خردة حديدية أم غير حديدية؟"), answer: L("Stainless steel is iron-based, so technically ferrous, but it is traded apart from carbon steel — and often handled by non-ferrous desks — because its value lies in its chromium, nickel and molybdenum.", "الفولاذ المقاوم للصدأ قائم على الحديد، فهو حديدي من الناحية الفنية، لكنه يُتداول منفصلًا عن الفولاذ الكربوني — وكثيرًا ما تتولاه أقسام المعادن غير الحديدية — لأن قيمته في ما يحمله من كروم ونيكل وموليبدنوم.") },
      { question: L("Why does 316 sell for more than 304?", "لماذا يُباع 316 بسعر أعلى من 304؟"), answer: L("316 carries molybdenum and typically more nickel, both valuable alloying elements that a stainless melt shop would otherwise have to buy.", "يحتوي 316 على الموليبدنوم وعادةً على نيكل أكثر، وكلاهما عنصر سبائكي ثمين كان مصنع صهر الفولاذ المقاوم للصدأ سيضطر إلى شرائه.") },
    ],
    related: ["heavy-melt-steel", "aluminum", "copper"],
    industries: ["manufacturing", "industrial-plants", "commercial"],
    services: ["metal-sorting", "scrap-purchasing"],
    insights: ["scrap-metal-grades-explained", "quality-and-safety-in-scrap-trading"],
    sources: ["scrapTerminology"],
  },

  "plate-structural": {
    standfirst: L(
      "The cleanest heavy steel a site can offer. Plate and structural scrap is thick, low-residual carbon steel cut to size — a premium feed for steelmakers.",
      "أنظف الفولاذ الثقيل الذي يمكن أن يقدمه موقع. خردة الصفائح والهياكل فولاذ كربوني سميك منخفض الشوائب مقطّع إلى المقاسات — مادة ممتازة لمصانع الصلب.",
    ),
    brief: [
      L("Plate and structural (P&S) scrap is heavy carbon steel — plate, beams, columns, channels — cut to agreed dimensions.", "خردة الصفائح والهياكل فولاذ كربوني ثقيل — صفائح وجسور وأعمدة وقنوات — مقطّع إلى أبعاد متفق عليها."),
      L("Its thickness and low contamination make it worth more than general heavy melting steel.", "سماكتها وقلة التلوث فيها تجعلها أعلى قيمة من الفولاذ الثقيل للصهر العام."),
      L("Typical structural steels include ASTM A36 and equivalent grades.", "من الفولاذ الإنشائي المعتاد درجة ASTM A36 وما يعادلها."),
      L("It comes from demolition, plant dismantling and fabrication offcuts.", "تأتي من الهدم وتفكيك المصانع وبقايا التصنيع."),
    ],
    facts: [
      { term: L("Family", "الفئة"), text: L("Ferrous (carbon steel)", "حديدية (فولاذ كربوني)") },
      { term: L("Common forms", "الأشكال الشائعة"), text: L("Plate, I-beams and H-sections, columns, channels and angles, cut to size", "صفائح، وجسور بمقاطع I وH، وأعمدة، وقنوات وزوايا، مقطّعة إلى المقاسات") },
      { term: L("Typical sources", "المصادر المعتادة"), text: L("Building and industrial demolition, plant dismantling, steel fabrication shops", "هدم المباني والمنشآت الصناعية، وتفكيك المصانع، وورش تصنيع الفولاذ") },
      { term: L("Where it goes", "إلى أين يذهب"), text: L("Electric arc furnace steelmakers", "مصانع الصلب بالأفران القوسية الكهربائية") },
    ],
    blocks: [
      { type: "h2", id: "what-it-is", text: L("What makes plate and structural a premium grade", "ما الذي يجعل الصفائح والهياكل درجة ممتازة") },
      { type: "p", text: L(
        "Steelmakers value scrap that is dense, clean and predictable. Heavy plate and structural sections are all three: thick enough to charge efficiently, usually free of coatings and attachments, and made from known structural grades such as ASTM A36. That is why clean, well-cut P&S is generally priced above mixed heavy melting steel.",
        "تقدّر مصانع الصلب الخردة الكثيفة النظيفة التي يمكن التنبؤ بخصائصها، والصفائح الثقيلة والمقاطع الإنشائية تجمع الصفات الثلاث: سميكة بما يكفي لتلقيم فعّال، وخالية عادةً من الطلاءات والملحقات، ومصنوعة من درجات إنشائية معروفة مثل ASTM A36. ولهذا تُسعَّر خردة الصفائح والهياكل النظيفة المقطّعة جيدًا عمومًا فوق الفولاذ الثقيل للصهر المختلط.",
      ) },
      { type: "h2", id: "preparation", text: L("Preparing plate and structural steel", "تجهيز الصفائح والهياكل الفولاذية") },
      { type: "list", items: [
        L("Cut to the lengths and widths agreed with the buyer so pieces can be charged without further work.", "التقطيع إلى الأطوال والعروض المتفق عليها مع المشتري لتُلقَّم القطع دون عمل إضافي."),
        L("Remove concrete, fireproofing, timber and bolted-on non-steel fittings.", "إزالة الخرسانة ومواد الحماية من الحريق والأخشاب والملحقات غير الفولاذية المثبتة بالبراغي."),
        L("Keep light-gauge sheet and galvanized material out; they belong to lower grades.", "إبعاد الصفائح الرقيقة والمواد المجلفنة، فهي تنتمي إلى درجات أدنى."),
        L("Plan cutting and lifting with the dismantling scope, so material is separated as it comes down.", "تخطيط القطع والرفع ضمن نطاق التفكيك لتُفصل المواد أثناء إنزالها."),
      ] },
      { type: "p", text: L(
        "AALKC's [industrial demolition](/services/industrial-demolition) service recovers structural steel and machinery during plant decommissioning and facility clearance, separating recoverable material as it is dismantled so it can be graded rather than sold as mixed scrap.",
        "تستعيد خدمة [الهدم الصناعي](/services/industrial-demolition) لدى أمانة الكلمة الفولاذ الإنشائي والآلات خلال إيقاف تشغيل المصانع وإخلاء المنشآت، وتفصل المواد القابلة للاستعادة أثناء التفكيك لتُصنَّف بدل بيعها خردة مختلطة.",
      ) },
    ],
    faq: [
      { question: L("Is plate and structural the same as HMS 1?", "هل الصفائح والهياكل مثل HMS 1؟"), answer: L("Both are heavy steel, but plate and structural is a cleaner, more uniform stream of plate and sections and is usually graded and priced separately, above HMS.", "كلاهما فولاذ ثقيل، لكن الصفائح والهياكل تيار أنظف وأكثر تجانسًا من الصفائح والمقاطع، ويُصنَّف ويُسعَّر عادةً على حدة وفوق HMS.") },
    ],
    related: ["heavy-melt-steel", "rebar"],
    industries: ["construction", "industrial-plants"],
    services: ["industrial-demolition", "heavy-logistics"],
    insights: ["how-scrap-metal-is-recycled", "preparing-scrap-for-grading"],
    sources: ["heavyMeltingSteel", "steelScrapFacts"],
  },
};
