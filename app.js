// Initial state
let currentState = {
    view: 'dashboard',
    sensors: {
        temp: 12.5,
        humidity: 65,
        gas: 0.02
    },
    exchangeRate: 35.42, // EUR/TRY
    distance: 0,
    carbon: 0,
    totalPriceEUR: 0,
    isProcessing: false
};

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--secondary-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(style);


// Initialize Lucide icons
lucide.createIcons();

// View Templates
const views = {
    dashboard: `
        <div class="dashboard-grid">
            <div class="card">
                <div class="card-title">Depo Sıcaklığı <i data-lucide="thermometer"></i></div>
                <div class="card-value"><span id="temp-val">12.5</span>°C</div>
                <div class="card-trend trend-up"><i data-lucide="arrow-up-right"></i> +0.2% son 1 saat</div>
            </div>
            <div class="card">
                <div class="card-title">Nem Oranı <i data-lucide="droplets"></i></div>
                <div class="card-value"><span id="hum-val">65</span>%</div>
                <div class="card-trend trend-down"><i data-lucide="arrow-down-right"></i> -1.5% son 1 saat</div>
            </div>
            <div class="card">
                <div class="card-title">Gaz Seviyesi <i data-lucide="wind"></i></div>
                <div class="card-value"><span id="gas-val">0.02</span> <small>ppm</small></div>
                <div class="card-trend"><i data-lucide="check-circle"></i> Güvenli Seviye</div>
            </div>
            <div class="card charts-container">
                <div class="card-title">Çevresel Veri Analizi (Son 24 Saat)</div>
                <canvas id="sensorChart"></canvas>
            </div>
            <div class="card">
                <div class="card-title">Aktif Robotlar <i data-lucide="bot"></i></div>
                <div class="robot-status-grid">
                    <div class="robot-card">
                        <div class="status-indicator"></div>
                        <span style="font-weight: 600">Robot-Alpha</span>
                        <small>Hazır</small>
                    </div>
                    <div class="robot-card">
                        <div class="status-indicator busy"></div>
                        <span style="font-weight: 600">Robot-Beta</span>
                        <small>Görevde (Bölüm-A)</small>
                    </div>
                </div>
            </div>
        </div>
    `,
    shipments: `
        <div class="dashboard-grid">
            <div class="card" style="grid-column: span 1;">
                <div class="card-title">Yeni Sevkiyat Talebi</div>
                <form class="shipment-form" id="shipment-form">
                    <div class="form-group">
                        <label>Çıkış Noktası</label>
                        <input type="text" value="Kapadokya Doğal Depo - Bölge 1" readonly>
                    </div>
                    <div class="form-group">
                        <label>Varış Şehri / Ülke</label>
                        <input type="text" id="dest-input" placeholder="Örn: Berlin, Almanya" required>
                    </div>
                    <div class="form-group">
                        <label>Ürün Ağırlığı (Ton)</label>
                        <input type="number" id="weight-input" value="10" min="1" step="0.5">
                    </div>
                    <div class="form-group">
                        <label>Hedef Para Birimi</label>
                        <select id="currency-select">
                            <option value="EUR">Euro (EUR)</option>
                            <option value="USD">Dolar (USD)</option>
                            <option value="GBP">Sterlin (GBP)</option>
                        </select>
                    </div>
                    <button type="submit" class="primary-btn">Rotayı ve Maliyeti Hesapla</button>
                </form>
            </div>
            
            <div class="card" style="grid-column: span 2;">
                <div class="card-title">Lojistik Rota İzleme</div>
                <div id="map" style="height: 400px; border-radius: 15px;"></div>
                
                <div class="calc-results">
                    <div class="calc-item">
                        <div class="calc-label">Toplam Mesafe</div>
                        <div class="calc-value" id="dist-res">0 km</div>
                    </div>
                    <div class="calc-item">
                        <div class="calc-label">Karbon Ayak İzi</div>
                        <div class="calc-value" id="carbon-res" style="color: var(--secondary-color)">0 kg CO2</div>
                    </div>
                    <div class="calc-item">
                        <div class="calc-label">Toplam Maliyet</div>
                        <div class="calc-value" id="price-res">0 EUR</div>
                    </div>
                </div>
                
                <button id="confirm-btn" class="primary-btn" style="width: 100%; display: none; background: var(--secondary-color);">Siparişi Onayla & Robotu Tetikle</button>
            </div>
        </div>
    `,
    robots: `
        <div class="dashboard-grid">
            <div class="card" style="grid-column: span 2;">
                <div class="card-title">Robot Live Feed (ESP32-CAM)</div>
                <div style="background: #000; height: 400px; border-radius: 15px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 10px; left: 10px; background: rgba(255,0,0,0.7); padding: 5px 10px; border-radius: 5px; font-size: 0.7rem; font-weight: 700;">LIVE</div>
                    <img src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6;">
                    <div style="position: absolute; border: 2px solid #00ff00; width: 100px; height: 100px; top: 30%; left: 45%;">
                        <div style="position: absolute; top: -20px; color: #00ff00; font-size: 0.7rem;">QR DETECTED: SECTION_A</div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-title">Navigasyon Logları</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">
                    <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--surface-border);">[10:45:12] QR Kod Okundu: Bölüm_A_04</div>
                    <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--surface-border);">[10:44:50] Robot-Alpha: Rota Başlatıldı</div>
                    <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--surface-border);">[10:44:45] Sistem: Sevkiyat Emri Alındı</div>
                    <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--surface-border);">[10:40:00] Sensör: Sıcaklık Stabil (12.5°C)</div>
                </div>
            </div>
        </div>
    `
};

