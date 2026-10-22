import { L } from "../lib/i18n.js";

// The three reasons a business contacts AALKC, each answered the same way:
// what AALKC handles, what to send, and what happens next. Everything said
// about AALKC here restates what the site already publishes (inspection and
// grading before certified weighing, laser and XRF-supported identification,
// 10–40 yard containers, supply to mills and foundries, export through
// coordinated trade channels, non-binding estimates, hazardous-item and
// ownership rules). Payment terms, loading and shipping details are not
// published yet, so they are asked about, never stated.

export const intents = [
  {
    id: "sell",
    to: "/sell",
    title: L("Sell scrap", "بيع الخردة"),
    handles: L("Ferrous and non-ferrous scrap from industrial, construction and commercial sites, collected or delivered.", "الخردة الحديدية وغير الحديدية من المواقع الصناعية والإنشائية والتجارية، بالجمع من الموقع أو بالتسليم."),
    send: L("Material, estimated quantity, condition, site location and photos.", "المادة والكمية التقديرية والحالة وموقع العمل والصور."),
    action: L("How selling works", "كيف يتم البيع"),
  },
  {
    id: "buy",
    to: "/buy",
    title: L("Buy materials", "شراء المواد"),
    handles: L("Graded ferrous and non-ferrous scrap for steel mills, foundries and international buyers.", "خردة حديدية وغير حديدية مصنّفة لمصانع الصلب والمسابك والمشترين الدوليين."),
    send: L("Grade, quantity, destination and required timing.", "الدرجة والكمية وجهة التسليم والتوقيت المطلوب."),
    action: L("How buying works", "كيف يتم الشراء"),
  },
  {
    id: "services",
    to: "/services",
    title: L("Industrial services", "الخدمات الصناعية"),
    handles: L("Containers, dismantling and demolition, heavy logistics, metal sorting and export coordination.", "الحاويات، والتفكيك والهدم، والخدمات اللوجستية الثقيلة، وفرز المعادن، وتنسيق التصدير."),
    send: L("The site, the scope of work and the timing.", "الموقع ونطاق العمل والتوقيت."),
    action: L("See the services", "اطّلع على الخدمات"),
  },
];

