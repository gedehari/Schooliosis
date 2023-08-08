<div class="container">
	<h1>Schooliosis</h1>
	<p>
		Selamat datang di Schooliosis! Silahkan isi form berikut untuk menyiapkan aplikasi ini. Setelah ini, Anda akan otomatis masuk menggunakan akun
		admin utama. Semua konfigurasi dapat diatur ulang di laman admin setelah ini.
	</p>
	<div class="alert alert-warning" role="alert">
		Peringatan! Perlu diingat bahwa versi Schooliosis saat ini berada dalam tahap <i>proof-of-concept</i>. Beberapa fitur dari aplikasi ini mungkin
		belum tersedia dalam versi ini. Kami tidak merekomendasikan penggunaan versi ini di lingkungan produksi atau untuk publik. Terima kasih atas
		pengertiannya!
	</div>
	<form method="post">
		<div class="mb-3">
			<label for="instanceName" class="form-label">Nama Instansi</label>
			<input type="text" class="form-control" id="instanceName" name="instanceName" aria-describedby="instanceNameDesc" required />
			<div id="instanceNameDesc" class="form-text">Nama ini akan muncul di platform web.</div>
		</div>
		<div class="mb-3">
			<label for="adminUsername" class="form-label">Email Admin</label>
			<input type="email" class="form-control" id="adminEmail" name="adminEmail" aria-describedby="adminEmailDesc" required />
			<div id="adminEmailDesc" class="form-text">Email ini akan digunakan untuk masuk sebagai user admin utama.</div>
		</div>
		<div class="mb-3">
			<label for="adminPassword" class="form-label">Password Admin</label>
			<input type="password" class="form-control" id="adminPassword" name="adminPassword" aria-describedby="adminPasswordDesc" required />
			<div id="adminPasswordDesc" class="form-text">Password ini akan digunakan untuk masuk sebagai user admin utama.</div>
		</div>

		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
</div>