// Map Global Reference
let map;

function showView(viewName) {
    currentState.view = viewName;
    const container = document.getElementById('view-container');
    const title = document.getElementById('view-title');

    // Update active nav
    document.querySelectorAll('nav li').forEach(li => {
        li.classList.remove('active');
        if (li.innerText.toLowerCase().includes(viewName === 'shipments' ? 'sevkiyat' : viewName)) {
            li.classList.add('active');
        }
    });

    title.innerText = viewName === 'dashboard' ? 'Dashboard' :
        viewName === 'shipments' ? 'Sevkiyat Yönetimi' :
            viewName === 'robots' ? 'Robot İzleme' : 'Analizler';

    container.innerHTML = views[viewName] || '<h2>Coming Soon</h2>';
    lucide.createIcons();

    if (viewName === 'dashboard') {
        initChart();
    } else if (viewName === 'shipments') {
        initMap();
        document.getElementById('shipment-form').onsubmit = handleShipmentSubmit;
        document.getElementById('confirm-btn').onclick = handleConfirmOrder;
    }
}

async function handleConfirmOrder() {
    const btn = document.getElementById('confirm-btn');
    btn.disabled = true;
    btn.innerText = "Sipariş Gönderiliyor...";

    // Simulate API delay
    setTimeout(() => {
        showToast("Sipariş Onaylandı! Robot-Beta görevlendirildi.", "success");
        btn.innerText = "Sipariş Tamamlandı";

        // Switch to robot view after delay
        setTimeout(() => {
            showView('robots');
        }, 1500);
    }, 1000);
}

function initChart() {
    const ctx = document.getElementById('sensorChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 12 }, (_, i) => `${i * 2}:00`),
            datasets: [{
                label: 'Sıcaklık (°C)',
                data: [12.1, 12.2, 12.4, 12.5, 12.5, 12.4, 12.3, 12.5, 12.6, 12.5, 12.5, 12.5],
                borderColor: '#3498db',
                tension: 0.4
            }, {
                label: 'Nem (%)',
                data: [64, 65, 66, 65, 64, 63, 64, 65, 66, 65, 65, 65],
                borderColor: '#2ecc71',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initMap() {
    map = L.map('map').setView([38.64, 34.83], 5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Origin marker (Cappadocia)
    L.marker([38.64, 34.83]).addTo(map)
        .bindPopup('Kapadokya Doğal Depo')
        .openPopup();
}

async function handleShipmentSubmit(e) {
    e.preventDefault();
    const dest = document.getElementById('dest-input').value;
    const weight = parseFloat(document.getElementById('weight-input').value);

    // Simulate Nominatim / OpenRouteService logic
    // Mocking distance based on "distance" from Cappadocia
    // (Randomized for demo, in real it would call fetch)
    const mockDist = Math.floor(Math.random() * 3000) + 500;
    const carbon = (mockDist * weight * 0.100).toFixed(2);

    // Live Currency Mock (TCMB EVDS Simulation)
    const basePriceTRY = weight * 5000 + (mockDist * 20); // Simulated base logistics price
    const carbonTaxTRY = carbon * 2.5; // Simulated carbon tax
    const totalTRY = basePriceTRY + carbonTaxTRY;
    const totalEUR = (totalTRY / currentState.exchangeRate).toFixed(2);

    // Update UI
    document.getElementById('dist-res').innerText = `${mockDist} km`;
    document.getElementById('carbon-res').innerText = `${carbon} kg CO2`;
    document.getElementById('price-res').innerText = `${totalEUR} EUR`;
    document.getElementById('confirm-btn').style.display = 'block';

    // Simulate map update
    if (map) {
        // Just move view to show scope
        map.flyTo([48, 13], 4);
        L.polyline([[38.64, 34.83], [52.52, 13.40]], { color: '#3498db', weight: 3, dashArray: '10, 10' }).addTo(map);
    }
}

// Initial View
showView('dashboard');
