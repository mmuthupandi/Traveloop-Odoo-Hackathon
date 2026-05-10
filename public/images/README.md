# Login Page Image

## Required Image

Please save the travel van/mountains image as:
`travel-van-mountains.jpg`

This image should show:
- A vintage orange/cream VW van with "Traveloop" license plate
- Mountain landscape with snow-capped peaks
- Lake and pine trees
- Dirt road leading through the scenery
- Warm, golden hour lighting

## Image Specifications

- **Recommended size**: 1920x1080px or higher
- **Format**: JPG or PNG
- **Aspect ratio**: 16:9 or similar
- **File location**: `public/images/travel-van-mountains.jpg`

## How to Add the Image

1. Save your travel image to this folder (`public/images/`)
2. Name it: `travel-van-mountains.jpg`
3. The login page will automatically display it on the right side

## Alternative: Use a Different Image

If you want to use a different image name, update the path in:
`src/pages/login/LoginPage.tsx`

Look for this line:
```jsx
backgroundImage: "url('/images/travel-van-mountains.jpg')",
```

And change the filename to match your image.
