<script lang="ts">
  import type { PageData } from "./$types";
  import { beforeNavigate } from "$app/navigation";
  import type { Siswa } from "@prisma/client";
  import type { SiswaFormInput } from "../types";

  export let data: PageData;
  const { daftarSiswa, daftarKelas } = data;

  let currentSiswa: SiswaFormInput = {
    nis: "",
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    agama: "",
    alamat: "",
    namaAyah: "",
    pekerjaanAyah: "",
    namaIbu: "",
    pekerjaanIbu: "",
    kelasId: "-1",
  };
  $: currentSiswa;

  $: action = "";
  $: isModified = false;

  let nisInput: HTMLInputElement;

  function selectSiswa(id: number) {
    const selectedSiswa = daftarSiswa[id];
    currentSiswa = {
      nis: selectedSiswa.nis.toString(),
      nama: selectedSiswa.nama,
      tempatLahir: selectedSiswa.tempatLahir,
      tanggalLahir: selectedSiswa.tanggalLahir.toJSON(),
      jenisKelamin: selectedSiswa.jenisKelamin,
      agama: selectedSiswa.agama,
      alamat: selectedSiswa.alamat,
      namaAyah: selectedSiswa.namaAyah,
      pekerjaanAyah: selectedSiswa.pekerjaanAyah || "",
      namaIbu: selectedSiswa.namaIbu,
      pekerjaanIbu: selectedSiswa.pekerjaanIbu || "",
      kelasId: selectedSiswa.kelasId?.toString() || "NaN",
    };
  }

  function addSiswa() {
    currentSiswa = {
      nis: (daftarSiswa[0].nis + 1).toString(),
      nama: "",
      tempatLahir: "",
      tanggalLahir: new Date("2000-01-01T00:00:00.0000Z").toJSON(),
      jenisKelamin: "Laki",
      agama: "Islam",
      alamat: "",
      namaAyah: "",
      pekerjaanAyah: "",
      namaIbu: "",
      pekerjaanIbu: "",
      kelasId: "-1",
    };

    nisInput.readOnly = false;
    action = "Tambah";
    isModified = false;
  }

  function editSiswa(id: number) {
    selectSiswa(id);

    nisInput.readOnly = true;
    action = "Edit";
    isModified = false;
  }

  function deleteSiswa(id: number) {
    selectSiswa(id);
  }

  function onFormInput() {
    isModified = true;
  }
</script>

<div class="box bg-white shadow">
  <button
    type="button"
    class="btn btn-success"
    data-bs-toggle="modal"
    data-bs-target="#siswaModal"
    on:click="{() => addSiswa()}"
  >
    <i class="bi bi-plus"></i> Tambah
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
          <th scope="col">Nama Ayah</th>
          <th scope="col">Pekerjaan Ayah</th>
          <th scope="col">Nama Ibu</th>
          <th scope="col">Pekerjaan Ibu</th>
          <th scope="col">Kelas</th>
        </tr>
      </thead>
      <tbody>
        {#each daftarSiswa as siswa, i}
          <tr>
            <td>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#siswaModal"
                on:click="{() => editSiswa(i)}"
              >
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#deleteSiswaModal"
                on:click="{() => deleteSiswa(i)}"
              >
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
            <th scope="row">{siswa.nis}</th>
            <td>{siswa.nama}</td>
            <td>{siswa.tempatLahir}</td>
            <td
              >{siswa.tanggalLahir.toLocaleString("id", {
                dateStyle: "medium",
              })}</td
            >
            <td>{siswa.jenisKelamin}</td>
            <td>{siswa.agama}</td>
            <td>{siswa.alamat}</td>
            <td>{siswa.namaAyah}</td>
            <td>{siswa.pekerjaanAyah}</td>
            <td>{siswa.namaIbu}</td>
            <td>{siswa.pekerjaanIbu}</td>
            <td>{siswa.kelasId}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<div
  class="modal fade"
  id="siswaModal"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">
          {action} Siswa: {currentSiswa.nama}
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
      </div>
      <form method="post" action="?/upsert">
        <div class="modal-body">
          <div class="mb-3">
            <label for="nis" class="form-label">NIS</label>
            <input
              type="text"
              class="form-control"
              id="nis"
              name="nis"
              bind:value="{currentSiswa.nis}"
              bind:this="{nisInput}"
              on:input="{() => onFormInput()}"
              required
            />
          </div>
          <div class="mb-3">
            <label for="nama" class="form-label">Nama</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              name="nama"
              bind:value="{currentSiswa.nama}"
              on:input="{() => onFormInput()}"
              required
            />
          </div>
          <div class="mb-3">
            <label for="tempatLahir" class="form-label">Tempat Lahir</label>
            <input
              type="text"
              class="form-control"
              id="tempatLahir"
              name="tempatLahir"
              bind:value="{currentSiswa.tempatLahir}"
              on:input="{() => onFormInput()}"
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
              bind:value="{currentSiswa.tanggalLahir}"
              on:input="{() => onFormInput()}"
              required
            />
          </div>
          <div class="mb-3">
            <label for="jenisKelamin" class="form-label">Jenis Kelamin</label>
            <select
              class="form-select"
              id="jenisKelamin"
              name="jenisKelamin"
              bind:value="{currentSiswa.jenisKelamin}"
              on:change="{() => onFormInput()}"
            >
              <option value="Laki">Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="agama" class="form-label">Agama</label>
            <select
              class="form-select"
              id="agama"
              name="agama"
              bind:value="{currentSiswa.agama}"
              on:change="{() => onFormInput()}"
            >
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
              bind:value="{currentSiswa.alamat}"
              on:input="{() => onFormInput()}"
              required
            />
          </div>
          <div class="mb-3">
            <label for="namaAyah" class="form-label">Nama Ayah</label>
            <input
              type="text"
              class="form-control"
              id="namaAyah"
              name="namaAyah"
              bind:value="{currentSiswa.namaAyah}"
              on:input="{() => onFormInput()}"
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
              bind:value="{currentSiswa.pekerjaanAyah}"
              on:input="{() => onFormInput()}"
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
              bind:value="{currentSiswa.namaIbu}"
              on:input="{() => onFormInput()}"
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
              bind:value="{currentSiswa.pekerjaanIbu}"
              on:input="{() => onFormInput()}"
              required
            />
          </div>
          <div class="mb-3">
            <label for="kelasId" class="form-label">Kelas</label>
            <input
              type="text"
              class="form-control"
              id="kelasId"
              name="kelasId"
              bind:value="{currentSiswa.kelasId}"
              on:input="{() => onFormInput()}"
              required
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal">Batal</button
          >
          <button type="submit" class="btn btn-primary" disabled="{!isModified}"
            >Terapkan</button
          >
        </div>
      </form>
    </div>
  </div>
</div>

<div
  class="modal fade"
  id="deleteSiswaModal"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Hapus Siswa</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Apakah Anda yakin untuk menghapus {currentSiswa.nama}?<br /><b
          >NB: User yang terasosiasi akan juga dihapus.</b
        >
      </div>
      <div class="modal-footer">
        <form method="post" action="?/delete">
          <input type="hidden" name="nis" bind:value="{currentSiswa.nis}" />
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal">Tidak</button
          >
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
