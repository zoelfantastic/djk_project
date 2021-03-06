import React, { PureComponent } from 'react';
import { Form, Input, Modal, DatePicker, Select, Col, Row } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 18 },
    },
};

class AddProject extends PureComponent {
    componentDidMount() {
        const { form } = this.props;
        //form.setFieldsValue(record);
    }

    render() {
        const { form } = this.props;

        return (
            <div className="edit-project-form">
                <Form {...formItemLayout} colon={false} ref={form}>
                    <Row gutter={8}>
                        <Col span={12} >
                            <Form.Item label="Kode Proyek" name="id">
                                <Input size="small"  />
                            </Form.Item>
                            <Form.Item label="Nama Proyek" name="proyek">
                                <Input size="small" />
                            </Form.Item>
                            <Form.Item label="Pemilik Proyek" name="pemilik_proyek">
                                <Input size="small"  />
                            </Form.Item>
                            <Form.Item label="Deskripsi Proyek" name="deskripsi_proyek">
                                <TextArea rows={2}  />
                            </Form.Item>
                            <Form.Item label="Nama Client" name="klien">
                                <Input size="small"  />
                            </Form.Item>
                            <Form.Item label="Wilayah Proyek" name="wilayah_proyek">
                                <Input size="small"  />
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
                                <Input size="small"  />
                            </Form.Item>
                            <Form.Item label="Mata Uang" name="mata_uang">
                                <Input size="small"  />
                            </Form.Item>
                            <Form.Item label="Potensi Pendapatan (IDR)" name="potensi_pendapatan">
                                <Input size="small"  />
                            </Form.Item>
                            <Form.Item label="Tanggal SPK" name="tgl_spk">
                                <DatePicker format={'DD-MM-YYYY'} size="small" />
                            </Form.Item>
                            <Form.Item label="Nomor SPK" name="no_spk">
                                <Input size="small"  />
                            </Form.Item>
                            <Form.Item label="Tanggal Kontrak" name="tgl_kontrak">
                                <DatePicker format={'DD-MM-YYYY'} size="small" />
                            </Form.Item>
                            <Form.Item label="Nomor Kontrak" name="no_kontrak">
                                <Input size="small"   />
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

class AddProjectEditorDialog extends PureComponent {
    formRef = React.createRef();
    handleSave = () => {
        this.formRef.current.validateFields()
                    .then(values => {
                        this.props.onSaveChange(values);
                    });
    }

    render() {
        const { ...otherProps } = this.props;
        return (
            <Modal {...otherProps} onOk={this.handleSave}>
                <AddProject form={this.formRef} />
            </Modal>
        );
    }
}
const AddProjectEditorDialogForm = AddProjectEditorDialog;

export { AddProjectEditorDialogForm }

export default AddProject;