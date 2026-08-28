/*
    ئەم فایلە logic ـی سەرەکی وێبسایتەکە بەڕێوەدەبات.
    ئەرکە سەرەکییەکانی:
    1. خزمەتگوزارییەکان لە داتا بخوێنێتەوە و کارت دروست بکات.
    2. کلیکی WhatsApp بە شێوەی داینامیکی بەڕێوەببات.
    3. smooth scrolling بۆ navigation و CTA ـەکان کارا بکات.
    4. lazy loading و animation ـی سووک بۆ وێنە و بەشەکان پشتیوانی بکات.
    لە داهاتوودا دەتوانرێت هەمان فایل یان module ـەکانی جیاواز، booking system، API requests، و admin actions پێوە بگرێت.
*/

/*
    placeholder ی خاوێن بۆ وێنە lazy-loaded ـەکان.
    هۆکاری بوونی ئەوەیە پێش دابەزینی وێنەی قورس، قەبارەی box بپارێزرێت و layout نەشکێت.
    لە داهاتوودا دەتوانرێت blur placeholder ی ڕاستەقینە یان dominant color placeholder بۆی بەکاربهێندرێت.
*/
const IMAGE_PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23dbece8'/%3E%3C/svg%3E";

/*
    ئەم بەشە سیستەمی سادەی زمانەکەیە کە بە localStorage کار دەکات.
    هۆکاری بوونی ئەوەیە وێبسایتەکە هێشتا سووک بمێنێتەوە، هەر خزمەتگوزارییەک ژمارەی WhatsApp ی تایبەتی خۆی هەبێت، و هەمان کۆد لە homepage و service-details page بەکاربهێندرێت.
    لە داهاتوودا دەتوانرێت ئەم شێوازە بگۆڕدرێت بۆ i18n ی بەهێزتر، Google Sheet، یان admin dashboard، بەڵام ئێستا تەنها بنەمایەکی سادە و خێرا پێشکەش دەکات.
*/
const supportedLanguages = ["ku", "ar", "en"];
const savedLanguage = localStorage.getItem("siteLanguage");
let currentLanguage = supportedLanguages.includes(savedLanguage) ? savedLanguage : "ku";

