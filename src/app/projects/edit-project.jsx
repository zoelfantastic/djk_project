import React, { PureComponent } from 'react';
import { Form, Input, Modal, DatePicker,
         Select, Col, Row, Drawer,
         Card, Button, Statistic } from 'antd';
import ListRencanaKerja from "./list-rencana-kerja";
import './list-rencana-kerja.less';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

class EditProject extends PureComponent {
    componentDidMount() {
        const { record, form } = this.props;
        form.current.setFieldsValue({
            id: record.id,
            proyek: record.proyek,
            pemilik_proyek: record.pemilik_proyek,
            deskripsi_proyek: record.deskripsi_proyek,
            klien: record.klien,
            wilayah_proyek: record.wilayah_proyek,
            tgl_mulai: moment(moment(record.tgl_mulai).format('YYYY-MM-DD'), 'YYYY-MM-DD'),
            tgl_jatuh_tempo: moment(moment(record.tgl_jatuh_tempo).format('YYYY-MM-DD'), 'YYYY-MM-DD'),

        });
    }

    render() {
        const { form } = this.props;
        return (
            <div className="edit-project-form">
               <Form {...formItemLayout} colon={false} ref={form}>
                    <Row gutter={8}>
                        <Col span={12} >
                            <Form.Item label="Kode Proyek" name="id">
                                <Input size="small" disabled />
                            </Form.Item>
                            <Form.Item label="Nama Proyek" name="proyek">
                                <Input size="small" disabled />
                            </Form.Item>
                            <Form.Item label="Pemilik Proyek" name="pemilik_proyek">
                                <Input size="small" disabled  />
                            </Form.Item>
                            <Form.Item label="Deskripsi Proyek" name="deskripsi_proyek">
                                <TextArea rows={2} disabled  />
                            </Form.Item>
                            <Form.Item label="Nama Client" name="klien">
                                <Input size="small" disabled  />
                            </Form.Item>
                            <Form.Item label="Wilayah Proyek" name="wilayah_proyek">
                                <Input size="small" disabled  />
                            </Form.Item>
                            <Form.Item label="Tanggal Mulai" name="tgl_mulai">
                                <DatePicker format={'DD-MM-YYYY'} size="small"  />
                            </Form.Item>
                            <Form.Item label="Tanggal Jatuh Tempo" name="tgl_jatuh_tempo">
                                <DatePicker format={'DD-MM-YYYY'} size="small" />
                            </Form.Item>
                            <Form.Item label="Tahap" name="tahap">
                                <Select style={{ width: 160 }}>
                                        <Option value="1">Tahap 1</Option>
                                        <Option value="2">Tahap 2</Option>
                                        <Option value="3">Tahap 3</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Status" name="status">
                                <Select style={{ width: 160 }}>
                                        <Option value="1">Dalam Pengerjaan</Option>
                                        <Option value="2">Pengerjaan Telah Selesai</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}> 
                            <Form.Item label="Jenis Jasa" name="jenis_jasa">
                                <Input size="small" disabled  />
                            </Form.Item>
                            <Form.Item label="Mata Uang" name="mata_uang">
                                <Input size="small"  disabled />
                            </Form.Item>
                            <Form.Item label="Potensi Pendapatan (IDR)" name="potensi_pendapatan">
                                <Input size="small" disabled  />
                            </Form.Item>
                            <Form.Item label="Tanggal SPK" name="tgl_spk">
                                <DatePicker format={'DD-MM-YYYY'} size="small" disabled />
                            </Form.Item>
                            <Form.Item label="Nomor SPK" name="no_spk">
                                <Input size="small" disabled  />
                            </Form.Item>
                            <Form.Item label="Tanggal Kontrak" name="tgl_kontrak">
                                <DatePicker format={'DD-MM-YYYY'} size="small" disabled />
                            </Form.Item>
                            <Form.Item label="Nomor Kontrak" name="no_kontrak">
                                <Input size="small" disabled   />
                            </Form.Item>
                            <Form.Item label="Nomor BAST" name="no_bast">
                                <Input size="small"   />
                            </Form.Item>
                            <Form.Item label="Tanggal BAST" name="tgl_bast">
                                <DatePicker format={'DD-MM-YYYY'} size="small" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

class ProjectEditorDialog extends PureComponent {
    formRef = React.createRef();

    constructor(props) {
        super(props)
        this.state = {
            visibleDrawer: false,
            tipe: ''
        }
    }

    showDrawer = (tipe) => {
        this.setState({
          visibleDrawer: true,
          tipe: tipe
        });
    };

    onClose = () => {
        this.setState({
            visibleDrawer: false,
        });
    };

    handleSave = e => {
        this.formRef.current.validateFields()
                    .then(values => {
                        this.props.onSaveChange(values);
                    });
    }

    renderDetail = () => {
        const {appContext} = this.props;
        const { tipe } = this.state;
        switch (tipe) {
            case 'rencana-kerja' :
                return <ListRencanaKerja appContext={appContext} />
                break;
            default :
                break;
        }
    }

    render() {
        const { appContext, record, form, ...otherProps } = this.props;
        
        return (
            <Modal {...otherProps} onOk={this.handleSave}>
                <div className="rencana-drawer-render-in-current-wrapper" >
                    <Drawer
                        title=""
                        placement="top"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visibleDrawer}
                        getContainer={false}
                        style={{ position: "absolute"}}
                    >
                        <ListRencanaKerja appContext={appContext} />
                    </Drawer>
                    <EditProject record={record} form={this.formRef} />
                    <Card>
                        <Row gutter={2} style={{ textAlign:'center' }}>
                            <Col span={6}>
                                <Statistic 
                                    title="Rencana Kerja (Mandays)" 
                                    value={400}
                                    valueStyle={{ fontSize: 'smaller' }}
                                      />
                                    <Button 
                                        style={{ marginTop: 16 }} 
                                        type="primary" 
                                        onClick={this.showDrawer}
                                        size="small">
                                        Detail
                                    </Button>
                            </Col>
                            <Col span={6}>
                                <Statistic 
                                    title="Rencana Personel (Person)" 
                                    value={5}
                                    valueStyle={{ fontSize: 'smaller' }}  />
                                    <Button style={{ marginTop: 16 }} type="primary" size="small">
                                        Detail
                                    </Button>
                            </Col>
                            <Col span={6}>
                                <Statistic 
                                    title="Rencana Biaya" 
                                    value={3500000000}
                                    valueStyle={{ fontSize: 'smaller' }}
                                    prefix={"Rp."}  />
                                    <Button style={{ marginTop: 16 }} type="primary" size="small">
                                        Detail
                                    </Button>
                            </Col>
                            <Col span={6}>
                                <Statistic 
                                    title="Nilai Ambil Jasa" 
                                    value={2}
                                    valueStyle={{ fontSize: 'smaller' }}
                                    prefix={"Rp."}  />
                                    <Button style={{ marginTop: 16 }} type="primary" size="small">
                                        Detail
                                    </Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Modal>
        );
    }
}


export default ProjectEditorDialog;