export const articles = {
  technology: [
    {
      id: 1,
      title: "Getting Started with React",
      slug: "getting-started-with-react",
      content: `
        <article class="prose lg:prose-xl max-w-none">
          <h1>Getting Started with React</h1>
          <p>React is a powerful JavaScript library for building user interfaces...</p>
          <h2>Key Concepts</h2>
          <ul>
            <li>Components</li>
            <li>Props</li>
            <li>State</li>
          </ul>
          <h2>Code Example</h2>
          <pre><code>
            function Welcome() {
              return <h1>Hello, React!</h1>;
            }
          </code></pre>
        </article>
      `
    },
    // Add more technology articles...
  ],
  design: [
    {
      id: 1,
      title: "UI Design Principles",
      slug: "ui-design-principles",
      content: `
        <article class="prose lg:prose-xl max-w-none">
          <h1>UI Design Principles</h1>
          <p>Good UI design follows several key principles...</p>
          <h2>Core Principles</h2>
          <ul>
            <li>Consistency</li>
            <li>Hierarchy</li>
            <li>Feedback</li>
          </ul>
        </article>
      `
    },
    // Add more design articles...
  ],
  // Add more categories...
}; 