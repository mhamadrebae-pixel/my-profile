/*
    ئەم فایلە داتای سەرەتایی خزمەتگوزارییەکان هەڵدەگرێت.
    هۆکاری جیاکردنەوەی داتا لە logic ئەوەیە کە دواتر تیمەکە بتوانێت بەبێ دەستکاریکردنی app.js، تەنها ناوەڕۆک بگۆڕێت.
    لە داهاتوودا دەتوانرێت ئەم array ـە لە API، database، یان CMS/dashboard ـەوە پڕ بکرێتەوە.
*/

/* =========================================================
گرنگ: شوێنی گۆڕینی داتاکانت
-----------------------------

تەنها پێویستە ئەم فایلە دەستکاری بکەیت بۆ نوێکردنەوەی:

1. ناوەکانی خزمەتگوزاری

2. وەسفەکانی خزمەتگوزاری

3. وێنەکان

4. ژمارەکانی WhatsApp

5. نرخەکان

6. ناوەکانی خاوەن

7. شوێنەکان
   ========================================================= */

/*
    هەر object ـێک یەک خزمەتگوزاری نیشان دەدات.
    - id: ناسنامەیەکی سادە بۆ بەکارهێنان لە filtering ی داهاتوو یان admin panel.
    - category: جۆری خزمەتگوزاری بۆ badge ی کارت.
    - name: ناوی خزمەتگوزاری بە زمانی کوردی.
    - description: وەسفێکی کورت بۆ ئەوەی بەکارهێنەر زوو تێبگات خزمەتگوزارییەکە چییە.
    - image: ڕێگای وێنەکە، کە دەتوانرێت دواتر بە CDN یان cloud storage بگۆڕدرێت.
    - ownerName / ownerRole: زانیاریی کەسی خزمەتگوزاری بۆ پەڕەی وردەکاری.
    - locationText / workingHours: شوێن و کاتی کارکردن بۆ ناساندنی باشتر.
    - rules / features: خاڵە گرنگ و یاساکان بۆ میوان.
    - gallery: کۆمەڵە وێنەی زیاتر بۆ پیشاندانی خزمەتگوزارییەکە.
    - videoUrl / mapUrl: شوێن-دانەر بۆ داهاتووی ڤیدیۆ و نەخشە.
    - videoThumbnail: وێنەی preview ی ڤیدیۆ بۆ ئەوەی iframe ی قورس بەکارنەهێندرێت.
    - longDescription: دەقی وردتر بۆ پەڕەی service details.
    - price: شوێن-دانەرێکی نرخ کە دواتر بە نرخە ڕاستەقینەکان پڕ دەکرێتەوە.
    - phone: ژمارەی پیشاندان بۆ کارت.
    - whatsapp: ژمارەی پاککراوی WhatsApp بۆ دروستکردنی لینکێکی کارا.
*/

/*
    ئەم وێنانە وێنەی ڕاستەقینەی گەشتیاریی نەوڕۆڵین بۆ کارتەکانی خزمەتگوزاری.
    بەکارهێنانی وێنەی ڕاستەقینە متمانە و جوانی وێبسایتەکە زیاد دەکات.
    وێنەکان هێشتا بە lazy loading نیشان دەدرێن، بۆیە site ـەکە خەفیف و خێرا دەمێنێتەوە.
*/

/*
    ئەم helper ـە تەنها شێوەیەکی سادەی نووسینی دەقەکانە بە سێ زمان.
    هۆکاری بوونی ئەوەیە data.js خەفیف بمێنێتەوە و گۆڕینی وەرگێڕانەکان بۆ هەر خزمەتگوزارییەک ئاسان بێت.
    لە داهاتوودا دەتوانرێت ئەم شێوازە بگۆڕدرێت بۆ سیستەمێکی i18n ی بەهێزتر، بەڵام ئێستا بۆ پرۆژەیەکی سووک زۆر گونجاوە.
*/
function localize(ku, ar, en) {
    return { ku, ar, en };
}