export const sellGuide = {
  title: L("Sell your scrap", "بِع خردتك"),
  description: L(
    "How to sell scrap metal to AALKC in Dammam: the materials we buy, what to send for a quote, what is not accepted, and each step from enquiry to payment.",
    "كيف تبيع الخردة المعدنية لأمانة الكلمة في الدمام: المواد التي نشتريها، وما ترسله لطلب عرض السعر، وما لا يُقبل، وكل خطوة من الاستفسار حتى الدفع.",
  ),
  heading: L("Sell your scrap to AALKC.", "بِع خردتك لأمانة الكلمة."),
  standfirst: L(
    "What we buy, what to send us, and what happens between your first message and payment.",
    "ما نشتريه، وما ترسله إلينا، وما يحدث بين رسالتك الأولى والدفع.",
  ),
  send: [
    L("The material, or a mix, as best you can describe it", "المادة أو الخليط بأدق وصف ممكن"),
    L("Estimated quantity in tonnes, and whether it recurs", "الكمية التقديرية بالطن، وهل تتكرر"),
    L("Condition: clean, painted, oily, with attachments or insulation", "الحالة: نظيفة، مطلية، عليها زيوت، بها ملحقات أو عزل"),
    L("Site location and access for collection", "موقع العمل ومداخله للجمع"),
    L("Photographs — WhatsApp is the quickest way to send them", "صور — وواتساب أسرع طريقة لإرسالها"),
    L("Confirmation that you own the material and may sell it", "تأكيد ملكيتك للمادة وحقك في بيعها"),
  ],
  notAccepted: [
    L("Sealed, pressurised or hazardous containers", "الحاويات المغلقة أو المضغوطة أو الخطرة"),
    L("Explosive or radioactive items", "المواد المتفجرة أو المشعة"),
    L("Material whose ownership cannot be confirmed", "المواد التي لا يمكن تأكيد ملكيتها"),
  ],
  steps: [
    { title: L("Send the details", "أرسل التفاصيل"), copy: L("Use the form, WhatsApp or a call. Photos speed up the first assessment.", "عبر النموذج أو واتساب أو اتصال، والصور تسرّع التقييم الأولي.") },
    { title: L("First assessment", "التقييم الأولي"), copy: L("We reply with the next step and, where possible, an estimate based on current market conditions. Estimates are non-binding until the material is inspected and weighed.", "نرد بالخطوة التالية، ومع تقدير مبني على ظروف السوق الحالية متى أمكن. وتبقى التقديرات غير ملزمة حتى تُفحص المادة وتوزن.") },
    { title: L("Collection or delivery", "الجمع أو التسليم"), copy: L("Roll-off containers from 10 to 40 yards or flatbed transport, placed and swapped on a schedule agreed with your site.", "حاويات سحب من 10 إلى 40 ياردة أو نقل مسطح، توضع وتُستبدل وفق جدول يُتفق عليه مع موقعك.") },
    { title: L("Inspection and grading", "الفحص والتصنيف"), copy: L("Every load is inspected for safety and graded, with laser and XRF-supported identification where alloys need confirming.", "تُفحص كل حمولة للسلامة وتُصنَّف، مع التعرّف المدعوم بالليزر وتقنية XRF عند الحاجة إلى التحقق من السبائك.") },
    { title: L("Certified weighing", "الوزن المعتمد"), copy: L("Accepted material is weighed on certified industrial scales through a documented process.", "توزن المواد المقبولة على موازين صناعية معتمدة ضمن إجراء موثّق.") },
    { title: L("Value and payment", "القيمة والدفع"), copy: L("Value is confirmed from the grade and the certified weight, and the payment process agreed with you follows.", "تتأكد القيمة من الدرجة والوزن المعتمد، ثم تُستكمل إجراءات الدفع المتفق عليها معك.") },
  ],
  faq: [
    { question: L("Is the estimate I receive final?", "هل التقدير الذي أتلقاه نهائي؟"), answer: L("No. Estimates are based on current market conditions and are non-binding until the material has been physically inspected and weighed.", "لا. التقديرات مبنية على ظروف السوق الحالية، وتبقى غير ملزمة حتى تُفحص المادة فعليًا وتوزن.") },
    { question: L("Do you collect from industrial sites?", "هل تجمعون الخردة من المواقع الصناعية؟"), answer: L("Yes. AALKC coordinates collection and container swaps for industrial sites across the Eastern Province.", "نعم. تنسّق أمانة الكلمة الجمع واستبدال الحاويات للمواقع الصناعية في المنطقة الشرقية.") },
    { question: L("How is the price decided?", "كيف يتحدد السعر؟"), answer: L("By grade and certified weight, against current market conditions. Separating metals and removing attachments before collection protects the grade — see [how to prepare scrap](/insights/preparing-scrap-for-grading).", "بحسب الدرجة والوزن المعتمد وفق ظروف السوق الحالية. وفصل المعادن وإزالة الملحقات قبل الجمع يحفظان الدرجة — اطّلع على [كيف تجهّز الخردة](/insights/preparing-scrap-for-grading).") },
  ],
};

