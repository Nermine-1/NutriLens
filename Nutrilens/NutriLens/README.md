# MealAnalysis

A web application for analyzing meals through image upload, providing detailed nutrition information and food detection.

## Features

- **Image Upload**: Upload images of your meals for analysis.
- **Food Detection**: Automatically detect foods in uploaded images.
- **Nutrition Analysis**: Get detailed nutritional information for detected foods.
- **User Authentication**: Secure login and signup functionality.
- **Dashboard**: View your meal history and analysis results.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used

This project is built with:

- **Vite**: Fast build tool and development server.
- **TypeScript**: Typed JavaScript for better development experience.
- **React**: Component-based UI library.
- **shadcn-ui**: Modern UI components.
- **Tailwind CSS**: Utility-first CSS framework.

## Installation

To run this project locally, ensure you have Node.js and npm installed. You can install Node.js using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd mealAnalysis

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Configure environment variables
cp .env.example .env
# Edit .env if needed to set your n8n webhook URL

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## ⚠️ Important: n8n Webhook Setup

**If your image analysis isn't working automatically**, you need to configure your n8n webhook properly.

### Quick Fix (3 Steps):
1. **Activate your n8n workflow** at https://nero1.app.n8n.cloud
2. **Add CORS headers** to your webhook node in n8n
3. **Restart your dev server**: `npm run dev`

📖 **See [ACTIVATION_CHECKLIST.md](./ACTIVATION_CHECKLIST.md) for step-by-step instructions**

### Additional Resources:
- [README_WEBHOOK_FIX.md](./README_WEBHOOK_FIX.md) - Quick start guide
- [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md) - Detailed setup and troubleshooting
- [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md) - What was changed to fix the webhook

### Test Your Webhook:
```bash
npm install form-data
node test-webhook.js path/to/image.jpg
```

## Usage

1. Sign up or log in to your account.
2. Navigate to the Analyze page.
3. Upload an image of your meal.
4. View the detected foods and nutritional information.
5. Check your meal history on the Dashboard.

## GitHub Pages Deployment

This project is configured for automated deployment to GitHub Pages using a GitHub Actions workflow.

### How it Works

- A push to the `main` branch automatically triggers the `deploy.yml` workflow.
- The workflow builds the application and deploys the production-ready files from the `dist` directory to the `gh-pages` branch.
- You can monitor the deployment progress in the **Actions** tab of your GitHub repository.

Once the deployment is complete, your application will be available at `https://<your-username>.github.io/NutriLens/`.