/*
    ئەم placeholder ـانە بۆ ئەو خانانەن کە زۆربەیان هاوبەشن لە نێوان خزمەتگوزارییەکاندا.
    گرنگە بزانرێت phone و whatsapp لێرە هاوبەش نەکراون، چونکە هەر خزمەتگوزارییەک دەتوانێت ژمارەی تایبەتی خۆی هەبێت.
    لە داهاتوودا هەرکات زانیاریی ڕاستەقینە ئامادە بوو، دەتوانرێت تەنها لە هەر object ـێکدا ژمارەکان و دەقەکان بە جیاواز دەستکاریکرێن.
*/
const ownerNamePlaceholder = localize(
    "ناوی خاوەن لێرە دادەنرێت",
    "يوضع اسم المالك هنا",
    "Owner name will be added here"
);

const ownerRolePlaceholder = localize(
    "خاوەنی خزمەتگوزاری",
    "صاحب الخدمة",
    "Service Owner"
);

const nawroliLocation = localize(
    "نەوڕۆڵی، هەڵەبجە",
    "نورولي، حلبجة",
    "Nawroli, Halabja"
);

const workingHoursPlaceholder = localize(
    "بە زووی دیاری دەکرێت",
    "سيتم تحديدها قريباً",
    "To be announced soon"
);

const pricePlaceholder = localize(
    "بە زووی دیاری دەکرێت",
    "يحدد قريباً",
    "Coming Soon"
);

