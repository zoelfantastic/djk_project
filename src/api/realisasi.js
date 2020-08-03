import APIService from './api-service';

export default class RealisasiService extends APIService {
    constructor(appContext) {
        super(appContext);
    }

    getDataRealisasi(kode_proyek) {
        let id = kode_proyek;
        return super.getData(`realisasi?${kode_proyek}`);
    }

    getDataRealisasiById(id) {
        return super.getData(`realisasi/${id}`);
    }

    updateDataRealisasi(recordId, record) {
        return super.putData(`realisasi/${recordId}`, record);
    }

    deleteDataRealisasi(recordId){
        return super.deleteData(`realisasi/${recordId}`);
    }

    addDataRealisasi(record){
        return super.postData(`realisasi`, record);
    }
}