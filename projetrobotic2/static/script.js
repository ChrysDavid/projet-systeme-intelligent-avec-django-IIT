document.addEventListener('DOMContentLoaded', function() {
    const handleError = (error) => {
        console.error('Error:', error);
        // Add visual feedback for errors
        document.querySelector('.sensor-data').classList.add('error');
    };

    function updateSensorData() {
        fetch('/api/sensor-data/', {
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.temperature !== null) {
                document.getElementById('temperature').textContent = `${data.temperature}°C`;
                document.getElementById('humidity').textContent = `${data.humidity}%`;
                document.querySelector('.sensor-data').classList.remove('error');
            }
        })
        .catch(handleError);
    }

    function updateLedStatus() {
        fetch('/api/led-status/')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            Object.entries(data).forEach(([led, status]) => {
                const button = document.querySelector(`[data-pin="${led.replace('led', '')}"]`);
                if (button) {
                    button.classList.toggle('active', status);
                }
            });
        })
        .catch(handleError);
    }

    document.querySelectorAll('.led-button').forEach(button => {
        button.addEventListener('click', function() {
            const pin = this.dataset.pin;
            const csrf = this.dataset.csrf;
            const isActive = this.classList.contains('active');

            fetch('/api/led-control/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrf,
                },
                body: JSON.stringify({
                    pin: parseInt(pin),
                    state: !isActive
                })
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    updateLedStatus();
                }
            })
            .catch(handleError);
        });
    });

    // Initial updates
    updateSensorData();
    updateLedStatus();

    // Periodic updates
    setInterval(updateSensorData, 5000);
    setInterval(updateLedStatus, 5000);
});