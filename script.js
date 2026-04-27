// P Mart ERP - Antigravity UI Scripts

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Real-time Revenue Simulator ---
    const revenueElement = document.getElementById('real-time-revenue');
    let currentRevenue = 14250000;
    
    setInterval(() => {
        // Simulate real-time POS transaction coming in
        if (Math.random() > 0.6) {
            const increment = Math.floor(Math.random() * 50000) + 10000;
            currentRevenue += increment;
            // Format to IDR
            revenueElement.textContent = 'Rp ' + currentRevenue.toLocaleString('id-ID');
            
            // Add a subtle flash effect
            revenueElement.style.color = '#d93025';
            setTimeout(() => {
                revenueElement.style.color = '';
            }, 300);
        }
    }, 2500);

    // --- 2. Chart.js Config - Global Defaults ---
    Chart.defaults.color = '#5f6368';
    Chart.defaults.font.family = "'Outfit', sans-serif";

    // --- 3. Widget B: SD Module - Spline Chart (TLog) ---
    const tlogCtx = document.getElementById('tlogChart').getContext('2d');
    
    // Gradient for the spline chart
    const gradientSD = tlogCtx.createLinearGradient(0, 0, 0, 300);
    gradientSD.addColorStop(0, 'rgba(217, 48, 37, 0.1)');
    gradientSD.addColorStop(1, 'rgba(217, 48, 37, 0.0)');

    const initialData = Array.from({length: 12}, () => Math.floor(Math.random() * 100) + 50);

    const tlogChart = new Chart(tlogCtx, {
        type: 'line',
        data: {
            labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
            datasets: [{
                label: 'POS Transactions/min',
                data: initialData,
                borderColor: '#d93025', // Magenta
                backgroundColor: gradientSD,
                borderWidth: 2,
                tension: 0.4, // This creates the smooth spline curve
                fill: true,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#d93025',
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#202124',
                    bodyColor: '#5f6368',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: { maxTicksLimit: 5 }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });

    // Simulate real-time data flow in the chart
    setInterval(() => {
        const newDataPoint = Math.floor(Math.random() * 80) + 70;
        const timeLabels = tlogChart.data.labels;
        const lastTime = timeLabels[timeLabels.length - 1];
        
        // simple time increment logic (assuming HH:MM)
        let [hh, mm] = lastTime.split(':').map(Number);
        mm += 5;
        if(mm >= 60) { mm = 0; hh++; }
        if(hh >= 24) { hh = 0; }
        const newTime = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;

        tlogChart.data.labels.push(newTime);
        tlogChart.data.labels.shift();
        
        tlogChart.data.datasets[0].data.push(newDataPoint);
        tlogChart.data.datasets[0].data.shift();
        
        tlogChart.update('none'); // Update without full animation for smoother flow
    }, 4000);


    // --- 4. Widget C: FI Module - 3-Way Matching Ring ---
    const matchingCtx = document.getElementById('matchingRing').getContext('2d');
    
    new Chart(matchingCtx, {
        type: 'doughnut',
        data: {
            labels: ['Matched', 'Pending GR', 'Pending Invoice'],
            datasets: [{
                data: [85, 10, 5],
                backgroundColor: [
                    '#1e8e3e', // Emerald Green (Matched)
                    'rgba(30, 142, 62, 0.2)', // Pending
                    'rgba(0, 86, 179, 0.2)'  // Pending Cyan
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%', // Makes it a thin ring
            plugins: {
                legend: {
                    display: false // We use the center text instead
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    bodyColor: '#5f6368',
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

    // --- 5. Widget C: FI Module - Profit Margin Sparkline ---
    const sparklineCtx = document.getElementById('profitSparkline').getContext('2d');
    
    // Emerald green gradient for positive profit margin
    const gradientFI = sparklineCtx.createLinearGradient(0, 0, 0, 60);
    gradientFI.addColorStop(0, 'rgba(30, 142, 62, 0.2)');
    gradientFI.addColorStop(1, 'rgba(30, 142, 62, 0.0)');

    const sparklineData = Array.from({length: 20}, () => Math.floor(Math.random() * 5) + 15);

    const profitSparkline = new Chart(sparklineCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => i),
            datasets: [{
                data: sparklineData,
                borderColor: '#1e8e3e',
                backgroundColor: gradientFI,
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { display: false }
            },
            scales: {
                x: { display: false },
                y: { display: false, min: 10, max: 25 }
            },
            animation: {
                duration: 0 // Keep it snappy for a sparkline
            }
        }
    });

    // Animate sparkline
    setInterval(() => {
        const newVal = Math.floor(Math.random() * 5) + 15;
        profitSparkline.data.datasets[0].data.push(newVal);
        profitSparkline.data.datasets[0].data.shift();
        profitSparkline.update('none');
    }, 3000);

    // --- 6. Onboarding Tour Logic ---
    const tourSteps = [
        {
            target: '.global-status',
            title: 'Welcome to P Mart\'s Nerve Center',
            text: "Notice the 'POS Sync: ONLINE' status? This ensures our minimarket is always connected to the Cloud, leaving the old manual era behind."
        },
        {
            target: '.sd-widget',
            title: 'The Heartbeat',
            text: "Everything starts here. This purple graph shows real-time sales. Because we've isolated the system from the payment aggregator, every scan at the register is 100% accurate, triggering the inventory engine instantly."
        },
        {
            target: '.mm-widget',
            title: 'The Automatic Response',
            text: "When sales go up, stock goes down. This MM module monitors ROP (Reorder Points). See the alerts for Aqua or Ultra Milk? One click on 'Auto-Generate PR' replaces 5 days of manual WhatsApp messages."
        },
        {
            target: '.fi-widget',
            title: 'The Financial Truth',
            text: "The 'Match' ring confirms our 3-Way Matching (PO vs GR vs Invoice). Below it, the OBYC feed shows automatic journals being posted. No more 3-week waiting for financial reports—it's live."
        },
        {
            target: '.kpi-grid',
            title: 'The Excellence Metrics',
            text: "Look at the results: 99.9% Accuracy and Zero Stockout. This is how we save costs and keep P Mart Bogor competitive against retail giants."
        },
        {
            target: '.floating-dock',
            title: 'The Master Plan',
            text: "We are currently in Phase 5: Go-Live & Parallel Sync. We run both manual and ERP systems to ensure your data is safe and validated before full transition."
        }
    ];

    let currentStep = 0;
    const overlay = document.getElementById('tourOverlay');
    const tooltip = document.getElementById('tourTooltip');
    const stepBadge = document.getElementById('tourStepBadge');
    const title = document.getElementById('tourTitle');
    const text = document.getElementById('tourText');
    const prevBtn = document.getElementById('tourPrev');
    const nextBtn = document.getElementById('tourNext');
    const closeBtn = document.getElementById('tourClose');
    const startBtn = document.getElementById('startTourBtn');

    function positionTooltip(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top = rect.bottom + window.scrollY + 15;
        let left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);

        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top + tooltipRect.height > window.innerHeight + window.scrollY) {
            top = rect.top + window.scrollY - tooltipRect.height - 15;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function showStep(index) {
        document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
        
        if (index >= tourSteps.length) {
            endTour();
            return;
        }

        const step = tourSteps[index];
        const targetElement = document.querySelector(step.target);
        
        if (targetElement) {
            targetElement.classList.add('tour-highlight');
            
            stepBadge.textContent = index === 0 ? 'Welcome' : `Step ${index}`;
            title.textContent = step.title;
            text.textContent = step.text;
            
            prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
            nextBtn.textContent = index === tourSteps.length - 1 ? 'Finish' : 'Next';
            
            tooltip.style.display = 'block';
            
            setTimeout(() => {
                tooltip.classList.add('active');
                positionTooltip(targetElement);
            }, 10);
        }
    }

    function startTour() {
        currentStep = 0;
        overlay.classList.add('active');
        showStep(currentStep);
    }

    function endTour() {
        overlay.classList.remove('active');
        tooltip.classList.remove('active');
        setTimeout(() => tooltip.style.display = 'none', 300);
        document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    }

    startBtn.addEventListener('click', startTour);
    closeBtn.addEventListener('click', endTour);
    overlay.addEventListener('click', endTour);
    
    nextBtn.addEventListener('click', () => {
        currentStep++;
        showStep(currentStep);
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

});
