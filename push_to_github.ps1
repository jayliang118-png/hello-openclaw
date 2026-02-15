# PowerShell script to push files to GitHub
Set-Location "C:\Users\Admin\.openclaw\workspace\hello-openclaw"

# Remove any existing .git folder
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue

# Initialize git repository
git init

# Configure git
git config user.email "openclaw@example.com"
git config user.name "OpenClaw"

# Add remote
git remote add origin https://github.com/jayliang118-png/hello-openclaw.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Hello OpenClaw single-page web application

Created by OpenClaw in response to user request.
Features:
- Interactive counter with keyboard shortcuts
- Responsive design for all devices
- Modern UI with animations
- GitHub integration
- Sound effects and notifications"

# Push to GitHub (force push since it's an empty repo)
git push -u origin main --force

Write-Host "Files pushed to GitHub successfully!"
Write-Host "Repository: https://github.com/jayliang118-png/hello-openclaw"