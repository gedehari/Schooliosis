<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { daftarUser } = data;

	$: currentUser = {
		id: '',
		identityType: '',
		siswaNis: '',
		guruNik: '',
		nama: '',
		email: ''
	};

	$: isModified = false;

	function selectUser(id: number) {
		const selectedUser = daftarUser[id];
		// console.log(selectedPerson);
		currentUser = {
			id: selectedUser.id.toString(),
			identityType: selectedUser.identityType,
			siswaNis: selectedUser.siswaNis?.toString() || '',
			guruNik: selectedUser.guruNik?.toString() || '',
			nama: selectedUser.siswa?.nama ?? selectedUser.guru?.nama ?? '',
			email: selectedUser.email
		};
	}

	function editUser(id: number) {
		selectUser(id);
		isModified = false;
	}

	function onFormInput() {
		isModified = true;
	}
</script>

<div class="box bg-white shadow">
	<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#AdminModal">
		<i class="bi bi-plus" /> Tambah Admin
	</button>
	<div class="table-responsive">
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Aksi</th>
					<th scope="col">#</th>
					<th scope="col">Tipe Identitas</th>
					<th scope="col">NIS</th>
					<th scope="col">Nama</th>
					<th scope="col">Email</th>
				</tr>
			</thead>
			<tbody>
				{#each daftarUser as user, i}
					<tr>
						<td>
							<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#UserModal" on:click={() => editUser(i)}>
								<i class="bi bi-pencil-fill" />
							</button>
							<button
								type="button"
								class="btn btn-danger btn-sm"
								data-bs-toggle="modal"
								data-bs-target="#deleteUserModal"
								on:click={() => selectUser(i)}
							>
								<i class="bi bi-trash-fill" />
							</button>
						</td>
						<th scope="row">{user.id}</th>
						<td>{user.identityType}</td>
						{#if user.identityType == 'Siswa'}
							<td>{user.siswaNis}</td>
						{:else if user.identityType == 'Guru'}
							<td>{user.guruNik}</td>
						{:else}
							<td>-</td>
						{/if}
						{#if user.identityType == 'Siswa'}
							<td>{user.siswa?.nama}</td>
						{:else if user.identityType == 'Guru'}
							<td>{user.guru?.nama}</td>
						{:else}
							<td>-</td>
						{/if}
						<td>{user.email}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<form method="post" action="?/update">
	<div
		class="modal fade"
		id="UserModal"
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
						Edit User: {currentUser.nama}
					</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
				</div>
				<div class="modal-body">
					<div class="mb-3">
						<label for="id" class="form-label">ID</label>
						<input type="text" class="form-control" id="id" name="id" bind:value={currentUser.id} readonly />
					</div>
					<div class="mb-3">
						<label for="id" class="form-label">Tipe Identitas</label>
						<input type="text" class="form-control" id="id" name="id" bind:value={currentUser.identityType} disabled />
					</div>
					<div class="mb-3">
						{#if currentUser.identityType == 'Siswa'}
							<label for="siswaNis" class="form-label">NIS</label>
							<input type="text" class="form-control" id="siswaNis" name="siswaNis" bind:value={currentUser.siswaNis} disabled />
						{:else if currentUser.identityType == 'Guru'}
							<label for="guruNik" class="form-label">NIK</label>
							<input type="text" class="form-control" id="guruNik" name="guruNik" bind:value={currentUser.guruNik} disabled />
						{/if}
					</div>
					<div class="mb-3">
						<label for="nama" class="form-label">Nama</label>
						<input type="text" class="form-control" id="nama" name="nama" bind:value={currentUser.nama} disabled />
					</div>
					<div class="mb-3">
						<label for="email" class="form-label">Email</label>
						<input type="email" class="form-control" id="email" name="email" bind:value={currentUser.email} on:input={() => onFormInput()} required />
					</div>
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
	id="deleteUserModal"
	data-bs-backdrop="static"
	data-bs-keyboard="false"
	tabindex="-1"
	aria-labelledby="staticBackdropLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="staticBackdropLabel">Hapus User</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				Apakah Anda yakin untuk menghapus {currentUser.nama}?<br /><b>NB: User yang terasosiasi juga akan dihapus.</b>
			</div>
			<div class="modal-footer">
				<form method="post" action="?/delete">
					<input type="hidden" name="id" bind:value={currentUser.id} />
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