const translations = {
    ku: {
        metaDescriptionHome: "گەشتی نەوڕۆڵی - وێبسایتێکی مۆدێرن بۆ ناساندنی شوێنی گەشتیاری نەوڕۆڵی لە هەڵەبجە و خزمەتگوزارییەکانی.",
        metaDescriptionDetails: "وردەکاریی خزمەتگوزارییەکانی نەوڕۆڵی بۆ گەشتیاران و خێزانەکان.",
        pageTitleHome: "گەشتی نەوڕۆڵی – Visit Nawroli",
        pageTitleDetails: "وردەکاری خزمەتگوزاری – Visit Nawroli",
        pageTitleNotFound: "خزمەتگوزاری نەدۆزرایەوە – Visit Nawroli",
        brandTitle: "گەشتی نەوڕۆڵی",
        brandSubtitle: "Visit Nawroli",
        languageSwitchAria: "هەڵبژاردنی زمان",
        navMainAria: "ڕێنمایی سەرەکی",
        navAbout: "دەربارە",
        navServices: "خزمەتگوزارییەکان",
        navWhyVisit: "بۆچی نەوڕۆڵی",
        navGallery: "گەلەری",
        navMap: "نەخشە",
        navContact: "پەیوەندی",
        heroKicker: "هەڵەبجە • هەرێمی کوردستان • عێراق",
        heroTitle: "گەشتی نەوڕۆڵی – Visit Nawroli",
        heroSubtitle: "شوێنێکی سروشتی و ئارام بۆ خێزان و گەشتیاران",
        heroDescription: "نەوڕۆڵی بە دیمەنە سروشتییەکان، ڕوانگەی ڕووبار، خانووەکانی ناو ئاو، بەلەم، جێتسکی و کەشوهەوای خۆشەوە ناسراوە.",
        heroButtonServices: "بینینی خزمەتگوزارییەکان",
        heroButtonGallery: "بینینی گەلەری",
        heroHighlightsAria: "خاڵە گرنگەکانی نەوڕۆڵی",
        heroHighlightFamily: "خێزان-دۆست",
        heroHighlightWater: "چالاکییەکانی ناو ئاو",
        heroHighlightPicnic: "شوێنی پیکنیک و حەسانەوە",
        aboutLabel: "دەربارەی نەوڕۆڵی",
        aboutTitle: "شوێنێک بۆ هەناسەدان، پیکنیک و ئارامبوونەوە",
        aboutText: "ناوچەی هەڵەبجە و دەوروبەری سروشتییەکانی هەموو ساڵێک هەزاران گەشتیار ڕادەکێشن، چونکە دیمەنە سەوزەکان و شوێنەکانی پشوودان هەستێکی تایبەتیان هەیە.",
        aboutCardNatureTitle: "سروشت و ئارامی",
        aboutCardNatureText: "نەوڕۆڵی ناوچەیەکی گەشتیاری سروشتییە و بە ڕووبار، سەکوو و شوێنەکانی دانیشتن، خانووی سەر ئاو و هەوای ئارامەکەی ناسراوە. ئەو جێگایە بۆ خێزان، هاوڕێیان، و هەر کەسێک کە بەدوای ئارامی و دیمەنی جوان دەگەڕێت گونجاوە.",
        aboutCardRiverTitle: "ڕووبار و ژیان لە دەوری ئاو",
        aboutCardRiverText: "ڕوانگەی ڕووبار و هێمنیی ناوچەکە هەستێکی پشوودان دروست دەکات. لە هەمان کاتدا، بەلەم، جێتسکی و شوێنەکانی خواردن دەکرێن ببن بە بەشێکی تەواوکاری سەردانێکی خۆش.",
        servicesLabel: "خزمەتگوزارییەکان",
        servicesTitle: "هەموو شتێک بۆ گەشتێکی خۆش لە نەوڕۆڵی",
        servicesText: "کارتەکانی خوارەوە بە JavaScript و لەسەر بنەمای داتای data.js دروست دەبن، بۆیە دواتر زیادکردن، گۆڕین یان ژمارەی زۆرتری خزمەتگوزاری زۆر ئاسان دەبێت.",
        servicesNoScript: "بۆ بینینی خزمەتگوزارییە داینامیکییەکان، پێویستە JavaScript چالاک بێت.",
        whyLabel: "بۆچی نەوڕۆڵی",
        whyTitle: "هۆکارەکان بۆ گەشتکردن بۆ ئەم ناوچەیە",
        whyNatureTitle: "سروشتی جوان",
        whyNatureText: "شاخ، سەوزایی و ڕوانگەی ئاو لە شوێنێکی یەکجا و هەستبەخش.",
        whyFamilyTitle: "گونجاو بۆ خێزان",
        whyFamilyText: "شوێنی دانیشتن، پیکنیک و کەشێکی ئارام بۆ هەموو تەمەنەکان.",
        whyRiverTitle: "چالاکییەکانی ڕووبار",
        whyRiverText: "بەلەم، جێتسکی و کاتی خۆش لەسەر ئاو بۆ ئەوانەی حەزی لە جووڵەیە.",
        whyCalmTitle: "ژینگەی ئارام",
        whyCalmText: "شوێنێک بۆ مانەوە، وێنەگرتن و دوورکەوتنەوەی کاتی لە شلوغی شار.",
        galleryLabel: "گەلەری",
        galleryTitle: "چەند دیمەنێک لە جوانی نەوڕۆڵی",
        galleryText: "کرتە لەسەر هەر وێنەیەک بکە بۆ بینین بە قەبارەی گەورەتر.",
        galleryHeroTitle: "دیمەنی سەرەکیی نەوڕۆڵی",
        galleryNatureTitle: "شاخ و ئاو و سروشتی ئارام",
        galleryLandscapeTitle: "سەوزایی و ڕێگاکانی ناوچەکە",
        galleryActivityTitle: "کۆبوونەوەی خێزان و گەشتیاران",
        mapLabel: "نەخشە",
        mapTitle: "شوێنی نەوڕۆڵی لەسەر نەخشە",
        mapText: "ئەم iframe ـە وەک شوێن-دانەرێکی سەرەتایی بەکارهاتووە و دەتوانرێت دواتر بە لینک یان embed ـی وردتر بگۆڕدرێت.",
        mapIframeTitle: "شوێنی نەوڕۆڵی لەسەر Google Maps",
        contactLabel: "پەیوەندی",
        contactTitle: "ئامادەین بۆ وەڵامدانەوەی پرسیارەکانت",
        contactText: "ئەگەر دەتەوێت زانیاری زیاتر وەربگریت یان پێشتر داوا بۆ شوێن و خزمەتگوزارییەکان بکەیت، ئەمانە ڕێگاکانی پەیوەندین.",
        contactPhoneTitle: "تەلەفۆن",
        contactPhoneText: "ژمارەیەکی جێگرەوەیە و دەتوانرێت لە داهاتوودا بە ژمارەی ڕاستەقینە بگۆڕدرێت.",
        contactWhatsappTitle: "WhatsApp",
        contactWhatsappButton: "پەیوەندی لە WhatsApp",
        contactWhatsappText: "ئەم دوگمەیە ڕێگایەکی خێرا و ئاسانە بۆ داواکردنی زانیاری و رزێرڤی سەرەتایی.",
        contactSocialTitle: "سۆشیال میدیا",
        socialFacebook: "Facebook",
        socialInstagram: "Instagram",
        socialTikTok: "TikTok",
        contactSocialText: "ئەم لینکەکان placeholder ـن و دواتر دەتوانرێت بە هەژمارە ڕاستەقینەکانی brand ـەکە پڕ بکرێنەوە.",
        lightboxCloseLabel: "داخستنی وێنە",
        footerBackTop: "گەڕانەوە بۆ سەرەوە",
        detailsNavAria: "گەڕانەوە بۆ سەرەتا",
        detailBackHome: "گەڕانەوە بۆ سەرەتا",
        detailBackServices: "گەڕانەوە بۆ خزمەتگوزارییەکان",
        detailsLoadingTitle: "وردەکاری خزمەتگوزاری بار دەکرێت",
        detailsLoadingText: "تکایە چاوەڕێ بکە تا زانیاریی خزمەتگوزارییەکە لە data.js بخوێندرێتەوە.",
        detailsNoScript: "بۆ بینینی وردەکارییە داینامیکییەکان، پێویستە JavaScript چالاک بێت.",
        serviceEmptyTitle: "خزمەتگوزارییەکان بە زووی زیاد دەکرێن",
        serviceEmptyText: "ئێستا داتای نیشاندان ئامادە نییە. دەتوانرێت دواتر لە داتا یان API ـەوە پڕ بکرێتەوە.",
        servicePriceLabel: "نرخ",
        serviceOwnerPhoneLabel: "ژمارەی خاوەن",
        serviceDetailsButton: "بینینی وردەکاری",
        serviceWhatsappButton: "رزێرڤ لە WhatsApp",
        quickBookingDefaultMessage: "سڵاو، دەمەوێت زانیاری زیاتر دەربارەی {service} و رزێرڤکردنی وەربگرم.",
        quickBookingUnavailable: "ژمارەی WhatsApp ئامادە نییە.",
        genericService: "خزمەتگوزاری",
        lightboxFallbackTitle: "وێنەی نەوڕۆڵی",
        detailMoreInfoSoon: "زانیاریی زیاتر بە زووی زیاد دەکرێت.",
        detailGalleryImageLabel: "وێنەی",
        detailNotFoundTitle: "ئەم خزمەتگوزارییە نەدۆزرایەوە",
        detailNotFoundText: "تکایە بگەڕێوە بۆ پەڕەی سەرەکی و خزمەتگوزارییەکان دووبارە هەڵبژێرە.",
        detailAboutService: "دەربارەی خزمەتگوزارییەکە",
        detailSmallGallery: "گەلەریی بچووک",
        detailVideo: "ڤیدیۆ",
        detailMap: "نەخشە",
        detailMainInfo: "زانیاریی سەرەکی",
        detailHoursLabel: "کاتی کارکردن",
        detailLocationLabel: "شوێن",
        detailPhoneLabel: "ژمارەی پەیوەندی",
        detailOwnerInfo: "زانیاریی خاوەن",
        detailOwnerNameLabel: "ناوی خاوەن",
        detailOwnerRoleLabel: "ئەرک",
        detailFeatures: "تایبەتمەندییەکان",
        detailRules: "یاسا و ڕێنمایی",
        detailBookingForm: "فۆرمی رزێرڤ",
        detailFormFullName: "ناوی تەواو",
        detailFormPhone: "ژمارەی مۆبایل",
        detailFormVisitDate: "بەرواری سەردان",
        detailFormVisitTime: "کاتی سەردان",
        detailFormGuestsCount: "ژمارەی کەسەکان",
        detailFormNote: "تێبینی",
        detailFormNotePlaceholder: "ئەگەر تێبینییەکی تایبەتت هەیە لێرە بینووسە.",
        detailFormSubmit: "ناردنی داواکاری بۆ WhatsApp",
        detailVideoPlaceholder: "ڤیدیۆ بە زووی زیاد دەکرێت",
        detailMapPlaceholder: "شوێنی ورد بە زووی زیاد دەکرێت",
        detailWhatsappMissing: "ژمارەی WhatsApp ی ئەم خزمەتگوزارییە ئامادە نییە.",
        detailStatusRequired: "تکایە هەموو خانە پێویستەکان پڕ بکە.",
        detailStatusSuccess: "WhatsApp بۆ خاوەنی خزمەتگوزاری کرایەوە.",
        detailStatusNotFound: "ئەم خزمەتگوزارییە نەدۆزرایەوە.",
        bookingIntro: "سڵاو، داواکاری رزێرڤکردن هەیە.",
        bookingLabelService: "خزمەتگوزاری",
        bookingLabelName: "ناو",
        bookingLabelPhone: "ژمارە",
        bookingLabelDate: "بەروار",
        bookingLabelTime: "کات",
        bookingLabelGuests: "ژمارەی کەسەکان",
        bookingLabelNote: "تێبینی",
        contactWhatsappMessage: "سڵاو، دەمەوێت زانیاری زیاتر دەربارەی نەوڕۆڵی و خزمەتگوزارییەکانی وەربگرم."
    },
    ar: {
        metaDescriptionHome: "زوروا نورولي - موقع حديث للتعريف بالمنطقة السياحية في نورولي داخل حلبجة وخدماتها.",
        metaDescriptionDetails: "تفاصيل خدمات نورولي للزوار والعائلات.",
        pageTitleHome: "زوروا نورولي – Visit Nawroli",
        pageTitleDetails: "تفاصيل الخدمة – Visit Nawroli",
        pageTitleNotFound: "الخدمة غير موجودة – Visit Nawroli",
        brandTitle: "سياحة نورولي",
        brandSubtitle: "Visit Nawroli",
        languageSwitchAria: "اختيار اللغة",
        navMainAria: "التنقل الرئيسي",
        navAbout: "حول نورولي",
        navServices: "الخدمات",
        navWhyVisit: "لماذا نورولي",
        navGallery: "المعرض",
        navMap: "الخريطة",
        navContact: "اتصال",
        heroKicker: "حلبجة • إقليم كردستان • العراق",
        heroTitle: "زوروا نورولي – Visit Nawroli",
        heroSubtitle: "مكان طبيعي وهادئ للعائلات والزوار",
        heroDescription: "تشتهر نورولي بمناظرها الطبيعية، وإطلالة النهر، وبيوت الماء، والقوارب، والجت سكي، والأجواء الجميلة.",
        heroButtonServices: "عرض الخدمات",
        heroButtonGallery: "عرض المعرض",
        heroHighlightsAria: "أبرز مزايا نورولي",
        heroHighlightFamily: "مناسبة للعائلات",
        heroHighlightWater: "نشاطات مائية",
        heroHighlightPicnic: "مكان للنزهة والاستراحة",
        aboutLabel: "حول نورولي",
        aboutTitle: "مكان للتنفس والنزهة والهدوء",
        aboutText: "تجذب منطقة حلبجة وطبيعتها آلاف الزوار كل عام، لأن المناظر الخضراء وأماكن الراحة فيها تمنح شعوراً خاصاً.",
        aboutCardNatureTitle: "الطبيعة والهدوء",
        aboutCardNatureText: "نورولي منطقة سياحية طبيعية مع النهر والجلسات وبيوت الماء والهواء الهادئ. وهي مناسبة للعائلات والأصدقاء وكل من يبحث عن الهدوء والمناظر الجميلة.",
        aboutCardRiverTitle: "النهر والحياة حول الماء",
        aboutCardRiverText: "إطلالة النهر وهدوء المنطقة يمنحان الزائر إحساساً بالراحة. وفي الوقت نفسه، القوارب والجت سكي وأماكن الطعام تكمل زيارة ممتعة.",
        servicesLabel: "الخدمات",
        servicesTitle: "كل ما تحتاجه لزيارة جميلة في نورولي",
        servicesText: "يتم إنشاء البطاقات التالية عبر JavaScript بالاعتماد على بيانات data.js، لذلك ستكون إضافة الخدمات أو تعديلها لاحقاً سهلة جداً.",
        servicesNoScript: "لعرض الخدمات الديناميكية، يجب تفعيل JavaScript.",
        whyLabel: "لماذا نورولي",
        whyTitle: "أسباب زيارة هذه المنطقة",
        whyNatureTitle: "طبيعة جميلة",
        whyNatureText: "جبال وخضرة وإطلالة ماء في مكان واحد.",
        whyFamilyTitle: "مناسب للعائلات",
        whyFamilyText: "أماكن جلوس ونزهة وأجواء هادئة لكل الأعمار.",
        whyRiverTitle: "نشاطات النهر",
        whyRiverText: "قوارب وجت سكي ووقت ممتع على الماء لمحبي الحركة.",
        whyCalmTitle: "أجواء هادئة",
        whyCalmText: "مكان للإقامة والتصوير والابتعاد عن ازدحام المدينة.",
        galleryLabel: "المعرض",
        galleryTitle: "بعض مشاهد جمال نورولي",
        galleryText: "اضغط على أي صورة لرؤيتها بحجم أكبر.",
        galleryHeroTitle: "المشهد الرئيسي لنورولي",
        galleryNatureTitle: "الجبال والماء والطبيعة الهادئة",
        galleryLandscapeTitle: "الخضرة وطرق المنطقة",
        galleryActivityTitle: "تجمع العائلات والزوار",
        mapLabel: "الخريطة",
        mapTitle: "موقع نورولي على الخريطة",
        mapText: "هذا الإطار يستخدم كعنصر مبدئي ويمكن استبداله لاحقاً برابط أو تضمين أدق.",
        mapIframeTitle: "موقع نورولي على خرائط Google",
        contactLabel: "اتصال",
        contactTitle: "نحن جاهزون للرد على أسئلتك",
        contactText: "إذا كنت تريد معلومات أكثر أو ترغب بالحجز المسبق، فهذه هي طرق التواصل.",
        contactPhoneTitle: "الهاتف",
        contactPhoneText: "هذا الرقم مؤقت ويمكن استبداله لاحقاً برقم حقيقي.",
        contactWhatsappTitle: "WhatsApp",
        contactWhatsappButton: "التواصل عبر WhatsApp",
        contactWhatsappText: "هذا الزر طريقة سريعة وسهلة لطلب المعلومات والحجز المبدئي.",
        contactSocialTitle: "وسائل التواصل",
        socialFacebook: "Facebook",
        socialInstagram: "Instagram",
        socialTikTok: "TikTok",
        contactSocialText: "هذه الروابط مؤقتة ويمكن تعبئتها لاحقاً بالحسابات الحقيقية للعلامة.",
        lightboxCloseLabel: "إغلاق الصورة",
        footerBackTop: "العودة إلى الأعلى",
        detailsNavAria: "العودة إلى الصفحة الرئيسية",
        detailBackHome: "العودة إلى الصفحة الرئيسية",
        detailBackServices: "العودة إلى الخدمات",
        detailsLoadingTitle: "يتم تحميل تفاصيل الخدمة",
        detailsLoadingText: "يرجى الانتظار حتى يتم قراءة معلومات الخدمة من data.js.",
        detailsNoScript: "لعرض تفاصيل الخدمة الديناميكية، يجب تفعيل JavaScript.",
        serviceEmptyTitle: "ستتم إضافة الخدمات قريباً",
        serviceEmptyText: "بيانات العرض غير جاهزة الآن. يمكن تعبئتها لاحقاً من البيانات أو API.",
        servicePriceLabel: "السعر",
        serviceOwnerPhoneLabel: "رقم المالك",
        serviceDetailsButton: "عرض التفاصيل",
        serviceWhatsappButton: "الحجز عبر WhatsApp",
        quickBookingDefaultMessage: "مرحباً، أريد معلومات أكثر عن {service} وإمكانية الحجز.",
        quickBookingUnavailable: "رقم WhatsApp غير متوفر.",
        genericService: "الخدمة",
        lightboxFallbackTitle: "صورة من نورولي",
        detailMoreInfoSoon: "ستتم إضافة معلومات أكثر قريباً.",
        detailGalleryImageLabel: "صورة",
        detailNotFoundTitle: "هذه الخدمة غير موجودة",
        detailNotFoundText: "يرجى العودة إلى الصفحة الرئيسية واختيار الخدمة مرة أخرى.",
        detailAboutService: "حول هذه الخدمة",
        detailSmallGallery: "معرض صغير",
        detailVideo: "الفيديو",
        detailMap: "الخريطة",
        detailMainInfo: "المعلومات الرئيسية",
        detailHoursLabel: "ساعات العمل",
        detailLocationLabel: "الموقع",
        detailPhoneLabel: "رقم التواصل",
        detailOwnerInfo: "معلومات المالك",
        detailOwnerNameLabel: "اسم المالك",
        detailOwnerRoleLabel: "الدور",
        detailFeatures: "المميزات",
        detailRules: "القواعد والإرشادات",
        detailBookingForm: "نموذج الحجز",
        detailFormFullName: "الاسم الكامل",
        detailFormPhone: "رقم الهاتف",
        detailFormVisitDate: "تاريخ الزيارة",
        detailFormVisitTime: "وقت الزيارة",
        detailFormGuestsCount: "عدد الأشخاص",
        detailFormNote: "ملاحظة",
        detailFormNotePlaceholder: "إذا كانت لديك ملاحظة خاصة فاكتبها هنا.",
        detailFormSubmit: "إرسال الطلب إلى WhatsApp",
        detailVideoPlaceholder: "سيتم إضافة الفيديو قريباً",
        detailMapPlaceholder: "سيتم إضافة الموقع الدقيق قريباً",
        detailWhatsappMissing: "رقم WhatsApp لهذه الخدمة غير متوفر.",
        detailStatusRequired: "يرجى ملء جميع الحقول المطلوبة.",
        detailStatusSuccess: "تم فتح WhatsApp لصاحب الخدمة.",
        detailStatusNotFound: "هذه الخدمة غير موجودة.",
        bookingIntro: "مرحباً، لدي طلب حجز.",
        bookingLabelService: "الخدمة",
        bookingLabelName: "الاسم",
        bookingLabelPhone: "الرقم",
        bookingLabelDate: "التاريخ",
        bookingLabelTime: "الوقت",
        bookingLabelGuests: "عدد الأشخاص",
        bookingLabelNote: "ملاحظة",
        contactWhatsappMessage: "مرحباً، أريد معلومات أكثر عن نورولي وخدماتها."
    },
    en: {
        metaDescriptionHome: "Visit Nawroli - a modern website introducing the Nawroli tourism area in Halabja and its services.",
        metaDescriptionDetails: "Detailed Nawroli service information for visitors and families.",
        pageTitleHome: "Visit Nawroli",
        pageTitleDetails: "Service Details – Visit Nawroli",
        pageTitleNotFound: "Service Not Found – Visit Nawroli",
        brandTitle: "Visit Nawroli",
        brandSubtitle: "Nawroli Tourism",
        languageSwitchAria: "Choose language",
        navMainAria: "Main navigation",
        navAbout: "About",
        navServices: "Services",
        navWhyVisit: "Why Nawroli",
        navGallery: "Gallery",
        navMap: "Map",
        navContact: "Contact",
        heroKicker: "Halabja • Kurdistan Region • Iraq",
        heroTitle: "Visit Nawroli",
        heroSubtitle: "A peaceful natural destination for families and travelers",
        heroDescription: "Nawroli is known for its natural scenery, river views, water houses, boats, jet ski, and relaxing atmosphere.",
        heroButtonServices: "View Services",
        heroButtonGallery: "View Gallery",
        heroHighlightsAria: "Nawroli highlights",
        heroHighlightFamily: "Family friendly",
        heroHighlightWater: "Water activities",
        heroHighlightPicnic: "Picnic and relaxation spot",
        aboutLabel: "About Nawroli",
        aboutTitle: "A place to breathe, picnic, and unwind",
        aboutText: "The Halabja area and its surrounding nature attract thousands of visitors every year because of the green scenery and relaxing spaces.",
        aboutCardNatureTitle: "Nature and calm",
        aboutCardNatureText: "Nawroli is a natural tourism area known for its river, seating areas, water houses, and peaceful air. It suits families, friends, and anyone looking for calm and beautiful views.",
        aboutCardRiverTitle: "River life and water views",
        aboutCardRiverText: "The river view and the quiet atmosphere create a strong sense of rest. At the same time, boats, jet ski, and food spots complete a pleasant visit.",
        servicesLabel: "Services",
        servicesTitle: "Everything you need for a beautiful Nawroli visit",
        servicesText: "The cards below are generated with JavaScript from data.js, making future edits and service additions very easy.",
        servicesNoScript: "JavaScript needs to be enabled to view the dynamic services.",
        whyLabel: "Why Nawroli",
        whyTitle: "Why this area is worth visiting",
        whyNatureTitle: "Beautiful nature",
        whyNatureText: "Mountains, greenery, and water views all in one place.",
        whyFamilyTitle: "Family friendly",
        whyFamilyText: "Seating, picnics, and a calm atmosphere for all ages.",
        whyRiverTitle: "River activities",
        whyRiverText: "Boats, jet ski, and fun moments on the water for active visitors.",
        whyCalmTitle: "Peaceful environment",
        whyCalmText: "A place to stay, take photos, and step away from city noise.",
        galleryLabel: "Gallery",
        galleryTitle: "A few views of Nawroli's beauty",
        galleryText: "Click any image to view it in a larger size.",
        galleryHeroTitle: "Nawroli main view",
        galleryNatureTitle: "Mountains, water, and peaceful nature",
        galleryLandscapeTitle: "Greenery and local roads",
        galleryActivityTitle: "Families and visitors gathering",
        mapLabel: "Map",
        mapTitle: "Nawroli on the map",
        mapText: "This iframe is used as a simple placeholder and can be replaced later with a more accurate link or embed.",
        mapIframeTitle: "Nawroli on Google Maps",
        contactLabel: "Contact",
        contactTitle: "We are ready to answer your questions",
        contactText: "If you want more information or would like to book in advance, these are the available contact methods.",
        contactPhoneTitle: "Phone",
        contactPhoneText: "This is a placeholder number and can be replaced later with a real one.",
        contactWhatsappTitle: "WhatsApp",
        contactWhatsappButton: "Contact on WhatsApp",
        contactWhatsappText: "This button is a quick and easy way to ask for information and make an initial booking request.",
        contactSocialTitle: "Social Media",
        socialFacebook: "Facebook",
        socialInstagram: "Instagram",
        socialTikTok: "TikTok",
        contactSocialText: "These links are placeholders and can later be filled with the brand's real accounts.",
        lightboxCloseLabel: "Close image",
        footerBackTop: "Back to top",
        detailsNavAria: "Back to home",
        detailBackHome: "Back to home",
        detailBackServices: "Back to services",
        detailsLoadingTitle: "Loading service details",
        detailsLoadingText: "Please wait while the service information is loaded from data.js.",
        detailsNoScript: "JavaScript needs to be enabled to view dynamic service details.",
        serviceEmptyTitle: "Services will be added soon",
        serviceEmptyText: "Display data is not ready yet. It can be filled later from data or an API.",
        servicePriceLabel: "Price",
        serviceOwnerPhoneLabel: "Owner phone",
        serviceDetailsButton: "View Details",
        serviceWhatsappButton: "Book on WhatsApp",
        quickBookingDefaultMessage: "Hello, I would like more information about {service} and its booking options.",
        quickBookingUnavailable: "WhatsApp number is not available.",
        genericService: "service",
        lightboxFallbackTitle: "Nawroli image",
        detailMoreInfoSoon: "More information will be added soon.",
        detailGalleryImageLabel: "Image",
        detailNotFoundTitle: "This service was not found",
        detailNotFoundText: "Please go back to the main page and choose a service again.",
        detailAboutService: "About this service",
        detailSmallGallery: "Small gallery",
        detailVideo: "Video",
        detailMap: "Map",
        detailMainInfo: "Main information",
        detailHoursLabel: "Working hours",
        detailLocationLabel: "Location",
        detailPhoneLabel: "Contact number",
        detailOwnerInfo: "Owner information",
        detailOwnerNameLabel: "Owner name",
        detailOwnerRoleLabel: "Role",
        detailFeatures: "Features",
        detailRules: "Rules and guidelines",
        detailBookingForm: "Booking form",
        detailFormFullName: "Full name",
        detailFormPhone: "Phone number",
        detailFormVisitDate: "Visit date",
        detailFormVisitTime: "Visit time",
        detailFormGuestsCount: "Guests count",
        detailFormNote: "Note",
        detailFormNotePlaceholder: "If you have a special note, write it here.",
        detailFormSubmit: "Send Request to WhatsApp",
        detailVideoPlaceholder: "Video will be added soon",
        detailMapPlaceholder: "Exact location will be added soon",
        detailWhatsappMissing: "This service does not have an available WhatsApp number.",
        detailStatusRequired: "Please fill in all required fields.",
        detailStatusSuccess: "WhatsApp was opened for the service owner.",
        detailStatusNotFound: "This service was not found.",
        bookingIntro: "Hello, I have a booking request.",
        bookingLabelService: "Service",
        bookingLabelName: "Name",
        bookingLabelPhone: "Phone",
        bookingLabelDate: "Date",
        bookingLabelTime: "Time",
        bookingLabelGuests: "Guests Count",
        bookingLabelNote: "Note",
        contactWhatsappMessage: "Hello, I would like more information about Nawroli and its services."
    }
};

