import React, {PureComponent} from "react";
import { withAppContext } from 'context';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { Row, Col, Form, Card, DatePicker, Button, Tooltip } from "antd";
import './ringkasan-kinerja.less';
import {FileExcelFilled, FilePdfFilled} from '@ant-design/icons'


const combineChartOpt = {
    title: undefined,
    xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
        format: '{value}',
        style: {
            color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Jumlah',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
    }, { // Secondary yAxis
        title: {
        text: 'Rasio Bulanan Pendapatan DJK dan RKAP',
        style: {
            color: Highcharts.getOptions().colors[0]
        }
        },
        labels: {
        format: '{value}%',
        style: {
            color: Highcharts.getOptions().colors[0]
        }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 100,
        verticalAlign: 'top',
        y: 0,
        floating: true,
        backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        'rgba(255,255,255,0.25)'
    },
    colors: ['#058DC7', '#f2802e', '#c2bcbc'],
    series: [
    {
        name: 'RKAP Pendapatan per bulan (akumulatif)',
        type: 'column',
        yAxis: 1,
        data: [500, 1800, 2100, 2300, 3800, 4050, 6000, 7800, 8300, 9000, 9500, 9750],
    }, 
    {
        name: 'Pendapatan DJK',
        type: 'column',
        yAxis: 1,
        data: [100, 2000, 2150, 2300, 6500, 10000, 12000, 14100, 14500, 12000, 15000, 15500],
    }, 
    {
        name: 'Rasio bulanan Pendapatan DJK dan RKAP',
        type: 'spline',
        data: [23, 126, 108, 102, 189, 239, 205, 190, 150, 45, 125, 200],
        tooltip: {
        valueSuffix: '%'
        }
    }]
}

const barColumnChartOpt = {
    chart: {
        type: "column"
    },
    title: undefined,
    tooltip: {
    },
    xAxis: { categories: [
        'Agustus',
    ] },
    yAxis: {
        min: 14200,
        title: { text: "Jumlah" },
       
    },
    legend: {
        layout: 'vertical',
        align: 'center',
        x: 10,
        verticalAlign: 'bottom',
        y:10,
        floating: false,
        backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
      },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
    },
    colors: ['#058DC7', '#f2802e'],
    series: [
        {
            name: 'Realisasi DJK YTD Agustus 2019',
            data: [14452, 0]
        },
        {
            name: 'Target Pendpatan FY2019',
            data: [14300, 0]
        }
    ]
}

class RingkasanKinerja extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 },
        };

        return(
            <div className="chart-pane">
                <Row>
                    <Col span={24}>
                        <Card title="">
                                <Row>
                                    <Col span={18}>
                                        <Form.Item style={{ display: 'inline-block', width: '150px' }}
                                        >
                                            <DatePicker />
                                        </Form.Item>
                                        <span
                                            style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                        >
                                            To
                                        </span>
                                        <Form.Item style={{ display: 'inline-block', width: '150px' }}>
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)'}}>
                                            <Button onClick={this.handleClick}>Preview</Button>
                                        </Form.Item>
                                    </Col>
                                    <Col span={6} style={{ textAlign: 'right' }}>
                                         <Tooltip title="Export to Excel">
                                            <Button shape="circle" style={{ marginRight: '5px' }} icon={<FileExcelFilled />}/>
                                        </Tooltip>
                                        <Tooltip title="Export to Pdf">
                                            <Button icon={<FilePdfFilled />} shape="circle" />
                                        </Tooltip>
                                    </Col>
                                </Row>
                        </Card >
                    </Col>
                </Row>
                <Row>
                    <Col span={9}>
                        <Card title="Pendapatan DJK YTD Agustus 2019" style={{ textAlign: "center" }}>
                            <HighchartsReact key="perKorpsCount" containerProps={{ style: { height: "295px" } }}
                                highcharts={Highcharts} options={barColumnChartOpt} />
                        </Card>
                    </Col>
                    <Col span={15}>
                    <Card title="Realisasi Kinerja DJK Periode Jan - Agustus 2019" style={{ textAlign: "center" }}>
                            <HighchartsReact key="perKorpsCount" containerProps={{ style: { height: "295px" } }}
                                highcharts={Highcharts} options={combineChartOpt} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withAppContext(RingkasanKinerja);