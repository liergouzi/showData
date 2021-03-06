app.factory('PATH', function ($http, ENV) {

    return {
        login: ENV.api + "/home/user/login",

        logout: ENV.api + "/home/user/logout",

        checkPassword:ENV.api+"/ctrl/user/checkPassword",
        updatePassword:function () {
            return ENV.api+"/ctrl/user/updatePassword";
        },

        //通用
        common: {
            dict: ENV.api + "/sign/dictionary",
            region: ENV.api + "/sign/region",

        },

        //获取预警消息
        getmessage: ENV.api + "/ctrl/WarningStopStation/getWarningMessage",

        //站点
        station: function (id) {
            if (id)
                return ENV.api + "/ctrl/station/getStationDetails/" + id;
            else
                return ENV.api + "/rest/station?_method=get"
        },
        stationDeposit: function (id) {
            return ENV.api + "/ctrl/stationDeposit/getStationDepositResult/" + id;
        },
        stationDetail: {
            //站点详情的销售信息
            sales: function (id) {
                return ENV.api + "/ctrl/saleDetailsInfo/getSaleDetailsInfoOfSales/" + id;
            },
            salesOdYear: function (id) {
                return ENV.api + "/ctrl/saleDetailsInfo/getSalesOfStationByYear/" + id;
            },
            //站点的考核信息
            checkOutOfStation: function (id, startTime, endTime) {
                return ENV.api + "/ctrl/taskCheckOut/getCheckResultOfStationDetails/" + id + "/" + startTime + "/" + endTime;
                // return ENV.api + "/ctrl/taskCheckOut/getCheckResultOfStationDetails/23/" + startTime + "/" + endTime;
            }
        },
        violation: "/ctrl/checkOutResult/getCheckOutPassStationResult",
        //站点自查
        siteSelfCheck: "/ctrl/taskCheckSelf/getCheckSelfPassStationResult",
        delviolation: "/ctrl/checkOutResult/deleteOutResult",
        stationAdmin: function () {
            return ENV.api + "/ctrl/station/getStationInfoResult"
        },
        //站点违规详情
        illegaldetails: function (id) {
            return ENV.api + "/ctrl/taskCheckOut/getCheckOutResultWithAttach/" + id;
        },
        illegalSite: function (id) {
            if (id)
                return ENV.api + "/ctrl/checkOutResult/getCheckOutPassStation/" + id;
            else
                return ENV.api + "/ctrl/checkOutResult/getCheckOutPassStation"
        },
        //销售员
        person: function (id, method) {
            if (id && !method)
                return ENV.api + "/rest/person/" + id;
            else if (method == "del")
                return ENV.api + "/ctrl/person/delPerson/" + id;
            else
                return ENV.api + "/rest/person"
        },
        getPersonScore: function (id, date) {
            return ENV.api + "/ctrl/personScoreHistory/getResult/" + id + "/" + date;
        },
        //督导员
        supervisor: function (id) {
            return ENV.api + "/ctrl/supervisor/getSupervisor/" + id;
        },
        delsupervisor:ENV.api + "/ctrl/supervisor/delSupervisor",
        superPerson: "/rest/user?_method=get",
        getsupervisorByname: "/rest/supervisor",
        getStationBySupervisor: function (id) {
            return ENV.api + "/ctrl/station/getStationBySupervisor/" + id
        },
        addsupervisor:ENV.api+"/ctrl/supervisor/saveSupervisor",
        //督导员任务（巡检等）
        addurgentTask: "/ctrl/taskCheckOut/creatCheckoutTask",
        deltask: "/ctrl/taskCheckOut/delCheckoutTask",
        changetask: "/ctrl/taskCheckOut/changeCheckoutTask",

        //一级指标
        rule: function (id) {
            if (id)
                return "/ctrl/checkModelCategory/updateCategory/" + id;
            else
                return "/ctrl/checkModelCategory/updateCategory"
        },
        //二级
        rules: function (id) {
            if (id)
                return "/ctrl/checkModelKpi/updateKpi/" + id;
            else
                return "/ctrl/checkModelKpi/updateKpi"
        },
        rulesDetails: function (id) {
            return "/rest/checkModelKpi/" + id
        },
        //停用二级
        stoprules: function (id, status) {
            return "/ctrl/checkModelKpi/stopKpi/" + id + "/" + status
        },
        ruleList: "/ctrl/checkModelCategory/getCatagoryKpiList?order=asc&sort=sort&start=0&length=10",
        //公司
        company: function (id) {
            if (id)
                return ENV.api + "/rest/company/" + id;
            else
                return ENV.api + "/rest/company?_method=get"
        },
        //部门
        dept: function (id) {
            if (id)
                return ENV.api + "/rest/dept/" + id;
            else
                return ENV.api + "/rest/dept?_method=get"
        },
        lottery_type: ENV.api + "/ctrl/lotteryType/getLotteryType",
        //获取一级指标
        kpiCategory: function () {
            return ENV.api + "/rest/checkModelCategory?_method=get&length=1000";
        },
        //预警
        refusewarning: function (id) {
            return ENV.api + "/ctrl/WarningStopStation/refuseWarn/" + id;
        },
        addWarning: "/ctrl/warningStopStation/saveOutResult",
        stopMachine: function (id) {
            return ENV.api + "/ctrl/WarningStopStation/stopMachine/" + id;
        },

        //考核    By惠晓东
        //获取动态列
        getDynColumn: function () {
            return ENV.api + "/ctrl/taskCheckOut/getdynColumn";
        },
        //获取考核概况
        getCheckInfo: function (id) {
            if (id)
                return ENV.api + "/ctrl/checkOutResult/getCheckResultBaseInfo/" + id;
            else
                return ENV.api + "/ctrl/checkOutResult/getCheckResultBaseInfo";
        },
        //销售
        getSalesBasicFacts: ENV.api + "/ctrl/saleDetailsInfo/getSalesBasicFacts",

        //系统设置
        role: function (id) {
            if (id)
                return ENV.api + "/rest/role/" + id;
            else
                return ENV.api + "/rest/role";
        },
        dateAdmin:function(y,m){
            return ENV.api+"/ctrl/dateRule/"+y+"/"+m
        },
        dateDetails:ENV.api+"/ctrl/dateRule",
        deleteDate:function (id) {
            return ENV.api+"/ctrl/dateRule/"+id;
        },
        // 大数据平台---------------------------
        // tableTitle:function () {
        //   return ENV.api+'/ctrl/dateRule'
        // },
        // tableTbody:function () {
        //   return ENV.api+'/ctrl/dateRule'
        // },
        // selectPlaytable:function (timejson) {
        //   return ENV.api+'/crtl/dateRule/'+timejson;
        // },
        // upClick:function (target) {
        //     return ENV.api+'/crtl/dateRule/'+target;
        // },
        // downClick:function (target) {
        //     return ENV.api+'/crtl/dateRule/'+target;
        // },
        // ---------------------------
        user: function (id) {
            if (id)
                return ENV.api + "/rest/user/" + id;
            else
                return ENV.api + "/rest/user";
        },
        users:{
            delUser:function (id) {
                return ENV.api+"/ctrl/user/delUser/"+id;
            },
            updateUser:ENV.api+"/ctrl/user/updateUser",
            saveUser:ENV.api+"/ctrl/user/saveUser",
        },
        dict: {
            getDict: function (dict_code) {
                return ENV.api + "/sign/dictionary/" + dict_code;
            },
            Dict: function (id) {
                if (id)
                    return ENV.api + "/rest/dictionary/" + id;
                else
                    return ENV.api + "/rest/dictionary";
            },
            saveDict: ENV.api + "/ctrl/dictionary/save",
            updateDict: ENV.api + "/ctrl/dictionary/update"
        },
        region: {
            delRegion: function (id) {
                return ENV.api + "/rest/region/" + id;
            },
            updateRegion:ENV.api+"/sign/region/update",
            saveRegion:ENV.api+"/rest/region"
        },
        depts:{
            updateDept:ENV.api+"/ctrl/dept/updateDept",
            saveDept:ENV.api+"/rest/dept",
            delDept:function (id) {
                return ENV.api+"/rest/dept/"+id;
            }
        },
        //检查loginId是否重复
        checkLoginId:function (loginid) {
            return ENV.api + "/rest/user?filter.loginId="+loginid;
        }
    }
});