function t(value) {
    if (typeof value === "string") {
        return value;
    }

    if (!value || typeof value !== "object") {
        return "";
    }

    return value[currentLanguage] || value.ku || "";
}

function ui(key) {
    return translations[currentLanguage]?.[key] || translations.ku?.[key] || "";
}

function getCurrentDirection() {
    return currentLanguage === "en" ? "ltr" : "rtl";
}

/*
    ئەم helper ـانە localStorage ـەکە هەڵدەسەنگێنن و ناوەڕۆکی static HTML بە شێوەیەکی خاوێن وەرگێڕن.
    هۆکاری بوونیان ئەوەیە homepage و details page هەردووکیان بە هەمان بنەما و بەبێ framework ی قورس کار بکەن.
    لە داهاتوودا دەتوانرێت ئەم شێوازە بگۆڕدرێت بۆ router ی i18n، server-side rendering، یان translation files ی جیاواز.
*/
function applyLanguageToDocument() {
    const direction = getCurrentDirection();
    const metaDescription = document.querySelector('meta[name="description"]');

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = direction;

    if (document.body) {
        document.body.dir = direction;
    }

    if (metaDescription) {
        metaDescription.setAttribute(
            "content",
            ui(document.getElementById("serviceDetailsRoot") ? "metaDescriptionDetails" : "metaDescriptionHome")
        );
    }

    document.title = ui(document.getElementById("serviceDetailsRoot") ? "pageTitleDetails" : "pageTitleHome");
}

