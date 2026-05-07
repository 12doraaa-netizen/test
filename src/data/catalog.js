const CATEGORY_JK = '\u004a\u004b \u5236\u670d'
const CATEGORY_ZODIAC = '\u661f\u5ea7\u6982\u5ff5\u7a3f'
const SERIES_JK = '\u004a\u004b / \u6c34\u624b\u670d\u7cfb\u5217'
const SERIES_ZODIAC = '\u5341\u4e8c\u661f\u5ea7\u6982\u5ff5\u7a3f'

export const featuredProducts = [
  {
    id: 'jk-ivy-navy',
    title: '\u85e4\u9662\u6d77\u519b\u9886 JK \u5957\u88c5',
    category: CATEGORY_JK,
    series: SERIES_JK,
    description: '\u6df1\u6d77\u519b\u84dd\u642d\u914d\u4f4e\u9971\u548c\u7070\u88d9\uff0c\u9002\u5408\u7535\u5546\u4e3b\u56fe\u548c\u5185\u5bb9\u79cd\u8349\u3002',
    image: '/images/product-jk-navy.png',
    tags: ['\u6d77\u519b\u9886', '\u7070\u84dd\u683c\u88d9', '\u7535\u5546\u56fe'],
  },
  {
    id: 'jk-summer-milk',
    title: '\u590f\u65e5\u5976\u767d\u6c34\u624b\u670d',
    category: CATEGORY_JK,
    series: SERIES_JK,
    description: '\u5976\u767d\u77ed\u8896\u4e0e\u6d45\u84dd\u9886\u7ed3\uff0c\u753b\u9762\u5e72\u51c0\u660e\u4eae\u3002',
    image: '/images/product-sailor-milk.png',
    tags: ['\u6c34\u624b\u9886', '\u77ed\u8896', '\u6e05\u900f\u611f'],
  },
  {
    id: 'zodiac-virgo-product',
    title: '\u5904\u5973\u5ea7\u661f\u8f68\u6982\u5ff5\u7a3f',
    category: CATEGORY_ZODIAC,
    series: SERIES_ZODIAC,
    description: '\u94f6\u7070\u4e0e\u6708\u767d\u7ebf\u7a3f\u7ec4\u5408\uff0c\u5f3a\u8c03\u7cbe\u81f4\u79e9\u5e8f\u611f\u3002',
    image: '/images/zodiac-virgo.png',
    tags: ['\u5904\u5973\u5ea7', '\u6982\u5ff5\u7a3f', '\u94f6\u7070'],
  },
  {
    id: 'zodiac-pisces-product',
    title: '\u53cc\u9c7c\u5ea7\u6d77\u96fe\u6982\u5ff5\u7a3f',
    category: CATEGORY_ZODIAC,
    series: SERIES_ZODIAC,
    description: '\u96fe\u84dd\u4e0e\u73e0\u5149\u7c89\u53e0\u52a0\uff0c\u9002\u5408\u9650\u5b9a\u6b3e\u9884\u544a\u3002',
    image: '/images/zodiac-pisces.png',
    tags: ['\u53cc\u9c7c\u5ea7', '\u9650\u5b9a\u611f', '\u96fe\u84dd\u7c89'],
  },
]

export const products = [
  ...featuredProducts,
  {
    id: 'jk-cocoa',
    title: '\u53ef\u53ef\u68d5\u5b66\u9662\u5236\u670d',
    category: CATEGORY_JK,
    series: SERIES_JK,
    description: '\u53ef\u53ef\u68d5\u4e0e\u8c61\u7259\u767d\u5f62\u6210\u590d\u53e4\u5b66\u9662\u611f\u3002',
    image: '/images/product-jk-cocoa.png',
    tags: ['\u79cb\u51ac', '\u5b66\u9662\u98ce', '\u590d\u53e4'],
  },
  {
    id: 'jk-pearl',
    title: '\u73cd\u73e0\u7070\u767e\u8936\u5957\u88c5',
    category: CATEGORY_JK,
    series: SERIES_JK,
    description: '\u7b80\u6d01\u886c\u886b\u3001\u7a84\u9886\u7ed3\u548c\u7070\u8c03\u767e\u8936\u88d9\u3002',
    image: '/images/product-jk-pearl.png',
    tags: ['\u767e\u8936\u88d9', '\u6821\u56ed', '\u9ad8\u7ea7\u611f'],
  },
]

