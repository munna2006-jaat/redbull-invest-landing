# 🔥 Red Bull Invest – High-Converting Ad Landing Page

Ads campaigns (Facebook, Instagram, Google Ads, Telegram) ke liye banaya gaya ultra high-converting landing page, jisme **WhatsApp integration** aur **Render 24×7 UptimeRobot support** shamil hai.

---

## 🚀 Key Features

- **High-Converting Ad Layout**: Mobile-first design jahan 90%+ traffic ads se direct convert hoti hai.
- **WhatsApp Integration**:
  - Target URL: `https://wa.me/917231874241?text=Hyy**baby`
  - Hero Giant Pulse Button
  - Floating WhatsApp Widget with online status badge & auto-message
  - Sticky Mobile Bottom Conversion Bar
  - Direct Vanity URLs: `/wa` & `/join`
- **Interactive Profit Calculator**: Users apni investment select karke daily aur total earnings calculate kar sakte hain.
- **Real-Time Live Payout Toasts**: Screen par har 10 seconds me real Indian users ke UPI withdrawal alerts aate hain (Social Proof).
- **Official Red Bull Investment Plans**:
  - **Product A**: ₹285 ➔ Daily ₹245 (Total ₹7,350 in 30 Days)
  - **Offer Plan**: ₹720 ➔ Daily ₹4,354 (Total ₹8,708 in 2 Days)
  - **Product C**: ₹1,000 ➔ Daily ₹8,586 (Total ₹25,758 in 3 Days)
  - **Product D**: ₹2,200 ➔ Daily ₹1,967 (Total ₹37,373 in 19 Days)
  - **Product F VIP**: ₹4,735 ➔ Daily ₹19,053 (Total ₹38,106 in 2 Days)
- **Exit-Intent Bonus Modal**: User ke chhodkar jane par ₹500 free sign-up bonus popup show hota hai.
- **Render & UptimeRobot Ready**:
  - Express server with `/ping` route (returns `200 OK` instantly).
  - Extended `/health` monitor route.
  - Built-in keepalive ping support.

---

## 🛠️ Local Testing

```bash
# 1. Folder me jayein
cd redbull-invest-landing

# 2. Dependencies install karein
npm install

# 3. Server start karein
npm start
```

Browser me open karein: `http://localhost:3000`  
Ping URL check karein: `http://localhost:3000/ping`

---

## 🌐 Render Par Host Karne Ka Tareeqa (Step-by-Step)

1. [Render.com](https://render.com) par login ya sign up karein.
2. Dashboard me **"New +"** par click karke **"Web Service"** chunein.
3. Apna GitHub repo `redbull-invest-landing` select karein aur **Connect** karein.
4. Settings me ye details bharein:
   - **Name**: `redbull-invest-landing`
   - **Region**: Singapore ya Frankfurt (fast response for India)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. **Advanced Settings (Optional Environment Variables)**:
   - `WHATSAPP_URL`: `https://wa.me/917231874241?text=Hyy**baby`
   - `NODE_ENV`: `production`
6. **"Create Web Service"** par click karein.
7. Render 1-2 minute me deploy kar dega aur aapko free live link mil jayega (e.g. `https://redbull-invest-landing.onrender.com`).

---

## 🤖 UptimeRobot Setup (Render Ko 24/7 Awake Rakhne Ke Liye)

Render ka Free tier 15 minutes inactive rehne par sleep mode me chala jata hai. UptimeRobot se ye 24/7 active rahega:

1. [UptimeRobot.com](https://uptimerobot.com) par free account banayein.
2. Dashboard me **"+ Add New Monitor"** button par click karein.
3. Form me ye bharein:
   - **Monitor Type**: `HTTP(s)`
   - **Friendly Name**: `RedBull Landing Ping`
   - **URL (or IP)**: `https://your-render-app-name.onrender.com/ping` *(Apna Render URL dalein jiske peeche `/ping` ho)*
   - **Monitoring Interval**: `Every 5 minutes`
4. **"Create Monitor"** par click karein.
5. **Done!** Ab UptimeRobot har 5 minute me aapki website ko ping karega, jisse Render kabhi sleep nahi hoga aur website 24 ghante super fast load hogi!

---

## 📱 WhatsApp Link Kaise Badlein?

Agar future me aapko WhatsApp number ya text badalna ho:
1. `public/index.html` me `https://wa.me/...` replace karein.
2. `public/js/app.js` ke top par `BASE_WA_URL` change karein.
3. Render environment variables me `WHATSAPP_URL` update karein.
