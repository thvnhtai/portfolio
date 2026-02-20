# Responsive Design System Documentation

## 📱 Overview

Hệ thống responsive design được thiết kế bởi Principal Frontend Engineer, đảm bảo tương thích cross-browser và tối ưu cho mọi thiết bị từ mobile đến desktop.

## 🎯 Breakpoints

### Standard Breakpoints
```css
--breakpoint-xs: 320px   /* Small phones */
--breakpoint-sm: 480px   /* Large phones */
--breakpoint-md: 768px   /* Tablets (iPad portrait) */
--breakpoint-lg: 1024px  /* Tablets (iPad landscape) / Small laptops */
--breakpoint-xl: 1280px  /* Desktop */
--breakpoint-2xl: 1536px /* Large desktop */
```

### Usage Pattern
- **Mobile First**: Thiết kế từ mobile lên (min-width)
- **Tablet**: 768px - 1023px (iPad portrait/landscape)
- **Desktop**: ≥ 1024px

## 📐 Container System

### Max Widths
```css
--container-sm: 540px
--container-md: 720px
--container-lg: 960px
--container-xl: 1140px
--container-2xl: 1400px
```

### Usage
```html
<div class="container">
  <!-- Content automatically centers with max-width -->
</div>
```

## 🎨 Typography Scale (Fluid)

Typography tự động scale theo viewport:

```css
--font-size-xs: clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem)
--font-size-sm: clamp(0.875rem, 0.75vw + 0.5rem, 1rem)
--font-size-base: clamp(1rem, 1vw + 0.5rem, 1.125rem)
--font-size-lg: clamp(1.125rem, 1.25vw + 0.5rem, 1.25rem)
--font-size-xl: clamp(1.25rem, 1.5vw + 0.75rem, 1.5rem)
--font-size-2xl: clamp(1.5rem, 2vw + 1rem, 2rem)
--font-size-3xl: clamp(2rem, 3vw + 1.5rem, 2.5rem)
--font-size-4xl: clamp(2.5rem, 4vw + 2rem, 3.5rem)
--font-size-5xl: clamp(3rem, 6vw + 2.5rem, 5.5rem)
```

## 👆 Touch Targets (WCAG 2.1 AA)

### Minimum Sizes
```css
--touch-target-min: 44px        /* Minimum (WCAG AA) */
--touch-target-comfortable: 48px /* Comfortable size */
```

Tất cả interactive elements (buttons, links) đều có:
- Minimum height: 44px
- Minimum width: 44px
- Adequate spacing between targets

## 🍎 iOS Safe Area Support

```css
--safe-area-inset-top: env(safe-area-inset-top)
--safe-area-inset-right: env(safe-area-inset-right)
--safe-area-inset-bottom: env(safe-area-inset-bottom)
--safe-area-inset-left: env(safe-area-inset-left)
```

Sử dụng cho:
- Navigation padding
- Modal padding
- Fixed elements

## 🌐 Cross-Browser Compatibility

### Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
```

### Browser-Specific Fixes

#### iOS Safari
- `-webkit-text-size-adjust: 100%` - Prevent text zoom
- `-webkit-tap-highlight-color: transparent` - Remove tap highlight
- `-webkit-overflow-scrolling: touch` - Smooth scrolling

#### Firefox
- `scrollbar-width: thin` - Custom scrollbar
- `scrollbar-color` - Scrollbar colors

#### Edge/Chrome
- `-ms-overflow-style` - Scrollbar styling

## 📱 Mobile Optimizations (< 768px)

### Key Features
1. **Touch-Friendly**: Tất cả buttons ≥ 44px
2. **No Horizontal Scroll**: `overflow-x: hidden`
3. **Font Size**: 16px base để prevent iOS zoom
4. **Dynamic Viewport**: `100dvh` thay vì `100vh`
5. **Safe Area**: Padding cho iOS notch
6. **Performance**: Reduced animations, optimized particles

### Input Optimization
```css
input, textarea {
  font-size: 16px; /* Prevent iOS zoom on focus */
}
```

## 📱 Tablet Optimizations (768px - 1023px)

### iPad Specific
- **Touch Targets**: 48px (comfortable)
- **Grid Layouts**: 2 columns thay vì 1
- **Spacing**: Tăng padding/spacing
- **Typography**: Slightly larger fonts

### Orientation Support
- Portrait: Optimized layout
- Landscape: Adjusted spacing

## 💻 Desktop Optimizations (≥ 1024px)

### Features
- **Hover Effects**: Chỉ trên desktop (pointer: fine)
- **Grid Layouts**: 3-4 columns
- **Full Animations**: Tất cả effects enabled
- **Cursor Effects**: Custom cursor enabled

## ♿ Accessibility

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable animations */
}
```

