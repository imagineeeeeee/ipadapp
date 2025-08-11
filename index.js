import { useState, useEffect } from 'react';

// This is a simple To-Do List app. It's designed as a Progressive Web App (PWA)
// which means it can be added to an iPad's home screen and will run in a
// full-screen, app-like experience.

// The app uses functional components and hooks for state management.
// Tailwind CSS is used for all styling.

export default function App() {
  // useState hook to manage the list of to-do items.
  const [todos, setTodos] = useState(() => {
    // Lazy initialization to get todos from local storage on first render.
    // This makes the app "remember" the list even if you close it.
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  // useState hook for the input field value.
  const [inputValue, setInputValue] = useState('');

  // useEffect hook to save the todos to local storage whenever the list changes.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Handler for adding a new to-do item.
  const handleAddTodo = (e) => {
    e.preventDefault();
    // Check if the input value is not empty.
    if (inputValue.trim()) {
      // Create a new to-do item with a unique ID and the input text.
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      // Add the new to-do to the list.
      setTodos([...todos, newTodo]);
      // Clear the input field.
      setInputValue('');
    }
  };

  // Handler for toggling the 'completed' status of a to-do item.
  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handler for deleting a to-do item.
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4 antialiased">
      {/* Container for the app with a clean card-like appearance */}
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-md mt-12 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">To-Do List</h1>
        
        {/* Form to add new to-do items */}
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new to-do..."
            className="flex-grow p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md active:scale-95"
          >
            Add
          </button>
        </form>

        {/* List of to-do items */}
        <ul className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 italic">You have no tasks! Add one above.</p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm transition-all duration-200"
              >
                <div
                  className="flex items-center flex-grow cursor-pointer"
                  onClick={() => handleToggleCompleted(todo.id)}
                >
                  {/* Checkbox-like icon */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 ${
                      todo.completed
                        ? 'bg-green-500 border-green-500'
                        : 'bg-white border-gray-300'
                    } flex items-center justify-center transition-all duration-200`}
                  >
                    {todo.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  
                  {/* To-do text with strike-through effect for completed items */}
                  <span
                    className={`flex-grow text-lg text-gray-700 transition-all duration-200 ${
                      todo.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="ml-4 p-2 text-red-500 hover:text-red-700 transition-all duration-200 active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      
      {/* Disclaimer for the example */}
      <p className="text-gray-500 text-sm mt-4 text-center max-w-sm">
        This is a live preview. To make a real app, you would need to host this code on a web server.
      </p>
    </div>
  );
}

// In a real PWA, you would also need to include these meta tags in your HTML's <head> section
// and create a manifest.json file. I'll provide examples of what these look like below.

/*
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- This meta tag is crucial for iOS to enable the "Add to Home Screen" functionality -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <!-- This sets the status bar style -->
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <!-- This is the icon that will appear on the home screen -->
  <link rel="apple-touch-icon" href="https://placehold.co/180x180/0000FF/FFFFFF?text=List">
  <!-- This links to the manifest file -->
  <link rel="manifest" href="/manifest.json">
*/

/*
  A typical manifest.json file would look something like this:
  {
    "name": "My To-Do App",
    "short_name": "ToDo",
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "icons": [
      {
        "src": "icons/icon-72x72.png",
        "sizes": "72x72",
        "type": "image/png"
      },
      ... and other sizes
    ]
  }
*/
