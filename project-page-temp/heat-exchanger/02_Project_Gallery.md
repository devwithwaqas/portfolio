# Project Gallery Section

## Title
📸 Project Gallery

## Description
Custom image carousel showcasing the Heat Exchanger Portal interface and features with advanced 3D animations and effects.

## Features
- **Custom Vue.js carousel** (replaced Swiper.js)
- **3D flip/rotate transitions** with perspective effects
- **Autoplay with pause on hover**
- **Custom navigation arrows** with hover effects
- **Pagination dots overlay** on images with glassmorphism
- **Smooth transitions** with cubic-bezier easing
- **Multiple images** (he1.jpg through he4.jpg)
- **Responsive design** for all screen sizes

## Design Notes
- **Gradient background** (purple to pink to blue)
- **Animated background patterns** (radial gradients)
- **Floating orbs animation**
- **Border glow animation**
- **Glassmorphism effects**
- **Different theme** from reusable card (matches Project Header)
- **Min height**: 600px
- **Pagination overlay** positioned on image with backdrop blur

## Technical Implementation
- **Custom Vue.js component** with reactive data
- **3D CSS transforms** (rotateY, rotateX, translateZ)
- **Perspective effects** for depth
- **Image filtering** (brightness, contrast, saturation, blur)
- **Smooth transitions** with 0.8s duration
- **Autoplay interval**: 4000ms
- **Transition effects**: Scale + rotate + translate
- **Active slide**: Full scale, no rotation
- **Adjacent slides**: 80% scale, 90° rotation, blur effect

## Usage
```vue
<ProjectGallery 
  :title="galleryData.title"
  :projectName="galleryData.projectName"
  :images="galleryData.images"
/>
```

## Props
- `title`: Gallery section title
- `projectName`: Project name for alt text
- `images`: Array of image URLs