function applyTranslationsToMarkedElements() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = ui(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        element.setAttribute("aria-label", ui(element.dataset.i18nAriaLabel));
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        element.setAttribute("placeholder", ui(element.dataset.i18nPlaceholder));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        element.setAttribute("alt", ui(element.dataset.i18nAlt));
    });

    document.querySelectorAll("[data-i18n-data-title]").forEach((element) => {
        element.dataset.title = ui(element.dataset.i18nDataTitle);
    });

    document.querySelectorAll("[data-i18n-title-attr]").forEach((element) => {
        element.setAttribute("title", ui(element.dataset.i18nTitleAttr));
    });

    document.querySelectorAll(".language-button[data-language]").forEach((button) => {
        const isActive = button.dataset.language === currentLanguage;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    const contactWhatsappButton = document.querySelector("#contact .button.button-primary.full-width");

    if (contactWhatsappButton) {
        contactWhatsappButton.setAttribute(
            "href",
            createWhatsAppBookingUrl("Visit Nawroli", "9647500000000", ui("contactWhatsappMessage"))
        );
    }
}

function setupLanguageSwitch() {
    const languageButtons = document.querySelectorAll(".language-button[data-language]");

    if (languageButtons.length === 0) {
        return;
    }

    languageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedLanguage = button.dataset.language || "ku";

            if (!supportedLanguages.includes(selectedLanguage)) {
                return;
            }

            currentLanguage = selectedLanguage;
            localStorage.setItem("siteLanguage", selectedLanguage);

            applyLanguageToDocument();
            applyTranslationsToMarkedElements();

            renderServiceCards();
            renderServiceDetailsPage();

            setupServiceActions();
            setupServiceBookingForm();
            setupLazyLoading();
            setupRevealAnimations();
            setupGalleryLightbox();
        });
    });
}

