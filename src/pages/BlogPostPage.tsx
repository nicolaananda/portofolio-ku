import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';

// Mock blog post data (would come from API in production)
const blogPosts = [
  {
    id: "1",
    title: "Data Analyst with Python: A Comprehensive Guide",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    category: "Data Analyst",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      bio: "Data Analyst and Web Developer with expertise in Python, React, and data visualization."
    },
    content: `
      <p>Python has become the go-to language for Data Analyst due to its rich ecosystem of libraries and tools. In this comprehensive guide, we'll explore how to leverage Python's powerful Data Analyst libraries to extract insights from your data.</p>

      <h2>Essential Python Libraries for Data Analyst</h2>
      <p>When working with data in Python, these libraries are essential:</p>
      <ul>
        <li>Pandas: For data manipulation and analysis</li>
        <li>NumPy: For numerical computing</li>
        <li>Matplotlib: For data visualization</li>
        <li>Seaborn: For statistical data visualization</li>
        <li>Scikit-learn: For machine learning</li>
      </ul>

      <h2>Getting Started with Pandas</h2>
      <p>Pandas is the most widely used library for Data Analyst in Python. Here's a basic example of how to use it:</p>
      <pre><code>import pandas as pd
import numpy as np

# Create a sample DataFrame
df = pd.DataFrame({
    'Name': ['John', 'Anna', 'Peter'],
    'Age': [28, 22, 35],
    'City': ['New York', 'Paris', 'Berlin']
})

# Basic operations
print(df.head())  # Display first 5 rows
print(df.describe())  # Statistical summary
print(df.groupby('City').mean())  # Group by city and calculate mean</code></pre>

      <h2>Data Visualization with Matplotlib and Seaborn</h2>
      <p>Visualizing data is crucial for understanding patterns and trends. Here's how to create effective visualizations:</p>
      <pre><code>import matplotlib.pyplot as plt
import seaborn as sns

# Create a line plot
plt.figure(figsize=(10, 6))
plt.plot(df['Age'], label='Age Distribution')
plt.title('Age Distribution')
plt.xlabel('Index')
plt.ylabel('Age')
plt.legend()
plt.show()

# Create a heatmap
sns.heatmap(df.corr(), annot=True)
plt.show()</code></pre>

      <h2>Data Cleaning and Preprocessing</h2>
      <p>Before analysis, data often needs cleaning. Here are common techniques:</p>
      <pre><code># Handle missing values
df.fillna(df.mean(), inplace=True)

# Remove duplicates
df.drop_duplicates(inplace=True)

# Convert data types
df['Date'] = pd.to_datetime(df['Date'])

# Normalize data
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
df['Normalized_Value'] = scaler.fit_transform(df[['Value']])</code></pre>

      <h2>Advanced Analysis Techniques</h2>
      <p>For more complex analysis, you might need these techniques:</p>
      <ul>
        <li>Time Series Analysis</li>
        <li>Statistical Testing</li>
        <li>Machine Learning Models</li>
        <li>Natural Language Processing</li>
      </ul>

      <h2>Best Practices for Data Analyst</h2>
      <p>To ensure reliable and reproducible analysis:</p>
      <ol>
        <li>Always document your data sources and cleaning steps</li>
        <li>Use version control for your analysis code</li>
        <li>Create reproducible environments with requirements.txt</li>
        <li>Validate your results with statistical tests</li>
        <li>Visualize your findings effectively</li>
      </ol>

      <h2>Conclusion</h2>
      <p>Python provides a powerful and flexible environment for Data Analyst. By mastering these tools and techniques, you can extract valuable insights from your data and make data-driven decisions.</p>
    `
  },
  {
    id: "2",
    title: "Building Modern Web Applications with React",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=80",
    category: "Web Development",
    date: "June 3, 2023",
    readTime: "7 min read",
    author: {
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      bio: "Full-stack developer specializing in React, Node.js, and modern web technologies."
    },
    content: `
      <p>React has revolutionized web development by providing a component-based architecture that makes building complex user interfaces more manageable and maintainable.</p>

      <h2>Modern React Development</h2>
      <p>Today's React development involves several key concepts and tools:</p>
      <ul>
        <li>Functional Components and Hooks</li>
        <li>TypeScript for type safety</li>
        <li>State management with Context or Redux</li>
        <li>Modern build tools like Vite</li>
        <li>Component libraries like Material-UI or Tailwind CSS</li>
      </ul>

      <h2>Setting Up a Modern React Project</h2>
      <p>Here's how to start a new React project with modern tools:</p>
      <pre><code># Create a new project with Vite
npm create vite@latest my-react-app -- --template react-ts

# Install dependencies
cd my-react-app
npm install

# Add essential packages
npm install @tanstack/react-query axios tailwindcss @headlessui/react</code></pre>

      <h2>Building Reusable Components</h2>
      <p>Creating reusable components is key to maintainable React applications:</p>
      <pre><code>import { useState } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ variant = 'primary', children, onClick }: ButtonProps) => {
  return (
    <button
      className={\`px-4 py-2 rounded \${
        variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};</code></pre>

      <h2>State Management</h2>
      <p>For complex applications, proper state management is crucial:</p>
      <pre><code>import { createContext, useContext, useReducer } from 'react';

// Define state and actions
type State = {
  count: number;
};

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' };

// Create context
const CountContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Create provider
export const CountProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  );
};</code></pre>

      <h2>Data Fetching with React Query</h2>
      <p>Modern data fetching in React applications:</p>
      <pre><code>import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </div>
  );
}</code></pre>

      <h2>Performance Optimization</h2>
      <p>Key techniques for optimizing React applications:</p>
      <ul>
        <li>Use React.memo for expensive components</li>
        <li>Implement virtualization for long lists</li>
        <li>Lazy load components and routes</li>
        <li>Optimize images and assets</li>
        <li>Use proper dependency arrays in useEffect</li>
      </ul>

      <h2>Testing React Applications</h2>
      <p>Modern testing approaches for React components:</p>
      <pre><code>import { render, screen, fireEvent } from '@testing-library/react';

test('Button click handler is called', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalled();
});</code></pre>

      <h2>Conclusion</h2>
      <p>Building modern web applications with React requires understanding both the core concepts and the ecosystem of tools and libraries. By following best practices and using modern tools, you can create scalable and maintainable applications.</p>
    `
  },
  {
    id: "3",
    title: "State Management in Modern React Applications",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    category: "React",
    date: "July 12, 2023",
    readTime: "8 min read",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80",
      bio: "Software Engineer specializing in React and state management solutions."
    },
    content: `
      <p>State management has always been one of the most challenging aspects of building React applications. As applications grow in complexity, managing state efficiently becomes increasingly important.</p>

      <p>In this article, we'll explore various state management approaches in React and discuss when each one is most appropriate.</p>

      <h2>Local Component State with useState</h2>
      <p>The simplest form of state in React is component state managed with the useState hook:</p>
      <pre><code>import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}</code></pre>

      <p>Local state is perfect for:</p>
      <ul>
        <li>UI state that only affects a single component</li>
        <li>Form inputs and controlled components</li>
        <li>Toggle states (open/closed, visible/hidden)</li>
        <li>Small, isolated features</li>
      </ul>

      <h2>Lifting State Up</h2>
      <p>When multiple components need to share state, you can lift the state to their closest common ancestor:</p>
      <pre><code>function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <DisplayCount count={count} />
      <ButtonPanel onIncrement={() => setCount(count + 1)} />
    </div>
  );
}

function DisplayCount({ count }) {
  return <p>Count: {count}</p>;
}

function ButtonPanel({ onIncrement }) {
  return <button onClick={onIncrement}>Increment</button>;
}</code></pre>

      <p>This approach works well when:</p>
      <ul>
        <li>A small number of components need to share state</li>
        <li>The component tree is not too deep</li>
        <li>The state updates are simple</li>
      </ul>

      <h2>Context API for Medium-Scope State</h2>
      <p>React's Context API provides a way to share state between components without prop drilling:</p>
      <pre><code>// Creating the context
import { createContext, useState, useContext } from 'react';

const CountContext = createContext();

// Provider component
function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

// Custom hook for consuming the context
function useCount() {
  return useContext(CountContext);
}

// Using the context in components
function DisplayCount() {
  const { count } = useCount();
  return <p>Count: {count}</p>;
}

function IncrementButton() {
  const { count, setCount } = useCount();
  return <button onClick={() => setCount(count + 1)}>Increment</button>;
}

// App composition
function App() {
  return (
    <CountProvider>
      <DisplayCount />
      <IncrementButton />
    </CountProvider>
  );
}</code></pre>

      <p>Context is ideal for:</p>
      <ul>
        <li>Theme settings</li>
        <li>User authentication state</li>
        <li>Preferences and settings</li>
        <li>Localization data</li>
        <li>Medium-scope state that doesn't change frequently</li>
      </ul>

      <h2>useReducer for Complex State Logic</h2>
      <p>When state logic becomes complex, useReducer offers a more structured approach:</p>
      <pre><code>import { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    case 'SET':
      return { ...state, count: action.payload };
    default:
      throw new Error(\`Unhandled action type: \${action.type}\`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ 
        type: 'SET', 
        payload: 100 
      })}>Set to 100</button>
    </div>
  );
}</code></pre>

      <p>useReducer is helpful when:</p>
      <ul>
        <li>State transitions are complex</li>
        <li>Next state depends on previous state</li>
        <li>State logic needs to be centralized</li>
        <li>Actions need to be logged or debugged</li>
        <li>You prefer a more explicit state update pattern</li>
      </ul>

      <h2>Context + useReducer: The Redux Pattern</h2>
      <p>For larger applications, combining Context with useReducer provides a Redux-like pattern without external libraries:</p>
      <pre><code>import { createContext, useReducer, useContext } from 'react';

// Create context
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return { ...state, count: state.count + 1 };
    case 'TOGGLE_THEME':
      return { ...state, darkMode: !state.darkMode };
    // More cases...
    default:
      return state;
  }
}

// Provider component
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    count: 0,
    darkMode: false,
    // More initial state...
  });
  
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// Custom hooks
function useAppState() {
  return useContext(AppStateContext);
}

function useAppDispatch() {
  return useContext(AppDispatchContext);
}

// Component usage
function Counter() {
  const { count } = useAppState();
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => 
        dispatch({ type: 'INCREMENT_COUNTER' })
      }>
        Increment
      </button>
    </div>
  );
}</code></pre>

      <h2>External State Management Libraries</h2>
      <h3>Redux</h3>
      <p>Redux remains popular for large applications with complex state needs:</p>
      <ul>
        <li>Centralized store with predictable state updates</li>
        <li>Time-travel debugging with Redux DevTools</li>
        <li>Middleware for side effects (Redux Thunk, Redux Saga)</li>
        <li>Extensive ecosystem and community</li>
      </ul>
      <p>However, Redux adds complexity and boilerplate that may not be necessary for many applications.</p>

      <h3>Zustand</h3>
      <p>Zustand is a minimalist state management library that's gaining popularity:</p>
      <pre><code>import create from 'zustand';

const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 })
}));

function Counter() {
  const { count, increment, reset } = useStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}</code></pre>

      <h3>Jotai and Recoil</h3>
      <p>For atomic state management, Jotai and Recoil offer approaches that avoid the global store concept:</p>
      <pre><code>// Jotai example
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}</code></pre>

      <h3>React Query for Server State</h3>
      <p>React Query has emerged as the preferred solution for managing server state:</p>
      <pre><code>import { useQuery, useMutation } from 'react-query';

function TodoList() {
  const { data, isLoading } = useQuery('todos', fetchTodos);
  const mutation = useMutation(createTodo);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data.map(todo => <Todo key={todo.id} {...todo} />)}
      <button onClick={() => mutation.mutate({ title: 'New Todo' })}>
        Add Todo
      </button>
    </div>
  );
}</code></pre>

      <h2>Choosing the Right Approach</h2>
      <p>When deciding on a state management approach, consider:</p>
      <ol>
        <li><strong>Scope</strong>: How widely is the state used across components?</li>
        <li><strong>Complexity</strong>: How complex are the state updates?</li>
        <li><strong>Update frequency</strong>: How often does the state change?</li>
        <li><strong>Developer experience</strong>: What approach is most comfortable for your team?</li>
        <li><strong>Future needs</strong>: Will the application grow in complexity?</li>
      </ol>

      <h2>Conclusion</h2>
      <p>There's no one-size-fits-all solution for state management in React. The best approach often involves using multiple strategies in the same application:</p>
      <ul>
        <li>useState for local UI state</li>
        <li>useReducer for complex state logic</li>
        <li>Context API for shared state</li>
        <li>React Query for server state</li>
        <li>External libraries when needed for specific requirements</li>
      </ul>
      <p>By understanding the strengths and trade-offs of each approach, you can make informed decisions that keep your application maintainable and performant as it grows.</p>
    `
  },
  {
    id: "4",
    title: "TypeScript Best Practices for Frontend Developers",
    coverImage: "https://images.unsplash.com/photo-1564865878688-9a244444042a?w=800&auto=format&fit=crop&q=80",
    category: "TypeScript",
    date: "August 22, 2023",
    readTime: "10 min read",
    author: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      bio: "Senior Frontend Developer who loves TypeScript and teaching best practices."
    },
    content: `
      <p>TypeScript has revolutionized frontend development by bringing static typing to JavaScript. However, simply using TypeScript doesn't automatically make your code better - you need to use it effectively.</p>

      <p>In this article, we'll explore best practices that will help you leverage TypeScript's full potential in your frontend projects.</p>

      <h2>Use Strict Type Checking</h2>
      <p>Always enable strict type checking in your tsconfig.json:</p>
      <pre><code>{
  "compilerOptions": {
    "strict": true,
    // This enables all strict type checking options
    // Or enable specific checks:
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true
  }
}</code></pre>

      <p>Using strict mode helps catch more errors at compile time and forces you to be explicit about your types.</p>

      <h2>Type Interfaces vs. Type Aliases</h2>
      <p>Both interfaces and type aliases let you define custom types, but they have subtle differences:</p>
      <pre><code>// Interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Type alias
type User = {
  id: number;
  name: string;
  email: string;
};</code></pre>

      <p>General recommendations:</p>
      <ul>
        <li>Use <code>interface</code> for public API definitions when you want to allow extension</li>
        <li>Use <code>type</code> for unions, intersections, and when you need exact types without extension</li>
        <li>Be consistent within your codebase</li>
      </ul>
      
      <p>Interfaces can be extended or implemented:</p>
      <pre><code>interface BaseUser {
  id: number;
  name: string;
}

interface User extends BaseUser {
  email: string;
}</code></pre>

      <p>Type aliases are better for complex types:</p>
      <pre><code>type Status = 'idle' | 'loading' | 'success' | 'error';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type UserResponse = User | Error;</code></pre>

      <h2>Avoid Type Assertions When Possible</h2>
      <p>Type assertions (using <code>as</code>) bypass TypeScript's type checking:</p>
      <pre><code>// Avoid this pattern when possible
const userData = JSON.parse(response) as User;</code></pre>

      <p>Instead, validate data at runtime:</p>
      <pre><code>// Using a validation library like zod
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});

// This will validate at runtime
const userData = UserSchema.parse(JSON.parse(response));</code></pre>

      <h2>Use Discriminated Unions for Type Safety</h2>
      <p>Discriminated unions are powerful for handling different states:</p>
      <pre><code>type RequestState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function renderContent<T>(state: RequestState<T>) {
  switch (state.status) {
    case 'idle':
      return <div>Not started</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <div>Data: {JSON.stringify(state.data)}</div>;
    case 'error':
      return <div>Error: {state.error.message}</div>;
  }
}</code></pre>

      <p>This pattern ensures exhaustive checks and proper type narrowing.</p>

      <h2>Type React Components and Props Properly</h2>
      <p>For function components:</p>
      <pre><code>import { FC, ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

// Using FC type (includes children implicitly)
const Button: FC<Omit<ButtonProps, 'children'>> = ({
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  children
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Alternative approach (more explicit)
function Button({
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  children
}: ButtonProps) {
  // ...
}</code></pre>

      <h2>Use Generics for Reusable Components</h2>
      <p>Generics make components more flexible while maintaining type safety:</p>
      <pre><code>interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({
  items,
  renderItem,
  keyExtractor,
}: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/></code></pre>

      <h2>Define Proper Return Types for Functions</h2>
      <p>Always specify return types for functions, especially for complex or exported functions:</p>
      <pre><code>// Explicitly define return types
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// For async functions
async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}</code></pre>

      <h2>Use TypeScript with React Hooks</h2>
      <p>Properly type your hooks for better developer experience:</p>
      <pre><code>// useState with proper type
const [user, setUser] = useState<User | null>(null);

// useReducer with typed actions and state
type State = { count: number };

type Action = 
  | { type: 'increment'; amount: number }
  | { type: 'decrement'; amount: number }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.amount };
    case 'decrement':
      return { count: state.count - action.amount };
    case 'reset':
      return { count: 0 };
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });

// useRef with proper type
const inputRef = useRef<HTMLInputElement>(null);</code></pre>

      <h2>Create Custom Type Definitions</h2>
      <p>For third-party libraries without TypeScript definitions, create your own:</p>
      <pre><code>// src/types/some-library.d.ts
declare module 'some-library' {
  export function someFunction(arg: string): number;
  
  export interface SomeOptions {
    timeout?: number;
    retry?: boolean;
  }
  
  export default function main(options?: SomeOptions): void;
}</code></pre>

      <h2>Use Utility Types</h2>
      <p>TypeScript provides useful utility types for common transformations:</p>
      <pre><code>// Make all properties optional
type PartialUser = Partial<User>;

// Pick specific properties
type UserCredentials = Pick<User, 'email' | 'password'>;

// Omit specific properties
type PublicUser = Omit<User, 'password' | 'secretKey'>;

// Make all properties required
type RequiredUser = Required<User>;

// Extract return type of a function
type FetchResult = ReturnType<typeof fetchData>;

// Make all properties readonly
type ReadonlyUser = Readonly<User>;</code></pre>

      <h2>Type Event Handlers Properly</h2>
      <p>React events should be typed correctly:</p>
      <pre><code>// Button click event
function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
  event.preventDefault();
  // ...
}

// Form submission
function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
  event.preventDefault();
  // ...
}

// Input change
function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
  const value = event.target.value;
  // ...
}</code></pre>

      <h2>Use Enums Sparingly</h2>
      <p>TypeScript enums can be helpful but have some drawbacks. Consider using union types instead for simpler cases:</p>
      <pre><code>// Instead of enum
// enum Role {
//   ADMIN = 'admin',
//   USER = 'user',
//   GUEST = 'guest'
// }

// Prefer union type
type Role = 'admin' | 'user' | 'guest';

function checkAccess(role: Role) {
  if (role === 'admin') {
    // Admin only functionality
  }
}</code></pre>

      <h2>Create Type-Safe API Clients</h2>
      <p>Define your API responses and requests with TypeScript:</p>
      <pre><code>interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface ErrorResponse {
  error: string;
  status: number;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.error);
  }
  
  return response.json();
}

// Usage
interface User {
  id: number;
  name: string;
}

// Type is inferred correctly
const response = await fetchData<User[]>('/api/users');</code></pre>

      <h2>Use Path Aliases</h2>
      <p>Configure path aliases in tsconfig.json for cleaner imports:</p>
      <pre><code>{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"]
    }
  }
}

// Instead of
import Button from '../../../../components/Button';

// You can write
import Button from '@components/Button';</code></pre>

      <h2>Conclusion</h2>
      <p>TypeScript adds tremendous value to frontend development when used correctly. By following these best practices, you can create more robust applications with fewer runtime errors and better developer experience.</p>
      
      <p>Remember that TypeScript is a tool to help you write better code—it's not a substitute for good design and testing. Use it to enhance your development process, not to complicate it unnecessarily.</p>
      
      <p>As you continue to work with TypeScript, you'll develop a feel for when to be strict with types and when to be more flexible. The goal is to find the right balance that maximizes productivity and code quality for your specific project needs.</p>
    `
  }
];

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPost = () => {
      setIsLoading(true);
      setTimeout(() => {
        const foundPost = blogPosts.find(post => post.id === id);
        setPost(foundPost);
        setIsLoading(false);
        
        // Set page title
        if (foundPost) {
          document.title = `${foundPost.title} | Blog`;
        }
      }, 500); // Simulate loading
    };
    
    fetchPost();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="glass-effect rounded-2xl p-12 text-center">
          <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent mb-6"></div>
          <p className="text-lg text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <div className="glass-effect rounded-2xl p-12 text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section with Cover Image */}
      <section className="relative overflow-hidden">
        <div className="container px-4">
          <AnimatedSection>
            <Link to="/blog" className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
            
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="h-[50vh] w-full object-cover object-center md:h-[60vh]" 
              />
              
              {/* Overlay content */}
              <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold shadow-lg">
                    {post.category}
                  </span>
                </div>
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{post.title}</h1>
                
                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
        
      {/* Content Section */}
      <section className="py-20">
        <div className="container px-4">
          <AnimatedSection delay={100} className="mx-auto max-w-4xl">
            {/* Author Info */}
            <div className="glass-effect rounded-2xl p-8 mb-12">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="h-16 w-16 rounded-2xl object-cover shadow-lg" 
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30"></div>
                </div>
                <div>
                  <p className="text-xl font-bold">{post.author.name}</p>
                  <p className="text-muted-foreground mt-1">{post.author.bio}</p>
                </div>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="glass-effect rounded-2xl p-8 md:p-12">
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-none
                             prose-headings:text-foreground 
                             prose-headings:font-bold
                             prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                             prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                             prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                             prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                             prose-strong:text-foreground prose-strong:font-semibold
                             prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                             prose-li:mb-2 prose-li:leading-relaxed
                             prose-pre:bg-muted prose-pre:border prose-pre:rounded-xl prose-pre:p-6
                             prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded
                             prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic"
                   dangerouslySetInnerHTML={{ __html: post.content }}>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                <p className="text-muted-foreground mb-6">Check out more articles on our blog for insights on data analysis and web development.</p>
                <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium">
                  <Link to="/blog">Read More Articles</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
