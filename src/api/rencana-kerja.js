import APIService from './api-service';

export default class RencanaKerjaService extends APIService {
    constructor(appContext) {
        super(appContext);
    }

    getDataRencanaKerja() {
        return super.getData(`rencana-kerja`);
    }

    getDataRencanaKerjaById(id) {
        return super.getData(`rencana-kerja/${id}`);
    }

    updateRencanaKerja(recordId, record) {
        return super.putData(`rencana-kerja/${recordId}`, record);
    }

    deleteRencanaKerja(recordId){
        return super.deleteData(`rencana-kerja/${recordId}`);
    }

    addDataRencanaKerja(record){
        return super.postData(`rencana-kerja`, record);
    }
}