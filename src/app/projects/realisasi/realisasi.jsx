import React, { PureComponent } from 'react';
import { Modal, Form, Input, Row, Col, Button, Statistic, Drawer, Card } from 'antd';
import './realisasi.less';

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

class EditRealisasi extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            visibleDrawer: false
        }
    }
    componentDidMount() {
        const { record, form } = this.props;
        form.current.setFieldsValue({
            id: record.id,
            proyek: record.proyek,
            pemilik_proyek: record.pemilik_proyek,
            klien: record.klien,
        });
    }

    

    render() {
        const { form } = this.props;
        return (
            <div className="edit-project-form" >
               <Form {...formItemLayout} colon={false} ref={form}>
                    <Row>
                        <Col span={24} >
                            <Form.Item label="Kode Proyek" name="id">
                                <Input size="small" disabled />
                            </Form.Item>
                            <Form.Item label="Nama Proyek" name="proyek">
                                <Input size="small" disabled />
                            </Form.Item>
                            <Form.Item label="Pemilik Proyek" name="pemilik_proyek">
                                <Input size="small" disabled  />
                            </Form.Item>
                            <Form.Item label="Nama Client" name="klien">
                                <Input size="small" disabled  />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

class Realisasi extends PureComponent {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            visibleDrawer: false
        }
        this.elRef = React.createRef()
    }

    showDrawer = () => {
        this.setState({
          visibleDrawer: true,
        });
    };

    onClose = () => {
        this.setState({
            visibleDrawer: false,
        });
      };

      getContainer(id) {
        return () => {
          if (!id || typeof document === 'undefined') return null;
          return document.getElementById(id);
        };
      }

    render() {
        const { record, ...otherProps } = this.props;
        
        return (
            <Modal {...otherProps}>
                <div className="site-drawer-render-in-current-wrapper" >
                <Drawer
                    title=""
                    placement="top"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visibleDrawer}
                    getContainer={false}
                    style={{ position: "absolute"}}
                >
                    <p>Realisasi</p>
                </Drawer>
                <EditRealisasi record={record} form={this.formRef} />
                <Card>
                    <Row gutter={2} style={{ textAlign:'center' }}>
                        <Col span={6}>
                            <Statistic 
                                title="Realisasi Biaya" 
                                value={3000000000}
                                valueStyle={{ fontSize: 'smaller' }}
                                prefix={"Rp."}  />
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
                                title="Invoice" 
                                value={4000000000}
                                valueStyle={{ fontSize: 'smaller' }}
                                prefix={"Rp."}  />
                                <Button style={{ marginTop: 16 }} type="primary" size="small">
                                    Detail
                                </Button>
                        </Col>
                        <Col span={6}>
                            <Statistic 
                                title="Realisasi Kerja" 
                                value={300}
                                valueStyle={{ fontSize: 'smaller' }}
                                suffix={""}  />
                                <Button style={{ marginTop: 16 }} type="primary" size="small">
                                    Detail
                                </Button>
                        </Col>
                        <Col span={6}>
                            <Statistic 
                                title="Project Issues" 
                                value={2}
                                valueStyle={{ fontSize: 'smaller' }}
                                suffix={""}  />
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

export default Realisasi;