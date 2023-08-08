<script lang="ts">
	import type { UserInfo } from '$lib/user/types';
	import type { Guru, Siswa } from '@prisma/client';

	export let userInfo: UserInfo;

	const profile = userInfo.profile;
	const siswa = profile as Siswa;
	const guru = profile as Guru;
</script>

<div class="container">
	<div class="box bg-white shadow d-block">
		<div class="d-flex">
			<div class="section-left">
				<div class="section-left-top">
					<img class="shadow" src="/profile.png" height="120px" alt="Profile" />
					<h2>{profile?.nama}</h2>
				</div>
				<div>
					<div class="options list-group list-group-flush">
						<a href="#" class="list-group-item list-group-item-action active">Biodata</a>
						<a href="#" class="list-group-item list-group-item-action">Ubah Password</a>
					</div>
				</div>
			</div>
			<div class="section-right">
				<h2>Biodata {userInfo.identityType}</h2>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							{#if userInfo.identityType == 'Siswa'}
								<label>NIS</label>
								<input type="text" class="form-control" value={siswa.nis} disabled />
							{:else}
								<label>NIK</label>
								<input type="text" class="form-control" value={guru.nik} disabled />
							{/if}
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label>Nama</label>
							<input type="text" class="form-control" value={profile?.nama} disabled />
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label>Tempat/Tanggal Lahir</label>
							<input
								type="text"
								class="form-control"
								value={`${profile?.tempatLahir}, ${profile?.tanggalLahir.toLocaleString('id', {
									dateStyle: 'long'
								})}`}
								disabled
							/>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label>Jenis Kelamin</label>
							<input type="text" class="form-control" value={profile?.jenisKelamin} disabled />
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label>Agama</label>
							<input type="text" class="form-control" value={profile?.agama} disabled />
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label>Alamat</label>
							<input type="text" class="form-control" value={profile?.alamat} disabled />
						</div>
					</div>
					{#if userInfo.identityType == 'Siswa'}
						<div class="col-md-6">
							<div class="form-group">
								<label>Nama Ayah</label>
								<input type="text" class="form-control" value={siswa.namaAyah} disabled />
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Pekerjaan Ayah</label>
								<input type="text" class="form-control" value={siswa.pekerjaanAyah} disabled />
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Nama Ibu</label>
								<input type="text" class="form-control" value={siswa.namaIbu} disabled />
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Pekerjaan Ibu</label>
								<input type="text" class="form-control" value={siswa.pekerjaanIbu} disabled />
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1000px;
	}

	.box {
		border-radius: 10px 10px 10px 10px;
	}

	.section-left {
		flex: 0 0 300px;
	}

	.section-left .section-left-top {
		padding: 20px 0;
	}

	.section-left .section-left-top img {
		display: block;
		margin: auto;
		margin-bottom: 5px;
		border-radius: 50%;
	}

	.section-left .section-left-top h2 {
		text-align: center;
	}

	.section-right {
		flex: 1 0;

		border-left: 1px solid rgb(228, 228, 228);
		padding: 20px;
	}

	.section-right .row [class^='col-'] {
		margin-bottom: 10px;
	}

	.options.list-group {
		background-color: transparent;
	}

	.options.list-group .list-group-item {
		/* height: 80px; */
		padding: 12px 15px;
	}

	.options.list-group .list-group-item:not(.active) {
		background-color: transparent;
	}
</style>