export const zodiacDrafts = [
  ['zodiac-aries', '\u767d\u7f8a\u5ea7', 'Crimson Motion', '\u5229\u843d\u895f\u7ebf / \u706b\u7130\u7ea2\u9886\u7ed3 / \u77ed\u6b3e\u5916\u5957', '#b84a47', '/images/zodiac-aries.svg'],
  ['zodiac-taurus', '\u91d1\u725b\u5ea7', 'Quiet Atelier', '\u82d4\u7eff\u683c\u7eb9 / \u539a\u5b9e\u9762\u6599 / \u590d\u53e4\u91d1\u6263', '#6f7557', '/images/zodiac-taurus.svg'],
  ['zodiac-gemini', '\u53cc\u5b50\u5ea7', 'Twin Signal', '\u649e\u8272\u8bbe\u8ba1 / \u53ef\u62c6\u98d8\u5e26 / \u8f7b\u76c8\u8936\u7ebf', '#667c9d', '/images/zodiac-gemini.png'],
  ['zodiac-cancer', '\u5de8\u87f9\u5ea7', 'Moon Shell', '\u6708\u767d\u6c34\u624b\u9886 / \u7c89\u767e\u8936\u88d9 / \u8d1d\u58f3\u7c89', '#8ba6b5', '/images/zodiac-cancer.png'],
  ['zodiac-leo', '\u72ee\u5b50\u5ea7', 'Solar Ribbon', '\u91d1\u8272\u538b\u7ebf / \u9ad8\u8170\u88d9\u6446 / \u620f\u5267\u611f\u9886\u7ed3', '#c58b4a', '/images/zodiac-leo.svg'],
  ['zodiac-virgo', '\u5904\u5973\u5ea7', 'Silver Order', '\u94f6\u7070\u7ebf\u7a3f / \u7ec6\u5bc6\u767e\u8936 / \u6781\u7b80\u80f8\u6807', '#8c9095', '/images/zodiac-virgo.svg'],
  ['zodiac-libra', '\u5929\u79e4\u5ea7', 'Balanced Bloom', '\u7c89\u7070\u914d\u8272 / \u5bf9\u79f0\u9886\u7247 / \u67d4\u548c\u5f27\u7ebf', '#b78a98', '/images/zodiac-libra.svg'],
  ['zodiac-scorpio', '\u5929\u874e\u5ea7', 'Night Mark', '\u9ed1\u8393\u7d2b\u9886\u7ed3 / \u6697\u7eb9\u88d9\u683c / \u9510\u5229\u8896\u53e3', '#6d536d', '/images/zodiac-scorpio.svg'],
  ['zodiac-sagittarius', '\u5c04\u624b\u5ea7', 'Open Field', '\u98ce\u8863\u5f0f\u5916\u642d / \u659c\u7eb9\u683c\u88d9 / \u65c5\u884c\u5fbd\u7ae0', '#9a7a4f', '/images/zodiac-sagittarius.svg'],
  ['zodiac-capricorn', '\u6469\u7faf\u5ea7', 'Stone Academy', '\u77f3\u58a8\u7070\u5957\u88c5 / \u5efa\u7b51\u611f\u5206\u5272 / \u7a84\u8fb9\u9886', '#62666a', '/images/zodiac-capricorn.svg'],
  ['zodiac-aquarius', '\u6c34\u74f6\u5ea7', 'Air Archive', '\u51b0\u84dd\u900f\u660e\u5c42 / \u672a\u6765\u611f\u80f8\u9488 / \u8f7b\u91cf\u8936', '#6f9baa', '/images/zodiac-aquarius.svg'],
  ['zodiac-pisces', '\u53cc\u9c7c\u5ea7', 'Mist Tide', '\u96fe\u84dd\u7c89\u6e10\u5c42 / \u6d77\u6d6a\u895f\u7ebf / \u73e0\u5149\u7ec6\u8282', '#8d90b7', '/images/zodiac-pisces.svg'],
].map(([id, name, mood, details, color, image]) => ({
  id,
  name,
  mood,
  details,
  color,
  image,
}))