/*
    ئەم helper ـە ژمارەی مۆبایل بۆ لینکێکی tel پاک دەکات.
    چونکە ناوی ژمارەکانی placeholder هەندێکجار هێما یان بۆشاییان تێدایە، پێویستە بۆ لینک سادە بکرێنەوە.
    لە داهاتوودا دەتوانرێت validation ی باشتر بۆ جۆری ژمارە و country code بۆی زیاد بکرێت.
*/
function normalizePhoneForLink(phoneNumber) {
    const safePhoneNumber = typeof phoneNumber === "string" ? phoneNumber : "";
    const cleanNumber = safePhoneNumber.replace(/[^\d+]/g, "");

    if (!cleanNumber) {
        return "";
    }

    return cleanNumber.startsWith("+") ? cleanNumber : `+${cleanNumber}`;
}

/*
    ئەم helper ـە لینکێکی ئامادەی WhatsApp دروست دەکات بۆ هەر خزمەتگوزارییەک.
    هۆکاری بوونی ئەوەیە هەمان منطق لە کارتەکان و پەڕەی وردەکاری بە یەک شێوە بەکاربهێندرێت و دووبارەکاری کۆد کەم بکرێتەوە.
    لە داهاتوودا دەتوانرێت ناوی بەکارهێنەر، بەروار، یان ژمارەی میوانانیش بە پەیامەکەوە زیاد بکرێت.
*/
function createWhatsAppBookingUrl(serviceName, whatsappNumber, customMessage = "") {
    const safeWhatsappNumber = typeof whatsappNumber === "string" ? whatsappNumber : "";
    const cleanNumber = safeWhatsappNumber.replace(/\D/g, "");
    const localizedServiceName = t(serviceName) || ui("genericService");

    if (!cleanNumber) {
        return "";
    }

    const message =
        customMessage || ui("quickBookingDefaultMessage").replace("{service}", localizedServiceName);
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/*
    ئەم helper ـانە لیستی خزمەتگوزارییەکان و خزمەتگوزارییەکی دیاریکراو دەستنیشان دەکەن.
    بوونیان گرنگە چونکە homepage و service details page هەردووکیان بە هەمان data.js پشت دەبەستن و پێویستە لە شوێنێکی یەکگرتوو بخوێندرێنەوە.
    لە داهاتوودا ئەگەر داتاکە لە API یان database بێت، هەر لێرە دەتوانرێت منطقەکە بگۆڕدرێت بەبێ شکاندنی UI.
*/
function getServiceList() {
    return Array.isArray(window.services) ? window.services : [];
}

function getServiceById(serviceId) {
    if (!serviceId) {
        return null;
    }

    return getServiceList().find((service) => service.id === serviceId) || null;
}

/*
    ئەم فانکشەنە کارتەکانی خزمەتگوزارییەکان دروست دەکات.
    هۆکاری نووسینی template بە JavaScript ئەوەیە کە هەر زیادکردنێک لە data.js بەخۆکار لێرە نیشان بدرێت.
    لە داهاتوودا دەتوانرێت sorting، filtering، availability status، یان booking badge بۆ هەر کارتێک زیاد بکرێت.
*/
function renderServiceCards() {
    const servicesGrid = document.getElementById("servicesGrid");
    const serviceList = getServiceList();

    if (!servicesGrid) {
        return;
    }

    if (!Array.isArray(serviceList) || serviceList.length === 0) {
        servicesGrid.innerHTML = `
            <article class="contact-card">
                <h3>${ui("serviceEmptyTitle")}</h3>
                <p>${ui("serviceEmptyText")}</p>
            </article>
        `;
        return;
    }

    servicesGrid.innerHTML = serviceList
        .map(
            (service) => `
                <article class="service-card reveal" data-service-id="${service.id}">
                    <div class="service-media">
                        <img
                            class="lazy-image"
                            src="${IMAGE_PLACEHOLDER}"
                            data-src="${service.image}"
                            alt="${t(service.name)}"
                            loading="lazy"
                            width="800"
                            height="500"
                        >
                    </div>
                    <div class="service-body">
                        <span class="service-badge">${t(service.category)}</span>
                        <h3>${t(service.name)}</h3>
                        <p>${t(service.description)}</p>
                        <ul class="service-meta">
                            <li>
                                <strong>${ui("servicePriceLabel")}</strong>
                                <span>${t(service.price)}</span>
                            </li>
                            <li>
                                <strong>${ui("serviceOwnerPhoneLabel")}</strong>
                                <a href="tel:${normalizePhoneForLink(service.phone || service.whatsapp || "")}">${service.phone}</a>
                            </li>
                        </ul>
                        <!--
                            ئەم action ـانە میوان بۆ پەڕەی وردەکاری و رزێرڤی WhatsApp ڕێنمایی دەکەن.
                            بوونی وردەکاری یارمەتی دەدات بەکارهێنەر پێش پەیوەندی زانیاریی زیاتر ببینێت و بڕیاری باشتر بدات.
                            لە داهاتوودا دەتوانرێت share، favorite، یان live availability buttons ی ترش لێرە زیاد بکرێت.
                        -->
                        <a class="button button-secondary service-action" href="service-details.html?id=${encodeURIComponent(service.id)}">
                            ${ui("serviceDetailsButton")}
                        </a>
                        <button
                            class="button button-primary service-action"
                            type="button"
                            data-whatsapp="${service.whatsapp}"
                            data-service-name="${t(service.name)}">
                            ${ui("serviceWhatsappButton")}
                        </button>
                    </div>
                </article>
            `
        )
        .join("");
}

/*
    ئەم فانکشەنە پەیامی سادەی WhatsApp بۆ خزمەتگوزارییەک دروست دەکات.
    بوونی ئەوەیە کە هەر کلیکێک لەسەر دوگمەی رزێرڤ، پەیامێکی ئامادە بۆ خاوەن خزمەتگوزاری بڕوات.
    لە داهاتوودا دەتوانرێت ناوی بەکارهێنەر، بەروار، ژمارەی کەس و تێبینیی زیاتر لە form ـەوە لەم پەیامە زیاد بکرێت.
*/
function openWhatsAppBooking(serviceName, whatsappNumber) {
    const bookingUrl = createWhatsAppBookingUrl(serviceName, whatsappNumber);

    if (!bookingUrl) {
        window.alert(ui("quickBookingUnavailable"));
        return;
    }

    window.open(bookingUrl, "_blank", "noopener");
}

/*
    event delegation بۆ grid ی خزمەتگوزارییەکان.
    هۆکارەکە ئەوەیە کارتەکان داینامیکی دروست دەبن، بۆیە باشترە تەنها یەک listener لەسەر container ـەکە هەبێت.
    لە داهاتوودا دەتوانرێت هەمان شێواز بۆ favorite، compare، یان share button ـەکان بەکاربهێندرێت.
*/
function setupServiceActions() {
    const servicesGrid = document.getElementById("servicesGrid");

    if (!servicesGrid) {
        return;
    }

    servicesGrid.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-whatsapp]");

        if (!trigger) {
            return;
        }

        openWhatsAppBooking(trigger.dataset.serviceName || ui("genericService"), trigger.dataset.whatsapp || "");
    });
}