export const buyGuide = {
  title: L("Buy from AALKC", "اشترِ من أمانة الكلمة"),
  description: L(
    "Source graded ferrous and non-ferrous scrap from AALKC in Dammam: the material families we handle, how quality is confirmed, and what to include in a supply enquiry.",
    "احصل على خردة حديدية وغير حديدية مصنّفة من أمانة الكلمة في الدمام: فئات المواد التي نتعامل معها، وكيف تُؤكَّد الجودة، وما تتضمنه طلبات التوريد.",
  ),
  heading: L("Source graded scrap from AALKC.", "احصل على خردة مصنّفة من أمانة الكلمة."),
  standfirst: L(
    "Ferrous and non-ferrous feedstock for mills, foundries and international buyers — inspected, graded and weighed before it leaves us.",
    "مادة خام حديدية وغير حديدية لمصانع الصلب والمسابك والمشترين الدوليين، تُفحص وتُصنَّف وتوزن قبل أن تغادرنا.",
  ),
  assurance: [
    { term: L("Inspection", "الفحص"), text: L("Every load is inspected before it is accepted into stock.", "تُفحص كل حمولة قبل قبولها في المخزون.") },
    { term: L("Grading", "التصنيف"), text: L("Material is separated by family and graded, with laser and XRF-supported identification for alloys, and the acceptance review is documented.", "تُفصل المواد بحسب الفئة وتُصنَّف، مع التعرّف المدعوم بالليزر وتقنية XRF للسبائك، وتُوثَّق مراجعة القبول.") },
    { term: L("Weighing", "الوزن"), text: L("Weights are taken on certified industrial scales through a documented process.", "تُؤخذ الأوزان على موازين صناعية معتمدة ضمن إجراء موثّق.") },
    { term: L("Management standards", "معايير الإدارة"), text: L("ISO 9001, ISO 14001 and ISO 45001.", "ISO 9001 وISO 14001 وISO 45001.") },
  ],
  send: [
    L("Grade or specification, including any code name you buy against", "الدرجة أو المواصفة، بما فيها أي اسم رمزي تشتري وفقه"),
    L("Quantity, and whether it is a single lot or regular supply", "الكمية، وهل هي دفعة واحدة أم توريد منتظم"),
    L("Destination: your plant, or the port of discharge for export", "الوجهة: مصنعك، أو ميناء التفريغ للتصدير"),
    L("Required timing", "التوقيت المطلوب"),
    L("Your inspection, loading and documentation requirements", "متطلباتك للفحص والتحميل والمستندات"),
  ],
  steps: [
    { title: L("Send the enquiry", "أرسل الطلب"), copy: L("Grade, quantity, destination and timing, with any inspection or documentation requirements.", "الدرجة والكمية والوجهة والتوقيت، مع أي متطلبات للفحص أو المستندات.") },
    { title: L("Availability and terms", "التوفر والشروط"), copy: L("Our Dammam team replies with what can be supplied and the next step. Availability depends on the material collected, so it is confirmed for each enquiry.", "يرد فريقنا في الدمام بما يمكن توريده والخطوة التالية. ويتوقف التوفر على المواد المجمّعة، لذا يُؤكَّد لكل طلب.") },
    { title: L("Supply", "التوريد"), copy: L("Graded material is supplied to mills and foundries, and to international buyers through coordinated trade channels.", "تُورَّد المواد المصنّفة إلى مصانع الصلب والمسابك، وإلى المشترين الدوليين عبر قنوات تجارية منسّقة.") },
  ],
  faq: [
    { question: L("Which grades can AALKC supply?", "ما الدرجات التي يمكن لأمانة الكلمة توريدها؟"), answer: L("AALKC handles the eight material families in its [material guides](/materials), from heavy melting steel to copper and stainless steel. What is available at any time depends on the material collected, so availability is confirmed for each enquiry.", "تتعامل أمانة الكلمة مع فئات المواد الثماني في [أدلة المواد](/materials)، من الفولاذ الثقيل للصهر إلى النحاس والفولاذ المقاوم للصدأ. ويتوقف المتاح في أي وقت على المواد المجمّعة، لذا يُؤكَّد التوفر لكل طلب.") },
    { question: L("Do you supply buyers outside Saudi Arabia?", "هل تورّدون لمشترين خارج المملكة؟"), answer: L("Yes. Where a grade finds its best value abroad, AALKC coordinates supply to international foundries and mills — see [global export](/services/global-export). Trade reports in 2024 described a Saudi export duty on some non-ferrous scrap, so current export rules are confirmed for each grade.", "نعم. حين تجد الدرجة قيمتها الأفضل في الخارج، تنسّق أمانة الكلمة التوريد إلى المسابك والمصانع الدولية — اطّلع على [التصدير العالمي](/services/global-export). وقد تحدثت تقارير تجارية عام 2024 عن رسم تصدير سعودي على بعض الخردة غير الحديدية، لذا تُؤكَّد قواعد التصدير السارية لكل درجة.") },
  ],
};
