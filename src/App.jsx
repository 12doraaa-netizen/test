import { useEffect, useMemo, useState } from 'react'
import { featuredProducts, products, zodiacDrafts } from './data/catalog.js'

const navItems = [
  ['首页', '#home'],
  ['品牌介绍', '#about'],
  ['JK / 水手服系列', '#series'],
  ['十二星座设计稿', '#zodiac'],
  ['联系方式', '#contact'],
]

function App() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [previewProduct, setPreviewProduct] = useState(null)
  const filteredProducts = useMemo(() => {
    if (activeCategory === '全部') return products
    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  useEffect(() => {
    if (!previewProduct) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPreviewProduct(null)
      }
    }

    document.body.classList.add('modal-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [previewProduct])

  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      '.section, .about-section, .contact-section, .entrance-card, .product-card, .zodiac-card, .about-points article, .contact-list article',
    )

    revealTargets.forEach((element, index) => {
      element.classList.add('reveal')
      element.style.setProperty('--reveal-delay', `${(index % 8) * 55}ms`)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.16 },
    )

    revealTargets.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <SeriesEntrances />
        <FeaturedGrid onPreview={setPreviewProduct} />
        <About />
        <ProductSeries
          activeCategory={activeCategory}
          filteredProducts={filteredProducts}
          onCategoryChange={setActiveCategory}
          onPreview={setPreviewProduct}
        />
        <ZodiacGallery />
        <Contact />
      </main>
      <Footer />
      {previewProduct && (
        <ImagePreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" aria-label="回到 Yu 首页">
        Yu
      </a>
      <nav className="main-nav" aria-label="主导航">
        {navItems.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-media">
        <img src="/images/hero-yu-editorial.png" alt="Yu JK 制服编辑画报视觉" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">JK Uniform / Sailor Style / Social Commerce Visual</p>
        <h1>Yu</h1>
        <p>
          面向 JK 制服、水手服、电商主图与小红书 / 抖音内容的服装品牌视觉站。
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#series">
            浏览系列
          </a>
          <a className="button ghost" href="#zodiac">
            查看星座概念设计稿
          </a>
        </div>
      </div>
    </section>
  )
}

function SeriesEntrances() {
  const entrances = [
    {
      title: 'JK / 水手服系列',
      text: '从日常通勤拍摄到新品上架主图，建立稳定、干净、可复用的品牌视觉。',
      image: '/images/entrance-jk.svg',
      href: '#series',
    },
    {
      title: '十二星座概念设计稿',
      text: '以星座性格、色彩和制服细节为灵感，适合限定款预告与内容平台选题。',
      image: '/images/entrance-zodiac.svg',
      href: '#zodiac',
    },
  ]

  return (
    <section className="section section-tight" aria-labelledby="entrance-title">
      <div className="section-heading">
        <p className="eyebrow">Collection Entry</p>
        <h2 id="entrance-title">系列入口</h2>
      </div>
      <div className="entrance-grid">
        {entrances.map((item) => (
          <a className="entrance-card" href={item.href} key={item.title}>
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
            <p>{item.text}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

function FeaturedGrid({ onPreview }) {
  return (
    <section className="section" aria-labelledby="featured-title">
      <div className="section-heading split">
        <div>
          <p className="eyebrow">Selected Pieces</p>
          <h2 id="featured-title">精选商品卡片</h2>
        </div>
        <p>梨谱熊JK</p>
      </div>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <ProductCard onPreview={onPreview} product={product} key={product.id} />
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-copy">
        <p className="eyebrow">Brand Profile</p>
        <h2 id="about-title">Yu 是一个为内容电商而生的制服视觉品牌。</h2>
        <p>
          网站以简洁的编辑画报语气展示商品、设计稿和内容方向，帮助客户快速理解系列定位，
          也方便后续沉淀小红书、抖音和电商平台的视觉资产。
        </p>
      </div>
      <div className="about-points">
        <article>
          <span>01</span>
          <h3>干净商品表达</h3>
          <p>保留服装线条、面料、配色与细节，让商品图更适合反复投放和上新。</p>
        </article>
        <article>
          <span>02</span>
          <h3>系列化内容资产</h3>
          <p>围绕 JK、水手服和星座主题建立统一画面语言，方便做合集与专题。</p>
        </article>
        <article>
          <span>03</span>
          <h3>适合后续部署</h3>
          <p>静态 React 项目结构清楚，图片和数据都可本地替换，部署到 Vercel 简单。</p>
        </article>
      </div>
    </section>
  )
}

function ProductSeries({
  activeCategory,
  filteredProducts,
  onCategoryChange,
  onPreview,
}) {
  const categories = ['全部', 'JK 制服', '星座概念设计稿']

  return (
    <section className="section" id="series" aria-labelledby="series-title">
      <div className="section-heading split">
        <div>
          <p className="eyebrow">Product Gallery</p>
          <h2 id="series-title">JK / 水手服系列</h2>
        </div>
        <div className="category-tabs" aria-label="商品分类">
          {categories.map((category) => (
            <button
              aria-pressed={activeCategory === category}
              className={activeCategory === category ? 'active' : ''}
              key={category}
              onClick={() => onCategoryChange(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard onPreview={onPreview} product={product} key={product.id} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product, onPreview }) {
  return (
    <article className="product-card">
      <button
        className="image-zoom-trigger"
        onClick={() => onPreview(product)}
        type="button"
      >
        <img src={product.image} alt={product.title} />
        <span>放大查看</span>
      </button>
      <div className="product-body">
        <p>{product.category}</p>
        <h3>{product.title}</h3>
        <span>{product.series}</span>
        <p>{product.description}</p>
        <div className="tag-row">
          {product.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

function ImagePreviewModal({ product, onClose }) {
  return (
    <div
      aria-label={`${product.title} 大图预览`}
      aria-modal="true"
      className="image-preview"
      onClick={onClose}
      role="dialog"
    >
      <div className="image-preview-panel" onClick={(event) => event.stopPropagation()}>
        <button
          aria-label="关闭大图预览"
          className="preview-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <img src={product.image} alt={product.title} />
        <div className="preview-caption">
          <p>{product.category}</p>
          <h3>{product.title}</h3>
        </div>
      </div>
    </div>
  )
}

function ZodiacGallery() {
  return (
    <section className="section zodiac-section" id="zodiac" aria-labelledby="zodiac-title">
      <div className="section-heading split">
        <div>
          <p className="eyebrow">Zodiac Drafts</p>
          <h2 id="zodiac-title">十二星座概念稿展示</h2>
        </div>
        <p>概念图仅供参考 请以实物为准</p>
      </div>
      <div className="zodiac-grid">
        {zodiacDrafts.map((draft) => (
          <article className="zodiac-card" key={draft.name}>
            <img src={draft.image} alt={`${draft.name} JK 制服设计稿`} />
            <div>
              <span style={{ color: draft.color }}>{draft.mood}</span>
              <h3>{draft.name}</h3>
              <p>{draft.details}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const contacts = [
    ['小红书', '梨谱熊JK'],
    ['抖音', '梨谱熊JK'],
    ['微信', '13016929997'],
    ['邮箱', 'hello@yu-uniform.example'],
  ]

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div>
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">合作、拍摄、上新企划，都可以从这里开始。</h2>
      </div>
      <div className="contact-list">
        {contacts.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>Yu</span>
      <p>JK 制服、水手服与内容电商视觉展示站。</p>
    </footer>
  )
}

export default App
