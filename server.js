const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;
const WHATSAPP_URL = process.env.WHATSAPP_URL || 'https://wa.me/917231874241?text=Hyy**baby';

// Enable JSON body parsing and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cache-control for static assets
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h',
  etag: true
}));

// ==========================================
// UPTIMEROBOT & HEALTH CHECK ENDPOINTS
// ==========================================

/**
 * Fast UptimeRobot Ping Endpoint
 * Always returns 200 OK immediately with uptime data
 */
app.get('/ping', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Red Bull Invest Landing is live and healthy',
    uptime_seconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

/**
 * Extended Health Check
 */
app.get('/health', (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.status(200).json({
    service: 'Red Bull Invest Ad Landing Page',
    status: 'operational',
    environment: process.env.NODE_ENV || 'production',
    uptime_seconds: Math.floor(process.uptime()),
    memory: {
      rss_mb: (memoryUsage.rss / 1024 / 1024).toFixed(2),
      heap_used_mb: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2)
    },
    timestamp: new Date().toISOString()
  });
});

// Dynamic stats API for landing page live counter
app.get('/api/stats', (req, res) => {
  // Base numbers with realistic dynamic fluctuation
  const now = new Date();
  const minuteSeed = now.getMinutes() + now.getHours() * 60;
  
  const totalInvestors = 48250 + (minuteSeed * 3);
  const todayPayouts = 2840000 + (minuteSeed * 1850);
  const activeMembersOnline = 420 + ((minuteSeed * 7) % 180);

  res.json({
    totalInvestors: totalInvestors.toLocaleString('en-IN'),
    todayPayouts: '₹' + todayPayouts.toLocaleString('en-IN'),
    activeMembersOnline: activeMembersOnline,
    updatedAt: now.toISOString()
  });
});

// Direct vanity redirect to WhatsApp
app.get('/wa', (req, res) => {
  res.redirect(302, WHATSAPP_URL);
});

app.get('/join', (req, res) => {
  res.redirect(302, WHATSAPP_URL);
});

// Fallback route for SPA / clean URLs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Red Bull Invest Landing Running on Port: ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
  console.log(`💚 Ping endpoint: http://localhost:${PORT}/ping`);
  console.log(`📲 WhatsApp Link: ${WHATSAPP_URL}`);
  console.log(`===============================================`);

  // Render Keep-Alive Auto Self-Ping (Optional fallback for Render free tier)
  const renderUrl = process.env.RENDER_EXTERNAL_URL || process.env.APP_URL;
  if (renderUrl) {
    const pingTarget = renderUrl.endsWith('/') ? `${renderUrl}ping` : `${renderUrl}/ping`;
    console.log(`[KeepAlive] Self-ping active for Render URL: ${pingTarget}`);
    
    // Ping every 10 minutes (600,000 ms) to keep container awake
    setInterval(() => {
      try {
        const client = pingTarget.startsWith('https') ? require('https') : require('http');
        client.get(pingTarget, (resp) => {
          console.log(`[KeepAlive] Ping sent to ${pingTarget} - Status: ${resp.statusCode}`);
        }).on('error', (err) => {
          console.log(`[KeepAlive] Ping error: ${err.message}`);
        });
      } catch (e) {
        console.error(`[KeepAlive] Failed:`, e.message);
      }
    }, 10 * 60 * 1000);
  }
});
