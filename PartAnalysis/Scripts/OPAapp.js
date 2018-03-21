

var app = angular.module('OPAapp', ['ngRoute', 'ngAnimate', 'ui.grid', 'ui.grid.exporter', 'ui.grid.pagination', 'ngMaterial', 'opadataServiceModule','cgBusy']);

app.controller('HomeController', function ($scope, $http, $rootScope, $mdDialog, $mdMedia, $timeout, opadataService, uiGridExporterConstants, uiGridConstants) {


        $scope.message = "my application";

    $scope.loadingstatus = false;
    $scope.showgrid = false;
    $scope.norecords = false;
    $scope.pbglist = [{ id: 1, name: 4060, desc:'SGP'},
            { id: 2, name: 4070,desc:'AUS' },
        { id: 3, name: 4080, desc: 'NPI'},
        { id: 4, name: 4090, desc: 'SMG'}];
    for (var i = 0; i < $scope.pbglist.length; i++) {

        if ($scope.pbglist[i].id === 2) { $scope.pbglist[i].Selected = true; }
        else { $scope.pbglist[i].Selected = false;}
    }
    //$scope.fieldlist = [
    //    { id: 1, column: 'materialnum', alias: 'Part Number', include: false },
    //    { id: 2, column: 'materialdesc', alias: 'Part escription', include: false },
    //    { id: 3, column: 'plantcd', alias: 'Plant Code', include: false },
    //    { id: 4, column: 'uomcd', alias: 'Unit of Measure', include: true },
    //    { id: 5, column: 'crtclpart', alias: 'Critical Part', include: true },
    //    { id: 4, column: 'materialstatus', alias: 'Material Status', include: true },
    //    { id: 7, column: 'prcrmnttype', alias: 'Make/Buy', include: true },
    //    { id: 8, column: 'prchsggrpcd', alias: 'Planner', include: true },
    //    { id: 9, column: 'prchsggrpname', alias: 'Planner Name', include: false },
    //    { id: 10, column: 'prchsggrpdesc', alias: '', include: false },
    //    { id: 11, column: 'planneddlvrydays', alias: '', include: true },
    //    { id: 12, column: 'stdcost', alias: 'Standard Cost', include: true },
    //    { id: 13, column: 'plannedprice1', alias: '', include: true },
    //    { id: 14, column: 'brdnrate', alias: 'Burden Rate', include: true },
    //    { id: 15, column: 'minimumlotsize', alias: '', include: true },
    //    { id: 16, column: 'ipsnstv', alias: 'Ip', include: true },
    //    { id: 6, column: 'traderstrctd', alias: 'Trade', include: true },
    //    { id: 18, column: 'ss', alias: '', include: true },
    //    { id: 19, column: 'maxstcklvl', alias: 'Max Stock Level', include: true },
    //    { id: 20, column: 'spclprcrmnttype', alias: '', include: true },
    //    { id: 21, column: 'fixdlotsize', alias: 'Fixed Lot Size', include: true },
    //    { id: 22, column: 'pripbg', alias: 'PBG', include: true },
    //    { id: 23, column: 'reordpnt', alias: '', include: true },
    //    { id: 24, column: 'blkmaterialind', alias: '', include: true },
    //    { id: 25, column: 'plnglotsize', alias: '', include: true },
    //    { id: 26, column: 'currcd', alias: 'Currency Code', include: true },
    //    { id: 27, column: 'MRPType', alias: '', include: true },
    //    { id: 28, column: 'MaterialCost', alias: 'Material Cost', include: true },
    //    { id: 29, column: 'dueqty', alias: 'Due Qty', include: true },
    //    { id: 30, column: 'GrossDemand13week', alias: 'Gross Demand', include: true },
    //    { id: 31, column: 'GrossDemand26week', alias: '', include: false },
    //    { id: 32, column: 'GrossDemand52week', alias: '', include: false },
    //    { id: 33, column: 'awu', alias: '', include: true },
    //    { id: 34, column: 'COMMODITY', alias: 'Commodity', include: true },
    //    { id: 35, column: 'COMMODITY_CLASS', alias: '', include: false },
    //    { id: 36, column: 'AUSLocUnRestricted', alias: 'Unrestricted', include: true },
    //    { id: 37, column: 'SGPLocUnRestricted', alias: '', include: false },
    //    { id: 38, column: 'AICVendorUnRestricted', alias: '', include: false },
    //    { id: 39, column: 'SICVendorUnRestricted', alias: '', include: false },
    //    { id: 40, column: 'AUSLocRestricted', alias: 'Restricted', include: true },
    //    { id: 41, column: 'SGPLocRestricted', alias: '', include: false },
    //    { id: 5, column: 'CE', alias: 'Customer', include: true },
    //    { id: 43, column: 'dcvdpct', alias: 'DCVD', include: false },
    //    { id: 44, column: 'aldpct', alias: 'ALD', include: false },
    //    { id: 45, column: 'etchpct', alias: 'ETCH', include: false },
    //    { id: 46, column: 'srppct', alias: 'SRP', include: false },
    //    { id: 47, column: 'cmppct', alias: 'CMP', include: false },
    //    { id: 48, column: 'feppct', alias: 'FEP', include: false },
    //    { id: 49, column: 'mdppct', alias: 'MDP', include: false },
    //    { id: 50, column: 'ppcpct', alias: 'PPC', include: false },
    //    { id: 51, column: 'varianpct', alias: 'Varian', include: false },
    //    { id: 52, column: 'pdcpct', alias: 'PDC', include: false },
    //    { id: 53, column: 'unknownpct', alias: 'Unknown', include: false },
    //    { id: 54, column: 'crslflg', alias: 'CRSL FLag', include: true },
    //    { id: 55, column: 'fullleadtime', alias: 'Lead Time', include: true },
    //    { id: 56, column: 'crrntrvn', alias: 'Current Revision', include: true },
    //    { id: 57, column: 'movingavgcost', alias: 'Moving Average Cost', include: true }
    //];

    $scope.fieldlist = [
        { id: 3, column: 'Material Attribute', alias: '', include: true },
        { id: 1, column: 'Cost Details', alias: '', include: true },
        { id: 2, column: 'Gross Demand', alias: '', include: true },
        
        { id: 4, column: 'Planner', alias: '', include: true },
        //{ id: 5, column: 'PBG Allocation', alias: '', include: true },
        { id: 6, column: 'Commodity', alias: '', include: true },
        { id: 6, column: 'Lot Size', alias: '', include: true }

    ];
    
    for (var k = 0; k < $scope.fieldlist.length; k++) {

        if ($scope.fieldlist[k].include === true) { $scope.fieldlist[k].Selected = true; }
    }

    $scope.showAdvanced = function (ev, data, col) {

        $rootScope.rowName = col.displayName;
        //console.log(data.entity.part_number);
        //console.log(data.entity.org_code);
        $rootScope.rowData = data.entity.part_number;
        $rootScope.orgCode = data.entity.org_code;
        //console.log($rootScope.rowName);
        $rootScope.dataEntity = data.entity;
        $scope.newCards = [];
        dummy = {};
        dummy.label = 'pbg_a';
        dummy.value = data.entity.PBG_A;
        $scope.newCards.push(dummy);




        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            //templateUrl: '../../bidm/search360v2/views/dialog1.tmpl.html',
            templateUrl: '../../views/home/dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
            .then(function () {
                // console.log("opened");
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                //$scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    function DialogController($scope, $mdDialog) {

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        //$scope.name = $rootScope.rowName;
        //$scope.id = $rootScope.rowData;
        //$scope.frozen_cost = $rootScope.dataEntity.frozen_cost;
        //$scope.orgCode = $rootScope.orgCode;
        //$scope.space = '    ';
        //$scope.dataModel = $rootScope.dataEntity;
    };
    $scope.downloadTableDataBtn = true;
    $scope.gridOptions = {
        enableSelectAll: false,
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableGridMenu: true,
        exporterCsvFilename: 'opadata.csv',
        exporterExcelFilename: 'myFile.xlsx',
        exporterExcelSheetName: 'Sheet1',
        exporterMenuPdf: false,
        enableFiltering: false,
        showGridFooter: true,
        paginationPageSizes: [10, 25, 50, 75],
        paginationPageSize: 10,
        // useExternalPagination: true,
        enableExpandable: true,

        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }

    }; 
    var PARTColumn = {
        name: 'Part_number',
        displayName: 'Part Number',
        enableFiltering: false,
        width: 150,
        //cellTemplate: '<div ng-if="row.entity.plantcd" class="tcenter">{{row.entity.plantcd}}</div><div ng-if="!row.entity.plantcd"></div>'
        cellTemplate: "<div class='ui-grid-cell-contents'><md-menu  md-offset='0 45' md-position-mode='target target'><md-button class='md-icon-button' ng-click='grid.appScope.openMenu($mdOpenMenu, $event)'><i class='fa fa-indent'></i></md-button><md-menu-content width='2'><md-menu-item><md-button ng-click='grid.appScope.switchTabs(row,&apos;service_order&apos;)'>Service Order </md-button></md-menu-item><md-menu-item><md-button ng-click='grid.appScope.switchTabs(row,&apos;sales_order&apos;)'>Sales Order</md-button></md-menu-item><md-menu-item><md-button ng-click='grid.appScope.switchTabs(row,&apos;NC&apos;)'>Non Conformances</md-button></md-menu-item><md-menu-item><md-button ng-click='grid.appScope.switchTabs(row,&apos;BOM&apos;)'>System BOM</md-button></md-menu-item><md-menu-item><md-button ng-click='grid.appScope.switchTabs(row,&apos;serial_num&apos;)'>Serial Number</md-button></md-menu-item></md-menu-content></md-menu><span title='{{COL_FIELD CUSTOM_FILTERS}}' ng-click='grid.appScope.showAdvanced($event, row, col)' class='partNum'>{{row.entity.materialnum}}</span></div>"
    };
    var orgColumn = {
        name: 'plantcd',
        displayName: 'Plant Code',
        width: 100,
        headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            type: uiGridConstants.filter.SELECT,
            //selectOptions: $scope.faiFilter
        },
        cellTemplate: '<div ng-if="row.entity.plantcd" class="tcenter">{{row.entity.plantcd}}</div><div ng-if="!row.entity.plantcd"></div>'
    };
    var Partdesccolumn = {
        name: 'materialdesc',
        displayName: 'Part Description',
        width: 200,
        enableFiltering: true,
        headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            condition: $scope.filterPartDesc
        },
        cellTemplate: '<div ng-if="row.entity.materialdesc" class="tcenter">{{row.entity.materialdesc}}</div><div ng-if="!row.entity.materialdesc"></div>'
    };
    var stdcostcolumn = {
        name: 'stdCost', displayName: 'Standard Cost', width: 100,
        enableFiltering: false,
        headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            condition: uiGridConstants.filter.SELECT,
        },
        cellTemplate: '<div ng-if="row.entity.stdCost" class="tcenter">{{row.entity.stdCost}}</div><div ng-if="!row.entity.stdCost"></div>'
    };
    var material_costcolumn = {
        name: 'material_cost', displayName: 'Material Cost', width: 100,
        enableFiltering: false,
        headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            condition: uiGridConstants.filter.SELECT,
        },
        cellTemplate: '<div ng-if="row.entity.MaterialCost" class="tcenter">{{row.entity.MaterialCost}}</div><div ng-if="!row.entity.MaterialCost"></div>'
    };
    var movingavgcostcolumn = {
        name: 'movingavgcost', displayName: 'Moving AVG Cost', width: 100,
        enableFiltering: false,
        headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            condition: uiGridConstants.filter.SELECT,
        },
        cellTemplate: '<div ng-if="row.entity.movingavgcost" class="tcenter">{{row.entity.movingavgcost}}</div><div ng-if="!row.entity.movingavgcost"></div>'
    };
    var gross_demand_13column = {
        name: 'gross_demand_13', displayName: 'Gross Demand - 13 week', width: 100,
        enableFiltering: false,
        headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            condition: uiGridConstants.filter.SELECT,
        },
        cellTemplate: '<div ng-if="row.entity.GrossDemand13week" class="tcenter">{{row.entity.GrossDemand13week}}</div><div ng-if="!row.entity.GrossDemand13week"></div>'
    };
    var gross_demand_26column = {
        name: 'gross_demand_26', displayName: 'Gross Demand - 26 week', width: 100,
        enableFiltering: false,
        headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            condition: uiGridConstants.filter.SELECT,
        },
        cellTemplate: '<div ng-if="row.entity.GrossDemand26week" class="tcenter">{{row.entity.GrossDemand26week}}</div><div ng-if="!row.entity.GrossDemand26week"></div>'
    };
    var gross_demand_52column = {
        name: 'gross_demand_52', displayName: 'Gross Demand - 52 week', width: 100,
        enableFiltering: false,
        headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            condition: uiGridConstants.filter.SELECT,
        },
        cellTemplate: '<div ng-if="row.entity.GrossDemand52week" class="tcenter">{{row.entity.GrossDemand52week}}</div><div ng-if="!row.entity.GrossDemand52week"></div>'
    };
    var materialstatus_column = {
        name: 'materialstatus',
        displayName: 'Material Status',
        width: 150,
        enableFiltering: false,
        headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            condition: uiGridConstants.filter.SELECT,
            //selectOptions: $scope.faiFilter
        },
        cellTemplate: '<div ng-if="row.entity.materialstatus" class="tcenter">{{row.entity.materialstatus}}</div><div ng-if="!row.entity.materialstatus"></div>'
    };
    function addcolumndefs() {
        var checkedfields = "";

        for (var i = 0; i < $scope.fieldlist.length; i++) {

            if ($scope.fieldlist[i].Selected) {
                var columnName = $scope.fieldlist[i].column;
                checkedfields += columnName + ",";
            }
        }
        checkedfields = checkedfields.replace(/,\s*$/, "");


        console.log(checkedfields);
       // $scope.gridOptions.columnDefs = [];
        //var columnlist = [PARTColumn, Partdesccolumn, orgColumn];
        if (checkedfields.indexOf("Material Attribute") !== -1) {
            //columnlist.push(materialstatus_column);

            $scope.selectedfields += ',materialstatus Material_Attribute '
        };
        if (checkedfields.indexOf("Cost Details") !== -1) {
            //columnlist.push(material_costcolumn);
            //columnlist.push(stdcostcolumn);
            //columnlist.push(movingavgcostcolumn);
            $scope.selectedfields += ', MaterialCost Material_Cost,stdcost Standard_Cost,movingavgcost Moving_Average_Cost'
        };
        if (checkedfields.indexOf("Gross Demand") !== -1) {
            //columnlist.push(gross_demand_13column);
            //columnlist.push(gross_demand_26column);
            //columnlist.push(gross_demand_52column);
            $scope.selectedfields += ',GrossDemand13week Gross_Demand_13_week,GrossDemand26week Gross_Demand_26_week,GrossDemand52week Gross_Demand_52_week'
        };
        
        if (checkedfields.indexOf("PBG Allocation") !== -1) {
            //columnlist.push(materialstatus_column);

            $scope.selectedfields += ',pripbg Max_PBG,dcvdpct DCVD,aldpct ALD,etchpct ETCH,srppct SRP,cmppct CMP,feppct FEP,mdppct MDP,ppcpct PPC,varianpct Varian,pdcpct PDC,unknownpct Unknown'
        };
        if (checkedfields.indexOf("Commodity") !== -1) {
            //columnlist.push(materialstatus_column);

            $scope.selectedfields += ' ,prchsggrpcd Planner_Code ,prchsggrpname Planner_Name'
        };
        if (checkedfields.indexOf("Planner") !== -1) {
            //columnlist.push(materialstatus_column);

            $scope.selectedfields += ',Commodity ,Commodity_Class'
        };
        if (checkedfields.indexOf("Lot Size") !== -1) {
            //columnlist.push(materialstatus_column);

            $scope.selectedfields += ',minimumlotsize Minimum_Lot_Size,fixdlotsize Fixed_Lot_Size,plnglotsize Planning_Lot_Size'
        };
       // $scope.gridheaders = columnlist
        
    };
   

    $scope.getDetails = function () {
        $scope.norecords = false;
        $scope.downloadTableDataBtn = true;
            var plantcdselect = "";

            for (var i = 0; i < $scope.pbglist.length; i++) {

                if ($scope.pbglist[i].Selected) {
                    var plantId = $scope.pbglist[i].id;
                    var plantName = $scope.pbglist[i].name;
                    plantcdselect +=  plantName + ",";
                }
            }
            plantcdselect = plantcdselect.replace(/,\s*$/, "");

 
            var searchtext = $scope.partarea;
            if (typeof (searchtext) === "undefined") { alert("please enter partnumber"); }
            else {
                //searchtext = '0050-40646,0050-40666';
                
                console.log(searchtext);
                console.log(searchtext.length);
                searchtext= searchtext.replace(/\n/g, ",").replace(" ", "");
                var count = searchtext.split(",").count;
                if (count > 5000) { alert("Max limit of Partnumber is 5000 !!"); $scope.shouldBeOpen = true;}
                else {
                    $scope.loadingstatus = true;
                    $scope.showgrid = false;
                $scope.selectedfields = ' distinct top 100 materialnum Part_Number ,materialdesc Part_Description ,plantcd Plant_Code'
                    var search = searchtext.split(",").join("','");
                    console.log(search);
                    addcolumndefs();
                    var data = { PlantCd: plantcdselect, partNum: search, fieldselect: $scope.selectedfields };


                    console.log(data);
                    console.log(typeof (data));
                    $http({
                        method: 'Post',
                        url: '/api/values',

                        data: data,
                        headers: { 'Access-Control-Allow-Origin': '*' }
                    }).then(function (response) {
                        console.log(response, 'resPOST');
                        console.log(response.data);
                        //$scope.gridOptions.columnDefs = $scope.gridheaders;
                        $scope.gridOptions.columnDefs = [];
                        $scope.gridOptions.data = [];
                        $scope.gridOptions.data = angular.fromJson(response.data);
                        $scope.loadingstatus = false;
                        if (angular.fromJson(response.data).length === 0) {
                            $scope.norecords = true;
                            $scope.downloadTableDataBtn = true;
                            $scope.showgrid = false;
                        }
                        else {
                            $scope.norecords = false;
                            
                            $scope.showgrid = true;
                            $scope.downloadTableDataBtn = false;
                            $scope.alertLoder = false;
                            $scope.successAlert = true;}
                        
                        // gridApi.pagination.getPage()

                    }, function (error) {
                        console.log(error, 'can not get data.');
                    });}
                

                

           
            }
        };
    $scope.resetDetails = function () {
        $scope.loadingstatus = false;
        $scope.showgrid = false;
        $scope.norecords = false;
        $scope.downloadTableDataBtn = true;

        for (var i = 0; i < $scope.pbglist.length; i++) {

            if ($scope.pbglist[i].id === 2) { $scope.pbglist[i].Selected = true; }
            else { $scope.pbglist[i].Selected = false; }
        }
        $scope.partarea = '';
        for (var j = 0; j < $scope.fieldlist.length; ji++) {

            if ($scope.fieldlist[j].include === true) { $scope.fieldlist[j].Selected = true; }
        }

    };
    $scope.downloadExcel = function () {

        $scope.gridApi.exporter.excelExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
       // alasql('SELECT * INTO XLSX("john.xlsx",{headers:true}) FROM ?', [$scope.gridOptions.data]);
    };
    });





