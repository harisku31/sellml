document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     TAB MENU SWITCH
  ========================= */
  const tabs = document.querySelectorAll('.tab');
  const paketList = document.querySelectorAll('.paket');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      paketList.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document
        .querySelector('.paket.' + tab.dataset.menu)
        .classList.add('active');

      resetItem();
    });
  });

  /* =========================
     ITEM & TOTAL STATE
  ========================= */
  const items = document.querySelectorAll('.item');
  const totalHargaEl = document.getElementById('totalHarga');

  let selectedItem = null;
  let total = 0;

  items.forEach(item => {
    item.addEventListener('click', () => {
      if (selectedItem === item) return;

      resetItem();

      selectedItem = item;
      total = parseInt(item.dataset.harga, 10);

      item.classList.add('selected');
      addCancelButton(item);
      updateTotal();
    });
  });

  function addCancelButton(item){
    const cancel = document.createElement('span');
    cancel.className = 'cancel';
    cancel.textContent = '✕';

    cancel.addEventListener('click', e => {
      e.stopPropagation();
      resetItem();
    });

    item.appendChild(cancel);
  }

  function resetItem(){
    if (!selectedItem) return;

    selectedItem.classList.remove('selected');

    const cancel = selectedItem.querySelector('.cancel');
    if (cancel) cancel.remove();

    selectedItem = null;
    total = 0;
    updateTotal();
  }

  function updateTotal(){
    totalHargaEl.textContent =
      'Rp ' + total.toLocaleString('id-ID');
  }

  /* =========================
     PAY BUTTON ACTION
  ========================= */
  const payButton = document.querySelector('.pay-button');
  const paymentSection = document.getElementById('paymentSection');

  if (payButton && paymentSection){
    payButton.addEventListener('click', () => {
      paymentSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

});

/* =========================
   PAYMENT SELECT STATE
========================= */
let selectedPayment = null;

const paymentItems = document.querySelectorAll('.payment-item');
paymentItems.forEach(item => {
  item.addEventListener('click', () => {
    paymentItems.forEach(p => p.classList.remove('active'));
    item.classList.add('active');
    selectedPayment = item;
  });
});

/* =========================
   BAYAR SEKARANG LOGIC
========================= */
const bayarButton = document.querySelector('.bayar-button');

if(bayarButton){
  bayarButton.addEventListener('click', () => {

    /* === CEK METODE PEMBAYARAN === */
    if(!selectedPayment){
      alert('Silakan pilih metode pembayaran terlebih dahulu.');
      return;
    }

    /* === AMBIL DATA FORM === */
    const userId   = document.querySelector('input[placeholder="e.g. 1268190411"]').value.trim();
    const zoneId   = document.querySelector('input[placeholder="e.g. 15148"]').value.trim();
    const whatsapp = document.querySelector('.wa-input input').value.trim();

    /* === CEK DATA AKUN === */
    if(!userId || !zoneId || !whatsapp){
      alert('Data akun belum lengkap. Silakan lengkapi semua data.');
      return;
    }

    /* === SEMUA VALID (SEMENTARA) === */
    alert('Data lengkap & metode pembayaran dipilih.\nSiap lanjut ke proses berikutnya.');
  });
}

document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     TAB MENU
  ========================= */
  const tabs = document.querySelectorAll('.tab');
  const paketList = document.querySelectorAll('.paket');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      paketList.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document
        .querySelector('.paket.' + tab.dataset.menu)
        .classList.add('active');

      resetItem();
    });
  });

  /* =========================
     STATE
  ========================= */
  let selectedItem = null;
  let selectedPayment = null;
  let total = 0;

  const totalHargaEl = document.getElementById('totalHarga');

  /* =========================
     ITEM SELECT
  ========================= */
  const items = document.querySelectorAll('.item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      if (selectedItem === item) return;

      resetItem();

      selectedItem = item;
      total = parseInt(item.dataset.harga, 10);

      item.classList.add('selected');
      addCancel(item);
      updateTotal();
    });
  });

  function addCancel(item){
    const cancel = document.createElement('span');
    cancel.className = 'cancel';
    cancel.textContent = '✕';

    cancel.addEventListener('click', e => {
      e.stopPropagation();
      resetItem();
    });

    item.appendChild(cancel);
  }

  function resetItem(){
    if (!selectedItem) return;

    selectedItem.classList.remove('selected');
    const cancel = selectedItem.querySelector('.cancel');
    if (cancel) cancel.remove();

    selectedItem = null;
    total = 0;
    updateTotal();
  }

  function updateTotal(){
    totalHargaEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
  }

  /* =========================
     PAYMENT SELECT
  ========================= */
  const paymentItems = document.querySelectorAll('.payment-item');
const qrisSection = document.getElementById('qrisSection');

paymentItems.forEach(item => {
  item.addEventListener('click', () => {
    paymentItems.forEach(p => p.classList.remove('active'));
    item.classList.add('active');
    selectedPayment = item;

    const metode = item.querySelector('img').alt.toLowerCase();

    if(metode === 'gopay'){
      qrisSection.style.display = 'block';
      qrisSection.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    } else {
      qrisSection.style.display = 'none';
    }
  });
});


  /* =========================
     BAYAR SEKARANG → WHATSAPP
  ========================= */
  const bayarButton = document.querySelector('.bayar-button');
  const adminWA = '6281234567890'; // GANTI KE NOMOR WA KAMU

  bayarButton.addEventListener('click', () => {

    if (!selectedItem) {
      alert('Silakan pilih nominal top up terlebih dahulu.');
      return;
    }

    if (!selectedPayment) {
      alert('Silakan pilih metode pembayaran.');
      return;
    }

    const userId = document.querySelector('.akun-section input[placeholder="e.g. 1268190411"]').value.trim();
    const zoneId = document.querySelector('.akun-section input[placeholder="e.g. 15148"]').value.trim();
    const wa = document.querySelector('.wa-input input').value.trim();

    if (!userId || !zoneId || !wa) {
      alert('Data akun belum lengkap.');
      return;
    }

    const namaPaket = selectedItem.querySelector('.nama').innerText;
    const hargaPaket = selectedItem.querySelector('.harga').innerText;
    const metodeBayar = selectedPayment.querySelector('img').alt;

    const pesan = `
Halo kakak saya ingin memesan ini

Jenis pesanan:
${namaPaket} (${hargaPaket})

Pembayaran:
${metodeBayar}

Bio data saya:
User ID: ${userId}
Zone ID: ${zoneId}
WhatsApp: +62${wa}

Sekian, minta diproses ya
    `.trim();

    const waUrl = `https://wa.me/${adminWA}?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, '_blank');
  });

});

/* =========================
   KONSULTASI WHATSAPP
========================= */
const konsultasiButton = document.querySelector('.konsultasi-button');
const adminWAKonsultasi = '6281234567890'; // GANTI DENGAN WA KAMU

if(konsultasiButton){
  konsultasiButton.addEventListener('click', () => {
    const pesan = `hai kak kami ingin konsultasi tentang mobile legend kakak`;
    const url = `https://wa.me/${adminWAKonsultasi}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
  });
}