/*
    smooth scrolling بۆ هەموو ئەو لینک و دوگمانەی data-scroll-target ـیان هەیە.
    بوونی گرنگە چونکە هەستێکی مۆدێرن و ئارام لە گەڕان بە ناو پەڕەکە دروست دەکات.
    لە داهاتوودا دەتوانرێت offset بۆ header ی گەورەتر، active nav state، یان scroll spy بۆی زیاد بکرێت.
*/
function setupSmoothScrolling() {
    const scrollTriggers = document.querySelectorAll("[data-scroll-target]");

    scrollTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            const targetSelector = trigger.getAttribute("href");

            if (!targetSelector || !targetSelector.startsWith("#")) {
                return;
            }

            const targetElement = document.querySelector(targetSelector);

            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

/*
    لۆدی وێنەکە بە شێوەی یەکسان لە شوێنی card و gallery جێبەجێ دەکات.
    هەرکات وێنەکە تەواو دابەزی، class ی is-loaded زیاد دەکرێت بۆ fade-in ـێکی سووک.
    لە داهاتوودا دەتوانرێت retry logic، error placeholder، یان WebP/AVIF switch بۆی زیاد بکرێت.
*/
function loadImage(imageElement) {
    const source = imageElement.dataset.src;

    if (!source || imageElement.dataset.loadingState === "loading") {
        return;
    }

    imageElement.dataset.loadingState = "loading";
    imageElement.loading = "eager";
    imageElement.src = source;
    imageElement.removeAttribute("data-src");

    imageElement.addEventListener(
        "load",
        () => {
            imageElement.classList.add("is-loaded");
            delete imageElement.dataset.loadingState;
        },
        { once: true }
    );

    imageElement.addEventListener(
        "error",
        () => {
            delete imageElement.dataset.loadingState;
        },
        { once: true }
    );
}

/*
    lazy loading بۆ وێنەکان بە IntersectionObserver ئەنجام دەدرێت.
    ئەم ڕێگایە باشترە لەوەی هەموو وێنەکان لە یەک کاتدا دابەزێنرێن، چونکە تەنها ئەوانە دابەزێنرێن کە نزیکن لە viewport.
    لە داهاتوودا دەتوانرێت rootMargin و threshold بەپێی قەبارەی وێنەکان و ڕەفتاری user باشتر بکرێت.
*/
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll(".lazy-image");

    if (!("IntersectionObserver" in window)) {
        lazyImages.forEach(loadImage);
        return;
    }

    const imageObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                loadImage(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            rootMargin: "360px 0px",
            threshold: 0.1
        }
    );

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });

    /*
        ئەم fallback ـە دڵنیایی دەدات کە ئەگەر هەندێک وێنە بەهۆی preview، screenshot، یان هێواشی load هێشتا نەهاتبێتە ناو viewport،
        هەرگیز بە placeholder نەبمێنێتەوە و دواتر خۆی دابەزێت.
        لە داهاتوودا دەتوانرێت ئەم ماوەیە بەپێی قەبارەی وێنەکان یان بەکارهێنانی CDN زیاتر باشتر بکرێت.
    */
    window.setTimeout(() => {
        lazyImages.forEach((image) => {
            if (image.dataset.src) {
                loadImage(image);
            }
        });
    }, 1800);
}

/*
    reveal animation بۆ هەموو ئەو block ـانەی class ی reveal ـیان هەیە.
    هۆکارەکە ئەوەیە بەشی نوێ هەرکات دەرکەوت، بە شێوەی سووک هەستێکی زیندوو پێ بدرێت.
    لە داهاتوودا دەتوانرێت delay بەپێی order، direction ی جیاواز، یان reusable animation utility بۆی زیاد بکرێت.
*/
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

    /*
        ئەم fallback ـە بۆ ئەو بارانە زیاد کراوە کە observer هەندێک ئەڵێمێنت بە درەنگی دەرخات.
        هۆکاری بوونی ئەوەیە کە هیچ بەشێک بە شێوەی شوێنی بەتاڵ نەبمێنێتەوە، بەتایبەت لە screenshot، preview، یان هەندێک مۆبایلدا.
        لە داهاتوودا دەتوانرێت ئەم timeout ـە بەپێی ڕەفتاری بەکارهێنەر، performance، یان animation strategy باشتر بکرێت.
    */
    window.setTimeout(() => {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }, 1400);
}

