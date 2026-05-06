# Yu 服装品牌展示站

Yu 是一个面向 JK 制服、水手服、电商主图、小红书和抖音内容的品牌展示网站。项目使用 React + Vite 搭建，所有页面和图片都以本地静态资源为主，适合后续部署到 Vercel。

## 页面内容

- 首页：大图 Banner、系列入口、精选商品卡片
- 品牌介绍：品牌定位与内容电商视觉说明
- JK / 水手服系列：商品卡片与分类筛选
- 十二星座设计稿展示：12 张星座主题设计稿卡片
- 联系方式：小红书、抖音、微信、邮箱占位信息

## 本地运行

先安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

浏览器打开终端里显示的本地地址，通常是：

```text
http://localhost:5173
```

## 打包预览

生成生产版本：

```bash
npm run build
```

本地预览生产版本：

```bash
npm run preview
```

## 替换图片

占位图片都在：

```text
public/images
```

后续可以用真实电商图、模特图、平铺图或设计稿替换同名文件。只要文件名和路径保持不变，页面会自动使用新图片。

## 部署到 Vercel

1. 把项目上传到 GitHub、GitLab 或 Bitbucket。
2. 登录 Vercel，选择 `Add New Project`。
3. 导入这个仓库。
4. Framework Preset 选择 `Vite`。
5. Build Command 使用 `npm run build`。
6. Output Directory 使用 `dist`。
7. 点击 Deploy。

部署完成后，Vercel 会给你一个预览链接。绑定域名后，就可以作为正式品牌展示站使用。
