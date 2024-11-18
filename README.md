# Task Manager Application

A modern, intuitive task management application built with Next.js, React, and Tailwind CSS. This application helps users organize their daily tasks with features like priority management, sorting, and real-time search capabilities.

## Features

- ✨ Clean and modern UI with smooth animations
- 📱 Fully responsive design
- ✅ Create, complete, and delete tasks
- 🏷️ Priority levels (Low, Medium, High)
- 🔍 Real-time search functionality
- 📊 Multiple sorting options (Date, Priority, Completion)
- 💾 Persistent storage using localStorage
- 🎨 Visual feedback with hover and active states
- 🎯 Priority-based color coding

## Setup and Installation

1. Clone the repository:

git clone [repository-url]
cd task-manager

2. Install dependencies:

npm install

# or

yarn install

3. Start the development server:

npm run dev

# or

yarn dev

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technologies Used

- **Next.js**: React framework for production
- **React**: Frontend library
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Modern icon library
- **LocalStorage**: For persistent data storage

## Key Components

1. **Task Input**

   - Add new tasks with priority levels
   - Form validation to prevent empty tasks

2. **Task List**

   - Animated task cards
   - Priority indicators
   - Complete/incomplete status
   - Delete functionality

3. **Search and Sort**
   - Real-time search filtering
   - Multiple sorting options
   - Responsive filter controls

## Development Assumptions

1. **Data Persistence**

   - Uses browser's localStorage for data persistence
   - No backend database required
   - Data is stored per browser/device

2. **User Experience**

   - Single user application
   - No authentication required
   - All tasks are stored locally

3. **Browser Support**

   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - Requires JavaScript enabled
   - LocalStorage API support

4. **Performance**
   - Optimized for lists up to 1000 tasks
   - Real-time search and sort operations
   - Smooth animations for better UX

## Future Enhancements

- Task categories/tags
- Due dates and reminders
- Dark mode support
- Task notes/descriptions
- Multi-user support
- Cloud synchronization
- Export/import functionality

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
