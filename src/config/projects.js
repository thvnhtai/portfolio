// Projects Configuration
// Update with your actual projects

export const projects = [
  {
    id: 1,
    title: 'NFT-Based Notarization Platform',
    description: 'Online notarization platform based on Blockchain and NFT technology, ensuring transparency and security for notarization transactions.',
    fullDescription: 'An online notarization management system using Blockchain and NFT technology to ensure authenticity and prevent forgery of notarized documents. This platform allows users to perform remote notarization safely and transparently.',
    features: [
      'Online document notarization',
      'Blockchain and NFT integration for authentication',
      'Notarization record management',
      'Admin dashboard',
      'Transparent transaction history',
      'High security with encryption',
    ],
    technologies: ['React', 'JavaScript', 'Blockchain', 'NFT', 'Web3'],
    image: '🔐',
    category: 'Full Stack',
    featured: true,
    liveUrl: '', // Add your live demo URL if available
    githubUrl: 'https://github.com/ASE-UIT/03.-Online-Notarization-Management-System-FE',
    challenges: 'The main challenge was integrating Blockchain and NFT technology into the traditional notarization system. I solved this by using Web3.js to interact with smart contracts and creating NFTs for each notarized document, ensuring immutability and transparency.',
  },
  {
    id: 2,
    title: 'Resort Management System',
    description: 'Comprehensive resort management system with room management, booking, payment, and revenue reporting features.',
    fullDescription: 'A resort management system built to manage all operations of a resort from room management, booking, check-in/check-out, payment to revenue reporting and statistics. The system supports multiple room types, additional services, and payment integration.',
    features: [
      'Room and room type management',
      'Online booking system',
      'Automatic check-in/check-out',
      'Service and payment management',
      'Revenue reporting dashboard',
      'Customer and history management',
    ],
    technologies: ['React', 'TypeScript', 'ReactJS', 'REST API'],
    image: '🏨',
    category: 'Full Stack',
    featured: true,
    liveUrl: '', // Add your live demo URL if available
    githubUrl: '', // Add GitHub URL if available
    challenges: 'Building a complex management system with multiple interconnected modules was a major challenge. I solved this by using component-based architecture with React, state management with Redux Toolkit, and designing an optimized database schema to ensure performance and scalability.',
  },
  {
    id: 3,
    title: 'Enigma - AI-Powered Dropshipping Platform',
    description: 'Smart dropshipping platform using AI to automatically create and list products, making online business easier for users.',
    fullDescription: 'Enigma is a dropshipping platform that won the Encouragement Award at SEAPP CONTEST 2024. The platform uses AI technology to automate the product creation and management process, allowing users to profit from price differences without managing physical inventory.',
    features: [
      'AI-powered automatic product creation',
      'Product list management',
      'Order and payment system',
      'Profit tracking dashboard',
      'Multiple product source integration',
      'User-friendly interface',
    ],
    technologies: ['React', 'JavaScript', 'AI Integration', 'Node.js'],
    image: '🤖',
    category: 'Full Stack',
    featured: true,
    liveUrl: '', // Add your live demo URL if available
    githubUrl: 'https://github.com/FiveD-SE/Enigma-Frontend',
    challenges: 'Integrating AI into the product creation process was a major challenge. I solved this by using AI APIs to automatically generate product descriptions and images, while optimizing performance with lazy loading and caching to ensure smooth user experience.',
  },
  {
    id: 4,
    title: 'Custom T-Shirt & Tote Design with AI',
    description: 'Mobile application for designing custom t-shirts and tote bags using AI, allowing users to create unique products and place orders directly.',
    fullDescription: 'A mobile application that allows users to design custom t-shirts and tote bags with AI assistance. Users can upload images, edit designs, choose colors and materials, then place orders directly through the app.',
    features: [
      'AI-powered custom design',
      'Image upload and editing',
      'Color and material selection',
      '3D product preview',
      'Order and payment',
      'Order tracking',
    ],
    technologies: ['React Native', 'AI Integration', 'Firebase', 'Mobile'],
    image: '👕',
    category: 'Mobile',
    featured: false,
    liveUrl: '', // Add your live demo URL if available
    githubUrl: 'https://github.com/FiveD-SE/Enigma-Frontend', // Related to Enigma project
    challenges: 'Building a mobile application with AI features and image processing was a major challenge. I solved this by using React Native to ensure cross-platform compatibility, integrating AI APIs for image processing, and optimizing performance with image compression and lazy loading.',
  },
  {
    id: 5,
    title: 'Coffee Shop Management System',
    description: 'Comprehensive coffee shop management system on Android, supporting order management, inventory, and revenue reporting.',
    fullDescription: 'An Android application that helps coffee shop owners manage daily operations efficiently. The system includes order management, ingredient inventory, staff management, and detailed revenue reporting.',
    features: [
      'Order and menu management',
      'Ingredient inventory management',
      'Staff and shift management',
      'Revenue and statistics reporting',
      'Product cost calculation',
      'User-friendly Android interface',
    ],
    technologies: ['Android', 'Java', 'SQLite', 'Mobile'],
    image: '☕',
    category: 'Mobile',
    featured: false,
    liveUrl: '', // Add your live demo URL if available
    githubUrl: 'https://github.com/FiveD-SE/CoffeeShopManagement',
    challenges: 'Building an Android application with a complex database and multiple management features was challenging. I solved this by using SQLite for local data storage, designing an optimized database schema with clear relationships, and implementing real-time update features to ensure data synchronization.',
  },
  {
    id: 6,
    title: 'Voucher Management Dashboard',
    description: 'Voucher management system dashboard with data visualization reports and interactive filters, developed during internship at TMA Solutions.',
    fullDescription: 'A voucher management dashboard built with Next.js, Material UI, and Tailwind CSS. The system allows voucher management, usage tracking, and creates visual reports with interactive filters to analyze the effectiveness of marketing campaigns.',
    features: [
      'Voucher and campaign management',
      'Data visualization reports',
      'Interactive filters and search',
      'Detailed analytics dashboard',
      'Report export',
      'Responsive interface with Material UI',
    ],
    technologies: ['Next.js', 'Material UI', 'Tailwind CSS', 'TypeScript'],
    image: '🎫',
    category: 'Frontend',
    featured: false,
    liveUrl: '', // Add your live demo URL if available
    githubUrl: '', // Add GitHub URL if available (may be private repo)
    challenges: 'Building a dashboard with multiple filters and complex data visualization was challenging. I solved this by using Next.js to optimize performance, Material UI for consistent UI components, and implementing chart libraries to display data visually and interactively.',
  },
]
