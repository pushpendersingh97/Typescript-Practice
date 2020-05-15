"use strict";
/**
* This file contains js of Organisation chart having es7 code
* Owner: CRUX Team
* Author: Pushpender Singh
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *  Global Variables used in the file
 *  globalString: refers the global strings that are used in the file.
 *  DOMStrings: refers to the element id
 */
var chart = null, orgChartCreation = null, nodeStructure = null;
var globalString = {
    chartLocation: "catalystone.chart.ChartViewer?type=",
    chartDataURL: "catalystone.chart.ChartViewer?cached=true&action="
};
var DOMStrings = {
    layoutOrgChart: 'layoutOrgChart',
    orientationOrgChart: 'orientationOrgChart',
    exportBtn: 'exportBtn',
    exitBtn: 'exitBtn',
};
var DOMElement = {
    orientationOrgChart: $("#" + DOMStrings.orientationOrgChart),
    layoutOrgChart: $("#" + DOMStrings.layoutOrgChart),
    exportBtn: $("#" + DOMStrings.exportBtn),
    exitBtn: $('#' + DOMStrings.exitBtn),
};
// Actions that we need to perform in future, will be removing those which are not in use.
var actionOrgChart = {
    ACTION_OPEN_CHART: 0,
    ACTION_LOAD_CHART_DATA: 1,
    ACTION_LOAD_CHILD_NODES: 2,
    ACTION_LOAD_TOOLTIP: 3,
    ACTION_EXPORT_IMAGE: 4,
    ACTION_EXPORT_IMAGE_DOWNLOAD: 5,
    ACTION_SEARCH: 6,
    ACTION_UPDATE_SETTINGS: 7,
    ACTION_EXIT: 8,
};
/**
* This class is used to intilise the UI Component
*/
var InitialUIComponent = /** @class */ (function () {
    function InitialUIComponent() {
        var _this = this;
        // Will create the navigation select
        this.createNavigationSelect = function () {
            var selectCategoryContainer = new Select($('#navigationSelect'));
            selectCategoryContainer.required = true;
            if (hasPolicyAccess) {
                var optionOne = new SelectOption(1, LANG_TEXT.mriOrganizationsHeading);
                optionOne.is_selected = true;
                selectCategoryContainer.addOption(optionOne);
                selectCategoryContainer.addOption(new SelectOption(2, LANG_TEXT.mriOrgsAndEmployeesHeading));
                selectCategoryContainer.addOption(new SelectOption(4, LANG_TEXT.mriReportingHeading));
                selectCategoryContainer.events.change = function (oldOption, newSelectedOtion) {
                    _this.handleNavigation(newSelectedOtion.value);
                };
            }
            var initSelectContainer = SelectInitializer.init(selectCategoryContainer);
            initSelectContainer.setSelectedValue(_this.chartType);
        };
        this.handleNavigation = function (selectedType) {
            location = globalString.chartLocation + selectedType;
        };
        /**
        * Used to add the link of orientation and layout view
        */
        this.eventBinding = function () {
            (DOMElement.layoutOrgChart).click(function () {
                var layoutType = DOMElement.layoutOrgChart.text();
                layoutType == LANG_TEXT.langToggleLayoutCompact ? (DOMElement.layoutOrgChart).text(LANG_TEXT.langToggleLayoutHorizontal) : (DOMElement.layoutOrgChart).text(LANG_TEXT.langToggleLayoutCompact);
            });
            (DOMElement.orientationOrgChart).click(function () {
                var orientationType = (DOMElement.orientationOrgChart).text();
                orientationType == LANG_TEXT.langToggleOrientationTopDown ? (DOMElement.orientationOrgChart).text(LANG_TEXT.langToggleOrientationLeftRight) : (DOMElement.orientationOrgChart).text(LANG_TEXT.langToggleOrientationTopDown);
            });
            document.addEventListener("wheel", function (event) {
                $('.focused').removeClass('focused');
                chart.nodeMenuUI.hide();
            });
            (DOMElement.exportBtn).click(function () {
                chart.exportPDF({
                    landscape: true,
                    format: "fit",
                    filename: "Organisation Chart.pdf",
                    openInNewTab: false,
                    expandChildren: false,
                    margin: [10, 20, 10, 20],
                    scale: 'fit' //100
                });
            });
            (DOMElement.exitBtn).click(function () {
                $.ajax({
                    url: globalString.chartDataURL + actionOrgChart.ACTION_EXIT,
                    type: 'GET',
                    success: function (result) {
                        document.location = result;
                    }
                });
            });
        };
        this.orientationOrLayoutText = function () {
            (DOMElement.layoutOrgChart).text(LANG_TEXT.langToggleLayoutCompact);
            (DOMElement.orientationOrgChart).text(LANG_TEXT.langToggleOrientationTopDown);
        };
        this.init = function () {
            _this.createNavigationSelect();
            _this.orientationOrLayoutText();
            _this.eventBinding();
        };
        this.chartType = chartType;
        this.init();
    }
    return InitialUIComponent;
}());
var UIOrganisationStructure = /** @class */ (function () {
    function UIOrganisationStructure() {
        /**
        * Node structure having user avatar for Organisation
        */
        this.nodeStructureHavingUserAvatarOrganisation = function () {
            OrgChart.templates.white = Object.assign({}, OrgChart.templates.ana);
            OrgChart.templates.white.size = [180, 172];
            OrgChart.templates.white.node = '<rect x="0" y="0" rx="5" ry="5" filter="url(#shadow1)"  height="172" width="180" fill="#f5f5f5" stroke-width="1" stroke="#dedede"></rect>' +
                '<line x1="0" y1="40" x2="180" y2="40" stroke-width="0.8" stroke="#dedede" />';
            OrgChart.templates.white.defs = '<filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="shadow1">' +
                '<feOffset dx="1" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" /><feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1" />' +
                '<feColorMatrix values="0 0 0 1 0   0 0 0 1 0   0 0 0 1 0  0 0 0 0.5 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1" />' +
                '<feMerge>' +
                '<feMergeNode in="shadowMatrixOuter1" /><feMergeNode in="SourceGraphic" /></feMerge></filter>';
            OrgChart.templates.white.ripple = {
                radius: 0,
                color: "#e6e6e6",
                rect: null
            };
            OrgChart.templates.white.img_0 =
                '<clipPath id="{randId}"><circle  cx="90" cy="80" r="21"></circle></clipPath>' +
                    '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="60" y="50"  width="60" height="60"></image>';
            OrgChart.templates.white.field_0 = '<text width="165" text-overflow="ellipsis" class="field_0 organistation-name"  style="font-size: 14px;" font-weight="bold" fill="#353535" x="90" y="130" text-anchor="middle">{val}</text>';
            OrgChart.templates.white.field_1 = '<text width="165" text-overflow="ellipsis" class="field_1 employee-name"  style="font-size: 14px;" fill="#5b5b5b" x="90" y="150" text-anchor="middle">{val}</text>';
            OrgChart.templates.white.field_2 = '<text width="165" text-overflow="ellipsis" class="field_2 employee-role"  style="font-size: 14px;" font-weight="bold" fill="#353535" x="90" y="25" text-anchor="middle">{val}</text>';
            OrgChart.templates.white.plus = '';
            OrgChart.templates.white.minus = '';
            OrgChart.templates.white.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" control-node-menu-id="{id}">' +
                '<line x1="-65" y1="51.5" x2="-52" y2="51.5" style="stroke:#aeaeae;stroke-width:1.5" />' +
                '<line x1="-65" y1="55" x2="-52" y2="55" style="stroke:#aeaeae;stroke-width:1.5" />' +
                '<line x1="-65" y1="58.5" x2="-52" y2="58.5" style="stroke:#aeaeae;stroke-width:1.5" />' +
                '<rect x="-70" y="44" fill="#fff" fill-opacity="0" width="22" height="22"></rect>' +
                '</g>';
            /**
             *	Structure of expand or collapse with adjusting the nodes accordingly having User avatar
             */
            OrgChart.templates.circle = Object.assign({}, OrgChart.templates.ana);
            OrgChart.templates.circle.size = [30, 30];
            OrgChart.templates.circle.node =
                '<circle cx="15" cy="0" r="17" fill="#fff" stroke-width="1" stroke="#aeaeae"></circle>';
            OrgChart.templates.circle.img_0 = '';
            OrgChart.templates.circle.field_0 = '<text style="font-size: 14px;" font-weight="bold" fill="#353535" x="15" y="5" text-anchor="middle">{val}</text>';
            OrgChart.templates.circle.field_1 = '';
            OrgChart.templates.circle.field_2 = '';
            OrgChart.templates.circle.plus = '<circle cx="15" cy="-15" r="15" fill="#ffffff" opacity="0" stroke="#aeaeae" stroke-width="1"></circle>'
                + '<line x1="4" y1="-15" x2="26" y2="-15" stroke-width="1" opacity="0" stroke="#aeaeae"></line>'
                + '<line x1="15" y1="-26" x2="15" y2="-5" stroke-width="1" opacity="0" stroke="#aeaeae"></line>';
            OrgChart.templates.circle.minus = '<circle cx="15" cy="-15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="0"></circle>'
                + '<line x1="4" y1="-15" x2="26" y2="-15" stroke-width="1" stroke="#aeaeae"></line>';
            OrgChart.templates.white.plus = '';
            OrgChart.templates.white.minus = '';
            // Adjusting the nodes
            OrgChart.templates.whiteUnder = Object.assign({}, OrgChart.templates.white);
            OrgChart.templates.whiteUnder.linkAdjuster = {
                fromX: 0,
                fromY: 0,
                toX: 0,
                toY: -13
            };
        };
        this.init();
    }
    UIOrganisationStructure.prototype.init = function () {
        switch (chartType) {
            case '1': this.nodeStructureHavingUserAvatarOrganisation();
            default: this.nodeStructureHavingUserAvatarOrganisation();
        }
    };
    return UIOrganisationStructure;
}());
/**
* Organisation chart default settings
*/
var SettingsOrganisationChart = /** @class */ (function () {
    function SettingsOrganisationChart() {
        var _this = this;
        this.getOptionObject = function () { return _this.option = {
            template: _this.template,
            nodeMenu: _this.nodeMenu,
            nodeBinding: _this.nodeBindingObject,
            tags: _this.tagsObject,
            mouseScrool: _this.mouseScrool,
            enableSearch: _this.search,
            nodeMouseClick: _this.nodeMouseClick,
            collapse: {
                level: 4,
                allChildren: true
            },
        }; };
        this.mouseScrool = OrgChart.action.scroll;
        this.search = false;
        this.nodeMouseClick = OrgChart.action.none;
    }
    Object.defineProperty(SettingsOrganisationChart.prototype, "templateObject", {
        get: function () { return this.template; },
        set: function (templateObject) { this.template = templateObject; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsOrganisationChart.prototype, "nodeMenuOption", {
        get: function () { return this.nodeMenu; },
        set: function (nodeMenuObject) { this.nodeMenu = nodeMenuObject; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsOrganisationChart.prototype, "nodeBindingObject", {
        get: function () { return this.nodeBinding; },
        set: function (nodeBindingObj) {
            switch (chartType) {
                default: this.nodeBinding = {
                    field_0: "personName",
                    field_1: "title",
                    field_2: "jobRole",
                    img_0: "photoUrl"
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsOrganisationChart.prototype, "tagsObject", {
        get: function () { return this.tags; },
        set: function (tagsObject) { this.tags = tagsObject; },
        enumerable: true,
        configurable: true
    });
    return SettingsOrganisationChart;
}());
/**
* Class for creating Organisation Chart
*/
var OrganisationChart = /** @class */ (function (_super) {
    __extends(OrganisationChart, _super);
    function OrganisationChart() {
        var _this = _super.call(this) || this;
        _this.setChart = function () {
            chart = new OrgChart(document.getElementById("chartContainer"), _this.getOptionObject());
        };
        return _this;
    }
    Object.defineProperty(OrganisationChart.prototype, "nodeData", {
        get: function () { return this.node; },
        set: function (data) { this.node = data; },
        enumerable: true,
        configurable: true
    });
    OrganisationChart.prototype.loadChart = function () {
        chart.load(this.nodeData);
    };
    OrganisationChart.prototype.bindNodeColor = function () {
        chart.nodeMenuUI.on('show', function (sender, args) {
            $('.focused').removeClass('focused');
            var nodeElement = chart.getNodeElement(args.firstNodeId);
            nodeElement.classList.add('focused');
        });
    };
    return OrganisationChart;
}(SettingsOrganisationChart));
$(document).ready(function () {
    var initUI = new InitialUIComponent();
    nodeStructure = new UIOrganisationStructure();
    orgChartCreation = new OrganisationChart();
    var nodeMenuObject = {
        open: { text: "Open", icon: '' },
        expand: { text: "Expand all below", icon: '', onClick: expand },
        addNew: {
            text: "Add new",
            icon: '',
        }
    };
    var tags = {
        circle: {
            template: "circle"
        },
        whiteUnder: {
            template: "whiteUnder"
        }
    };
    orgChartCreation.template = 'white';
    orgChartCreation.nodeMenuOption = nodeMenuObject;
    orgChartCreation.nodeBindingObject = chartType;
    orgChartCreation.tagsObject = tags;
    var nodes = [
        { id: 1, pole: 1, personName: "Denny Curtis", title: "CEO", jobRole: "Directors", photoUrl: "catalystone.document.ShowDocumentImage?isSmartThumbnail=true&t=100&documentId=198928" },
        { id: 2, pid: 1, tags: ["circle"], personName: "5" },
        { id: 3, pid: 2, tags: ["whiteUnder"], personName: "Ashley Barnett", title: "Sales Manager", jobRole: "Sales", photoUrl: "catalystone.document.ShowDocumentImage?isSmartThumbnail=true&t=100&documentId=198928" },
        { id: 4, pid: 2, tags: ["whiteUnder"], personName: "Caden Ellison", title: "Dev Manager", jobRole: "Development", photoUrl: "catalystone.document.ShowDocumentImage?isSmartThumbnail=true&t=100&documentId=198928" },
        { id: 5, pid: 2, tags: ["whiteUnder"], personName: "Elliot Patel", title: "Sales", jobRole: "Sales", photoUrl: "catalystone.document.ShowDocumentImage?isSmartThumbnail=true&t=100&documentId=198928" },
        { id: 6, pid: 2, tags: ["whiteUnder"], personName: "Lynn Hussain", title: "Sales", jobRole: "Sales" },
        { id: 7, pid: 2, tags: ["whiteUnder"], personName: "Tanner May", title: "Developer", jobRole: "Development" },
        { id: 8, pid: 3, tags: ["circle"], personName: "7" },
        { id: 9, pid: 8, tags: ["whiteUnder"], personName: "James Barnett", title: "Sales Consultant", jobRole: "Sales" },
        { id: 10, pid: 8, tags: ["whiteUnder"], personName: "Denny May", title: "Sales Consultant", jobRole: "Sales" },
        { id: 11, pid: 8, tags: ["whiteUnder"], personName: "Ashley Barnett", title: "Sales Manager", jobRole: "Sales" },
        { id: 12, pid: 8, tags: ["whiteUnder"], personName: "Caden Ellison", title: "Dev Manager", jobRole: "Development" },
        { id: 13, pid: 8, tags: ["whiteUnder"], personName: "Elliot Patel", title: "Sales", jobRole: "Sales" },
        { id: 14, pid: 8, tags: ["whiteUnder"], personName: "Lynn Hussain", title: "Sales", jobRole: "Sales" },
        { id: 15, pid: 8, tags: ["whiteUnder"], personName: "Tanner May", title: "Developer", jobRole: "Development" },
        { id: 16, pid: 3, tags: ["circle"], personName: "7" },
        { id: 17, pid: 16, tags: ["whiteUnder"], personName: "James Barnett", title: "Sales Consultant", jobRole: "Sales" },
        { id: 18, pid: 16, tags: ["whiteUnder"], personName: "Denny May", title: "Sales Consultant", jobRole: "Sales" },
        { id: 19, pid: 16, tags: ["whiteUnder"], personName: "Ashley Barnett", title: "Sales Manager", jobRole: "Sales" },
        { id: 20, pid: 16, tags: ["whiteUnder"], personName: "Caden Ellison", title: "Dev Manager", jobRole: "Development" },
        { id: 21, pid: 16, tags: ["whiteUnder"], personName: "Elliot Patel", title: "Sales", jobRole: "Sales" },
        { id: 22, pid: 16, tags: ["whiteUnder"], personName: "Lynn Hussain", title: "Sales", jobRole: "Sales" },
        { id: 23, pid: 16, tags: ["whiteUnder"], personName: "Tanner May", title: "Developer", jobRole: "Development" },
        { id: 24, pid: 23, tags: ["circle"], personName: "2" },
        { id: 25, pid: 24, tags: ["whiteUnder"], personName: "James Barnett", title: "Sales Consultant", jobRole: "Sales" },
        { id: 26, pid: 24, tags: ["whiteUnder"], personName: "Denny May", title: "Sales Consultant", jobRole: "Sales" }
    ];
    orgChartCreation.nodeData = nodes;
    orgChartCreation.setChart();
    var expand = function (id) {
        var node = chart.getBGNode(id);
        var childId = node.childrenIds[0];
        var childNode = chart.getBGNode(childId);
        chart.expand(childId, childNode.childrenIds);
    };
    orgChartCreation.loadChart();
    chart.on("render", function () { chart.nodeMenuUI.hide(); });
    orgChartCreation.bindNodeColor();
});
