/*
 * Created by Dyan at 2019/3/20 21:13
 */

var json_test = {"lora":[{"id":1,"terminals":[{"datas":[{"id":242,"msg":"Hello","rssi":-22,"snr":7,"terminalId":1,"time":"2019-03-21 21:36:29"}],"id":1,"stationId":1}],"x":11,"y":5}],"uwb":[{"id":8,"time":"2019-05-21 15:46:05","x":1,"y":10}],"zigbeeTopo":[["0000","0000"],["BB11","0000"],["BB0B","BB11"]],"rfid":[],"zigbee":[[],[{"data":"6211","id":0,"rssi":"-56","sensor":{"father_addr":"","id":0,"isLeave":0,"sensor_addr":"","sensor_id":"BB01","x":200,"y":30},"sensor_id":"BB01","time":"2019-03-25 11:35:09"}],[{"data":"167","id":0,"rssi":"-26","sensor":{"father_addr":"","id":0,"isLeave":0,"sensor_addr":"","sensor_id":"BB0B","x":30,"y":100},"sensor_id":"BB0B","time":"2019-03-25 22:06:17"}],[{"data":"323","id":0,"rssi":"-23","sensor":{"father_addr":"","id":0,"isLeave":0,"sensor_addr":"","sensor_id":"BB11","x":40,"y":70},"sensor_id":"BB11","time":"2019-03-25 22:06:20"}],[{"data":"40800","id":0,"rssi":"-55","sensor":{"father_addr":"","id":0,"isLeave":0,"sensor_addr":"","sensor_id":"BB12","x":45,"y":33},"sensor_id":"BB12","time":"2019-03-25 11:34:29"}]]};

var data_io = {
    getData: function(){
        setInterval(function(){
            // NetWork.getTestData(getParamsInTable.getParams);
            getParamsInTable.getParams(json_test);
            }, 1000
        );
        svg_render();
    },      //获取数据
};

