#!/bin/bash
# A script to automate git add, commit, push, and Vercel deployment with no prompts

# Asking for the coded commit message
echo "Enter commit message:"
read commitMessage
# Stage all changes
echo "Staging all changes..."
git add .
echo "Changes staged."

# Commit the changes
echo "Committing changes..."
git commit -m "$commitMessage"
echo "Changes committed with message: $commitMessage"

# Push to all branches
echo "Pushing to all branches..."
git push all
echo "Push completed."

# Deploy to Vercel (Production)
echo "Deploying to Vercel in production mode..."
vercel --prod
echo "Deployment to production completed."
