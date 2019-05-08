/*
 * Created by Dyan at 2019/3/22 19:20
 */

var getParamsInTable = {
    Net_Structure: ["LoRa", "ZigBee", "RFID", "UWB"],       //预定义网络制式
    ZigBee_Terminal_ID: "BB01",     //预定义ZigBee终端ID
    ZigBee_Father_ID: null,       //ZigBee终端的父节点ID
    timeDisplay: function(){

    },
    setTables: function(structure){
        let table_selected = $("#state_tables");
        table_selected.empty();
        for(let structure_i = 0;structure_i < structure.length;structure_i ++){
            table_selected.append(
                "<table class='table table-striped' id='" +
                structure[structure_i] + "_table'><caption>" +
                structure[structure_i] + "实时状态信息</caption><thead></thead><tbody></tbody></table>"
            );
        }
    },      //设置状态表格
    setZigBeeState: function(flag){
        if(flag === getParamsInTable.ZigBee_Father_ID){
            return 1;
        }
        else return 0;
    },      //判断ZigBee连接状态
    getParams: function (obj) {
        getParamsInTable.setTables(getParamsInTable.Net_Structure);
        dataset.length = 0;
        topo_data.length = 0;
        //LoRa表头
        $("#LoRa_table thead").empty().append(
            "<tr><th>" +
            "ID" + "</th><th>" +
            "RSSI" + "</th><th>" +
            "SNR" + "</th><th>" +
            "MSG" + "</th><th>" +
            "TIME" + "</th></tr>"
        );
        //右侧显示ZigBee实时参数
        $("#LoRa_table tbody").empty().append(
            "<tr><td>" +
            obj.lora[0].id + "</td><td>" +
            obj.lora[0].terminals[0].datas[0].rssi + "</td><td>" +
            obj.lora[0].terminals[0].datas[0].snr + "</td><td>" +
            obj.lora[0].terminals[0].datas[0].msg + "</td><td>" +
            obj.lora[0].terminals[0].datas[0].time + "</td></tr>"
        );
        dataset.push([obj.lora[0].x, obj.lora[0].y, "LoRa", 1]);
        //ZigBee表头
        $("#ZigBee_table thead").empty().append(
            "<tr><th>" +
            "ID" + "</th><th>" +
            "RSSI" + "</th><th>" +
            "DATA" + "</th><th>" +
            "TIME" + "</th></tr>"
        );
        let ZigBee_table_tbody = $("#ZigBee_table tbody");
        dataset.push([400, 300, "ZigBee-" + "解调器", 0]);
        //提取ZigBee拓扑信息
        for(let topo_ZigBee = 0;topo_ZigBee < obj.zigbeeTopo.length;topo_ZigBee ++){
            let ZigBee_Topo_son = obj.zigbeeTopo[topo_ZigBee][0];
            let ZigBee_Topo_father = obj.zigbeeTopo[topo_ZigBee][1];
            if(ZigBee_Topo_son === getParamsInTable.ZigBee_Terminal_ID){
                getParamsInTable.ZigBee_Father_ID = ZigBee_Topo_father;
            }
            else if(ZigBee_Topo_son !== ZigBee_Topo_father){
                topo_data.push([ZigBee_Topo_son, ZigBee_Topo_father, 1]);
            }
        }
        //对topo_data进行ID-DATA的转换
        for(let i = 0;i < topo_data.length;i++){
            for(let j = 0;j < topo_data[0].length;j++){
                if(topo_data[i][j] === "0000"){
                    topo_data[i][j] = [400, 300];
                }
            }
        }
        //右侧显示ZigBee实时参数
        ZigBee_table_tbody.empty();
        for(let ZigBee_i = 1;ZigBee_i < obj.zigbee.length;ZigBee_i ++){
            ZigBee_table_tbody.append(
                "<tr><td>" +
                obj.zigbee[ZigBee_i][0].sensor_id + "</td><td>" +
                obj.zigbee[ZigBee_i][0].rssi + "</td><td>" +
                obj.zigbee[ZigBee_i][0].data + "</td><td>" +
                obj.zigbee[ZigBee_i][0].time + "</td></tr>"
            );
            if(obj.zigbee[ZigBee_i][0].sensor_id !== getParamsInTable.ZigBee_Terminal_ID){
                dataset.push([obj.zigbee[ZigBee_i][0].sensor.x, obj.zigbee[ZigBee_i][0].sensor.y, "ZigBee-" + obj.zigbee[ZigBee_i][0].sensor_id, getParamsInTable.setZigBeeState(obj.zigbee[ZigBee_i][0].sensor_id)]);
            }
            //对topo_data进行ID-DATA的转换
            for(let i = 0;i < topo_data.length;i++){
                for(let j = 0;j < topo_data[0].length;j++){
                    if(topo_data[i][j] === obj.zigbee[ZigBee_i][0].sensor_id){
                        topo_data[i][j] = [obj.zigbee[ZigBee_i][0].sensor.x, obj.zigbee[ZigBee_i][0].sensor.y];
                    }
                }
            }
        }
        //补录终端位置
        dataset.push([x_par, y_par, "终端", 0]);
    },      //第一次处理数据
};