/*
    lightbox ـی gallery بەهۆی ئەم فانکشەنە کار دەکات.
    کلیک لەسەر وێنەی gallery وێنەکە بە گەورەیی لە modal ـدا پیشان دەدات، و کلیکی دەرەوە یان Escape داخستنەوەی دەکات.
    لە داهاتوودا دەتوانرێت zoom، slideshow، thumbnail navigation، یان swipe gesture بۆ مۆبایل بۆی زیاد بکرێت.
*/
function setupGalleryLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxClose = document.getElementById("lightboxClose");
    const galleryCards = document.querySelectorAll(".gallery-card");

    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxClose || galleryCards.length === 0) {
        return;
    }

    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        lightboxImage.alt = "";
        lightboxTitle.textContent = "";
        document.body.style.overflow = "";
    };

    galleryCards.forEach((card) => {
        card.addEventListener("click", () => {
            const fullImage = card.dataset.fullImage;
            const title = card.dataset.title || "وێنەی نەوڕۆڵی";

            if (!fullImage) {
                return;
            }

            lightboxImage.src = fullImage;
            lightboxImage.alt = title;
            lightboxTitle.textContent = title;
            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
}

/*
    ئەم helper ـە لیستی features یان rules بۆ پەڕەی وردەکاری بە شێوەی markup دروست دەکات.
    بوونی ئەوەیە کە هەمان class و layout بۆ هەموو لیستەکانی details page بەکاربهێندرێت و چاکسازیان ئاسان بێت.
    لە داهاتوودا دەتوانرێت icon، status badge، یان sorting بەپێی گرنگی لێرە زیاد بکرێت.
*/
function buildDetailListMarkup(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return `<p>${ui("detailMoreInfoSoon")}</p>`;
    }

    return `
        <ul class="detail-meta">
            ${items
                .map(
                    (item) => `
                        <li>
                            <span>${t(item)}</span>
                        </li>
                    `
                )
                .join("")}
        </ul>
    `;
}

/*
    ئەم helper ـە گەلەریی بچووکی service details page دروست دەکات.
    هۆکارەکە ئەوەیە هەموو وێنە زیاترەکان بە lazy loading و lightbox ی هەمان وێبەکە نیشان بدرێن و پرۆژەکە خەفیف بمێنێتەوە.
    لە داهاتوودا دەتوانرێت thumbnail order، caption ی جیاواز، یان وێنەی وەرزیی جۆراوجۆر بۆ هەر خزمەتگوزاری زیاد بکرێت.
*/
function buildDetailGalleryMarkup(service) {
    const galleryImages =
        Array.isArray(service.gallery) && service.gallery.length > 0 ? service.gallery : [service.image];
    const serviceTitle = t(service.name);
    const imageLabel = ui("detailGalleryImageLabel");

    return galleryImages
        .map(
            (image, index) => `
                <button
                    class="gallery-card reveal"
                    type="button"
                    data-full-image="${image}"
                    data-title="${serviceTitle} - ${imageLabel} ${index + 1}">
                    <img
                        class="lazy-image"
                        src="${IMAGE_PLACEHOLDER}"
                        data-src="${image}"
                        alt="${serviceTitle} - ${imageLabel} ${index + 1}"
                        loading="lazy"
                        width="960"
                        height="600">
                    <span>${imageLabel} ${index + 1}</span>
                </button>
            `
        )
        .join("");
}

/*
    ئەم helper ـە preview ی سووک بۆ ڤیدیۆ دروست دەکات و کلیکەکە Facebook یان لینکی دەرەکی دەکاتەوە.
    هۆکاری ئەم شێوازە ئەوەیە iframe ی قورس بەکارنەهێندرێت، site ـەکە خێرا بمێنێتەوە، و لە مۆبایلدا هێواشبوون ڕوونەدات.
    هەروەها چونکە autoplay نییە، بەکارهێنەر خۆی بڕیار دەدات کەی ڤیدیۆکە بکاتەوە.
*/
function buildVideoPreviewMarkup(videoUrl, thumbnailUrl, title, emptyMessage) {
    if (!videoUrl) {
        return `<p>${emptyMessage}</p>`;
    }

    const previewImage = thumbnailUrl || IMAGE_PLACEHOLDER;
    const buttonLabel =
        currentLanguage === "ar"
            ? "▶ مشاهدة الفيديو"
            : currentLanguage === "en"
              ? "▶ Watch Video"
              : "▶ بینینی ڤیدیۆ";

    return `
        <div class="video-preview">
            <img src="${previewImage}" alt="${title}">
            <a
                href="${videoUrl}"
                target="_blank"
                rel="noopener"
                class="video-play-button">
                ${buttonLabel}
            </a>
        </div>
    `;
}

/*
    ئەم helper ـە تەنها بەشی نەخشە یان embed ـی سووکی تر دروست دەکات.
    بوونی گرنگە چونکە هەندێک خزمەتگوزاری هێشتا media ی تەواویان نییە، بۆیە دەبێت شوێن-دانەرێکی جوان نیشان بدرێت لەبری شکاندنی layout.
    لە داهاتوودا دەتوانرێت map provider ی جیاواز یان embed ـی تر لێرە زیاد بکرێت.
*/
function buildOptionalEmbedMarkup(url, title, emptyMessage) {
    if (!url) {
        return `<p>${emptyMessage}</p>`;
    }

    return `
        <div class="map-shell">
            <iframe
                title="${title}"
                src="${url}"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen>
            </iframe>
        </div>
    `;
}

/*
    ئەم helper ـە پەیامی وردی رزێرڤ بۆ فۆرمی service details دروست دەکات.
    هۆکاری بوونی ئەوەیە ئەم فۆرمە تەنها داواکاریی رزێرڤ بۆ WhatsApp بنێرێت و هەموو وردەکاریی میوان بە شێوەیەکی ڕوون بگاتە خاوەنی هەمان خزمەتگوزاری.
    خاوەن بە شێوەی ڕاستەوخۆ ناو، ژمارە، بەروار و وردەکاریی سەردان وەردەگرێت، بێ ئەوەی داتا بۆ شوێنێکی تر بنێردرێت.
    لە داهاتوودا دەتوانرێت هەمان پەیامە وەک بنەما بۆ Google Sheet یان admin dashboard بەکاربهێندرێت، بەڵام ئێستا تەنها WhatsApp بەکاردێت.
*/
function buildServiceBookingMessage(service, bookingData) {
    return [
        ui("bookingIntro"),
        "",
        `${ui("bookingLabelService")}: ${t(service.name)}`,
        `${ui("bookingLabelName")}: ${bookingData.fullName}`,
        `${ui("bookingLabelPhone")}: ${bookingData.phone}`,
        `${ui("bookingLabelDate")}: ${bookingData.visitDate}`,
        `${ui("bookingLabelTime")}: ${bookingData.visitTime || ""}`,
        `${ui("bookingLabelGuests")}: ${bookingData.guestsCount || ""}`,
        `${ui("bookingLabelNote")}: ${bookingData.note || ""}`
    ].join("\n");
}

/*
    ئەم helper ـە دۆخی فۆرمی رزێرڤ بە شێوەی سادە نیشان دەدات.
    بوونی گرنگە چونکە بەکارهێنەر پێویستە بزانێت داواکارییەکە چۆن هەڵسوکەوتی لەگەڵ کرا و ئایا هەڵەیەک هەیە یان نا.
    لە داهاتوودا دەتوانرێت icon، auto-dismiss، یان status message ی جیاواز بەپێی دۆخی ناردن بۆی زیاد بکرێت.
*/
function setBookingFormStatus(statusElement, message, state) {
    if (!statusElement) {
        return;
    }

    statusElement.textContent = message;
    statusElement.classList.remove("is-success", "is-error");

    if (state) {
        statusElement.classList.add(state);
    }
}

/*
    ئەم فانکشەنە ئەگەر service id هەڵە بێت پەیامێکی دڵنیابەخش نیشان دەدات.
    هۆکارەکە ئەوەیە بەکارهێنەر لە پەڕەیەکی بەتاڵ نەهێڵدرێت و بە ئاسانی بتوانێت بگەڕێتەوە بۆ سەرەکی.
    لە داهاتوودا دەتوانرێت related services، search، یان contact CTA ی زیاتر لەم دۆخەدا زیاد بکرێت.
*/
function renderServiceNotFound(detailsRoot) {
    detailsRoot.innerHTML = `
        <section class="section">
            <div class="container">
                <article class="detail-card reveal">
                    <a class="back-link" href="index.html#services">${ui("detailBackServices")}</a>
                    <h1>${ui("detailNotFoundTitle")}</h1>
                    <p>${ui("detailNotFoundText")}</p>
                </article>
            </div>
        </section>
    `;
}

/*
    ئەم فانکشەنە ناوەڕۆکی service-details.html بە شێوەی داینامیکی پڕ دەکات.
    هۆکاری بوونی ئەوەیە هەر خزمەتگوزارییەک بە هەمان template لەسەر بنەمای id ـی URL نیشان بدرێت، بۆیە پەڕەکە سادە و خەفیف دەمێنێتەوە.
    لە داهاتوودا دەتوانرێت review، seasonal offers، و availability status بۆ هەر خزمەتگوزاری لەم رەندەرکردنەدا زیاد بکرێت.
*/
function renderServiceDetailsPage() {
    const detailsRoot = document.getElementById("serviceDetailsRoot");

    if (!detailsRoot) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("id") || "";
    const service = getServiceById(serviceId);

    if (!service) {
        document.title = ui("pageTitleNotFound");
        renderServiceNotFound(detailsRoot);
        return;
    }

    const serviceTitle = t(service.name);
    const serviceCategory = t(service.category);
    const serviceDescription = t(service.description);
    const serviceLongDescription = t(service.longDescription);
    const servicePrice = t(service.price);
    const serviceWorkingHours = t(service.workingHours);
    const serviceLocation = t(service.locationText);
    const serviceOwnerName = t(service.ownerName);
    const serviceOwnerRole = t(service.ownerRole);
    const phoneLink = normalizePhoneForLink(service.phone || service.whatsapp || "");
    const whatsappUrl = createWhatsAppBookingUrl(serviceTitle, service.whatsapp || "");

    document.title = `${serviceTitle} – Visit Nawroli`;
    detailsRoot.innerHTML = `
        <!--
            ئەم hero ـە ناسنامەی خزمەتگوزارییەکە لە یەکەم بینینەوە پیشان دەدات.
            بوونی ئەوەیە کە بەکارهێنەر زوو بزانێت لە چ پەڕەیەکدایە و بە ئاسانی بگەڕێتەوە بۆ سەرەتا.
            لە داهاتوودا دەتوانرێت breadcrumb، rating، یان seasonal badge بۆی زیاد بکرێت.
        -->
        <section class="detail-hero">
            <div class="container">
                <div class="section-heading reveal">
                    <a class="back-link" href="index.html#services">${ui("detailBackHome")}</a>
                    <span class="section-label">${serviceCategory}</span>
                    <h1>${serviceTitle}</h1>
                    <p>${serviceDescription}</p>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container detail-layout">
                <!--
                    ئەم card ـە زانیاریی وێنە، دەقی درێژ، گەلەری، ڤیدیۆ و نەخشە کۆدەکاتەوە.
                    هۆکاری بوونی ئەوەیە میوان بتوانێت هەموو دیمەن و پێناسەی خزمەتگوزاری لە شوێنێکی یەکگرتوو ببینێت.
                    لە داهاتوودا دەتوانرێت slideshow، 360 media، یان gallery filter بۆی زیاد بکرێت.
                -->
                <article class="detail-card reveal">
                    <img src="${service.image}" alt="${serviceTitle}" width="1280" height="720">

                    <div class="detail-section">
                        <h2>${ui("detailAboutService")}</h2>
                        <p>${serviceLongDescription}</p>
                    </div>

                    <div class="detail-section">
                        <h2>${ui("detailSmallGallery")}</h2>
                        <div class="detail-gallery">
                            ${buildDetailGalleryMarkup(service)}
                        </div>
                    </div>

                    <div class="detail-section">
                        <h2>${ui("detailVideo")}</h2>
                        ${buildVideoPreviewMarkup(service.videoUrl, service.videoThumbnail || service.image, `${serviceTitle} - ${ui("detailVideo")}`, ui("detailVideoPlaceholder"))}
                    </div>

                    <div class="detail-section">
                        <h2>${ui("detailMap")}</h2>
                        ${buildOptionalEmbedMarkup(service.mapUrl, `${serviceTitle} - ${ui("detailMap")}`, ui("detailMapPlaceholder"))}
                    </div>
                </article>

                <!--
                    ئەم card ـە زانیاریی خاوەن، پەیوەندی، نرخ، و تایبەتمەندییە سەرەکییەکان نیشان دەدات.
                    بوونی ئەوەیە کە بەکارهێنەر بتوانێت بەبێ گەڕان لە شوێنی تر، زوو بڕیاری پەیوەندی و رزێرڤ بدات.
                    لە داهاتوودا دەتوانرێت review، live status، یان فرمێکی رزێرڤی ڕاستەوخۆ لێرە زیاد بکرێت.
                -->
                <aside class="detail-card reveal">
                    <div class="detail-section">
                        <h2>${ui("detailMainInfo")}</h2>
                        <ul class="detail-meta">
                            <li>
                                <strong>${ui("servicePriceLabel")}</strong>
                                <span>${servicePrice}</span>
                            </li>
                            <li>
                                <strong>${ui("detailHoursLabel")}</strong>
                                <span>${serviceWorkingHours}</span>
                            </li>
                            <li>
                                <strong>${ui("detailLocationLabel")}</strong>
                                <span>${serviceLocation}</span>
                            </li>
                            <li>
                                <strong>${ui("detailPhoneLabel")}</strong>
                                <a href="tel:${phoneLink}" dir="ltr">${service.phone}</a>
                            </li>
                        </ul>
                        ${
                            whatsappUrl
                                ? `<a class="button button-primary full-width" href="${whatsappUrl}" target="_blank" rel="noopener">${ui("serviceWhatsappButton")}</a>`
                                : `<p>${ui("detailWhatsappMissing")}</p>`
                        }
                    </div>

                    <!--
                        ئەم بەشە فۆرمی رزێرڤی تایبەتە بە هەمان خزمەتگوزارییە.
                        بوونی ئەوەیە کە ئەم فۆرمە تەنها داواکاریی رزێرڤ بۆ WhatsApp بنێرێت و خاوەنی خزمەتگوزاری وردەکاریی میوان بە شێوەی ڕاستەوخۆ وەربگرێت.
                        هەموو زانیارییەکان لە هەمان پەیامدا دەچن و داتا بۆ database یان خزمەتگوزاریی تر نانێردرێت.
                        لە داهاتوودا دەتوانرێت هەمان بنەما بۆ Google Sheet یان admin dashboard فراوان بکرێتەوە، بەڵام ئێستا تەنها WhatsApp بەکاردێت.
                    -->
                    <div class="detail-section">
                        <h2>${ui("detailBookingForm")}</h2>
                        <form class="booking-form" id="serviceBookingForm">
                            <!--
                                ئەم خانانە زانیاریی سەرەکیی داواکارییەکە کۆدەکەنەوە.
                                تەنها ناو، ژمارەی مۆبایل، و بەروار پێویستن بۆ ئەوەی خاوەن خزمەتگوزاری بتوانێت داواکارییەکە بە شێوەیەکی سەرەتایی تێبگات.
                                کات، ژمارەی کەسەکان، و تێبینی بە شێوەی ئیختیاری دەنێردرێن بۆ ئەوەی داواکارییەکە خەفیف و خێرا بمێنێتەوە.
                                لە داهاتوودا دەتوانرێت هەڵبژاردەی ژوور، جۆری خزمەتگوزاریی لاوەکی، یان کاتی گونجاوەکان بۆ هەڵبژاردن زیاد بکرێت.
                            -->
                            <div class="form-group">
                                <label for="fullName">${ui("detailFormFullName")}</label>
                                <input id="fullName" name="fullName" type="text" required>
                            </div>

                            <div class="form-group">
                                <label for="phone">${ui("detailFormPhone")}</label>
                                <input id="phone" name="phone" type="tel" inputmode="tel" required>
                            </div>

                            <div class="form-group">
                                <label for="visitDate">${ui("detailFormVisitDate")}</label>
                                <input id="visitDate" name="visitDate" type="date" required>
                            </div>

                            <div class="form-group">
                                <label for="visitTime">${ui("detailFormVisitTime")}</label>
                                <input id="visitTime" name="visitTime" type="time">
                            </div>

                            <div class="form-group">
                                <label for="guestsCount">${ui("detailFormGuestsCount")}</label>
                                <input id="guestsCount" name="guestsCount" type="number" min="1" step="1">
                            </div>

                            <div class="form-group">
                                <label for="note">${ui("detailFormNote")}</label>
                                <textarea id="note" name="note" rows="4" placeholder="${ui("detailFormNotePlaceholder")}"></textarea>
                            </div>

                            <button class="button button-primary full-width" type="submit">
                                ${ui("detailFormSubmit")}
                            </button>
                            <p class="form-status" id="bookingFormStatus" aria-live="polite"></p>
                        </form>
                    </div>

                    <div class="detail-section">
                        <h2>${ui("detailOwnerInfo")}</h2>
                        <ul class="detail-meta">
                            <li>
                                <strong>${ui("detailOwnerNameLabel")}</strong>
                                <span>${serviceOwnerName}</span>
                            </li>
                            <li>
                                <strong>${ui("detailOwnerRoleLabel")}</strong>
                                <span>${serviceOwnerRole}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="detail-section">
                        <h2>${ui("detailFeatures")}</h2>
                        ${buildDetailListMarkup(service.features)}
                    </div>

                    <div class="detail-section">
                        <h2>${ui("detailRules")}</h2>
                        ${buildDetailListMarkup(service.rules)}
                    </div>
                </aside>
            </div>
        </section>
    `;
}

/*
    ئەم فانکشەنە ناردنی فۆرمی رزێرڤ بۆ WhatsApp بەڕێوەدەبات.
    هۆکارەکە ئەوەیە ئەم فۆرمە تەنها داواکارییەکە بۆ WhatsApp بنێرێت و خاوەن وردەکاریی میوان بە شێوەی ڕاستەوخۆ وەربگرێت.
    لێرە هیچ data ـیەک بۆ database یان خزمەتگوزارییەکی تر نانێردرێت، بۆیە logic ـەکە سادە و خەفیف دەمێنێتەوە و homepage ـەکەش ناشکێت.
    لە داهاتوودا دەتوانرێت پشکنینی وردتر، Google Sheet یان admin dashboard زیاد بکرێت، بەڵام ئێستا ناردن تەنها بۆ WhatsApp ـە.
*/
function setupServiceBookingForm() {
    const bookingForm = document.getElementById("serviceBookingForm");
    const statusElement = document.getElementById("bookingFormStatus");

    if (!bookingForm) {
        return;
    }

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const serviceId = params.get("id") || "";
        const service = getServiceById(serviceId);

        if (!service) {
            setBookingFormStatus(statusElement, ui("detailStatusNotFound"), "is-error");
            return;
        }

        if (!bookingForm.reportValidity()) {
            setBookingFormStatus(statusElement, ui("detailStatusRequired"), "is-error");
            return;
        }

        const formData = new FormData(bookingForm);
        const bookingData = {
            fullName: (formData.get("fullName") || "").toString().trim(),
            phone: (formData.get("phone") || "").toString().trim(),
            visitDate: (formData.get("visitDate") || "").toString().trim(),
            visitTime: (formData.get("visitTime") || "").toString().trim(),
            guestsCount: (formData.get("guestsCount") || "").toString().trim(),
            note: (formData.get("note") || "").toString().trim()
        };

        /*
            لێرە تەنها خانە پێویستەکان پشتڕاست دەکرێنەوە.
            کات، ژمارەی میوانان، و تێبینی ئیختیارین و ئەگەر بەتاڵ بن هێشتا داواکارییەکە دەنێردرێت.
            لە داهاتوودا دەتوانرێت پشکنینی زیاتری جۆری ژمارە یان سنووری بەروار زیاد بکرێت.
        */
        if (!bookingData.fullName || !bookingData.phone || !bookingData.visitDate) {
            setBookingFormStatus(statusElement, ui("detailStatusRequired"), "is-error");
            return;
        }

        const bookingMessage = buildServiceBookingMessage(service, bookingData);
        const whatsappUrl = createWhatsAppBookingUrl(t(service.name), service.whatsapp || "", bookingMessage);

        if (!whatsappUrl) {
            setBookingFormStatus(statusElement, ui("detailWhatsappMissing"), "is-error");
            return;
        }

        window.open(whatsappUrl, "_blank", "noopener");
        setBookingFormStatus(statusElement, ui("detailStatusSuccess"), "is-success");
    });
}