const services = [
    {
        id: "water-houses",

        /* ئەمە بگۆڕە:
           ناوی جۆری خزمەتگوزاری */
        category: localize("مانەوە لەسەر ئاو", "الإقامة على الماء", "Stay on Water"),

        /* ئەمە بگۆڕە:
           ناوی خزمەتگوزاری */
        name: localize("خانوو لە ناو ئاو", "بيوت على الماء", "Water Houses"),

        /* ئەمە بگۆڕە:
           وەسفی کورتی نیشان‌دراو لەسەر کارت */
        description: localize(
            "شوێنێکی تایبەت بۆ خێزان و هاوڕێیان بۆ دانیشتن و چێژوەرگرتن لە ڕوانگەی ئاو و هەوای ئارام.",
            "مكان مميز للعائلات والأصدقاء للجلوس والاستمتاع بإطلالة الماء والهواء الهادئ.",
            "A special place for families and friends to sit back and enjoy the water view and calm atmosphere."
        ),

        /* ئەمە بگۆڕە:
           ڕێگای وێنەی سەرەکی */
        image: "images/xanu A1.jpg",

        /* ئەمە بگۆڕە:
           ناوی خاوەن */
        ownerName: ownerNamePlaceholder,

        /* ئارەزوومەندانە:
           دەقی ئەرکی خاوەن */
        ownerRole: ownerRolePlaceholder,

        /* ئەمە بگۆڕە:
           دەقی شوێن */
        locationText: nawroliLocation,

        /* ئارەزوومەندانە:
           دەقی کاتی کارکردن */
        workingHours: workingHoursPlaceholder,

        /* ئارەزوومەندانە:
           یاساکان لە پەڕەی وردەکاریدا */
        rules: [
            localize("پاراستنی پاکوخاوێنی", "الحفاظ على النظافة", "Keep the place clean"),
            localize("پێشتر پەیوەندی بکە بۆ رزێرڤ", "تواصل مسبقاً للحجز", "Contact in advance for booking"),
            localize("ئاگاداربە لە ئارامی خێزانەکان", "احترم هدوء العائلات", "Respect the calm atmosphere for families")
        ],

        /* ئارەزوومەندانە:
           تایبەتمەندییەکان لە پەڕەی وردەکاریدا */
        features: [
            localize("گونجاو بۆ خێزان", "مناسب للعائلات", "Family friendly"),
            localize("دانیشتن لەسەر ئاو", "جلسات فوق الماء", "Seating over the water"),
            localize("ڕوانگەی ڕاستەوخۆ بۆ دیمەنی ڕووبار", "إطلالة مباشرة على النهر", "Direct river view")
        ],

        /* ئەمە بگۆڕە:
           وێنەی زیاتر لێرە زیاد بکە */
        gallery: [
            "images/xanu A1.jpg",
            "images/xanu A2.jpg",
            "images/xanu A3.jpg",
            "images/hero.jpg"
        ],

        /* ئارەزوومەندانە:
           لینکێکی ڤیدیۆی YouTube لێرە زیاد بکە
           دەتوانیت فایلێکی ناوخۆی `.mp4` ـیش بەکاربهێنیت */
        videoUrl: "",

        /* ئارەزوومەندانە:
           لینکێکی embed ی Google Maps زیاد بکە */
        mapUrl: "",

        /* ئەمە بگۆڕە:
           وەسفی درێژی نیشان‌دراو لە پەڕەی وردەکاریدا */
        longDescription: localize(
            "ئەم خزمەتگوزارییە بۆ ئەوانەیە کە حەزیان لە دانیشتن و پشوودانە لەسەر ئاو. خێزان و هاوڕێیان دەتوانن لێرە کاتێکی ئارام و پڕ لە دیمەنی جوان بەسەر ببەن و لە هەوای سروشتیی نەوڕۆڵی چێژ وەربگرن.",
            "هذه الخدمة مناسبة لمن يحب الجلوس والاسترخاء فوق الماء. يمكن للعائلات والأصدقاء قضاء وقت هادئ وممتع مع مناظر جميلة وهواء طبيعي منعش.",
            "This service is ideal for visitors who enjoy relaxing over the water. Families and friends can spend peaceful time here with beautiful scenery and fresh natural air."
        ),

        /* ئەمە بگۆڕە:
           دەقی نرخ */
        price: pricePlaceholder,

        /* ئەمە بگۆڕە:
           ژمارەی تەلەفۆنی نیشان‌دراو */
        phone: "0750xxxxxxx",

        /* ئەمە بگۆڕە:
           ژمارەی WhatsApp
           فۆرمات: 9647XXXXXXXX */
        whatsapp: "9647500000000"
    },
    {
        id: "rental-houses",

        /* ئەمە بگۆڕە:
           ناوی جۆری خزمەتگوزاری */
        category: localize("مانەوە و کرێ", "إقامة وإيجار", "Stay and Rental"),

        /* ئەمە بگۆڕە:
           ناوی خزمەتگوزاری */
        name: localize("خانوو بۆ کرێ", "بيوت للإيجار", "Rental Houses"),

        /* ئەمە بگۆڕە:
           وەسفی کورتی نیشان‌دراو لەسەر کارت */
        description: localize(
            "خانووی کرێیی گونجاو بۆ مانەوەی کورتخایەن، پیکنیکی خێزانی و کۆبوونەوەی ئارام.",
            "بيوت مناسبة للإيجار القصير، للنزهات العائلية والجلسات الهادئة.",
            "Comfortable rental houses for short stays, family picnics, and calm gatherings."
        ),

        /* ئەمە بگۆڕە:
           ڕێگای وێنەی سەرەکی */
        image: "images/nature.jpg",

        /* ئەمە بگۆڕە:
           ناوی خاوەن */
        ownerName: ownerNamePlaceholder,

        /* ئارەزوومەندانە:
           دەقی ئەرکی خاوەن */
        ownerRole: ownerRolePlaceholder,

        /* ئەمە بگۆڕە:
           دەقی شوێن */
        locationText: nawroliLocation,

        /* ئارەزوومەندانە:
           دەقی کاتی کارکردن */
        workingHours: workingHoursPlaceholder,

        /* ئارەزوومەندانە:
           یاساکان لە پەڕەی وردەکاریدا */
        rules: [
            localize("پاراستنی شوێنی مانەوە", "الحفاظ على مكان الإقامة", "Take care of the stay area"),
            localize("پێشتر داوا بۆ کرێ بکە", "احجز مسبقاً", "Book in advance"),
            localize("ڕێککەوتن لەسەر کاتی هاتن و چوون", "الاتفاق على وقت الدخول والخروج", "Agree on check-in and check-out time")
        ],

        /* ئارەزوومەندانە:
           تایبەتمەندییەکان لە پەڕەی وردەکاریدا */
        features: [
            localize("گونجاو بۆ مانەوەی کورتخایەن", "مناسب للإقامة القصيرة", "Suitable for short stays"),
            localize("شوێنی ئارام بۆ پیکنیک", "مكان هادئ للنزهات", "Quiet place for picnics"),
            localize("نزیک لە سروشتی سەوز", "قريب من الطبيعة الخضراء", "Close to green nature")
        ],

        /* ئەمە بگۆڕە:
           وێنەی زیاتر لێرە زیاد بکە */
        gallery: [
            "images/nature.jpg",
            "images/landscape.jpg",
            "images/activity.jpg",
            "images/hero.jpg"
        ],

        /* ئارەزوومەندانە:
           لینکێکی ڤیدیۆی YouTube لێرە زیاد بکە
           دەتوانیت فایلێکی ناوخۆی `.mp4` ـیش بەکاربهێنیت */
        videoUrl: "",

        /* ئارەزوومەندانە:
           لینکێکی embed ی Google Maps زیاد بکە */
        mapUrl: "",

        /* ئەمە بگۆڕە:
           وەسفی درێژی نیشان‌دراو لە پەڕەی وردەکاریدا */
        longDescription: localize(
            "خانووە کرێییەکان بۆ ئەو میوانانە گونجاون کە دەیانەوێت ماوەیەکی زیاتر لە نەوڕۆڵی بمێننەوە. ئەم بەشە دەتوانێت بۆ خێزان، هاوڕێ، و گەشتیاریی کورتخایەن هەستێکی ئاسوودە و تایبەت دروست بکات.",
            "البيوت المخصصة للإيجار تناسب الزوار الذين يرغبون بالبقاء مدة أطول في نورولي. هذا القسم يوفر شعوراً بالخصوصية والراحة للعائلات والأصدقاء والزوار القصيري الإقامة.",
            "These rental houses are a good fit for visitors who want to stay longer in Nawroli. They offer a more private and comfortable option for families, friends, and short-term guests."
        ),

        /* ئەمە بگۆڕە:
           دەقی نرخ */
        price: pricePlaceholder,

        /* ئەمە بگۆڕە:
           ژمارەی تەلەفۆنی نیشان‌دراو */
        phone: "0750xxxxxxx",

        /* ئەمە بگۆڕە:
           ژمارەی WhatsApp
           فۆرمات: 9647XXXXXXXX */
        whatsapp: "9647500000000"
    },
    {
        id: "boats",

        /* ئەمە بگۆڕە:
           ناوی جۆری خزمەتگوزاری */
        category: localize("چالاکیی ناو ئاو", "نشاطات مائية", "Water Activity"),

        /* ئەمە بگۆڕە:
           ناوی خزمەتگوزاری */
        name: localize("بەلەم", "قوارب", "Boats"),

        /* ئەمە بگۆڕە:
           وەسفی کورتی نیشان‌دراو لەسەر کارت */
        description: localize(
            "گەڕان بە بەلەم لەسەر ئاو بۆ بینینی دیمەنەکانی ناوچەکە لە ڕوانگەیەکی جیاواز.",
            "جولات بالقوارب على الماء لمشاهدة مناظر المنطقة من زاوية مختلفة.",
            "Boat rides on the water to enjoy the area from a different point of view."
        ),

        /* ئەمە بگۆڕە:
           ڕێگای وێنەی سەرەکی */
        image: "images/landscape.jpg",

        /* ئەمە بگۆڕە:
           ناوی خاوەن */
        ownerName: ownerNamePlaceholder,

        /* ئارەزوومەندانە:
           دەقی ئەرکی خاوەن */
        ownerRole: ownerRolePlaceholder,

        /* ئەمە بگۆڕە:
           دەقی شوێن */
        locationText: nawroliLocation,

        /* ئارەزوومەندانە:
           دەقی کاتی کارکردن */
        workingHours: workingHoursPlaceholder,

        /* ئارەزوومەندانە:
           یاساکان لە پەڕەی وردەکاریدا */
        rules: [
            localize("پاراستنی سەلامەتی لەسەر ئاو", "الالتزام بسلامة الماء", "Follow water safety rules"),
            localize("پابەندبە ڕێنمایی شۆفێر بە", "الالتزام بتوجيهات السائق", "Follow the boat operator's instructions"),
            localize("بۆ کۆمەڵەکان پێشتر داوا بکە", "للمجموعات يرجى الحجز مسبقاً", "For groups, please book in advance")
        ],

        /* ئارەزوومەندانە:
           تایبەتمەندییەکان لە پەڕەی وردەکاریدا */
        features: [
            localize("گەڕان لەسەر ئاو", "جولة على الماء", "Ride across the water"),
            localize("گونجاو بۆ خێزان و هاوڕێ", "مناسب للعائلات والأصدقاء", "Great for families and friends"),
            localize("بینینی دیمەنەکان لە ڕوانگەیەکی تر", "مشاهدة المناظر من زاوية أخرى", "See the scenery from another angle")
        ],

        /* ئەمە بگۆڕە:
           وێنەی زیاتر لێرە زیاد بکە */
        gallery: [
            "images/landscape.jpg",
            "images/activity.jpg",
            "images/hero.jpg",
            "images/nature.jpg"
        ],

        /* ئارەزوومەندانە:
           لینکێکی ڤیدیۆی YouTube لێرە زیاد بکە
           دەتوانیت فایلێکی ناوخۆی `.mp4` ـیش بەکاربهێنیت */
        videoUrl: "",

        /* ئارەزوومەندانە:
           لینکێکی embed ی Google Maps زیاد بکە */
        mapUrl: "",

        /* ئەمە بگۆڕە:
           وەسفی درێژی نیشان‌دراو لە پەڕەی وردەکاریدا */
        longDescription: localize(
            "بەلەم سوارییەکە ڕێگەیەکی جوانە بۆ بینینی سروشت و ئاوەکانی نەوڕۆڵی لە ڕوانگەیەکی جیاواز. ئەم خزمەتگوزارییە بەتایبەتی بۆ ئەوانەی دڵیان بە گەڕان و وێنەگرتن دەکرێت، تاقیکردنەوەیەکی خۆش و هێمن پێشکەش دەکات.",
            "رحلة القارب طريقة جميلة لمشاهدة طبيعة نورولي ومياهها من منظور مختلف. هذه الخدمة تقدم تجربة هادئة وممتعة خصوصاً لمن يحبون الجولات والتصوير.",
            "Boat rides offer a beautiful way to experience Nawroli's nature and water from a different perspective. This is a calm and enjoyable activity, especially for visitors who like sightseeing and photography."
        ),

        /* ئەمە بگۆڕە:
           دەقی نرخ */
        price: pricePlaceholder,

        /* ئەمە بگۆڕە:
           ژمارەی تەلەفۆنی نیشان‌دراو */
        phone: "0750xxxxxxx",

        /* ئەمە بگۆڕە:
           ژمارەی WhatsApp
           فۆرمات: 9647XXXXXXXX */
        whatsapp: "9647500000000"
    },
    {
        id: "jet-ski",

        /* ئەمە بگۆڕە:
           ناوی جۆری خزمەتگوزاری */
        category: localize("چالاکیی خێرا", "نشاط سريع", "Fast Activity"),

        /* ئەمە بگۆڕە:
           ناوی خزمەتگوزاری */
        name: localize("جێتسکی", "جت سكي", "Jet Ski"),

        /* ئەمە بگۆڕە:
           وەسفی کورتی نیشان‌دراو لەسەر کارت */
        description: localize(
            "بۆ ئەوانەی حەزیان لە هیجانە، جێتسکی لەگەڵ دیمەنی ئاو و سروشت چالاکییەکی جوانی پێشکەش دەکات.",
            "للباحثين عن الحماس، يقدم الجت سكي تجربة جميلة مع مناظر الماء والطبيعة.",
            "For visitors who enjoy excitement, jet ski offers a fun experience with water and nature views."
        ),

        /* ئەمە بگۆڕە:
           ڕێگای وێنەی سەرەکی */
        image: "images/activity.jpg",

        /* ئەمە بگۆڕە:
           ناوی خاوەن */
        ownerName: ownerNamePlaceholder,

        /* ئارەزوومەندانە:
           دەقی ئەرکی خاوەن */
        ownerRole: ownerRolePlaceholder,

        /* ئەمە بگۆڕە:
           دەقی شوێن */
        locationText: nawroliLocation,

        /* ئارەزوومەندانە:
           دەقی کاتی کارکردن */
        workingHours: workingHoursPlaceholder,

        /* ئارەزوومەندانە:
           یاساکان لە پەڕەی وردەکاریدا */
        rules: [
            localize("پابەندبە یاساکانی سەلامەتی بە", "الالتزام بقواعد السلامة", "Follow safety rules"),
            localize("تەنها لە شوێنی دیاریکراو بەکاری بهێنە", "استخدمه فقط في المنطقة المخصصة", "Use only in the designated area"),
            localize("پێش دەستپێکردن ڕێنمایی وەربگرە", "استلم التعليمات قبل البدء", "Receive instructions before starting")
        ],

        /* ئارەزوومەندانە:
           تایبەتمەندییەکان لە پەڕەی وردەکاریدا */
        features: [
            localize("تجربەی خێرا و هیجانی", "تجربة سريعة ومليئة بالحماس", "Fast and exciting experience"),
            localize("گونجاو بۆ حەز لە چالاکی", "مناسب لمحبي الحركة", "Great for activity lovers"),
            localize("نزیک لە شوێنی وێنەگرتن", "قريب من أماكن التصوير", "Close to photo spots")
        ],

        /* ئەمە بگۆڕە:
           وێنەی زیاتر لێرە زیاد بکە */
        gallery: ["images/activity.jpg", "images/hero.jpg", "images/landscape.jpg"],

        /* ئارەزوومەندانە:
           لینکێکی ڤیدیۆی YouTube لێرە زیاد بکە
           دەتوانیت فایلێکی ناوخۆی `.mp4` ـیش بەکاربهێنیت */
        videoUrl: "",

        /* ئارەزوومەندانە:
           لینکێکی embed ی Google Maps زیاد بکە */
        mapUrl: "",

        /* ئەمە بگۆڕە:
           وەسفی درێژی نیشان‌دراو لە پەڕەی وردەکاریدا */
        longDescription: localize(
            "جێتسکی بۆ ئەو میوانانەیە کە بەدوای هیجان و جووڵەی زیاتردا دەگەڕێن. لەگەڵ هەوای خۆش و دیمەنی ئاو، ئەم خزمەتگوزارییە دەتوانێت بەشێکی بیرنەکراوەی گەشتەکەت بێت، بە تایبەتی بۆ لاوان و هاوڕێیان.",
            "الجت سكي مخصص للزوار الذين يبحثون عن الحماس والحركة. مع الهواء الجميل ومنظر الماء، يمكن أن يصبح هذا النشاط جزءاً لا ينسى من زيارتكم، خاصة للشباب والأصدقاء.",
            "Jet ski is for visitors looking for more excitement and movement. With the fresh air and water scenery, this activity can become a memorable part of the trip, especially for young people and friends."
        ),

        /* ئەمە بگۆڕە:
           دەقی نرخ */
        price: pricePlaceholder,

        /* ئەمە بگۆڕە:
           ژمارەی تەلەفۆنی نیشان‌دراو */
        phone: "0750xxxxxxx",

        /* ئەمە بگۆڕە:
           ژمارەی WhatsApp
           فۆرمات: 9647XXXXXXXX */
        whatsapp: "9647500000000"
    },
    {
        id: "food",

        /* ئەمە بگۆڕە:
           ناوی جۆری خزمەتگوزاری */
        category: localize("خواردن", "طعام", "Food"),

        /* ئەمە بگۆڕە:
           ناوی خزمەتگوزاری */
        name: localize("خواردن", "طعام", "Food"),

        /* ئەمە بگۆڕە:
           وەسفی کورتی نیشان‌دراو لەسەر کارت */
        description: localize(
            "هەڵبژاردەی خواردنی خێرایی و خێزانی بۆ تەواوکردنی گەشتێکی خۆش لە نزیک ڕووبار.",
            "خيارات طعام سريعة وعائلية لإكمال نزهة ممتعة قرب النهر.",
            "Fast and family-friendly food options to complete a pleasant visit near the river."
        ),

        /* ئەمە بگۆڕە:
           ڕێگای وێنەی سەرەکی */
        image: "images/nature.jpg",

        /* ئەمە بگۆڕە:
           ناوی خاوەن */
        ownerName: ownerNamePlaceholder,

        /* ئارەزوومەندانە:
           دەقی ئەرکی خاوەن */
        ownerRole: ownerRolePlaceholder,

        /* ئەمە بگۆڕە:
           دەقی شوێن */
        locationText: nawroliLocation,

        /* ئارەزوومەندانە:
           دەقی کاتی کارکردن */
        workingHours: workingHoursPlaceholder,

        /* ئارەزوومەندانە:
           یاساکان لە پەڕەی وردەکاریدا */
        rules: [
            localize("پاراستنی پاکوخاوێنی شوێنی خواردن", "الحفاظ على نظافة مكان الطعام", "Keep the dining area clean"),
            localize("داوا لەسەر کات ئەنجام بدە", "اطلب في الوقت المناسب", "Place orders on time"),
            localize("ڕێزمانی شوێنی هاوبەش بپارێزە", "احترم النظام في المكان المشترك", "Respect the shared space")
        ],

        /* ئارەزوومەندانە:
           تایبەتمەندییەکان لە پەڕەی وردەکاریدا */
        features: [
            localize("خواردنی خێرایی و خێزانی", "طعام سريع وعائلي", "Fast and family-friendly food"),
            localize("گونجاو بۆ کۆبوونەوەی خێزان", "مناسب لتجمعات العائلة", "Suitable for family gatherings"),
            localize("نزیک لە خزمەتگوزارییەکانی تر", "قريب من باقي الخدمات", "Close to other services")
        ],

        /* ئەمە بگۆڕە:
           وێنەی زیاتر لێرە زیاد بکە */
        gallery: ["images/nature.jpg", "images/activity.jpg", "images/hero.jpg"],

        /* ئارەزوومەندانە:
           لینکێکی ڤیدیۆی YouTube لێرە زیاد بکە
           دەتوانیت فایلێکی ناوخۆی `.mp4` ـیش بەکاربهێنیت */
        videoUrl: "",

        /* ئارەزوومەندانە:
           لینکێکی embed ی Google Maps زیاد بکە */
        mapUrl: "",

        /* ئەمە بگۆڕە:
           وەسفی درێژی نیشان‌دراو لە پەڕەی وردەکاریدا */
        longDescription: localize(
            "بەشی خواردن بۆ ئەوەیە گەشتیارەکان دوای گەڕان و چالاکی، شوێنێکی ئاسان بۆ پشوودان و خواردنیان هەبێت. ئەم خزمەتگوزارییە دەتوانێت بە هەڵبژاردەی خێرایی و خێزانی، گەشتەکە تەواوتر بکات.",
            "قسم الطعام يمنح الزوار مكاناً مناسباً للراحة وتناول الطعام بعد الجولة والأنشطة. مع الخيارات السريعة والعائلية، يصبح اليوم أكثر راحة وكمالاً.",
            "The food section gives visitors a convenient place to rest and eat after walking around and enjoying activities. With quick and family-friendly options, the trip feels more complete."
        ),

        /* ئەمە بگۆڕە:
           دەقی نرخ */
        price: pricePlaceholder,

        /* ئەمە بگۆڕە:
           ژمارەی تەلەفۆنی نیشان‌دراو */
        phone: "0750xxxxxxx",

        /* ئەمە بگۆڕە:
           ژمارەی WhatsApp
           فۆرمات: 9647XXXXXXXX */
        whatsapp: "9647500000000"
    },
    {
        id: "tea-drinks",

        /* ئەمە بگۆڕە:
           ناوی جۆری خزمەتگوزاری */
        category: localize("چا و خواردن", "شاي وطعام", "Tea and Food"),

        /* ئەمە بگۆڕە:
           ناوی خزمەتگوزاری */
        name: localize("کەپرەکانی هانە ژاڵە", "أكواخ هانة ژالة", "Hana Zhala Huts"),

        /* ئەمە بگۆڕە:
           وەسفی کورتی نیشان‌دراو لەسەر کارت */
        description: localize(
            "چا، قاوە، خواردن و خواردنەوەی سارد بۆ کاتی پشوودان و چێژوەرگرتن لە ژینگەی سروشتی.",
            "شاي وقهوة وطعام ومشروبات باردة لوقت الاستراحة والاستمتاع في الأجواء الطبيعية.",
            "Tea, coffee, food, and cold drinks for relaxing and enjoying the natural atmosphere."
        ),

        /* ئەمە بگۆڕە:
           ڕێگای وێنەی سەرەکی */
        image: "images/kapr A1.png",

        /* ئەمە بگۆڕە:
           ناوی خاوەن */
        ownerName: " لوقمان حمە عەزیز",

        /* ئارەزوومەندانە:
           دەقی ئەرکی خاوەن */
        ownerRole: ownerRolePlaceholder,

        /* ئەمە بگۆڕە:
           دەقی شوێن */
        locationText: "https://maps.app.goo.gl/ST1Guq2fiBFcDdny6",

        /* ئارەزوومەندانە:
           دەقی کاتی کارکردن */
        workingHours: workingHoursPlaceholder,

        /* ئارەزوومەندانە:
           یاساکان لە پەڕەی وردەکاریدا */
        rules: [
            localize("پاکوخاوێنی شوێنی دانیشتن بپارێزە", "حافظ على نظافة مكان الجلوس", "Keep the seating area clean"),
            localize("پێش داواکردن لە کاتی کارکردن دڵنیابەوە", "تأكد من وقت العمل قبل الطلب", "Check working hours before ordering"),
            localize("شوێن بۆ خێزانەکان ئارام بهێڵە", "اترك المكان هادئاً للعائلات", "Keep the place calm for families")
        ],

        /* ئارەزوومەندانە:
           تایبەتمەندییەکان لە پەڕەی وردەکاریدا */
        features: [
            localize("چا و خواردنی جۆراوجۆر", "شاي وطعام متنوع", "A variety of tea and food"),
            localize("شوێنی پشوودان", "مكان للراحة", "A place to relax"),
            localize("دیمەنی سروشتی بۆ دانیشتن", "منظر طبيعي للجلوس", "Natural views while sitting")
        ],

        /* ئەمە بگۆڕە:
           وێنەی زیاتر لێرە زیاد بکە */
        gallery: ["images/kapr A1.png", "images/landscape.jpg", "images/nature.jpg", "images/hero.jpg"],

        /* ئەمە بگۆڕە:
           لینکێکی ڤیدیۆی Facebook لێرە زیاد بکە */
        videoUrl: "https://www.facebook.com/share/v/1DuNP8cNDK/",

        /* ئەمە بگۆڕە:
           وێنەی preview ی ڤیدیۆ زیاد بکە */
        videoThumbnail: "images/kapr A1.png",

        /* ئارەزوومەندانە:
           لینکێکی embed ی Google Maps زیاد بکە */
        mapUrl: "https://www.google.com/maps?q=35.1221718,45.898197&z=18&output=embed",

        /* ئەمە بگۆڕە:
           وەسفی درێژی نیشان‌دراو لە پەڕەی وردەکاریدا */
        longDescription: localize(
            "ئەم بەشە بۆ کاتی پشوودان و دانیشتن لەگەڵ خێزان یان هاوڕێیان گونجاوە. لە کەپرەکانی هانە ژاڵە چا، قاوە، خواردن و خواردنەوەی سارد لە ژینگەی سروشتیی نەوڕۆڵی هەستێکی ئارام و خۆش بۆ میوان دروست دەکات.",
            "هذا القسم مناسب لوقت الراحة والجلوس مع العائلة أو الأصدقاء. في أكواخ هانة ژالة، الشاي والقهوة والطعام والمشروبات الباردة وسط طبيعة نورولي تعطي الزائر إحساساً بالهدوء والمتعة.",
            "This section is perfect for resting and sitting with family or friends. In Hana Zhala Huts, tea, coffee, food, and cold drinks in Nawroli's natural setting create a calm and enjoyable experience."
        ),

        /* ئەمە بگۆڕە:
           دەقی نرخ */
        price: pricePlaceholder,

        /* ئەمە بگۆڕە:
           ژمارەی تەلەفۆنی نیشان‌دراو */
        phone: "0750xxxxxxx",

        /* ئەمە بگۆڕە:
           ژمارەی WhatsApp
           فۆرمات: 9647XXXXXXXX */
        whatsapp: "9647500000000"
    }
];

/*
    داتاکە دەخرێتە سەر window بۆ ئەوەی app.js بتوانێت بە ئاسانی دەستی پێ بگات.
    ئەم شێوازە لە پرۆژەی vanilla JavaScript ـدا سادە و کارامەیە.
    لە داهاتوودا دەتوانرێت module system ی ڕاستەقینە، bundler، یان API layer بەکاربهێندرێت.
*/
window.services = services;
