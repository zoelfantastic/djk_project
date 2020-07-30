import React from 'react';
import { Table } from 'antd';

const columns = [
{ 
    title :  'No',
    dataIndex : 'no',
    key: 'no',       
},
{ 
    title :  'Klien',
    dataIndex : 'klien',
    key: 'klien',       
},
{ 
    title :  'Proyek',
    dataIndex : 'proyek',
    key: 'proyek',       
},
{ 
    title :  'Jangka Waktu',
    dataIndex : 'jangka_waktu',
    key: 'jangka_waktu',       
},
{ 
    title :  'Potensi Pendapatan (Rp Juta)',
    dataIndex : 'potensi_pendapatan',
    key: 'potensi_pendapatan',       
},
{ 
    title :  'Status',
    dataIndex : 'status',
    key: 'status',       
},
];

const dataSource = [
    {
        no: '1',
        klien: 'PT Pengembangan Pariwisata Indonesia',
        proyek: 'Pembiayaan Proyek Mandalika',
        jangka_waktu: '7 Agustus 2018 - 31 Desember 2019',
        potensi_pendapatan: '745',
        status: 'Dalam pengerjaan'
    },
    {
        no: '2',
        klien: 'PT Energi Dian Kemala',
        proyek: 'Pembangunan LNG Terminal',
        jangka_waktu: '9 Januari 2019 - 26 Desember 2019',
        potensi_pendapatan: '',
        status: 'Dalam pengerjaan'
    },
];

const ListProject = () => {
    return <Table columns={columns} dataSource={dataSource} />;
}

export default ListProject;