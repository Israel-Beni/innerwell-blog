# Innerwell Reflections

A modern Next.js application showcasing Innerwell's mental health reflections and insights. Built with TypeScript, Tailwind CSS, and React.

## Features

- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Search & Filter**: Search by title or slug, filter by date range
- **Real-time Updates**: Instant filtering and search results
- **Modern UI**: Clean, professional design matching Innerwell's brand
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized images and fast loading times

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React**: Modern React with hooks
- **Inter Font**: Clean, readable typography

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd innerwell-reflections
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page component
├── components/
│   ├── FilterPanel.tsx  # Search and filter controls
│   └── ReflectionCard.tsx # Individual reflection card
└── types/
    └── reflection.ts    # TypeScript interfaces
```

## Components

### FilterPanel
- Search functionality for titles and slugs
- Date range filtering
- Real-time results counter
- Clear filters functionality

### ReflectionCard
- Displays reflection information
- Click to open in new window
- Formatted date display
- Responsive image handling

## Data Structure

Each reflection includes:
- `title`: Article title
- `slug`: URL-friendly identifier
- `imageUrl`: Featured image URL
- `alt`: Image alt text
- `author`: Article author
- `publishDate`: Publication date (YYYY-MM-DD)
- `wordCount`: Word count or "N/A"

## Styling

The application uses Tailwind CSS with a custom design system:
- **Colors**: Blue and gray palette matching Innerwell's brand
- **Typography**: Inter font for clean readability
- **Spacing**: Consistent spacing using Tailwind's scale
- **Shadows**: Subtle shadows for depth and hierarchy

## Deployment

The application can be deployed to Vercel, Netlify, or any other Next.js-compatible platform.

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for demonstration purposes only.

## About Innerwell

Innerwell is a mental health platform connecting individuals with qualified therapists and psychiatrists. This application showcases their reflections and insights on mental health topics.
# innerwell-blog