/*
    ساڵی ئێستا بۆ footer بە شێوەی خۆکار نیشان دەدرێت.
    ئەم وردەکارییە بچووکە بەڵام وا دەکات وێبەکە نوێ و چاودێری کراوە دیار بێت.
    لە داهاتوودا دەتوانرێت لە footer ـدا زانیاریی تر وەک version ی پرۆژە یان last updated زیاد بکرێت.
*/
function updateCurrentYear() {
    const yearElement = document.getElementById("currentYear");

    if (!yearElement) {
        return;
    }

    yearElement.textContent = new Date().getFullYear();
}

/*
    DOMContentLoaded هەموو پارچەکان لە ڕیزێکی ڕوون جێبەجێ دەکات.
    سەرەتا ناوەڕۆکی داینامیکی دروست دەکرێت، پاشان listeners و observers دانرێن تا هیچ ئەڵێمێنتێک لەدەست نەچێت.
    لە داهاتوودا دەتوانرێت init function ـەکان بۆ module ـی جیاوازتر دابەش بکرێن.
*/
document.addEventListener("DOMContentLoaded", () => {
    applyLanguageToDocument();
    applyTranslationsToMarkedElements();

    renderServiceCards();
    renderServiceDetailsPage();

    setupLanguageSwitch();
    setupServiceActions();
    setupServiceBookingForm();
    setupSmoothScrolling();
    setupLazyLoading();
    setupRevealAnimations();
    setupGalleryLightbox();
    updateCurrentYear();
});
