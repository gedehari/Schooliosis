<script lang="ts">
	import type { Guru, IdentityType, Kelas, MataPelajaran, Siswa } from '@prisma/client';

	type SiswaExtra = Siswa & { kelas?: Kelas | null };
	type GuruExtra = Guru & { kelas?: Kelas | null; mataPelajaran?: MataPelajaran | null };

	export let identityType: Exclude<IdentityType, 'Admin'>;
	export let daftarIndividu: (SiswaExtra | GuruExtra)[];
	export let daftarKelas: Kelas[];
	export let daftarMataPelajaran: MataPelajaran[] | undefined = undefined;

	const daftarSiswa = daftarIndividu as SiswaExtra[];
	const daftarGuru = daftarIndividu as GuruExtra[];

	// let daftarIndividu: SiswaAndGuruExtra[] = identityType == 'Siswa' ? { ...daftarSiswa } : { ...daftarGuru };

	let currentPerson: Record<keyof (Siswa & Guru), string> = {
		nis: '',
		nik: '',
		nama: '',
		tempatLahir: '',
		tanggalLahir: '',
		jenisKelamin: '',
		agama: '',
		alamat: '',
		namaAyah: '',
		pekerjaanAyah: '',
		namaIbu: '',
		pekerjaanIbu: '',
		kelasId: '-1',
		mataPelajaranId: '-1'
	};
	$: currentPerson;

	$: action = '';
	$: isModified = false;

	let idInput: HTMLInputElement;

	function selectPerson(id: number) {
		const selectedPerson = daftarIndividu[id];
		const selectedSiswa = selectedPerson as SiswaExtra;
		const selectedGuru = selectedPerson as GuruExtra;

		// console.log(selectedPerson);
		currentPerson = {
			// ...currentPerson,
			nis: identityType == 'Siswa' ? selectedSiswa.nis.toString() : '',
			nik: identityType == 'Guru' ? selectedGuru.nik.toString() : '',
			nama: selectedPerson.nama,
			tempatLahir: selectedPerson.tempatLahir,
			tanggalLahir: selectedPerson.tanggalLahir.toJSON(),
			jenisKelamin: selectedPerson.jenisKelamin,
			agama: selectedPerson.agama,
			alamat: selectedPerson.alamat,
			namaAyah: identityType == 'Siswa' ? selectedSiswa.namaAyah : '',
			pekerjaanAyah: identityType == 'Siswa' ? selectedSiswa.pekerjaanAyah || '' : '',
			namaIbu: identityType == 'Siswa' ? selectedSiswa.namaIbu : '',
			pekerjaanIbu: identityType == 'Siswa' ? selectedSiswa.pekerjaanIbu || '' : '',
			kelasId: selectedPerson.kelasId?.toString() || '',
			mataPelajaranId: identityType == 'Guru' ? selectedGuru.mataPelajaranId?.toString() || '' : ''
		};
	}

	function addPerson() {
		const lastPerson = daftarIndividu[0];
		const lastSiswa = lastPerson as SiswaExtra;
		const lastGuru = lastPerson as GuruExtra;
		currentPerson = {
			nis: identityType == 'Siswa' ? (lastSiswa.nis + 1).toString() : '',
			nik: identityType == 'Guru' ? (lastGuru.nik + 1).toString() : '',
			nama: '',
			tempatLahir: '',
			tanggalLahir: new Date('2000-01-01T00:00:00.0000Z').toJSON(),
			jenisKelamin: 'Laki',
			agama: 'Islam',
			alamat: '',
			namaAyah: '',
			pekerjaanAyah: '',
			namaIbu: '',
			pekerjaanIbu: '',
			kelasId: '-1',
			mataPelajaranId: '-1'
		};

		idInput.readOnly = false;
		action = 'Tambah';
		isModified = false;
	}

	function editPerson(id: number) {
		selectPerson(id);

		idInput.readOnly = true;
		action = 'Edit';
		isModified = false;
	}

	function onFormInput() {
		isModified = true;
	}
</script>

