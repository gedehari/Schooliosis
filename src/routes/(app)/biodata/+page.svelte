<script lang="ts">
    import type { Guru, Siswa } from "@prisma/client";
import type { PageData } from "./$types";

    export let data: PageData;

    const profile = data.me.profile;
    const siswa = profile as Siswa;
    const guru = profile as Guru;
</script>

<h2>Biodata {data.me.name}</h2>
<ul>
    <!-- <li><b>{data.me.identityType == "Siswa" ? "NIS" : "NIK"}</b>: {profile?.}</li> -->
    {#if data.me.identityType == "Siswa"}
        <li><b>NIS</b>: {siswa.nis}</li>
    {:else}
        <li><b>NIK</b>: {guru.nik}</li>
    {/if}
    <li><b>Nama</b>: {profile?.nama}</li>
    <li>
        <b>Tempat/Tanggal Lahir</b>: {profile?.tempatLahir}, {profile?.tanggalLahir.toLocaleString(
            "id",
            { dateStyle: "long" }
        )}
    </li>
    <li><b>Jenis Kelamin</b>: {profile?.jenisKelamin}</li>
    <li><b>Agama</b>: {profile?.agama}</li>
    <li><b>Alamat</b>: {profile?.alamat}</li>
    {#if data.me.identityType == "Siswa"}
        <li><b>Nama Ayah</b>: {siswa.namaAyah}</li>
        <li><b>Pekerjaan Ayah</b>: {siswa.pekerjaanAyah}</li>
        <li><b>Nama Ibu</b>: {siswa.namaIbu}</li>
        <li><b>Pekerjaan Ibu</b>: {siswa.pekerjaanIbu}</li>
    {/if}
</ul>
