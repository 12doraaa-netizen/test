import React, { useEffect, useMemo, useState } from 'react'
import { featuredProducts, products, zodiacDrafts } from './data/catalog.js'

const text = {
  home: '\u9996\u9875',
  about: '\u54c1\u724c\u4ecb\u7ecd',
  series: 'JK / \u6c34\u624b\u670d\u7cfb\u5217',
  zodiac: '\u5341\u4e8c\u661f\u5ea7\u6982\u5ff5\u7a3f',
  contact: '\u8054\u7cfb\u65b9\u5f0f',
  all: '\u5168\u90e8',
  jk: 'JK \u5236\u670d',
  zodiacCategory: '\u661f\u5ea7\u6982\u5ff5\u7a3f',
  preview: '\u653e\u5927\u67e5\u770b',
  addFavorite: '\u6536\u85cf',
  removeFavorite: '\u53d6\u6d88\u6536\u85cf',
  ranking: '\u559c\u597d\u5ea6\u6392\u884c',
  rankingNote: '\u6839\u636e\u672c\u5730\u559c\u6b22\u6570\u91cf\u4ece\u9ad8\u5230\u4f4e\u6392\u51fa\u524d\u56db\u540d\u3002',
  heartCount: '\u5c0f\u7231\u5fc3',
  rankPrefix: 'TOP',
  view: '\u67e5\u770b',
  comment: '\u8bc4\u8bba',
  noComment: '\u6682\u65e0\u8bc4\u8bba',
  submitComment: '\u63d0\u4ea4\u8bc4\u8bba',
  deleteComment: '\u5220\u9664',
  commentRequired: '\u8bc4\u8bba\u4e0d\u80fd\u4e3a\u7a7a',
  commentTooLong: '\u8bc4\u8bba\u4e0d\u80fd\u8d85\u8fc7 200 \u5b57',
  defaultNickname: '\u5c0f\u5c0f\u718a',
  commentContent: '\u8bc4\u8bba\u5185\u5bb9',
  commentPlaceholder: '\u5199\u4e0b\u5bf9\u8fd9\u5f20\u661f\u5ea7\u6982\u5ff5\u7a3f\u7684\u60f3\u6cd5',
}

const navItems = [
  [text.home, '#home'],
  [text.about, '#about'],
  [text.series, '#series'],
  [text.zodiac, '#zodiac'],
  [text.contact, '#contact'],
]

const FAVORITES_STORAGE_KEY = 'yu:favorites'
const LIKES_STORAGE_KEY = 'yu:likes'
const COMMENTS_STORAGE_KEY = 'yu:comments'

function readStoredObject(key, fallback) {
  if (typeof window === 'undefined') return fallback

  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

function writeStoredObject(key, value) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Keep rendering even when localStorage is unavailable.
  }
}

