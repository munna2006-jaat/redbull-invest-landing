/**
 * Red Bull Invest Landing Page - Interactive App Script
 * High Conversion Features, Calculator, Live Toast Payouts, Modal & FAQ
 */

// Global Config
const BASE_WA_URL = 'https://wa.me/917231874241?text=Hyy**baby';

document.addEventListener('DOMContentLoaded', () => {
  initProfitCalculator();
  initFaqAccordion();
  initCountdownTimers();
  initLivePayoutToasts();
  initStatsFetcher();
  initBonusModal();
  initClickTracking();
});

/* ===================================================
   1. INTERACTIVE PROFIT CALCULATOR
   =================================================== */
function initProfitCalculator() {
  const calcButtons = document.querySelectorAll('.calc-btn');
  const calcInvest = document.getElementById('calcInvest');
  const calcDaily = document.getElementById('calcDaily');
  const calcTotal = document.getElementById('calcTotal');
  const calcSelectedName = document.getElementById('calcSelectedName');
  const calcSelectedCycle = document.getElementById('calcSelectedCycle');

  if (!calcButtons.length) return;

  calcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      calcButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const price = parseInt(btn.dataset.price, 10);
      const daily = parseInt(btn.dataset.daily, 10);
      const total = parseInt(btn.dataset.total, 10);
      const cycle = btn.dataset.cycle;
      const title = btn.dataset.title;

      // Animate and update values
      calcInvest.innerText = '₹' + price.toLocaleString('en-IN');
      calcDaily.innerText = '₹' + daily.toLocaleString('en-IN') + ' / day';
      calcTotal.innerText = '₹' + total.toLocaleString('en-IN');
      calcSelectedName.innerText = `${title} – Daily Withdrawal`;
      calcSelectedCycle.innerText = `${cycle} Days Validity`;
    });
  });
}

/* ===================================================
   2. FAQ ACCORDION
   =================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ===================================================
   3. COUNTDOWN TIMERS
   =================================================== */
function initCountdownTimers() {
  const timerDisplay = document.getElementById('timerDisplay');
  const modalTimer = document.getElementById('modalTimer');

  // 3 hours, 42 minutes, 18 seconds in seconds
  let totalSeconds = 3 * 3600 + 42 * 60 + 18;

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 4 * 3600; // Reset loop
    }

    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');

    if (timerDisplay) {
      timerDisplay.innerText = `${hrs}:${mins}:${secs}`;
    }

    if (modalTimer) {
      modalTimer.innerText = `${mins}:${secs}`;
    }
  }, 1000);
}

/* ===================================================
   4. REAL-TIME PAYOUT TOAST NOTIFICATIONS
   =================================================== */
function initLivePayoutToasts() {
  const toast = document.getElementById('payoutToast');
  const toastUser = document.getElementById('toastUser');
  const toastDetail = document.getElementById('toastDetail');

  if (!toast) return;

  const mockPayouts = [
    { name: "Rahul S.", city: "Jaipur", amount: "4,354", app: "PhonePe", time: "12s ago" },
    { name: "Aman V.", city: "Delhi", amount: "8,586", app: "Paytm", time: "25s ago" },
    { name: "Pooja S.", city: "Indore", amount: "19,053", app: "Google Pay", time: "44s ago" },
    { name: "Vikas K.", city: "Patna", amount: "2,200", app: "UPI", time: "1m ago" },
    { name: "Sunil R.", city: "Lucknow", amount: "7,350", app: "PhonePe", time: "1m ago" },
    { name: "Manoj B.", city: "Surat", amount: "4,354", app: "Paytm", time: "2m ago" },
    { name: "Deepak G.", city: "Bhopal", amount: "38,106", app: "Google Pay", time: "2m ago" },
    { name: "Kavita M.", city: "Pune", amount: "245", app: "UPI", time: "30s ago" },
    { name: "Suresh P.", city: "Ahmedabad", amount: "8,586", app: "PhonePe", time: "45s ago" },
    { name: "Neeraj T.", city: "Jaipur", amount: "4,354", app: "Paytm", time: "15s ago" }
  ];

  let payoutIndex = 0;

  function showNextToast() {
    const item = mockPayouts[payoutIndex];
    payoutIndex = (payoutIndex + 1) % mockPayouts.length;

    toastUser.innerText = `🎉 ${item.name} (${item.city})`;
    toastDetail.innerText = `Withdrew ₹${item.amount} via ${item.app} (${item.time})`;

    toast.classList.add('show');

    // Hide after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Initial trigger after 4 seconds, then repeat every 9-14 seconds
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 11000);
  }, 4000);
}

/* ===================================================
   5. LIVE STATS FETCHER
   =================================================== */
function initStatsFetcher() {
  const statInvestors = document.getElementById('statInvestors');
  const statPayouts = document.getElementById('statPayouts');
  const headerOnlineCount = document.getElementById('headerOnlineCount');

  async function fetchStats() {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        if (statInvestors) statInvestors.innerText = data.totalInvestors + '+';
        if (statPayouts) statPayouts.innerText = data.todayPayouts + '+';
        if (headerOnlineCount) headerOnlineCount.innerText = data.activeMembersOnline + '+';
      }
    } catch (e) {
      // Fallback silently if offline
    }
  }

  fetchStats();
  setInterval(fetchStats, 60000); // Refresh every minute
}

/* ===================================================
   6. EXIT-INTENT / INACTIVITY BONUS MODAL
   =================================================== */
function initBonusModal() {
  const modal = document.getElementById('bonusModal');
  if (!modal) return;

  let modalShown = sessionStorage.getItem('bonus_modal_shown') === 'true';

  function triggerModal() {
    if (!modalShown) {
      modal.classList.add('active');
      modalShown = true;
      sessionStorage.setItem('bonus_modal_shown', 'true');
    }
  }

  // Trigger on Desktop when mouse leaves viewport top
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 20) {
      triggerModal();
    }
  });

  // Trigger on Mobile after 16 seconds of inactivity/scrolling
  setTimeout(() => {
    triggerModal();
  }, 16000);
}

window.closeBonusModal = function() {
  const modal = document.getElementById('bonusModal');
  if (modal) {
    modal.classList.remove('active');
  }
};

window.closeWaBubble = function() {
  const bubble = document.getElementById('waBubble');
  if (bubble) {
    bubble.classList.add('hidden');
  }
};

/* ===================================================
   7. WHATSAPP CLICK TRACKING (ANALYTICS)
   =================================================== */
function initClickTracking() {
  const waLinks = document.querySelectorAll('.track-wa');
  waLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('⚡ WhatsApp Conversion Event Triggered:', new Date().toISOString());
      
      // If Meta Pixel exists: fbq('track', 'Lead');
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'WhatsApp Click',
          value: 500,
          currency: 'INR'
        });
      }

      // If Google Analytics exists: gtag('event', 'generate_lead')
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'WhatsApp CTA'
        });
      }
    });
  });
}
