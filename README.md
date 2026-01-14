# 🍔 BiteOrder - Order Management System

**BiteOrder** is a modern web application developed for intelligent order management in restaurants, using FIFO and LIFO queue algorithms to optimize service.

## 🚀 Technologies Used

- **React 19** - Framework for user interfaces
- **React Router Dom 7.8** - Client-side routing
- **Vite** - Build tool and dev server
- **Firebase** - Backend as a Service (authentication and Firestore)
- **Framer Motion** - Smooth animations
- **CSS3** - Responsive and modern styling

## ✨ Main Features

### 🔐 Authentication System
- Login with email/password
- Google OAuth integration
- New user registration
- Protected authenticated routes

### 📋 Order Management
- **FIFO Queue** - Regular orders (first in, first out)
- **LIFO Queue** - Express orders (last in, first out)
- Real-time updates via Firestore
- Sound notifications for new orders
- Dynamic order counters

### 🎨 Modern Interface
- Responsive design for all screens
- Smooth navigation with React Router
- Animations with Framer Motion
- Custom 404 pages
- Visual loading feedback

## 📁 Project Structure

```
biteOrder/
├── src/
│   ├── components/          # Reusable components
│   │   └── Navigation.jsx   # Navigation menu
│   ├── pages/              # Application pages
│   │   ├── home.jsx        # Home page
│   │   ├── login.jsx       # Authentication
│   │   ├── register.jsx    # Registration
│   │   ├── dashboard.jsx   # Main dashboard
│   │   ├── sobre.jsx       # About page
│   │   ├── contactos.jsx   # Contact page
│   │   └── NotFound.jsx    # 404 page
│   ├── firebase/           # Firebase configuration
│   ├── styles/             # CSS files
│   └── App.jsx             # Root component
├── public/                 # Public files
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```

## 🚀 How to Run

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repo-url]
cd biteOrder

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

### Firebase Configuration
1. Create a project in Firebase Console
2. Configure Authentication (Email/Password and Google)
3. Create a Firestore database
4. Copy credentials to `src/firebase/config.js`

## 🌐 Vercel Deployment

The project is optimized for Vercel deployment with:
- Configured `vercel.json` file for SPAs
- Automatic redirection of all routes to `index.html`
- Configured security headers
- Full React Router support

### Deployment Steps:
1. Connect the repository to Vercel
2. Settings are automatically detected
3. All routes will work perfectly after deployment

## 🔄 Queue Algorithms

### FIFO (First In, First Out) - Regular Orders
- Orders are processed in order of arrival
- Ensures fair service
- Ideal for normal restaurant operation

### LIFO (Last In, First Out) - Express Orders
- Last order has maximum priority
- For urgent situations
- Immediate service when needed

## 🎯 Technical Improvements

- **Performance**: Lazy loading and bundle optimizations
- **SEO**: Meta tags and semantic structure
- **Accessibility**: Labels, ARIA, and keyboard navigation
- **Security**: Client/server validation and security headers
- **UX**: Visual feedback, loading states, and animations

## 📱 Responsiveness

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Interface adapted for medium screens
- **Desktop**: Full use of large screens
- **Touch**: Gestures and tactile interactions

## 🐛 Debug and Logs

- Clean console without errors
- Proper exception handling
- Clear feedback for users
- Structured logs for development

## 🏆 Results

✅ **100%** of routes working on Vercel
✅ **0** linting errors
✅ Successful **build**
✅ Smooth **navigation** without reloads
✅ **State** preserved between pages
✅ Optimized **performance**

## 👨‍💻 Developer

**Alcino Luvualo**
- GitHub: [@alcino-luvualo](https://github.com/alcino-luvualo)
- Email: Alcinoluvualo@gmail.com

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

---

*Project developed with ❤️ to demonstrate React best practices and modern frontend architecture.*