### Focus Styles
- Visible focus indicators
- Keyboard navigation support
- Skip to content link

## 🎨 Component Responsive Patterns

### Hero Section
- **Mobile**: Single column, stacked
- **Tablet**: Single column, larger spacing
- **Desktop**: Two columns, side-by-side

### Projects Grid
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns

### Navigation
- **Mobile**: Hamburger menu
- **Tablet**: Compact nav
- **Desktop**: Full horizontal nav

## 🚀 Performance Optimizations

### Mobile
- Reduced particle density
- Disabled heavy animations
- Optimized images
- Lazy loading

### Tablet
- Moderate animations
- Balanced particle effects

### Desktop
- Full effects enabled
- All animations active

## 📋 Testing Checklist

### Devices to Test
- [ ] iPhone SE (320px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1280px+)

### Browsers to Test
- [ ] Chrome (Desktop & Mobile)
- [ ] Safari (Desktop & iOS)
- [ ] Firefox (Desktop & Mobile)
- [ ] Edge (Desktop)
- [ ] Samsung Internet

### Features to Verify
- [ ] Touch targets ≥ 44px
- [ ] No horizontal scroll
- [ ] Text readable (≥ 16px)
- [ ] Forms work correctly
- [ ] Modals fit screen
- [ ] Navigation accessible
- [ ] Images load properly
- [ ] Animations smooth
- [ ] Safe area respected (iOS)

## 🛠️ Utility Classes

### Visibility
```html
<div class="hide-mobile">Desktop only</div>
<div class="show-mobile">Mobile only</div>
<div class="hide-tablet">Not tablet</div>
<div class="show-tablet">Tablet only</div>
```

### Responsive Grid
```html
<div class="grid-responsive">
  <!-- Auto-adjusts columns based on screen size -->
</div>
```

### Responsive Flex
```html
<div class="flex-responsive">
  <!-- Column on mobile, row on desktop -->
</div>
```

## 📊 Grid System

### Mobile (< 768px)
- Single column layouts
- Full width components
- Stacked elements

### Tablet (768px - 1023px)
- 2-column grids
- Balanced spacing
- Touch-optimized

### Desktop (≥ 1024px)
- 3-4 column grids
- Maximum spacing
- Hover interactions

## 🎯 Best Practices

1. **Mobile First**: Always start with mobile design
2. **Progressive Enhancement**: Add features for larger screens
3. **Touch Targets**: Minimum 44px × 44px
4. **Readable Text**: Minimum 16px base font
5. **Performance**: Optimize for mobile (slowest device)
6. **Testing**: Test on real devices, not just browser dev tools
7. **Accessibility**: Support keyboard navigation and screen readers
8. **Safe Areas**: Respect iOS notch and Android navigation bars

## 🔧 Maintenance

### Adding New Components
1. Start with mobile styles
2. Add tablet breakpoint (768px)
3. Add desktop breakpoint (1024px)
4. Test on real devices
5. Verify touch targets
6. Check accessibility

### Updating Breakpoints
All breakpoints are defined in `src/styles/responsive-system.css` as CSS variables for easy maintenance.

---

**Last Updated**: 2026-02-19
**Maintained By**: Principal Frontend Engineer
