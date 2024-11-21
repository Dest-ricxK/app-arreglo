document.addEventListener('DOMContentLoaded', function() {
    const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
    const bloodPressureCtx = document.getElementById('bloodPressureChart').getContext('2d');
  
    new Chart(heartRateCtx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [{
          label: 'BPM',
          data: [72, 75, 70, 74, 73, 72, 71],
          borderColor: 'rgb(231, 76, 60)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  
    new Chart(bloodPressureCtx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [{
          label: 'Sistólica',
          data: [120, 122, 119, 121, 120, 118, 120],
          borderColor: 'rgb(46, 204, 113)',
          tension: 0.3
        }, {
          label: 'Diastólica',
          data: [80, 82, 79, 81, 80, 78, 80],
          borderColor: 'rgb(52, 152, 219)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const medicationForm = document.getElementById('medicationForm');
    const medicationList = document.getElementById('medicationList');
    let medications = [];

    medicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('medicationName').value;
        const time = document.getElementById('medicationTime').value;
        
        medications.push({
            name: name,
            time: time
        });
        
        updateMedicationList();
        medicationForm.reset();
    });

    function updateMedicationList() {
        medicationList.innerHTML = '';
        medications.sort((a, b) => a.time.localeCompare(b.time));
        
        medications.forEach(med => {
            const medicationCard = document.createElement('div');
            medicationCard.className = 'medication-card';
            medicationCard.innerHTML = `
                <h3>${med.name}</h3>
                <p>Hora: ${med.time}</p>
            `;
            medicationList.appendChild(medicationCard);
        });
    }
  
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
  
    function showPage(pageId) {
      pages.forEach(page => page.style.display = 'none');
      const activePage = document.getElementById(pageId);
      if (activePage) activePage.style.display = 'block';
    }
  
    function initApp() {
      showPage('dashboard');
    }
  
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        const pageId = href.includes('dashboard') ? 'dashboard' : href.split('/')[3] + '-page';
        showPage(pageId);
      });
    });
  
    document.getElementById('emergencyCallBtn').addEventListener('click', function() {
      if (confirm('¿Está seguro que desea realizar una llamada de emergencia?')) {
        window.location.href = 'tel:911';
      }
    });
  
    initApp();

});