import { L } from "../../lib/i18n.js";

// One guide per sector AALKC works with. Each sets out the scrap that sector
// produces, how to keep it separated, and how collection fits around the way
// the sector works. Services named are the ones AALKC already offers.
const safetyNote = L(
  "Sealed, pressurised or hazardous containers are not accepted. Cylinders, drums and tanks must be emptied, opened and clean, and the supplier confirms legal ownership of all material sold — as AALKC's terms of service require.",
  "لا تُقبل الحاويات المغلقة أو المضغوطة أو الخطرة. ويجب تفريغ الأسطوانات والبراميل والخزانات وفتحها وتنظيفها، ويؤكد المورّد ملكيته القانونية لكل المواد المبيعة، كما تشترط شروط الخدمة لدى أمانة الكلمة.",
);

export const industryGuides = {
  construction: {
    standfirst: L(
      "Construction produces steady, heavy, mostly ferrous scrap. Kept separate from general site waste, it is a recoverable value line rather than a disposal cost.",
      "تُنتج الإنشاءات خردة منتظمة وثقيلة ومعظمها حديدي. وإذا فُصلت عن مخلفات الموقع العامة أصبحت بندًا ذا قيمة قابلة للاسترداد بدل أن تكون تكلفة تخلّص.",
    ),
    brief: [
      L("The main streams are rebar offcuts, structural steel, plate, formwork and scaffold hardware, and arisings from demolition.", "التيارات الرئيسية: بقايا حديد التسليح، والفولاذ الإنشائي، والصفائح، ومعدات القوالب والسقالات، ومخلفات الهدم."),
      L("A dedicated metal container, kept apart from timber and general waste, preserves the grade.", "حاوية معادن مخصصة، بعيدة عن الأخشاب والمخلفات العامة، تحفظ الدرجة."),
      L("Copper and aluminium from building services and façades are worth far more sold separately than mixed into steel.", "النحاس والألمنيوم من أنظمة المبنى والواجهات أعلى قيمة بكثير إذا بيعت منفصلة لا مخلوطة بالفولاذ."),
      L("Collection can be scheduled around pours, deliveries and site access.", "يمكن جدولة الجمع بما يتوافق مع أعمال الصب والتوريد ومداخل الموقع."),
    ],
    streams: [
      [L("Rebar offcuts and overruns", "بقايا حديد التسليح والفائض منه"), L("Rebar / heavy melting steel", "حديد تسليح / فولاذ ثقيل للصهر"), "/materials/rebar"],
      [L("Beams, columns, plate and sections", "الجسور والأعمدة والصفائح والمقاطع"), L("Plate and structural", "صفائح وهياكل"), "/materials/plate-structural"],
      [L("Mixed demolition steel", "فولاذ الهدم المختلط"), L("HMS 1 & 2", "HMS 1 و2"), "/materials/heavy-melt-steel"],
      [L("Cable, earthing and pipework", "الكابلات والتأريض والأنابيب"), L("Copper grades", "درجات النحاس"), "/materials/copper"],
      [L("Window frames, curtain wall, cladding", "إطارات النوافذ والواجهات الزجاجية والكسوات"), L("Aluminium extrusions and sheet", "مقاطع وصفائح الألمنيوم"), "/materials/aluminum"],
    ],
    blocks: [
      { type: "h2", id: "separation", text: L("Separating scrap on a live site", "فصل الخردة في موقع قيد العمل") },
      { type: "list", items: [
        L("Give metal its own container, signed and positioned where the steel fixers and cutting crews work.", "خصّص للمعادن حاويتها الخاصة، معلَّمة وموضوعة حيث يعمل عمال تركيب الحديد وفرق القص."),
        L("Keep non-ferrous metals — copper cable, aluminium profiles — in separate bags or bins; they are worth many times their weight in steel.", "احفظ المعادن غير الحديدية — كابلات النحاس ومقاطع الألمنيوم — في أكياس أو صناديق منفصلة، فقيمتها أضعاف وزنها من الفولاذ."),
        L("Break concrete off recovered bar and remove timber and packaging from steel bundles.", "انزع الخرسانة عن القضبان المستخلصة، وأزل الأخشاب ومواد التغليف عن حزم الفولاذ."),
        L("On demolition, plan the strip-out so services metals come out before the structure.", "في الهدم، خطّط لإزالة التجهيزات بحيث تُستخرج معادن الأنظمة قبل الهيكل."),
      ] },
      { type: "h2", id: "collection", text: L("How collection fits the programme", "كيف يتوافق الجمع مع البرنامج الزمني") },
      { type: "p", text: L(
        "AALKC places roll-off containers from 10 to 40 yards and flatbed transport where scrap is generated, and swaps or collects them on a schedule that suits the site. For larger strip-outs, [industrial demolition](/services/industrial-demolition) recovers structural steel and separates recoverable material as it is dismantled, and [heavy logistics](/services/heavy-logistics) coordinates vehicles for bulk loads across the Eastern Province.",
        "تضع أمانة الكلمة حاويات سحب من 10 إلى 40 ياردة ووسائل نقل مسطحة حيث تتولد الخردة، وتستبدلها أو تجمعها وفق جدول يناسب الموقع. وفي أعمال الإزالة الكبيرة، تستعيد خدمة [الهدم الصناعي](/services/industrial-demolition) الفولاذ الإنشائي وتفصل المواد القابلة للاستعادة أثناء التفكيك، وتنسّق خدمة [الخدمات اللوجستية الثقيلة](/services/heavy-logistics) المركبات للحمولات الكبيرة في المنطقة الشرقية.",
      ) },
      { type: "h2", id: "before-collection", text: L("Before collection", "قبل الجمع") },
      { type: "note", title: L("Safety and ownership", "السلامة والملكية"), text: safetyNote },
    ],
    faq: [
      { question: L("Can scrap be collected while the site is still active?", "هل يمكن جمع الخردة والموقع ما زال قيد العمل؟"), answer: L("Yes. Containers are placed and swapped on a schedule agreed with the site, so collection works around pours, deliveries and access restrictions.", "نعم. توضع الحاويات وتُستبدل وفق جدول يُتفق عليه مع الموقع، فيتم الجمع بما يتوافق مع أعمال الصب والتوريد وقيود الدخول.") },
      { question: L("Is mixed site steel still worth separating?", "هل يستحق فولاذ الموقع المختلط الفصل؟"), answer: L("Separating heavy plate and sections from lighter steel, and keeping non-ferrous metals out, moves material into higher grades. See [how to prepare scrap](/insights/preparing-scrap-for-grading).", "فصل الصفائح والمقاطع الثقيلة عن الفولاذ الأخف، وإبعاد المعادن غير الحديدية، ينقل المواد إلى درجات أعلى. اطّلع على [كيف تُجهّز الخردة](/insights/preparing-scrap-for-grading).") },
    ],
    insights: ["preparing-scrap-for-grading", "saudi-arabia-scrap-metal-industry"],
  },

  manufacturing: {
    standfirst: L(
      "Production scrap is the cleanest scrap there is — new, of known alloy, generated in the same place every day. Its value depends almost entirely on keeping alloys apart.",
      "خردة الإنتاج أنظف الخردة على الإطلاق — جديدة ومعروفة السبيكة وتتولد في المكان نفسه كل يوم. وتتوقف قيمتها بالكامل تقريبًا على فصل السبائك بعضها عن بعض.",
    ),
    brief: [
      L("Typical streams are sheet offcuts and skeletons, bar ends, machining turnings, and rejected parts.", "التيارات المعتادة: بقايا الصفائح وهياكلها، وأطراف القضبان، وبرادة التشغيل الآلي، والأجزاء المرفوضة."),
      L("New production scrap of one alloy is graded higher than mixed material.", "خردة الإنتاج الجديدة من سبيكة واحدة تُصنَّف أعلى من المواد المختلطة."),
      L("Turnings should be drained of cutting fluid and kept dry.", "يجب تصفية البرادة من سوائل القطع وحفظها جافة."),
      L("Recurring collections can be set to the production cycle.", "يمكن ضبط الجمع الدوري على دورة الإنتاج."),
    ],
    streams: [
      [L("Stainless offcuts and skeletons", "بقايا الفولاذ المقاوم للصدأ وهياكل صفائحه"), L("304, 316 by grade", "304 و316 بحسب الدرجة"), "/materials/stainless-steel"],
      [L("Aluminium extrusion and sheet offcuts", "بقايا مقاطع وصفائح الألمنيوم"), L("Segregated new aluminium", "ألمنيوم جديد مفصول"), "/materials/aluminum"],
      [L("Brass machining turnings and rod ends", "برادة النحاس الأصفر وأطراف قضبانه"), L("Yellow brass turnings and solids", "برادة وقطع صلبة من النحاس الأصفر"), "/materials/brass"],
      [L("Copper busbar and winding offcuts", "بقايا قضبان التوزيع ولفائف النحاس"), L("No. 1 heavy copper and wire", "نحاس ثقيل وسلك رقم 1"), "/materials/copper"],
      [L("Carbon-steel plate and punchings", "صفائح وقطع مثقوبة من الفولاذ الكربوني"), L("Plate and structural / HMS", "صفائح وهياكل / HMS"), "/materials/plate-structural"],
    ],
    blocks: [
      { type: "h2", id: "separation", text: L("Separate by alloy, at the machine", "افصل بحسب السبيكة عند الآلة") },
      { type: "p", text: L(
        "In fabrication, the moment of highest value is the moment the offcut leaves the machine: at that point its alloy is known for certain. Once 304 and 316 offcuts, or 6063 and cast aluminium, share a bin, that certainty is gone and the material sells at a mixed grade. A labelled bin per alloy at each cell keeps the value.",
        "في التصنيع تكون أعلى لحظات القيمة حين تخرج البقايا من الآلة، فعندها تكون السبيكة معروفة يقينًا. أما إذا اجتمعت بقايا 304 و316، أو ألمنيوم 6063 والمسبوك، في صندوق واحد ضاع هذا اليقين وبيعت المواد بدرجة مختلطة. وصندوق معلَّم لكل سبيكة عند كل خلية عمل يحفظ القيمة.",
      ) },
      { type: "list", items: [
        L("Drain turnings and keep them dry; oily or wet swarf is downgraded.", "صفِّ البرادة واحفظها جافة، فالبرادة الزيتية أو المبللة تُخفَّض درجتها."),
        L("Keep turnings apart from solids of the same alloy.", "افصل البرادة عن القطع الصلبة من السبيكة نفسها."),
        L("Quarantine rejected parts with steel inserts or coatings for separate grading.", "اعزل الأجزاء المرفوضة ذات الإدخالات الفولاذية أو الطلاءات لتُصنَّف على حدة."),
      ] },
      { type: "h2", id: "collection", text: L("Collection and grading", "الجمع والتصنيف") },
      { type: "p", text: L(
        "AALKC purchases ferrous and non-ferrous production scrap, inspects and grades every load before it is weighed on certified scales, and uses laser and XRF-supported identification to classify alloys and verify grades. Collections can be set as recurring, with container swaps timed to your output.",
        "تشتري أمانة الكلمة خردة الإنتاج الحديدية وغير الحديدية، وتفحص كل حمولة وتصنّفها قبل وزنها على موازين معتمدة، وتستخدم التعرّف المدعوم بالليزر وتقنية XRF لتصنيف السبائك والتحقق من الدرجات. ويمكن ضبط الجمع ليكون دوريًا، مع استبدال الحاويات بما يتوافق مع حجم إنتاجك.",
      ) },
      { type: "note", title: L("Safety and ownership", "السلامة والملكية"), text: safetyNote },
    ],
    faq: [
      { question: L("Why separate stainless grades if they look the same?", "لماذا تُفصل درجات الفولاذ المقاوم للصدأ وهي متشابهة في الشكل؟"), answer: L("316 carries molybdenum and usually more nickel than 304, so it is worth more. Mixed, both sell at the lower value. See the [stainless steel guide](/materials/stainless-steel).", "يحتوي 316 على الموليبدنوم وعادةً على نيكل أكثر من 304، فقيمته أعلى. وإذا خُلطا بيع كلاهما بالقيمة الأدنى. اطّلع على [دليل الفولاذ المقاوم للصدأ](/materials/stainless-steel).") },
      { question: L("Can collections follow our production schedule?", "هل يمكن أن يتبع الجمع جدول إنتاجنا؟"), answer: L("Yes — recurring collections and container swaps can be set to your production cycle.", "نعم، يمكن ضبط الجمع الدوري واستبدال الحاويات على دورة إنتاجك.") },
    ],
    insights: ["scrap-metal-grades-explained", "preparing-scrap-for-grading"],
  },

  "industrial-plants": {
    standfirst: L(
      "Plants generate scrap in waves — shutdowns, equipment replacement, decommissioning — and much of it is heavy, mixed and installed. Recovering it well is a planning exercise.",
      "تُنتج المصانع الخردة على دفعات — في التوقفات واستبدال المعدات وإيقاف التشغيل — ومعظمها ثقيل ومختلط ومركّب في مكانه. واستعادتها بشكل جيد مسألة تخطيط.",
    ),
    brief: [
      L("Typical streams are structural steel, redundant machinery, cast iron housings, stainless process equipment, piping and cable.", "التيارات المعتادة: الفولاذ الإنشائي، والآلات المستغنى عنها، وأغلفة حديد الزهر، ومعدات المعالجة من الفولاذ المقاوم للصدأ، والأنابيب والكابلات."),
      L("Separating material as it is dismantled is what lets it be graded rather than sold as mixed scrap.", "فصل المواد أثناء التفكيك هو ما يتيح تصنيفها بدل بيعها خردة مختلطة."),
      L("Process equipment must be drained, cleaned and released by the plant before removal.", "يجب أن تُفرَّغ معدات المعالجة وتُنظَّف ويُفرَج عنها من المصنع قبل إزالتها."),
      L("Heavy items need planned lifting and transport.", "تحتاج القطع الثقيلة إلى رفع ونقل مخطط لهما."),
    ],
    streams: [
      [L("Structural steel and plate", "الفولاذ الإنشائي والصفائح"), L("Plate and structural / HMS", "صفائح وهياكل / HMS"), "/materials/plate-structural"],
      [L("Pump, valve and machine castings", "مسبوكات المضخات والصمامات والآلات"), L("Cast iron", "حديد الزهر"), "/materials/cast-iron"],
      [L("Tanks, piping and process vessels", "الخزانات والأنابيب وأوعية المعالجة"), L("Stainless by grade / HMS", "فولاذ مقاوم للصدأ بحسب الدرجة / HMS"), "/materials/stainless-steel"],
      [L("Power and control cable, motors", "كابلات الطاقة والتحكم والمحركات"), L("Copper grades", "درجات النحاس"), "/materials/copper"],
      [L("Mixed machinery and frames", "الآلات والهياكل المختلطة"), L("HMS 1 & 2", "HMS 1 و2"), "/materials/heavy-melt-steel"],
    ],
    blocks: [
      { type: "h2", id: "planning", text: L("Planning recovery around a shutdown", "تخطيط الاستعادة حول التوقف") },
      { type: "list", items: [
        L("Agree the scope early: what is coming out, in what order, and what the plant must isolate, drain and release first.", "اتفق على النطاق مبكرًا: ما الذي سيُزال، وبأي ترتيب، وما الذي يجب أن يعزله المصنع ويفرّغه ويُفرج عنه أولًا."),
        L("Separate by material as items come down — stainless vessels, cast iron casings, copper cable, carbon steel structure.", "افصل بحسب المادة أثناء الإنزال — أوعية الفولاذ المقاوم للصدأ، وأغلفة حديد الزهر، وكابلات النحاس، وهيكل الفولاذ الكربوني."),
        L("Plan cutting, lifting and transport for heavy and oversized items.", "خطّط للقطع والرفع والنقل للقطع الثقيلة وكبيرة الحجم."),
        L("Record what leaves site, by load, for the plant's own records.", "سجّل ما يغادر الموقع لكل حمولة، لسجلات المصنع."),
      ] },
      { type: "h2", id: "services", text: L("How AALKC supports plant recovery", "كيف تدعم أمانة الكلمة الاستعادة في المصانع") },
      { type: "p", text: L(
        "For decommissioning, equipment replacement and facility clearance, [industrial demolition](/services/industrial-demolition) recovers machinery, structural steel and other metal assets, separating recoverable material during dismantling. [Heavy logistics](/services/heavy-logistics) coordinates the fleet for bulk loads and relocations, and every load is inspected, graded and weighed on certified scales before value is confirmed.",
        "في إيقاف التشغيل واستبدال المعدات وإخلاء المنشآت، تستعيد خدمة [الهدم الصناعي](/services/industrial-demolition) الآلات والفولاذ الإنشائي وغيرها من الأصول المعدنية، وتفصل المواد القابلة للاستعادة أثناء التفكيك. وتنسّق خدمة [الخدمات اللوجستية الثقيلة](/services/heavy-logistics) الأسطول للحمولات الكبيرة وعمليات النقل، وتُفحص كل حمولة وتُصنَّف وتوزن على موازين معتمدة قبل تأكيد قيمتها.",
      ) },
      { type: "note", title: L("Safety and ownership", "السلامة والملكية"), text: safetyNote },
    ],
    faq: [
      { question: L("Who isolates and cleans process equipment before removal?", "من يعزل معدات المعالجة وينظفها قبل إزالتها؟"), answer: L("The plant, under its own permit system. Equipment is removed once it has been isolated, drained, cleaned and released; sealed, pressurised or hazardous containers are not accepted.", "يتولى ذلك المصنع ضمن نظام التصاريح الخاص به، وتُزال المعدات بعد عزلها وتفريغها وتنظيفها والإفراج عنها، ولا تُقبل الحاويات المغلقة أو المضغوطة أو الخطرة.") },
    ],
    insights: ["quality-and-safety-in-scrap-trading", "how-scrap-metal-is-recycled"],
  },

  electrical: {
    standfirst: L(
      "Electrical scrap is small in volume and high in value. Most of it is copper or aluminium conductor, and its price rests on how well it is sorted.",
      "خردة الأعمال الكهربائية قليلة الحجم عالية القيمة، ومعظمها موصلات نحاس أو ألمنيوم، ويعتمد سعرها على جودة فرزها.",
    ),
    brief: [
      L("The main streams are copper and aluminium cable, busbar, earthing, windings and switchgear.", "التيارات الرئيسية: كابلات النحاس والألمنيوم، وقضبان التوزيع، والتأريض، واللفائف، ولوحات المفاتيح."),
      L("Copper and aluminium conductors must be kept apart; so should bare and insulated cable.", "يجب فصل موصلات النحاس عن الألمنيوم، وكذلك الكابلات العارية عن المعزولة."),
      L("Insulated cable is valued on its recoverable metal; never burn insulation off.", "تُقيَّم الكابلات المعزولة بالمعدن القابل للاستخلاص، ولا يجوز حرق العزل أبدًا."),
      L("Steel armour, lugs and fittings lower the grade if left attached.", "الدروع الفولاذية والأطراف والملحقات تخفض الدرجة إذا تُركت ملتصقة."),
    ],
    streams: [
      [L("Bare copper wire and busbar", "سلك النحاس العاري وقضبان التوزيع"), L("Bare bright / No. 1 heavy copper", "عارٍ لامع / نحاس ثقيل رقم 1"), "/materials/copper"],
      [L("Insulated copper cable", "كابلات النحاس المعزولة"), L("Insulated copper wire", "أسلاك نحاسية معزولة"), "/materials/copper"],
      [L("Aluminium conductors and cable", "موصلات وكابلات الألمنيوم"), L("Pure aluminium wire and cable", "أسلاك وكابلات ألمنيوم نقية"), "/materials/aluminum"],
      [L("Brass terminals and fittings", "أطراف ووصلات النحاس الأصفر"), L("Yellow brass", "نحاس أصفر"), "/materials/brass"],
    ],
    blocks: [
      { type: "h2", id: "separation", text: L("Sorting electrical scrap", "فرز خردة الأعمال الكهربائية") },
      { type: "list", items: [
        L("Copper and aluminium conductors in separate containers — a mixed cable load is graded at the lower metal.", "موصلات النحاس والألمنيوم في حاويات منفصلة، فحمولة الكابلات المختلطة تُصنَّف بالمعدن الأدنى."),
        L("Bare wire and busbar apart from insulated cable.", "السلك العاري وقضبان التوزيع بعيدًا عن الكابلات المعزولة."),
        L("Remove steel armour, glands and lugs where practical, or declare them so the load is graded correctly.", "انزع الدروع الفولاذية والجلب والأطراف متى أمكن، أو صرّح بوجودها لتُصنَّف الحمولة بشكل صحيح."),
        L("Leave insulation on: burning it oxidises the copper and is a pollution hazard.", "اترك العزل في مكانه، فحرقه يؤكسد النحاس ويضر بالبيئة."),
      ] },
      { type: "h2", id: "grading", text: L("How it is graded", "كيف تُصنَّف") },
      { type: "p", text: L(
        "Electrical scrap is graded under the copper and aluminium grades of the Scrap Specifications Circular — bare bright and No. 1 copper wire, No. 1 heavy copper, insulated copper wire, pure aluminium wire and cable. AALKC inspects and grades every load and uses laser and XRF-supported identification where alloys need confirming. Read the [copper guide](/materials/copper) for the grade definitions.",
        "تُصنَّف خردة الأعمال الكهربائية ضمن درجات النحاس والألمنيوم في نشرة مواصفات الخردة — السلك العاري اللامع وسلك النحاس رقم 1، والنحاس الثقيل رقم 1، والأسلاك النحاسية المعزولة، وأسلاك وكابلات الألمنيوم النقية. وتفحص أمانة الكلمة كل حمولة وتصنّفها، وتستخدم التعرّف المدعوم بالليزر وتقنية XRF عند الحاجة إلى التحقق من السبائك. اقرأ [دليل النحاس](/materials/copper) لتعريفات الدرجات.",
      ) },
      { type: "note", title: L("Safety and ownership", "السلامة والملكية"), text: safetyNote },
    ],
    faq: [
      { question: L("Is it worth stripping cable before selling?", "هل يستحق نزع العزل عن الكابلات قبل بيعها؟"), answer: L("Insulated cable is a recognised grade valued on its copper or aluminium yield, so stripping is not required. If it is stripped, it must be done mechanically, never by burning.", "الكابلات المعزولة درجة معترف بها تُقيَّم بنسبة النحاس أو الألمنيوم فيها، فالنزع غير ضروري. وإن نُزع العزل فيجب أن يكون ميكانيكيًا لا بالحرق أبدًا.") },
    ],
    insights: ["scrap-metal-grades-explained", "preparing-scrap-for-grading"],
  },

  commercial: {
    standfirst: L(
      "Facilities produce scrap in bursts — a fit-out, a plant replacement, a warehouse clearance — often in occupied buildings. The task is to recover the metal without disturbing the people working there.",
      "تُنتج المرافق الخردة على دفعات — تجديد التشطيبات، أو استبدال المعدات، أو إخلاء مستودع — وغالبًا في مبانٍ مأهولة. والمهمة استعادة المعادن دون إزعاج من يعملون فيها.",
    ),
    brief: [
      L("Typical streams are aluminium partitions and ceiling grid, steel racking and shelving, copper pipe and cable, and stainless kitchen equipment.", "التيارات المعتادة: قواطع الألمنيوم وشبكات الأسقف، ورفوف التخزين الفولاذية، وأنابيب وكابلات النحاس، ومعدات المطابخ من الفولاذ المقاوم للصدأ."),
      L("Building-services strip-outs yield copper and aluminium that are worth sorting separately.", "تُنتج إزالة أنظمة المبنى نحاسًا وألمنيومًا يستحق الفرز المنفصل."),
      L("Collection can be timed for out-of-hours or low-occupancy periods.", "يمكن توقيت الجمع خارج ساعات العمل أو في فترات قلة الإشغال."),
      L("Equipment must be emptied and free of refrigerants, fuels and other hazards before collection.", "يجب تفريغ المعدات وخلوّها من المبردات والوقود وغيرها من المخاطر قبل الجمع."),
    ],
    streams: [
      [L("Partitions, ceiling grid, window frames", "القواطع وشبكات الأسقف وإطارات النوافذ"), L("Aluminium extrusions and sheet", "مقاطع وصفائح الألمنيوم"), "/materials/aluminum"],
      [L("Racking, shelving, steel doors", "رفوف التخزين والأرفف والأبواب الفولاذية"), L("HMS 2 / light steel", "HMS 2 / فولاذ خفيف"), "/materials/heavy-melt-steel"],
      [L("Copper pipe and cable", "أنابيب وكابلات النحاس"), L("Copper grades", "درجات النحاس"), "/materials/copper"],
      [L("Kitchen and catering equipment", "معدات المطابخ والضيافة"), L("Stainless by grade", "فولاذ مقاوم للصدأ بحسب الدرجة"), "/materials/stainless-steel"],
    ],
    blocks: [
      { type: "h2", id: "separation", text: L("Getting value from a strip-out", "تحقيق القيمة من أعمال الإزالة") },
      { type: "list", items: [
        L("Sort as you strip: aluminium, copper, stainless and steel each in their own bags or bins.", "افرز أثناء الإزالة: الألمنيوم والنحاس والفولاذ المقاوم للصدأ والفولاذ كلٌّ في أكياسه أو صناديقه."),
        L("Remove glass, plasterboard, ceiling tiles and plastics from metal frames.", "أزل الزجاج والألواح الجبسية وبلاطات الأسقف والبلاستيك عن الإطارات المعدنية."),
        L("Have refrigeration and air-conditioning equipment degassed by a qualified contractor before it is scrapped.", "اطلب من مقاول مؤهل سحب غازات أجهزة التبريد والتكييف قبل تحويلها إلى خردة."),
        L("Agree access routes, loading times and container positions with building management.", "اتفق مع إدارة المبنى على مسارات الدخول وأوقات التحميل ومواقع الحاويات."),
      ] },
      { type: "h2", id: "collection", text: L("Collection with minimal disruption", "الجمع بأقل إزعاج") },
      { type: "p", text: L(
        "AALKC's [container service](/services/container-service) places containers matched to the material and the access available, and swaps or collects them on a schedule that suits the building. Loads are inspected, graded and weighed on certified scales, and [scrap purchasing](/services/scrap-purchasing) quotations follow current market conditions.",
        "تضع [خدمة الحاويات](/services/container-service) لدى أمانة الكلمة حاويات تناسب المادة والمداخل المتاحة، وتستبدلها أو تجمعها وفق جدول يناسب المبنى. وتُفحص الحمولات وتُصنَّف وتوزن على موازين معتمدة، وتتبع عروض أسعار [شراء الخردة](/services/scrap-purchasing) ظروف السوق الحالية.",
      ) },
      { type: "note", title: L("Safety and ownership", "السلامة والملكية"), text: safetyNote },
    ],
    faq: [
      { question: L("Can collections happen outside working hours?", "هل يمكن الجمع خارج ساعات العمل؟"), answer: L("Collection times are agreed with each site, so they can be planned around occupancy and building-management restrictions.", "تُتفق أوقات الجمع مع كل موقع، فيمكن تخطيطها حول الإشغال وقيود إدارة المبنى.") },
    ],
    insights: ["preparing-scrap-for-grading", "scrap-metal-in-saudi-circular-economy"],
  },
};