<div class="box bg-white shadow">
	<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#PersonModal" on:click={() => addPerson()}>
		<i class="bi bi-plus" /> Tambah
	</button>
	<div class="table-responsive">
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Aksi</th>
					<th scope="col">NIS</th>
					<th scope="col">Nama</th>
					<th scope="col">Tempat Lahir</th>
					<th scope="col">Tanggal Lahir</th>
					<th scope="col">Jenis Kelamin</th>
					<th scope="col">Agama</th>
					<th scope="col">Alamat</th>
					{#if identityType == 'Siswa'}
						<th scope="col">Nama Ayah</th>
						<th scope="col">Pekerjaan Ayah</th>
						<th scope="col">Nama Ibu</th>
						<th scope="col">Pekerjaan Ibu</th>
					{/if}
					<th scope="col">Kelas</th>
					{#if identityType == 'Guru'}
						<th scope="col">Mata Pelajaran</th>
					{/if}
				</tr>
			</thead>
			<tbody>
				{#each daftarIndividu as person, i}
					<tr>
						<td>
							<button
								type="button"
								class="btn btn-primary btn-sm"
								data-bs-toggle="modal"
								data-bs-target="#PersonModal"
								on:click={() => editPerson(i)}
							>
								<i class="bi bi-pencil-fill" />
							</button>
							<button
								type="button"
								class="btn btn-danger btn-sm"
								data-bs-toggle="modal"
								data-bs-target="#deletePersonModal"
								on:click={() => selectPerson(i)}
							>
								<i class="bi bi-trash-fill" />
							</button>
						</td>
						{#if identityType == 'Siswa'}
							<th scope="row">{daftarSiswa[i].nis}</th>
						{:else if identityType == 'Guru'}
							<th scope="row">{daftarGuru[i].nik}</th>
						{/if}
						<td>{person.nama}</td>
						<td>{person.tempatLahir}</td>
						<td
							>{person.tanggalLahir.toLocaleString('id', {
								dateStyle: 'medium'
							})}</td
						>
						<td>{person.jenisKelamin}</td>
						<td>{person.agama}</td>
						<td>{person.alamat}</td>
						{#if identityType == 'Siswa'}
							<td>{daftarSiswa[i].namaAyah}</td>
							<td>{daftarSiswa[i].pekerjaanAyah}</td>
							<td>{daftarSiswa[i].namaIbu}</td>
							<td>{daftarSiswa[i].pekerjaanIbu}</td>
						{/if}
						<td>{person.kelas?.tingkat}{person.kelas?.huruf}</td>
						{#if identityType == 'Guru'}
							<td>{daftarGuru[i].mataPelajaran?.mataPelajaran}</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<form method="post" action="?/upsert">
	<div
		class="modal fade"
		id="PersonModal"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="staticBackdropLabel">
						{action}
						{identityType}: {currentPerson.nama}
					</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
				</div>
				<div class="modal-body">
					<div class="mb-3">
						{#if identityType == 'Siswa'}
							<label for="nis" class="form-label">NIS</label>
							<input
								type="text"
								class="form-control"
								id="nis"
								name="nis"
								bind:value={currentPerson.nis}
								bind:this={idInput}
								on:input={() => onFormInput()}
								required
							/>
						{:else if identityType == 'Guru'}
							<label for="nik" class="form-label">NIK</label>
							<input
								type="text"
								class="form-control"
								id="nik"
								name="nik"
								bind:value={currentPerson.nik}
								bind:this={idInput}
								on:input={() => onFormInput()}
								required
							/>
						{/if}
					</div>
					<div class="mb-3">
						<label for="nama" class="form-label">Nama</label>
						<input type="text" class="form-control" id="nama" name="nama" bind:value={currentPerson.nama} on:input={() => onFormInput()} required />
					</div>
					<div class="mb-3">
						<label for="tempatLahir" class="form-label">Tempat Lahir</label>
						<input
							type="text"
							class="form-control"
							id="tempatLahir"
							name="tempatLahir"
							bind:value={currentPerson.tempatLahir}
							on:input={() => onFormInput()}
							required
						/>
					</div>
					<div class="mb-3">
						<label for="tanggalLahir" class="form-label">Tanggal Lahir</label>
						<input
							type="text"
							class="form-control"
							id="tanggalLahir"
							name="tanggalLahir"
							bind:value={currentPerson.tanggalLahir}
							on:input={() => onFormInput()}
							required
						/>
					</div>
					<div class="mb-3">
						<label for="jenisKelamin" class="form-label">Jenis Kelamin</label>
						<select class="form-select" id="jenisKelamin" name="jenisKelamin" bind:value={currentPerson.jenisKelamin} on:change={() => onFormInput()}>
							<option value="Laki">Laki</option>
							<option value="Perempuan">Perempuan</option>
						</select>
					</div>
					<div class="mb-3">
						<label for="agama" class="form-label">Agama</label>
						<select class="form-select" id="agama" name="agama" bind:value={currentPerson.agama} on:change={() => onFormInput()}>
							<option value="Islam">Islam</option>
							<option value="Kristen">Kristen</option>
							<option value="Katolik">Katolik</option>
							<option value="Hindu">Hindu</option>
							<option value="Budha">Budha</option>
							<option value="Konghucu">Konghucu</option>
						</select>
					</div>
					<div class="mb-3">
						<label for="alamat" class="form-label">Alamat</label>
						<input
							type="text"
							class="form-control"
							id="alamat"
							name="alamat"
							bind:value={currentPerson.alamat}
							on:input={() => onFormInput()}
							required
						/>
					</div>
					{#if identityType == 'Siswa'}
						<div class="mb-3">
							<label for="namaAyah" class="form-label">Nama Ayah</label>
							<input
								type="text"
								class="form-control"
								id="namaAyah"
								name="namaAyah"
								bind:value={currentPerson.namaAyah}
								on:input={() => onFormInput()}
								required
							/>
						</div>
						<div class="mb-3">
							<label for="pekerjaanAyah" class="form-label">Pekerjaan Ayah</label>
							<input
								type="text"
								class="form-control"
								id="pekerjaanAyah"
								name="pekerjaanAyah"
								bind:value={currentPerson.pekerjaanAyah}
								on:input={() => onFormInput()}
								required
							/>
						</div>
						<div class="mb-3">
							<label for="namaIbu" class="form-label">Nama Ibu</label>
							<input
								type="text"
								class="form-control"
								id="namaIbu"
								name="namaIbu"
								bind:value={currentPerson.namaIbu}
								on:input={() => onFormInput()}
								required
							/>
						</div>
						<div class="mb-3">
							<label for="pekerjaanIbu" class="form-label">Pekerjaan Ibu</label>
							<input
								type="text"
								class="form-control"
								id="pekerjaanIbu"
								name="pekerjaanIbu"
								bind:value={currentPerson.pekerjaanIbu}
								on:input={() => onFormInput()}
								required
							/>
						</div>
					{/if}
					<div class="mb-3">
						<label for="kelasId" class="form-label">Kelas</label>
						<select class="form-select" id="kelasId" name="kelasId" bind:value={currentPerson.kelasId} on:change={() => onFormInput()}>
							<option value="undefined">Kosong</option>
							{#each daftarKelas as kelas}
								<option value={kelas.id.toString()}>{kelas.tingkat}{kelas.huruf}</option>
							{/each}
						</select>
					</div>
					{#if daftarMataPelajaran}
						{#if identityType == 'Guru'}
							<div class="mb-3">
								<label for="mataPelajaranId" class="form-label">Kelas</label>
								<select
									class="form-select"
									id="mataPelajaranId"
									name="mataPelajaranId"
									bind:value={currentPerson.mataPelajaranId}
									on:change={() => onFormInput()}
								>
									<option value="undefined">Kosong</option>
									{#each daftarMataPelajaran as mapel}
										<option value={mapel.id.toString()}>{mapel.mataPelajaran}</option>
									{/each}
								</select>
							</div>
						{/if}
					{/if}
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
					<button type="submit" class="btn btn-primary" disabled={!isModified}>Terapkan</button>
				</div>
			</div>
		</div>
	</div>
</form>

<div
	class="modal fade"
	id="deletePersonModal"
	data-bs-backdrop="static"
	data-bs-keyboard="false"
	tabindex="-1"
	aria-labelledby="staticBackdropLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="staticBackdropLabel">Hapus {identityType}</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				Apakah Anda yakin untuk menghapus {currentPerson.nama}?<br /><b>NB: User yang terasosiasi juga akan dihapus.</b>
			</div>
			<div class="modal-footer">
				<form method="post" action="?/delete">
					{#if identityType == 'Siswa'}
						<input type="hidden" name="nis" bind:value={currentPerson.nis} />
					{:else if identityType == 'Guru'}
						<input type="hidden" name="nik" bind:value={currentPerson.nik} />
					{/if}
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
					<button type="submit" class="btn btn-danger">Iya</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.box {
		display: block;
		margin: auto;
		padding: 20px;
		border-radius: 10px 10px 10px 10px;
	}

	:global(.table) {
		white-space: nowrap;
		width: 1%;
	}
</style>
