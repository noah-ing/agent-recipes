# Agent Recipes

This project showcases various AI agent workflows with detailed explanations and code examples. It's built using Next.js and shadcn/ui components.

## Features

- Display of various AI agent workflows
- Detailed explanations and code examples for each workflow
- Responsive design with subtle animations
- Security enhancements including middleware, rate limiting, and input validation
- Error handling and logging
- Improved client-side data fetching with SWR

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env.local` file and add your TOGETHER_API_KEY
4. Run the development server with `npm run dev`

## Deployment

This project is configured for easy deployment on Vercel. Follow these steps:

1. Fork this repository to your GitHub account.
2. Create a new project on Vercel and link it to your forked repository.
3. In the Vercel dashboard, go to your project settings and add the following environment variable:
   - `TOGETHER_API_KEY`: Your Together API key
4. Deploy the project. Vercel will automatically detect the Next.js configuration and deploy accordingly.

You can also deploy directly from the command line using the Vercel CLI:

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

Follow the prompts to link your project and deploy.

## Testing

Run tests with `npm test`

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

This project is licensed under the MIT License.

