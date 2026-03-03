# StudyContext - Deployment Guide

## 🚀 Deployment Instructions

### Backend Deployment (Render)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `studycontext-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

4. **Add Environment Variables in Render**
   - Go to "Environment" tab
   - Add these variables:
     ```
     MONGODB_URI=<your-mongodb-atlas-connection-string>
     JWT_SECRET=<your-secret-key>
     GEMINI_API_KEY=<your-gemini-api-key>
     PORT=5000
     ```

5. **Get Backend URL**
   - After deployment, copy your backend URL (e.g., `https://studycontext-backend.onrender.com`)

---

### Frontend Deployment (Vercel)

1. **Update API URL**
   - Create `.env` file in root:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

2. **Update axios baseURL**
   - In your frontend code, replace `http://localhost:5000` with `import.meta.env.VITE_API_URL`

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Add New" → "Project"
   - Import your repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `./` (leave as root)
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

4. **Add Environment Variable in Vercel**
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

5. **Redeploy**
   - Go to "Deployments" → Click "..." → "Redeploy"

---

## 📝 Important Notes

### MongoDB Atlas Setup
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist all IPs: `0.0.0.0/0` (for Render access)
5. Get connection string

### CORS Configuration
Make sure your backend allows your Vercel domain:
```javascript
app.use(cors({
  origin: ['https://your-vercel-app.vercel.app', 'http://localhost:5173']
}));
```

### Free Tier Limitations
- **Render**: Backend sleeps after 15 min inactivity (first request takes ~30s)
- **Vercel**: 100GB bandwidth/month
- **MongoDB Atlas**: 512MB storage

---

## 🔧 Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
npm install
npm run dev
```

---

## 📦 Project Structure
```
study-context-app/
├── backend/              # Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   └── package.json
├── src/                  # React frontend
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── App.jsx
├── public/
├── package.json
└── vercel.json
```

---

## 🌐 Live URLs (After Deployment)
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

---

## 🐛 Troubleshooting

### Backend not responding
- Check Render logs
- Verify environment variables
- Check MongoDB connection string

### Frontend API errors
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Check browser console for errors

### Build failures
- Clear node_modules and reinstall
- Check Node version compatibility
- Verify all dependencies in package.json