function createCommentId(productId) {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID()
  }

  return `${productId}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getRankingItems() {
  const productItems = products.map((product, index) => ({
    ...product,
    initialLikes: product.initialLikes ?? 96 - index * 7,
    rankOrder: index,
  }))
  const zodiacItems = zodiacDrafts.map((draft, index) => ({
    id: draft.id,
    title: `${draft.name} ${text.zodiacCategory}`,
    category: text.zodiacCategory,
    series: text.zodiac,
    description: draft.details,
    image: draft.image,
    tags: [draft.name, draft.mood],
    initialLikes: draft.initialLikes ?? 82 - index * 4,
    rankOrder: productItems.length + index,
  }))

  return [...productItems, ...zodiacItems]
}

function getInitialLikeCount(productId) {
  return getRankingItems().find((item) => item.id === productId)?.initialLikes ?? 0
}

function getLikeCount(likesMap, item, favoriteMap = {}) {
  const storedLikes = likesMap[item.id]

  if (typeof storedLikes === 'number' && Number.isFinite(storedLikes)) {
    return storedLikes
  }

  return (item.initialLikes ?? getInitialLikeCount(item.id)) + (favoriteMap[item.id] ? 1 : 0)
}

function App() {
  const [activeCategory, setActiveCategory] = useState(text.all)
  const [previewProduct, setPreviewProduct] = useState(null)
  const [favoriteMap, setFavoriteMap] = useState(() =>
    readStoredObject(FAVORITES_STORAGE_KEY, {}),
  )
  const [likesMap, setLikesMap] = useState(() =>
    readStoredObject(LIKES_STORAGE_KEY, {}),
  )
  const [commentsByProduct, setCommentsByProduct] = useState(() =>
    readStoredObject(COMMENTS_STORAGE_KEY, {}),
  )

  const filteredProducts = useMemo(() => {
    if (activeCategory === text.all) return products
    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  useEffect(() => {
    writeStoredObject(FAVORITES_STORAGE_KEY, favoriteMap)
  }, [favoriteMap])

  useEffect(() => {
    writeStoredObject(LIKES_STORAGE_KEY, likesMap)
  }, [likesMap])

  useEffect(() => {
    writeStoredObject(COMMENTS_STORAGE_KEY, commentsByProduct)
  }, [commentsByProduct])

  useEffect(() => {
    if (!previewProduct) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setPreviewProduct(null)
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
      '.section, .about-section, .contact-section, .entrance-card, .ranking-card, .product-card, .zodiac-card, .about-points article, .contact-list article',
    )
    const shouldShowImmediately =
      window.matchMedia('(max-width: 720px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)

    revealTargets.forEach((element, index) => {
      element.classList.add('reveal')
      element.style.setProperty('--reveal-delay', `${(index % 8) * 55}ms`)
    })

    if (shouldShowImmediately) {
      revealTargets.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

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

  function handleToggleFavorite(productId) {
    const isCurrentlyFavorite = Boolean(favoriteMap[productId])

    setFavoriteMap((currentFavorites) => {
      const nextFavorites = { ...currentFavorites }

      if (nextFavorites[productId]) {
        delete nextFavorites[productId]
      } else {
        nextFavorites[productId] = true
      }

      return nextFavorites
    })
    setLikesMap((currentLikes) => {
      const currentLikeCount =
        typeof currentLikes[productId] === 'number'
          ? currentLikes[productId]
          : getInitialLikeCount(productId) + (isCurrentlyFavorite ? 1 : 0)

      return {
        ...currentLikes,
        [productId]: Math.max(0, currentLikeCount + (isCurrentlyFavorite ? -1 : 1)),
      }
    })
  }

  function handleAddComment(productId, comment) {
    const newComment = {
      id: createCommentId(productId),
      nickname: comment.nickname,
      content: comment.content,
      createdAt: new Date().toISOString(),
    }

    setCommentsByProduct((currentComments) => ({
      ...currentComments,
      [productId]: [...(currentComments[productId] || []), newComment],
    }))
  }

  function handleDeleteComment(productId, commentId) {
    setCommentsByProduct((currentComments) => ({
      ...currentComments,
      [productId]: (currentComments[productId] || []).filter(
        (comment) => comment.id !== commentId,
      ),
    }))
  }

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <SeriesEntrances />
        <FeaturedGrid
          favoriteMap={favoriteMap}
          likesMap={likesMap}
          onPreview={setPreviewProduct}
          onToggleFavorite={handleToggleFavorite}
        />
        <About />
        <ProductSeries
          activeCategory={activeCategory}
          favoriteMap={favoriteMap}
          filteredProducts={filteredProducts}
          onCategoryChange={setActiveCategory}
          onPreview={setPreviewProduct}
          onToggleFavorite={handleToggleFavorite}
        />
        <ZodiacGallery
          commentsByProduct={commentsByProduct}
          favoriteMap={favoriteMap}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          onToggleFavorite={handleToggleFavorite}
        />
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
      <a className="brand-mark" href="#home" aria-label="Yu home">
        Yu
      </a>
      <nav className="main-nav" aria-label="Main navigation">
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
        <img src="/images/hero-yu-editorial.png" alt="Yu JK editorial banner" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">JK Uniform / Sailor Style / Social Commerce Visual</p>
        <h1>Yu</h1>
        <p>{'\u9762\u5411 JK \u5236\u670d\u3001\u6c34\u624b\u670d\u3001\u7535\u5546\u4e3b\u56fe\u4e0e\u5c0f\u7ea2\u4e66 / \u6296\u97f3\u5185\u5bb9\u7684\u670d\u88c5\u54c1\u724c\u89c6\u89c9\u7ad9\u3002'}</p>
        <div className="hero-actions">
          <a className="button primary" href="#series">
            {'\u6d4f\u89c8\u7cfb\u5217'}
          </a>
          <a className="button ghost" href="#zodiac">
            {'\u67e5\u770b\u661f\u5ea7\u6982\u5ff5\u7a3f'}
          </a>
        </div>
      </div>
    </section>
  )
}

function SeriesEntrances() {
  const entrances = [
    {
      title: text.series,
      body: '\u4ece\u65e5\u5e38\u901a\u52e4\u62cd\u6444\u5230\u65b0\u54c1\u4e0a\u67b6\u4e3b\u56fe\uff0c\u5efa\u7acb\u7a33\u5b9a\u3001\u5e72\u51c0\u3001\u53ef\u590d\u7528\u7684\u54c1\u724c\u89c6\u89c9\u3002',
      image: '/images/entrance-jk.svg',
      href: '#series',
    },
    {
      title: text.zodiac,
      body: '\u4ee5\u661f\u5ea7\u6027\u683c\u3001\u8272\u5f69\u548c\u5236\u670d\u7ec6\u8282\u4e3a\u7075\u611f\uff0c\u9002\u5408\u9650\u5b9a\u6b3e\u9884\u544a\u4e0e\u5185\u5bb9\u5e73\u53f0\u9009\u9898\u3002',
      image: '/images/entrance-zodiac.svg',
      href: '#zodiac',
    },
  ]

  return (
    <section className="section section-tight" aria-labelledby="entrance-title">
      <div className="section-heading">
        <p className="eyebrow">Collection Entry</p>
        <h2 id="entrance-title">{'\u7cfb\u5217\u5165\u53e3'}</h2>
      </div>
      <div className="entrance-grid">
        {entrances.map((item) => (
          <a className="entrance-card" href={item.href} key={item.title}>
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
            <p>{item.body}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

function FeaturedGrid({ favoriteMap, likesMap, onPreview, onToggleFavorite }) {
  const rankedProducts = getRankingItems()
    .sort((firstProduct, secondProduct) => {
      const countDiff =
        getLikeCount(likesMap, secondProduct, favoriteMap) -
        getLikeCount(likesMap, firstProduct, favoriteMap)

      if (countDiff !== 0) return countDiff
      return firstProduct.rankOrder - secondProduct.rankOrder
    })
    .slice(0, 3)

  return (
    <section className="section" aria-labelledby="featured-title">
      <div className="section-heading split">
        <div>
          <p className="eyebrow">Preference Ranking</p>
          <h2 id="featured-title">{text.ranking}</h2>
        </div>
        <p>{text.rankingNote}</p>
      </div>
      <div className="ranking-grid">
        {rankedProducts.map((product, index) => (
          <RankingCard
            isFavorite={Boolean(favoriteMap[product.id])}
            likeCount={getLikeCount(likesMap, product, favoriteMap)}
            onPreview={onPreview}
            onToggleFavorite={onToggleFavorite}
            product={product}
            rank={index + 1}
            key={product.id}
          />
        ))}
      </div>
    </section>
  )
}

function RankingCard({
  isFavorite,
  likeCount,
  onPreview,
  onToggleFavorite,
  product,
  rank,
}) {
  return (
    <article className={`ranking-card${rank === 1 ? ' is-top' : ''}`}>
      <div className="ranking-media">
        <img src={product.image} alt={product.title} />
        <span className="ranking-badge">
          {rank === 1 ? 'NO.1' : `${text.rankPrefix} ${rank}`}
        </span>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => onToggleFavorite(product.id)}
        />
      </div>
      <div className="ranking-body">
        <p>{product.category}</p>
        <h3>{product.title}</h3>
        <span>{product.series}</span>
        <div className="ranking-meta">
          <strong>
            <span aria-hidden="true">{'\u2665'}</span>
            {likeCount}
            <em>{text.heartCount}</em>
          </strong>
          <button onClick={() => onPreview(product)} type="button">
            {text.view}
          </button>
        </div>
      </div>
    </article>
  )
}

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-copy">
        <p className="eyebrow">Brand Profile</p>
        <h2 id="about-title">{'Yu \u662f\u4e00\u4e2a\u4e3a\u5185\u5bb9\u7535\u5546\u800c\u751f\u7684\u5236\u670d\u89c6\u89c9\u54c1\u724c\u3002'}</h2>
        <p>{'\u7f51\u7ad9\u4ee5\u7b80\u6d01\u7684\u7f16\u8f91\u753b\u62a5\u8bed\u6c14\u5c55\u793a\u5546\u54c1\u3001\u8bbe\u8ba1\u7a3f\u548c\u5185\u5bb9\u65b9\u5411\uff0c\u65b9\u4fbf\u540e\u7eed\u6c89\u6dc0\u5c0f\u7ea2\u4e66\u3001\u6296\u97f3\u548c\u7535\u5546\u5e73\u53f0\u89c6\u89c9\u8d44\u4ea7\u3002'}</p>
      </div>
      <div className="about-points">
        <article>
          <span>01</span>
          <h3>{'\u5e72\u51c0\u5546\u54c1\u8868\u8fbe'}</h3>
          <p>{'\u4fdd\u7559\u670d\u88c5\u7ebf\u6761\u3001\u9762\u6599\u3001\u914d\u8272\u4e0e\u7ec6\u8282\u3002'}</p>
        </article>
        <article>
          <span>02</span>
          <h3>{'\u7cfb\u5217\u5316\u5185\u5bb9\u8d44\u4ea7'}</h3>
          <p>{'\u56f4\u7ed5 JK\u3001\u6c34\u624b\u670d\u548c\u661f\u5ea7\u4e3b\u9898\u5efa\u7acb\u7edf\u4e00\u753b\u9762\u8bed\u8a00\u3002'}</p>
        </article>
        <article>
          <span>03</span>
          <h3>{'\u9002\u5408\u540e\u7eed\u90e8\u7f72'}</h3>
          <p>{'\u9759\u6001 React \u9879\u76ee\u7ed3\u6784\u6e05\u6670\uff0c\u56fe\u7247\u548c\u6570\u636e\u90fd\u53ef\u672c\u5730\u66ff\u6362\u3002'}</p>
        </article>
      </div>
    </section>
  )
}

function ProductSeries({ activeCategory, favoriteMap, filteredProducts, onCategoryChange, onPreview, onToggleFavorite }) {
  const categories = [text.all, text.jk, text.zodiacCategory]

  return (
    <section className="section" id="series" aria-labelledby="series-title">
      <div className="section-heading split">
        <div>
          <p className="eyebrow">Product Gallery</p>
          <h2 id="series-title">{text.series}</h2>
        </div>
        <div className="category-tabs" aria-label="Product categories">
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
          <ProductCard
            isFavorite={Boolean(favoriteMap[product.id])}
            onPreview={onPreview}
            onToggleFavorite={onToggleFavorite}
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </section>
  )
}

function ProductCard({
  isFavorite,
  onPreview,
  onToggleFavorite,
  product,
}) {
  return (
    <article className="product-card">
      <div className="product-media">
        <button
          className="image-zoom-trigger"
          onClick={() => onPreview(product)}
          type="button"
        >
          <img src={product.image} alt={product.title} />
          <span>{text.preview}</span>
        </button>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => onToggleFavorite(product.id)}
        />
      </div>
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

function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      aria-label={isFavorite ? text.removeFavorite : text.addFavorite}
      aria-pressed={isFavorite}
      className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span aria-hidden="true">{isFavorite ? '\u2665' : '\u2661'}</span>
    </button>
  )
}

function ZodiacComments({ comments, onAddComment, onDeleteComment, productTitle }) {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedContent = content.trim()

    if (!trimmedContent) {
      setError(text.commentRequired)
      return
    }

    if (trimmedContent.length > 200) {
      setError(text.commentTooLong)
      return
    }

    onAddComment({
      nickname: text.defaultNickname,
      content: trimmedContent,
    })
    setContent('')
    setError('')
  }

  return (
    <div className="comment-panel">
      <div className="comment-heading">
        <span>{text.comment}</span>
        <strong>{comments.length}</strong>
      </div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          aria-label={`${productTitle} ${text.commentContent}`}
          maxLength="200"
          onChange={(event) => setContent(event.target.value)}
          placeholder={text.commentPlaceholder}
          rows="3"
          value={content}
        />
        <div className="comment-form-footer">
          <span>{content.trim().length}/200</span>
          <button type="submit">{text.submitComment}</button>
        </div>
        {error && <p className="comment-error">{error}</p>}
      </form>
      <div className="comment-list" aria-live="polite">
        {comments.length === 0 ? (
          <p className="comment-empty">{text.noComment}</p>
        ) : (
          comments.map((comment) => (
            <article className="comment-item" key={comment.id}>
              <div>
                <strong>{comment.nickname}</strong>
                <time dateTime={comment.createdAt}>
                  {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                </time>
              </div>
              <p>{comment.content}</p>
              <button onClick={() => onDeleteComment(comment.id)} type="button">
                {text.deleteComment}
              </button>
            </article>
          ))
        )}
      </div>
    </div>
  )
}

function ImagePreviewModal({ product, onClose }) {
  return (
    <div
      aria-label={`${product.title} preview`}
      aria-modal="true"
      className="image-preview"
      onClick={onClose}
      role="dialog"
    >
      <div className="image-preview-panel" onClick={(event) => event.stopPropagation()}>
        <button
          aria-label="Close preview"
          className="preview-close"
          onClick={onClose}
          type="button"
        >
          x
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

function ZodiacGallery({ commentsByProduct, favoriteMap, onAddComment, onDeleteComment, onToggleFavorite }) {
  return (
    <section className="section zodiac-section" id="zodiac" aria-labelledby="zodiac-title">
      <div className="section-heading split">
        <div>
          <p className="eyebrow">Zodiac Drafts</p>
          <h2 id="zodiac-title">{text.zodiac}</h2>
        </div>
        <p>{'\u6bcf\u5f20\u5361\u7247\u90fd\u53ef\u6536\u85cf\uff0c\u5e76\u4fdd\u7559\u72ec\u7acb\u8bc4\u8bba\u3002'}</p>
      </div>
      <div className="zodiac-grid">
        {zodiacDrafts.map((draft) => (
          <article className="zodiac-card" key={draft.id}>
            <img src={draft.image} alt={`${draft.name} JK draft`} />
            <FavoriteButton
              isFavorite={Boolean(favoriteMap[draft.id])}
              onClick={() => onToggleFavorite(draft.id)}
            />
            <div className="zodiac-body">
              <span style={{ color: draft.color }}>{draft.mood}</span>
              <h3>{draft.name}</h3>
              <p>{draft.details}</p>
            </div>
            <ZodiacComments
              comments={commentsByProduct[draft.id] || []}
              onAddComment={(comment) => onAddComment(draft.id, comment)}
              onDeleteComment={(commentId) => onDeleteComment(draft.id, commentId)}
              productTitle={draft.name}
            />
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const contacts = [
    ['\u5c0f\u7ea2\u4e66', 'Yu_JK_Studio'],
    ['\u6296\u97f3', 'YuUniform'],
    ['\u5fae\u4fe1', '13016929997'],
    ['\u90ae\u7bb1', 'hello@yu-uniform.example'],
  ]

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div>
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">{'\u5408\u4f5c\u3001\u62cd\u6444\u3001\u4e0a\u65b0\u4f01\u5212\uff0c\u90fd\u53ef\u4ee5\u4ece\u8fd9\u91cc\u5f00\u59cb\u3002'}</h2>
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
      <p>{'JK \u5236\u670d\u3001\u6c34\u624b\u670d\u4e0e\u5185\u5bb9\u7535\u5546\u89c6\u89c9\u5c55\u793a\u7ad9\u3002'}</p>
    </footer>
  )
}

export default App
