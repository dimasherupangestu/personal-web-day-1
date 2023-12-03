// ambil data toggle
function confirmDelete(event) { 
    if (confirm('anda yakin hapus?')) {
    document.getElementById('deleteForm').submit(); }
     else {
    event.preventDefault(); } }

    function confimLogout(event) { 
        if (confirm('apakah anda yakin logout?')) {
        document.querySelector('.logout').submit(); }
         else {
        event.preventDefault(); } }

const dangerAlert = document.querySelector('.alert-danger');

// Periksa apakah pesan flash ada
if (dangerAlert) {
  // Tampilkan pesan flash
  dangerAlert.style.display = 'block';

  // Atur waktu agar pesan flash hilang setelah 4 detik
  setTimeout(() => {
    dangerAlert.style.display = 'none';
  }, 4000); // 4000 milidetik atau 4 detik
}
const susscesAlert = document.querySelector('.alert-success');

if (susscesAlert) {
  // Tampilkan pesan flash
  susscesAlert.style.display = 'block';

  // Atur waktu agar pesan flash hilang setelah 4 detik
  setTimeout(() => {
    susscesAlert.style.display = 'none';
  }, 4000); // 4000 milidetik atau 4 detik
}
